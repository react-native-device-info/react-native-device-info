package com.learnium.RNDeviceInfo;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.KeyguardManager;
import android.app.UiModeManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.FeatureInfo;
import android.content.res.Configuration;
import android.location.LocationManager;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiInfo;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.os.BatteryManager;
import android.provider.Settings;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.app.ActivityManager;
import android.util.DisplayMetrics;
import android.hardware.Camera;
import android.hardware.camera2.CameraManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.module.annotations.ReactModule;

import java.net.InetAddress;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Collections;
import java.util.List;
import java.lang.Runtime;
import java.net.NetworkInterface;
import java.math.BigInteger;

import javax.annotation.Nonnull;

import static android.provider.Settings.Secure.getString;

@SuppressWarnings("WeakerAccess")
@ReactModule(name = RNDeviceModule.NAME)
public class RNDeviceModule extends ReactContextBaseJavaModule {
  public static final String NAME = "RNDeviceInfo";

  public RNDeviceModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @Nonnull
  public String getName() {
    return NAME;
  }

  @SuppressLint("MissingPermission")
  private WifiInfo getWifiInfo() {
    WifiManager manager = (WifiManager) getReactApplicationContext().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
    if (manager != null) {
      return manager.getConnectionInfo();
    }
    return null;
  }

  @SuppressLint("HardwareIds")
  @ReactMethod
  public void isEmulator(Promise p) {

    p.resolve(Build.FINGERPRINT.startsWith("generic")
        || Build.FINGERPRINT.startsWith("unknown")
        || Build.MODEL.contains("google_sdk")
        || Build.MODEL.toLowerCase().contains("droid4x")
        || Build.MODEL.contains("Emulator")
        || Build.MODEL.contains("Android SDK built for x86")
        || Build.MANUFACTURER.contains("Genymotion")
        || Build.HARDWARE.contains("goldfish")
        || Build.HARDWARE.contains("ranchu")
        || Build.HARDWARE.contains("vbox86")
        || Build.PRODUCT.contains("sdk")
        || Build.PRODUCT.contains("google_sdk")
        || Build.PRODUCT.contains("sdk_google")
        || Build.PRODUCT.contains("sdk_x86")
        || Build.PRODUCT.contains("vbox86p")
        || Build.PRODUCT.contains("emulator")
        || Build.PRODUCT.contains("simulator")
        || Build.BOARD.toLowerCase().contains("nox")
        || Build.BOOTLOADER.toLowerCase().contains("nox")
        || Build.HARDWARE.toLowerCase().contains("nox")
        || Build.PRODUCT.toLowerCase().contains("nox")
        || Build.SERIAL.toLowerCase().contains("nox")
        || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic")));
  }

  @ReactMethod
  public void isTablet(Promise p) {
    p.resolve(getDeviceType() == DeviceType.TABLET);
  }

  private DeviceType getDeviceType() {
    // Detect TVs via ui mode (Android TVs) or system features (Fire TV).
    if (getReactApplicationContext().getPackageManager().hasSystemFeature("amazon.hardware.fire_tv")) {
      return DeviceType.TV;
    }

    UiModeManager uiManager = (UiModeManager) getReactApplicationContext().getSystemService(Context.UI_MODE_SERVICE);
    if (uiManager != null && uiManager.getCurrentModeType() == Configuration.UI_MODE_TYPE_TELEVISION) {
      return DeviceType.TV;
    }

    DeviceType deviceTypeFromConfig = getDeviceTypeFromResourceConfiguration();

    if (deviceTypeFromConfig != null && deviceTypeFromConfig != DeviceType.UNKNOWN) {
      return deviceTypeFromConfig;
    }

    return  getDeviceTypeFromPhysicalSize();
  }

  // Use `smallestScreenWidthDp` to determine the screen size
  // https://android-developers.googleblog.com/2011/07/new-tools-for-managing-screen-sizes.html
  private DeviceType getDeviceTypeFromResourceConfiguration() {
    int smallestScreenWidthDp = getReactApplicationContext().getResources().getConfiguration().smallestScreenWidthDp;

    if (smallestScreenWidthDp == Configuration.SMALLEST_SCREEN_WIDTH_DP_UNDEFINED) {
      return DeviceType.UNKNOWN;
    }

    return smallestScreenWidthDp >= 600 ? DeviceType.TABLET : DeviceType.HANDSET;
  }

  private DeviceType getDeviceTypeFromPhysicalSize() {
    // Find the current window manager, if none is found we can't measure the device physical size.
    WindowManager windowManager = (WindowManager) getReactApplicationContext().getSystemService(Context.WINDOW_SERVICE);

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

  @ReactMethod
  public void getFontScale(Promise p) {
    p.resolve(getReactApplicationContext().getResources().getConfiguration().fontScale);
  }

  @ReactMethod
  public void isPinOrFingerprintSet(Promise p) {
    KeyguardManager keyguardManager = (KeyguardManager) getReactApplicationContext().getSystemService(Context.KEYGUARD_SERVICE);
    if (keyguardManager != null) {
      p.resolve(keyguardManager.isKeyguardSecure());
    }
    p.reject("EUNSPECIFIED", "Unable to determine keyguard status. KeyguardManager was null");
  }

  @ReactMethod
  @SuppressWarnings("ConstantConditions")
  public void getIpAddress(Promise p) {
    try {
      p.resolve(
              InetAddress.getByAddress(
                ByteBuffer
                        .allocate(4)
                        .order(ByteOrder.LITTLE_ENDIAN)
                        .putInt(getWifiInfo().getIpAddress())
                        .array())
                      .getHostAddress());
    } catch (Exception e) {
      p.reject(e);
    }
  }
 
  @ReactMethod
  @SuppressWarnings("ConstantConditions")
  public void getCameraPresence(Promise p) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      CameraManager manager=(CameraManager)getReactApplicationContext().getSystemService(Context.CAMERA_SERVICE);
      try {
        p.resolve(manager.getCameraIdList().length > 0);
      } catch (Exception e) {
        p.reject(e);
      }
    } else {
      p.resolve(Camera.getNumberOfCameras()> 0);
    }
  }

