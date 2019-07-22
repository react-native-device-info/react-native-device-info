package com.learnium.RNDeviceInfo;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.KeyguardManager;
import android.app.UiModeManager;
import android.bluetooth.BluetoothAdapter;
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
import android.os.AsyncTask;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.os.BatteryManager;
import android.provider.Settings;
import android.view.WindowManager;
import android.webkit.WebSettings;
import android.telephony.TelephonyManager;
import android.text.format.Formatter;
import android.text.TextUtils;
import android.app.ActivityManager;
import android.util.DisplayMetrics;
import android.hardware.Camera;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.CameraAccessException;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.lang.Runtime;
import java.net.NetworkInterface;
import java.math.BigInteger;
import java.util.concurrent.ExecutionException;

import javax.annotation.Nullable;

public class RNDeviceModule extends ReactContextBaseJavaModule {

  ReactApplicationContext reactContext;

  WifiInfo wifiInfo;

  DeviceType deviceType;

  Map<String, Object> constants;
  AsyncTask<Void, Void, Map<String, Object>> futureConstants;

  public RNDeviceModule(ReactApplicationContext reactContext, boolean loadConstantsAsynchronously) {
    super(reactContext);

    this.reactContext = reactContext;
    this.deviceType = getDeviceType(reactContext);
    if (loadConstantsAsynchronously) {
      this.futureConstants = new AsyncTask<Void, Void, Map<String, Object>>() {
        @Override
        protected Map<String, Object> doInBackground(Void... args) {
          return generateConstants();
        }
      }.execute();
    } else {
      this.constants = generateConstants();
    }
  }

  @Override
  public String getName() {
    return "RNDeviceInfo";
  }

  private WifiInfo getWifiInfo() {
    if (this.wifiInfo == null) {
      WifiManager manager = (WifiManager) reactContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
      this.wifiInfo = manager.getConnectionInfo();
    }
    return this.wifiInfo;
  }

