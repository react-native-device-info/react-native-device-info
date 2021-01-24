package com.learnium.RNDeviceInfo;

import android.content.SharedPreferences;
import android.content.Context;
import android.util.Log;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;


public class RNInstallReferrerClient {
  private static Class<?> InstallReferrerClientClazz;
  private static Class<?> InstallReferrerStateListenerClazz;
  private static Class<?> ReferrerDetailsClazz;

  static {
    try {
      InstallReferrerClientClazz = Class.forName("com.android.installreferrer.api.InstallReferrerClient");
      InstallReferrerStateListenerClazz = Class.forName("com.android.installreferrer.api.InstallReferrerStateListener");
      ReferrerDetailsClazz = Class.forName("com.android.installreferrer.api.ReferrerDetails");
    } catch (Exception e) {
      System.err.println("RNInstallReferrerClient exception. 'installreferrer' APIs are unavailable.");
    }
  }

  private final SharedPreferences sharedPreferences;
  private Object mReferrerClient;
  private Object installReferrerStateListener;

  // From InstallReferrerClient.InstallReferrerResponse
  private static final int R_RESPONSE_OK                    = 0;
  private static final int R_RESPONSE_SERVICE_UNAVAILABLE   = 1;
  private static final int R_RESPONSE_FEATURE_NOT_SUPPORTED = 2;

  RNInstallReferrerClient(Context context) {
    sharedPreferences = context.getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);

    if (InstallReferrerClientClazz == null || InstallReferrerStateListenerClazz == null || ReferrerDetailsClazz == null) {
      return;
    }

    try {
      // Build the InstallReferrerClient instance.
      Method newBuilderMethod = InstallReferrerClientClazz.getMethod("newBuilder", Context.class);
      Object builder = newBuilderMethod.invoke(null, context);
      Method buildMethod = builder.getClass().getMethod("build");
      mReferrerClient = buildMethod.invoke(builder);

      // Create the InstallReferrerStateListener instance using a Proxy.
      installReferrerStateListener = Proxy.newProxyInstance(
          InstallReferrerStateListenerClazz.getClassLoader(),
          new Class[]{InstallReferrerStateListenerClazz},
          new InstallReferrerStateListenerProxy());

      // Call startConnection on the client instance.
      Method startConnectionMethod = InstallReferrerClientClazz.getMethod("startConnection", InstallReferrerStateListenerClazz);
      startConnectionMethod.invoke(mReferrerClient, installReferrerStateListener);
    } catch (Exception e) {
      System.err.println("RNInstallReferrerClient exception. getInstallReferrer will be unavailable: " + e.getMessage());
      e.printStackTrace(System.err);
    }
  }

  private class InstallReferrerStateListenerProxy implements InvocationHandler {
    @Override
    public Object invoke(Object o, Method method, Object[] args) throws Throwable {
      String methodName = method.getName();
      try {
          if (methodName.equals("onInstallReferrerSetupFinished") && args != null && args[0] instanceof Integer) {
            onInstallReferrerSetupFinished((Integer) args[0]);
          } else if (methodName.equals("onInstallReferrerServiceDisconnected")) {
            onInstallReferrerServiceDisconnected();
          }
      } catch (Exception e) {
        throw new RuntimeException("unexpected invocation exception: " + e.getMessage());
      }

      return null;
    }

    public void onInstallReferrerSetupFinished(int responseCode) {
      switch (responseCode) {
        case R_RESPONSE_OK:
          // Connection established
          try {
            //if (BuildConfig.DEBUG)
            Log.d("InstallReferrerState", "OK");
            Method getInstallReferrerMethod = InstallReferrerClientClazz.getMethod("getInstallReferrer");
            Object response = getInstallReferrerMethod.invoke(mReferrerClient);
            Method getInstallReferrerMethod2 = ReferrerDetailsClazz.getMethod("getInstallReferrer");
            String referrer = (String) getInstallReferrerMethod2.invoke(response);
            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putString("installReferrer", referrer);
            editor.apply();

            Method endConnectionMethod = InstallReferrerClientClazz.getMethod("endConnection");
            endConnectionMethod.invoke(mReferrerClient);
          } catch (Exception e) {
            System.err.println("RNInstallReferrerClient exception. getInstallReferrer will be unavailable: " + e.getMessage());
            e.printStackTrace(System.err);
          }
          break;
        case R_RESPONSE_FEATURE_NOT_SUPPORTED:
          //if (BuildConfig.DEBUG)
          Log.d("InstallReferrerState", "FEATURE_NOT_SUPPORTED");
          // API not available on the current Play Store app
          break;
        case R_RESPONSE_SERVICE_UNAVAILABLE:
          //if (BuildConfig.DEBUG)
          Log.d("InstallReferrerState", "SERVICE_UNAVAILABLE");
          // Connection could not be established
          break;
      }
    }

    public void onInstallReferrerServiceDisconnected() {
      // Documentation indicates the InstallReferrer connection will be maintained
      // So there is really nothing to do here
      //if (BuildConfig.DEBUG)
      Log.d("RNInstallReferrerClient", "InstallReferrerService disconnected");
    }
  }
}