  @SuppressLint("HardwareIds")
  @ReactMethod
  public void getMacAddress(Promise p) {
    WifiInfo wifiInfo = getWifiInfo();
    String macAddress = "";
    if (wifiInfo != null) {
      macAddress = wifiInfo.getMacAddress();
    }

    String permission = "android.permission.INTERNET";
    int res = getReactApplicationContext().checkCallingOrSelfPermission(permission);

    if (res == PackageManager.PERMISSION_GRANTED) {
      try {
        List<NetworkInterface> all = Collections.list(NetworkInterface.getNetworkInterfaces());
        for (NetworkInterface nif : all) {
          if (!nif.getName().equalsIgnoreCase("wlan0")) continue;

          byte[] macBytes = nif.getHardwareAddress();
          if (macBytes == null) {
              macAddress = "";
          } else {

            StringBuilder res1 = new StringBuilder();
            for (byte b : macBytes) {
                res1.append(String.format("%02X:",b));
            }

            if (res1.length() > 0) {
                res1.deleteCharAt(res1.length() - 1);
            }

            macAddress = res1.toString();
          }
        }
      } catch (Exception ex) {
        // do nothing
      }
    }

    p.resolve(macAddress);
  }

  @ReactMethod
  public void getCarrier(Promise p) {
    TelephonyManager telMgr = (TelephonyManager) getReactApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
    if (telMgr != null) {
      p.resolve(telMgr.getNetworkOperatorName());
    } else {
      p.reject("EUNSPECIFIED", "Unable to get network operator name. TelephonyManager was null");
    }
  }

