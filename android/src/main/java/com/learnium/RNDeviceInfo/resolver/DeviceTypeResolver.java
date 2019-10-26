package com.learnium.RNDeviceInfo.resolver;

import android.app.UiModeManager;
import android.content.Context;
import android.content.res.Configuration;
import android.os.Build;
import android.util.DisplayMetrics;
import android.view.WindowManager;

import com.learnium.RNDeviceInfo.DeviceType;

/**
 * Utility class used to get the device type, it's not dependant of React Native, allowing it to
 * be shared with native code as well as RN through RNDeviceModule
 * author: Andres Aguilar
 */
public class DeviceTypeResolver {

  private final Context context;

  public DeviceTypeResolver(Context context) {
    this.context = context;
  }

  public boolean isTablet() {
    return getDeviceType() == DeviceType.TABLET;
  }

  public DeviceType getDeviceType() {
    // Detect TVs via ui mode (Android TVs) or system features (Fire TV).
    if (context.getPackageManager().hasSystemFeature("amazon.hardware.fire_tv")) {
      return DeviceType.TV;
    }

    UiModeManager uiManager = (UiModeManager) context.getSystemService(Context.UI_MODE_SERVICE);
    if (uiManager != null && uiManager.getCurrentModeType() == Configuration.UI_MODE_TYPE_TELEVISION) {
      return DeviceType.TV;
    }

    DeviceType deviceTypeFromConfig = getDeviceTypeFromResourceConfiguration();

    if (deviceTypeFromConfig != null && deviceTypeFromConfig != DeviceType.UNKNOWN) {
      return deviceTypeFromConfig;
    }

    return getDeviceTypeFromPhysicalSize();
  }

  // Use `smallestScreenWidthDp` to determine the screen size
  // https://android-developers.googleblog.com/2011/07/new-tools-for-managing-screen-sizes.html
  private DeviceType getDeviceTypeFromResourceConfiguration() {
    int smallestScreenWidthDp = context.getResources().getConfiguration().smallestScreenWidthDp;

    if (smallestScreenWidthDp == Configuration.SMALLEST_SCREEN_WIDTH_DP_UNDEFINED) {
      return DeviceType.UNKNOWN;
    }

    return smallestScreenWidthDp >= 600 ? DeviceType.TABLET : DeviceType.HANDSET;
  }

  private DeviceType getDeviceTypeFromPhysicalSize() {
    // Find the current window manager, if none is found we can't measure the device physical size.
    WindowManager windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);

    if (windowManager == null) {
      return DeviceType.UNKNOWN;
    }

    // Get display metrics to see if we can differentiate handsets and tablets.
    // NOTE: for API level 16 the metrics will exclude window decor.
    DisplayMetrics metrics = new DisplayMetrics();
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
      windowManager.getDefaultDisplay().getRealMetrics(metrics);
    } else {
      windowManager.getDefaultDisplay().getMetrics(metrics);
    }

    // Calculate physical size.
    double widthInches = metrics.widthPixels / (double) metrics.xdpi;
    double heightInches = metrics.heightPixels / (double) metrics.ydpi;
    double diagonalSizeInches = Math.sqrt(Math.pow(widthInches, 2) + Math.pow(heightInches, 2));

    if (diagonalSizeInches >= 3.0 && diagonalSizeInches <= 6.9) {
      // Devices in a sane range for phones are considered to be Handsets.
      return DeviceType.HANDSET;
    } else if (diagonalSizeInches > 6.9 && diagonalSizeInches <= 18.0) {
      // Devices larger than handset and in a sane range for tablets are tablets.
      return DeviceType.TABLET;
    } else {
      // Otherwise, we don't know what device type we're on/
      return DeviceType.UNKNOWN;
    }
  }
}