  private String getCurrentLanguage() {
    Locale current;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      current = getReactApplicationContext().getResources().getConfiguration().getLocales().get(0);
    } else {
      current = getReactApplicationContext().getResources().getConfiguration().locale;
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      return current.toLanguageTag();
    } else {
      StringBuilder builder = new StringBuilder();
      builder.append(current.getLanguage());
      if (current.getCountry() != null) {
        builder.append("-");
        builder.append(current.getCountry());
      }
      return builder.toString();
    }
  }

  private ArrayList<String> getPreferredLocales() {
    Configuration configuration = getReactApplicationContext().getResources().getConfiguration();
    ArrayList<String> preferred = new ArrayList<>();
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      for (int i = 0; i < configuration.getLocales().size(); i++) {
        preferred.add(configuration.getLocales().get(i).getLanguage());
      }
    } else {
      preferred.add(configuration.locale.getLanguage());
    }

    return preferred;
  }

  private String getCurrentCountry() {
    Locale current;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      current = getReactApplicationContext().getResources().getConfiguration().getLocales().get(0);
    } else {
      current = getReactApplicationContext().getResources().getConfiguration().locale;
    }

    return current.getCountry();
  }

  private Boolean isEmulator() {

    return Build.FINGERPRINT.startsWith("generic")
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
        || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"));
  }

  private Boolean isTablet() {
    return deviceType == DeviceType.TABLET;
  }

  private static DeviceType getDeviceType(ReactApplicationContext reactContext) {
    // Detect TVs via ui mode (Android TVs) or system features (Fire TV).
    if (reactContext.getApplicationContext().getPackageManager().hasSystemFeature("amazon.hardware.fire_tv")) {
      return DeviceType.TV;
    }

    UiModeManager uiManager = (UiModeManager) reactContext.getSystemService(Context.UI_MODE_SERVICE);
    if (uiManager != null && uiManager.getCurrentModeType() == Configuration.UI_MODE_TYPE_TELEVISION) {
      return DeviceType.TV;
    }

    DeviceType deviceTypeFromConfig = getDeviceTypeFromResourceConfiguration(reactContext);

    if (deviceTypeFromConfig != null && deviceTypeFromConfig != DeviceType.UNKNOWN) {
      return deviceTypeFromConfig;
    }

    return  getDeviceTypeFromPhysicalSize(reactContext);
  }

  // Use `smallestScreenWidthDp` to determine the screen size
  // https://android-developers.googleblog.com/2011/07/new-tools-for-managing-screen-sizes.html
  private  static  DeviceType getDeviceTypeFromResourceConfiguration(ReactApplicationContext reactContext) {
    int smallestScreenWidthDp = reactContext.getResources().getConfiguration().smallestScreenWidthDp;

    if (smallestScreenWidthDp == Configuration.SMALLEST_SCREEN_WIDTH_DP_UNDEFINED) {
      return  DeviceType.UNKNOWN;
    }

    return  smallestScreenWidthDp >= 600 ? DeviceType.TABLET : DeviceType.HANDSET;
  }

  private static DeviceType getDeviceTypeFromPhysicalSize(ReactApplicationContext reactContext) {
    // Find the current window manager, if none is found we can't measure the device physical size.
    WindowManager windowManager = (WindowManager) reactContext.getSystemService(Context.WINDOW_SERVICE);

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

  private float fontScale() {
    return getReactApplicationContext().getResources().getConfiguration().fontScale;
  }

  private Boolean is24Hour() {
    return android.text.format.DateFormat.is24HourFormat(this.reactContext.getApplicationContext());
  }

  @ReactMethod
  public void isPinOrFingerprintSet(Callback callback) {
    KeyguardManager keyguardManager = (KeyguardManager) this.reactContext.getApplicationContext().getSystemService(Context.KEYGUARD_SERVICE); //api 16+
    callback.invoke(keyguardManager.isKeyguardSecure());
  }

  @ReactMethod
  public void getIpAddress(Promise p) {
    String ipAddress = Formatter.formatIpAddress(getWifiInfo().getIpAddress());
    p.resolve(ipAddress);
  }
 
  @ReactMethod
  public void getCameraPresence(Promise p) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      CameraManager manager=(CameraManager)getReactApplicationContext().getSystemService(Context.CAMERA_SERVICE);
      try {
        p.resolve(manager.getCameraIdList().length > 0);
      } catch (CameraAccessException e) {
        p.reject(e);
      }
    } else {
      p.resolve(Camera.getNumberOfCameras()> 0);
    }
  }

  @ReactMethod
  public void getMacAddress(Promise p) {
    String macAddress = getWifiInfo().getMacAddress();

    String permission = "android.permission.INTERNET";
    int res = this.reactContext.checkCallingOrSelfPermission(permission);

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
      }
    }

    p.resolve(macAddress);
  }

  @ReactMethod
  public String getCarrier() {
    TelephonyManager telMgr = (TelephonyManager) this.reactContext.getSystemService(Context.TELEPHONY_SERVICE);
    return telMgr.getNetworkOperatorName();
  }

  @ReactMethod
  public BigInteger getTotalDiskCapacity() {
    try {
      StatFs root = new StatFs(Environment.getRootDirectory().getAbsolutePath());
      return BigInteger.valueOf(root.getBlockCount()).multiply(BigInteger.valueOf(root.getBlockSize()));
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @ReactMethod
  public BigInteger getFreeDiskStorage() {
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

      return BigInteger.valueOf(availableBlocks).multiply(BigInteger.valueOf(blockSize));
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @ReactMethod
  public void isBatteryCharging(Promise p){
    IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
    Intent batteryStatus = this.reactContext.getApplicationContext().registerReceiver(null, ifilter);
    int status = batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
    boolean isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING;
    p.resolve(isCharging);
  }

  @ReactMethod
  public void getBatteryLevel(Promise p) {
    Intent batteryIntent = this.reactContext.getApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
    int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
    int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
    float batteryLevel = level / (float) scale;
    p.resolve(batteryLevel);
  }

  @ReactMethod
  public void isAirPlaneMode(Promise p) {
    boolean isAirPlaneMode;
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
        isAirPlaneMode = Settings.System.getInt(this.reactContext.getContentResolver(),Settings.System.AIRPLANE_MODE_ON, 0) != 0;
    } else {
        isAirPlaneMode = Settings.Global.getInt(this.reactContext.getContentResolver(),Settings.Global.AIRPLANE_MODE_ON, 0) != 0;
    }
    p.resolve(isAirPlaneMode);
  }

  @ReactMethod
  public void isAutoDateAndTime(Promise p) {
    boolean isAutoDateAndTime;
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
      isAutoDateAndTime = Settings.System.getInt(this.reactContext.getContentResolver(),Settings.System.AUTO_TIME, 0) != 0;
    } else {
      isAutoDateAndTime = Settings.Global.getInt(this.reactContext.getContentResolver(),Settings.Global.AUTO_TIME, 0) != 0;
    }
    p.resolve(isAutoDateAndTime);
  }

  @ReactMethod
  public void isAutoTimeZone(Promise p) {
    boolean isAutoTimeZone;
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
      isAutoTimeZone = Settings.System.getInt(this.reactContext.getContentResolver(),Settings.System.AUTO_TIME_ZONE, 0) != 0;
    } else {
      isAutoTimeZone = Settings.Global.getInt(this.reactContext.getContentResolver(),Settings.Global.AUTO_TIME_ZONE, 0) != 0;
    }
    p.resolve(isAutoTimeZone);
  }

  @ReactMethod
  public void hasSystemFeature(String feature, Promise p) {

    if (feature == null || feature == "") {
      p.resolve(false);
      return;
    }

    boolean hasFeature = this.reactContext.getApplicationContext().getPackageManager().hasSystemFeature(feature);
    p.resolve(hasFeature);
  }

  @ReactMethod
  public void getSystemAvailableFeatures(Promise p) {
    final FeatureInfo[] featureList = this.reactContext.getApplicationContext().getPackageManager().getSystemAvailableFeatures();
    
    WritableArray promiseArray = Arguments.createArray();
    for (FeatureInfo f : featureList) {
      if (f.name != null) {
        promiseArray.pushString(f.name);
      }
    }

    p.resolve(promiseArray);
  }

  @ReactMethod
  public void isLocationEnabled(Promise p) {
      boolean locationEnabled = false;

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        LocationManager mLocationManager = (LocationManager) reactContext.getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
        locationEnabled = mLocationManager.isLocationEnabled();
      } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        int locationMode = Settings.Secure.getInt(reactContext.getContentResolver(), Settings.Secure.LOCATION_MODE, Settings.Secure.LOCATION_MODE_OFF);
        locationEnabled = locationMode != Settings.Secure.LOCATION_MODE_OFF;
      } else {
        String locationProviders = Settings.Secure.getString(reactContext.getContentResolver(), Settings.Secure.LOCATION_PROVIDERS_ALLOWED);
        locationEnabled = !TextUtils.isEmpty(locationProviders);
      }

      p.resolve(locationEnabled);
  }

  @ReactMethod
  public void getAvailableLocationProviders(Promise p) {
    LocationManager mLocationManager = (LocationManager) reactContext.getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
    final List<String> providers = mLocationManager.getProviders(false);

    WritableMap providersAvailability = Arguments.createMap();
    for (String provider : providers) {
      providersAvailability.putBoolean(provider, mLocationManager.isProviderEnabled(provider));
    }

    p.resolve(providersAvailability);
  }

  public String getInstallReferrer() {
    SharedPreferences sharedPref = getReactApplicationContext().getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
    return sharedPref.getString("installReferrer", null);
  }

  @SuppressLint({"MissingPermission", "HardwareIds"})
  private Map<String, Object> generateConstants() {
    HashMap<String, Object> constants = new HashMap<String, Object>();

    PackageManager packageManager = this.reactContext.getPackageManager();
    String packageName = this.reactContext.getPackageName();

    constants.put("appVersion", "not available");
    constants.put("appName", "not available");
    constants.put("buildVersion", "not available");
    constants.put("buildNumber", 0);

    try {
      PackageInfo packageInfo = packageManager.getPackageInfo(packageName, 0);
      PackageInfo info = packageManager.getPackageInfo(packageName, 0);
      String applicationName = this.reactContext.getApplicationInfo().loadLabel(this.reactContext.getPackageManager()).toString();
      constants.put("appVersion", info.versionName);
      constants.put("buildNumber", info.versionCode);
      constants.put("firstInstallTime", info.firstInstallTime);
      constants.put("lastUpdateTime", info.lastUpdateTime);
      constants.put("appName", applicationName);
    } catch (PackageManager.NameNotFoundException e) {
      e.printStackTrace();
    }

    String deviceName = "Unknown";

    String permission = "android.permission.BLUETOOTH";
    int res = this.reactContext.checkCallingOrSelfPermission(permission);
    if (res == PackageManager.PERMISSION_GRANTED) {
      try {
        BluetoothAdapter myDevice = BluetoothAdapter.getDefaultAdapter();
        if (myDevice != null) {
          deviceName = myDevice.getName();
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }


    try {
      if (Class.forName("com.google.android.gms.iid.InstanceID") != null) {
        constants.put("instanceId", com.google.android.gms.iid.InstanceID.getInstance(this.reactContext).getId());
      }
    } catch (ClassNotFoundException e) {
      constants.put("instanceId", "N/A: Add com.google.android.gms:play-services-gcm to your project.");
    }
    constants.put("serialNumber", Build.SERIAL);
    constants.put("deviceName", deviceName);
    constants.put("systemName", "Android");
    constants.put("systemVersion", Build.VERSION.RELEASE);
    constants.put("model", Build.MODEL);
    constants.put("brand", Build.BRAND);
    constants.put("buildId", Build.ID);
    constants.put("deviceId", Build.BOARD);
    constants.put("apiLevel", Build.VERSION.SDK_INT);
    constants.put("bootloader", Build.BOOTLOADER);
    constants.put("device", Build.DEVICE);
    constants.put("display", Build.DISPLAY);
    constants.put("fingerprint", Build.FINGERPRINT);
    constants.put("hardware", Build.HARDWARE);
    constants.put("host", Build.HOST);
    constants.put("product", Build.PRODUCT);
    constants.put("tags", Build.TAGS);
    constants.put("type", Build.TYPE);
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      constants.put("baseOS", Build.VERSION.BASE_OS);
      constants.put("previewSdkInt", Build.VERSION.PREVIEW_SDK_INT);
      constants.put("securityPatch", Build.VERSION.SECURITY_PATCH);
    }
    constants.put("codename", Build.VERSION.CODENAME);
    constants.put("incremental", Build.VERSION.INCREMENTAL);
    constants.put("deviceLocale", this.getCurrentLanguage());
    constants.put("preferredLocales", this.getPreferredLocales());
    constants.put("deviceCountry", this.getCurrentCountry());
    constants.put("uniqueId", Settings.Secure.getString(this.reactContext.getContentResolver(), Settings.Secure.ANDROID_ID));
    constants.put("systemManufacturer", Build.MANUFACTURER);
    constants.put("bundleId", packageName);
    try {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
        constants.put("userAgent", WebSettings.getDefaultUserAgent(this.reactContext));
      } else {
        constants.put("userAgent", System.getProperty("http.agent"));
      }
    } catch (RuntimeException e) {
      constants.put("userAgent", System.getProperty("http.agent"));
    }
    constants.put("timezone", TimeZone.getDefault().getID());
    constants.put("isEmulator", this.isEmulator());
    constants.put("isTablet", this.isTablet());
    constants.put("fontScale", this.fontScale());
    constants.put("is24Hour", this.is24Hour());
    constants.put("carrier", this.getCarrier());
    constants.put("totalDiskCapacity", this.getTotalDiskCapacity());
    constants.put("freeDiskStorage", this.getFreeDiskStorage());
    constants.put("installReferrer", this.getInstallReferrer());

    if (reactContext != null &&
         (reactContext.checkCallingOrSelfPermission(Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED ||
           (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && reactContext.checkCallingOrSelfPermission(Manifest.permission.READ_SMS) == PackageManager.PERMISSION_GRANTED) ||
           (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && reactContext.checkCallingOrSelfPermission(Manifest.permission.READ_PHONE_NUMBERS) == PackageManager.PERMISSION_GRANTED))) {
      TelephonyManager telMgr = (TelephonyManager) this.reactContext.getApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
      constants.put("phoneNumber", telMgr.getLine1Number());
    } else {
      constants.put("phoneNumber", null);
    }

    Runtime rt = Runtime.getRuntime();
    constants.put("maxMemory", rt.maxMemory());
    ActivityManager actMgr = (ActivityManager) this.reactContext.getSystemService(Context.ACTIVITY_SERVICE);
    ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
    actMgr.getMemoryInfo(memInfo);
    constants.put("totalMemory", memInfo.totalMem);
    constants.put("deviceType", deviceType.getValue());
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
      constants.put("supportedABIs", Build.SUPPORTED_ABIS);
      constants.put("supported32BitAbis", Arrays.asList(Build.SUPPORTED_32_BIT_ABIS));
      constants.put("supported64BitAbis", Arrays.asList(Build.SUPPORTED_64_BIT_ABIS));
    } else {
      constants.put("supportedABIs", new String[]{ Build.CPU_ABI });
      constants.put("supported32BitAbis", Arrays.asList(new String[] {}));
      constants.put("supported64BitAbis", Arrays.asList(new String[] {}));
    }
    return constants;
  }

  @Override
  public @Nullable
  Map<String, Object> getConstants() {
    if (this.constants == null && this.futureConstants != null) {
      try {
        this.constants = this.futureConstants.get();
      } catch (InterruptedException e) {
        return null;
      } catch (ExecutionException e) {
        throw new RuntimeException(e.getCause());
      }
    }

    return this.constants;
  }
}