  @ReactMethod
  public void getTotalDiskCapacity(Promise p) {
    try {
      StatFs root = new StatFs(Environment.getRootDirectory().getAbsolutePath());
      p.resolve(BigInteger.valueOf(root.getBlockCount()).multiply(BigInteger.valueOf(root.getBlockSize())).doubleValue());
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @ReactMethod
  public void getFreeDiskStorage(Promise p) {
    try {
      StatFs external = new StatFs(Environment.getExternalStorageDirectory().getAbsolutePath());
      long availableBlocks;
      long blockSize;

      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR2) {
        availableBlocks = external.getAvailableBlocks();
        blockSize = external.getBlockSize();
      } else {
        availableBlocks = external.getAvailableBlocksLong();
        blockSize = external.getBlockSizeLong();
      }

      p.resolve(BigInteger.valueOf(availableBlocks).multiply(BigInteger.valueOf(blockSize)).doubleValue());
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @ReactMethod
  public void isBatteryCharging(Promise p){
    IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
    Intent batteryStatus = getReactApplicationContext().registerReceiver(null, ifilter);
    int status = 0;
    if (batteryStatus != null) {
      status = batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
    }
    boolean isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING;
    p.resolve(isCharging);
  }

  @ReactMethod
  public void getUsedMemory(Promise p) {
    Runtime rt = Runtime.getRuntime();
    long usedMemory = rt.totalMemory() - rt.freeMemory();
    p.resolve((int)usedMemory);
  }

  @ReactMethod
  public void getBatteryLevel(Promise p) {
    Intent batteryIntent = getReactApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
    int level = 0;
    if (batteryIntent != null) {
      level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
    }
    int scale = 0;
    if (batteryIntent != null) {
      scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
    }
    float batteryLevel = level / (float) scale;
    p.resolve(batteryLevel);
  }

  @ReactMethod
  public void isAirPlaneMode(Promise p) {
    boolean isAirPlaneMode;
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
        isAirPlaneMode = Settings.System.getInt(getReactApplicationContext().getContentResolver(),Settings.System.AIRPLANE_MODE_ON, 0) != 0;
    } else {
        isAirPlaneMode = Settings.Global.getInt(getReactApplicationContext().getContentResolver(),Settings.Global.AIRPLANE_MODE_ON, 0) != 0;
    }
    p.resolve(isAirPlaneMode);
  }

  @ReactMethod
  public void hasSystemFeature(String feature, Promise p) {

    if (feature == null || feature.equals("")) {
      p.resolve(false);
      return;
    }

    boolean hasFeature = getReactApplicationContext().getPackageManager().hasSystemFeature(feature);
    p.resolve(hasFeature);
  }

  @ReactMethod
  public void getSystemAvailableFeatures(Promise p) {
    final FeatureInfo[] featureList = getReactApplicationContext().getPackageManager().getSystemAvailableFeatures();
    
    WritableArray promiseArray = Arguments.createArray();
    for (FeatureInfo f : featureList) {
      if (f.name != null) {
        promiseArray.pushString(f.name);
      }
    }

    p.resolve(promiseArray);
  }

  @SuppressWarnings("ConstantConditions")
  @ReactMethod
  public void isLocationEnabled(Promise p) {
      boolean locationEnabled = false;

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        LocationManager mLocationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        try {
          locationEnabled = mLocationManager.isLocationEnabled();
        } catch (Exception e) {
          p.reject("EUNSPECIFIED", "Unable to determine if location enabled. LocationManager was null");
        }
      } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        int locationMode = Settings.Secure.getInt(getReactApplicationContext().getContentResolver(), Settings.Secure.LOCATION_MODE, Settings.Secure.LOCATION_MODE_OFF);
        locationEnabled = locationMode != Settings.Secure.LOCATION_MODE_OFF;
      } else {
        String locationProviders = getString(getReactApplicationContext().getContentResolver(), Settings.Secure.LOCATION_PROVIDERS_ALLOWED);
        locationEnabled = !TextUtils.isEmpty(locationProviders);
      }

      p.resolve(locationEnabled);
  }

  @ReactMethod
  @SuppressWarnings("ConstantConditions")
  public void getAvailableLocationProviders(Promise p) {
    LocationManager mLocationManager = (LocationManager) getReactApplicationContext().getSystemService(Context.LOCATION_SERVICE);
    List<String> providers = Collections.emptyList();
    try {
      providers = mLocationManager.getProviders(false);
    } catch (Exception e) {
      p.reject("EUNSPECIFIED", "Unable to get location providers. LocationManager was null");
    }

    WritableMap providersAvailability = Arguments.createMap();
    for (String provider : providers) {
      providersAvailability.putBoolean(provider, mLocationManager.isProviderEnabled(provider));
    }

    p.resolve(providersAvailability);
  }

