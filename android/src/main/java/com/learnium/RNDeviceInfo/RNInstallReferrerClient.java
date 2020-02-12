package com.learnium.RNDeviceInfo;

import android.content.SharedPreferences;
import android.content.Context;
import android.os.RemoteException;
import android.util.Log;

import com.android.installreferrer.api.InstallReferrerClient;
import com.android.installreferrer.api.InstallReferrerStateListener;
import com.android.installreferrer.api.ReferrerDetails;

public class RNInstallReferrerClient {

  private SharedPreferences sharedPreferences;
  private InstallReferrerClient mReferrerClient;

  RNInstallReferrerClient(Context context) {
    sharedPreferences = context.getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
    mReferrerClient = InstallReferrerClient.newBuilder(context).build();
    try {
      mReferrerClient.startConnection(installReferrerStateListener);
    } catch (Exception e) {
      // This is almost always a PermissionException. Log it and move on
      System.err.println("InstallReferrer exception. getInstallReferrer will be unavailable: " + e.getMessage());
    }
  }

  private String getInstallReferrer() {
    try {
      return mReferrerClient
              .getInstallReferrer()
              .getInstallReferrer();
    } catch (RemoteException e) {
      e.printStackTrace();
      return null;
    }
  }

  private InstallReferrerStateListener installReferrerStateListener =
    new InstallReferrerStateListener() {
      @Override public void onInstallReferrerSetupFinished(int responseCode) {
        switch (responseCode) {
          case InstallReferrerClient.InstallReferrerResponse.OK:
            // Connection established
            try {
              if (BuildConfig.DEBUG) Log.d("InstallReferrerState", "OK");
              ReferrerDetails response = mReferrerClient.getInstallReferrer();
              response.getInstallReferrer();
              response.getReferrerClickTimestampSeconds();
              response.getInstallBeginTimestampSeconds();

              SharedPreferences.Editor editor = sharedPreferences.edit();
              editor.putString("installReferrer", getInstallReferrer());
              editor.apply();

              mReferrerClient.endConnection();
            } catch (RemoteException e) {
              e.printStackTrace();
            }
            break;
          case InstallReferrerClient.InstallReferrerResponse.FEATURE_NOT_SUPPORTED:
            if (BuildConfig.DEBUG) Log.d("InstallReferrerState", "FEATURE_NOT_SUPPORTED");
            // API not available on the current Play Store app
            break;
          case InstallReferrerClient.InstallReferrerResponse.SERVICE_UNAVAILABLE:
            if (BuildConfig.DEBUG) Log.d("InstallReferrerState", "SERVICE_UNAVAILABLE");
            // Connection could not be established
            break;
        }
      }

      @Override public void onInstallReferrerServiceDisconnected() {
        // Try to restart the connection on the next request to
        // Google Play by calling the startConnection() method.
        mReferrerClient.startConnection(installReferrerStateListener);
      }
    };
}