package com.learnium.RNDeviceInfo;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

@SuppressWarnings("unused")
public class RNDeviceInfo implements ReactPackage {

  private RNDeviceConstants constants;

  public RNDeviceInfo(RNDeviceConstants constants) {
    this.constants = constants;
  }

  @Override
  @Nonnull
  public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    if (constants == null) {
      constants = new RNDeviceConstants(reactContext);
    }

    modules.add(new RNDeviceModule(reactContext, constants));

    return modules;
  }

  // Deprecated RN 0.47
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  @Nonnull
  public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
