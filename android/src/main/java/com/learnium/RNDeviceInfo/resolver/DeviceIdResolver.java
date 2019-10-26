package com.learnium.RNDeviceInfo.resolver;

import android.content.Context;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Instance Id resolver's single purpose is to get the device's Instance Id
 * author: Andres Aguilar
 */
public class DeviceIdResolver {

  private final Context context;

  public DeviceIdResolver(Context context) {
    this.context = context;
  }

  public String getInstanceIdSync() {
    try {
      return getFirebaseInstanceId();
    } catch (ClassNotFoundException ignored) {
    } catch (NoSuchMethodException | SecurityException | IllegalAccessException | InvocationTargetException e) {
      System.err.println("N/A: Unsupported version of com.google.firebase:firebase-iid in your project.");
    }

    try {
      return getGmsInstanceId();
    } catch (ClassNotFoundException ignored) {
    } catch (NoSuchMethodException | SecurityException | IllegalAccessException | InvocationTargetException e) {
      System.err.println("N/A: Unsupported version of com.google.android.gms.iid in your project.");
    }

    System.err.println("Can't generate id. Please add com.google.firebase:firebase-iid to your project.");

    return "unknown";
  }

  String getGmsInstanceId() throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
    Class<?> clazz = Class.forName("com.google.android.gms.iid.InstanceID");
    Method method = clazz.getDeclaredMethod("getInstance", Context.class);
    Object obj = method.invoke(null, context);
    Method method1 = obj.getClass().getMethod("getId");
    return (String) method1.invoke(obj);
  }

  String getFirebaseInstanceId() throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException {
    Class<?> clazz = Class.forName("com.google.firebase.iid.FirebaseInstanceId");
    Method method = clazz.getDeclaredMethod("getInstance");
    Object obj = method.invoke(null);
    Method method1 = obj.getClass().getMethod("getId");
    return (String) method1.invoke(obj);
  }
}