  @ReactMethod
  public void getInstallReferrer(Promise p) {
    SharedPreferences sharedPref = getReactApplicationContext().getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
    p.resolve(sharedPref.getString("installReferrer", null));
  }

  private PackageInfo getPackageInfo() throws Exception {
    return getReactApplicationContext().getPackageManager().getPackageInfo(getReactApplicationContext().getPackageName(), 0);
  }

  @ReactMethod
  public void getAppVersion(Promise p) {
    try {
      p.resolve(getPackageInfo().versionName);
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @ReactMethod
  public void getBuildNumber(Promise p) {
    try {
      p.resolve(Integer.toString(getPackageInfo().versionCode));
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @ReactMethod
  public void getBuildVersion(Promise p) {
    p.resolve("not available");
  }

  @ReactMethod
  public void getFirstInstallTime(Promise p) {
    try {
      p.resolve((double)getPackageInfo().firstInstallTime);
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @ReactMethod
  public void getLastUpdateTime(Promise p) {
    try {
      p.resolve((double)getPackageInfo().lastUpdateTime);
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @ReactMethod
  public void getAppName(Promise p) {
    try {
      p.resolve(getReactApplicationContext().getApplicationInfo().loadLabel(getReactApplicationContext().getPackageManager()).toString());
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @ReactMethod
  public void getDeviceName(Promise p) {
    try {
      if (Build.VERSION.SDK_INT >= 25) {
        p.resolve(Settings.Global.getString(getReactApplicationContext().getContentResolver(), Settings.Global.DEVICE_NAME));
      } else {
        p.resolve(Settings.Secure.getString(getReactApplicationContext().getContentResolver(), "bluetooth_name"));
      }
    } catch (Exception e) {
      p.reject(e);
    }
  }

  @SuppressLint("HardwareIds")
  @ReactMethod
  public void getSerialNumber(Promise p) { p.resolve(Build.SERIAL); }

  @ReactMethod
  public void getSystemName(Promise p) { p.resolve("Android"); }

  @ReactMethod
  public void getSystemVersion(Promise p) { p.resolve(Build.VERSION.RELEASE); }

  @ReactMethod
  public void getModel(Promise p) { p.resolve(Build.MODEL); }

  @ReactMethod
  public void getBrand(Promise p) { p.resolve(Build.BRAND); }

  @ReactMethod
  public void getDevice(Promise p) { p.resolve(Build.DEVICE); }

  @ReactMethod
  public void getBuildId(Promise p) { p.resolve(Build.ID); }

  @ReactMethod
  public void getDeviceId(Promise p) { p.resolve(Build.BOARD); }

  @ReactMethod
  public void getApiLevel(Promise p) { p.resolve(Build.VERSION.SDK_INT); }

  @ReactMethod
  public void getBootloader(Promise p) { p.resolve(Build.BOOTLOADER); }

  @ReactMethod
  public void getDisplay(Promise p) { p.resolve(Build.DISPLAY); }

  @ReactMethod
  public void getFingerprint(Promise p) { p.resolve(Build.FINGERPRINT); }

  @ReactMethod
  public void getHardware(Promise p) { p.resolve(Build.HARDWARE); }

  @ReactMethod
  public void getHost(Promise p) { p.resolve(Build.HOST); }

  @ReactMethod
  public void getProduct(Promise p) { p.resolve(Build.PRODUCT); }

  @ReactMethod
  public void getTags(Promise p) { p.resolve(Build.TAGS); }

  @ReactMethod
  public void getType(Promise p) { p.resolve(Build.TYPE); }

  @ReactMethod
  public void getSystemManufacturer(Promise p) { p.resolve(Build.MANUFACTURER); }

  @ReactMethod
  public void getBundleId(Promise p) { p.resolve(getReactApplicationContext().getPackageName()); }

  @ReactMethod
  public void getCodename(Promise p) { p.resolve(Build.VERSION.CODENAME); }

  @ReactMethod
  public void getIncremental(Promise p) { p.resolve(Build.VERSION.INCREMENTAL); }

  @SuppressLint("HardwareIds")
  @ReactMethod
  public void getUniqueId(Promise p) { p.resolve(getString(getReactApplicationContext().getContentResolver(), Settings.Secure.ANDROID_ID)); }

  @ReactMethod
  public void getMaxMemory(Promise p) { p.resolve((double)Runtime.getRuntime().maxMemory()); }

  @ReactMethod
  public void getDeviceType(Promise p) { p.resolve(getDeviceType().getValue()); }

  @ReactMethod
  public void getTotalMemory(Promise p) {
    ActivityManager actMgr = (ActivityManager) getReactApplicationContext().getSystemService(Context.ACTIVITY_SERVICE);
    ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
    if (actMgr != null) {
      actMgr.getMemoryInfo(memInfo);
    } else {
      p.reject("EUNSPECIFIED", "Unable to getMemoryInfo. ActivityManager was null");
    }
    p.resolve((double)memInfo.totalMem);
  }

  @ReactMethod
  @SuppressWarnings({"ConstantConditions", "deprecation"})
  public void getInstanceId(Promise p) {
    try {
      if (Class.forName("com.google.android.gms.iid.InstanceID") != null) {
        p.resolve(com.google.android.gms.iid.InstanceID.getInstance(getReactApplicationContext()).getId());
      }
    } catch (ClassNotFoundException e) {
      p.resolve("N/A: Add com.google.android.gms:play-services-gcm to your project.");
    }
  }

  @ReactMethod
  public void getBaseOS(Promise p) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      p.resolve(Build.VERSION.BASE_OS);
    } else {
      p.resolve("not available");
    }
  }

  @ReactMethod
  public void getPreviewSdkInt(Promise p) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      p.resolve(Build.VERSION.PREVIEW_SDK_INT);
    } else {
      p.resolve("not available");
    }
  }

  @ReactMethod
  public void getSecurityPatch(Promise p) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      p.resolve(Build.VERSION.SECURITY_PATCH);
    } else {
      p.resolve("not available");
    }
  }

  @ReactMethod
  public void getUserAgent(Promise p) {
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
        p.resolve(WebSettings.getDefaultUserAgent(getReactApplicationContext()));
      } else {
        p.resolve(System.getProperty("http.agent"));
      }
    } catch (RuntimeException e) {
      p.resolve(System.getProperty("http.agent"));
    }
  }

  @SuppressLint({"HardwareIds", "MissingPermission"})
  @ReactMethod
  public void getPhoneNumber(Promise p) {
    if (getReactApplicationContext() != null &&
            (getReactApplicationContext().checkCallingOrSelfPermission(Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED ||
                    (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && getReactApplicationContext().checkCallingOrSelfPermission(Manifest.permission.READ_SMS) == PackageManager.PERMISSION_GRANTED) ||
                    (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && getReactApplicationContext().checkCallingOrSelfPermission(Manifest.permission.READ_PHONE_NUMBERS) == PackageManager.PERMISSION_GRANTED))) {
      TelephonyManager telMgr = (TelephonyManager) getReactApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
      if (telMgr != null) {
        p.resolve(telMgr.getLine1Number());
      } else {
        p.reject("EUNSPECIFIED", "Unable to getPhoneNumber. TelephonyManager was null");
      }
    } else {
      p.resolve(null);
    }
  }

  @ReactMethod
  public void getSupportedAbis(Promise p) {
    WritableArray array = new WritableNativeArray();
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      for (String abi : Build.SUPPORTED_ABIS) {
        array.pushString(abi);
      }
    } else {
      array.pushString(Build.CPU_ABI);
    }
    p.resolve(array);
  }

  @ReactMethod
  public void getSupported32BitAbis(Promise p) {
    WritableArray array = new WritableNativeArray();
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      for (String abi : Build.SUPPORTED_32_BIT_ABIS) {
        array.pushString(abi);
      }
    }
    p.resolve(array);
  }

  @ReactMethod
  public void getSupported64BitAbis(Promise p) {
    WritableArray array = new WritableNativeArray();
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      for (String abi : Build.SUPPORTED_64_BIT_ABIS) {
        array.pushString(abi);
      }
    }
    p.resolve(array);
  }
}
