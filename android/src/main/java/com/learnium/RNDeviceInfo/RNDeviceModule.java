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
import android.content.pm.ResolveInfo;
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
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
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

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.net.SocketException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
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

  private boolean isTelephony = true;

  private boolean isCheckPackage = true;

  private List<String> mListPackageName = new ArrayList<>();

  private static final String[] EMU_DEVICE_IDS = {
          "000000000000000",
          "e21833235b6eef10",
          "012345678912345"
  };


  private static final String[] EMU_IMSI_IDS = {
          "310260000000000"
  };

  private static final String[] GENY_FILES = {
          "/dev/socket/genyd",
          "/dev/socket/baseband_genyd"
  };

  private static final String[] ANDY_FILES = {
          "fstab.andy",
          "ueventd.andy.rc"
  };

  private static final String[] NOX_FILES = {
          "fstab.nox",
          "init.nox.rc",
          "ueventd.nox.rc"
  };

  private static final String[] QEMU_DRIVERS = {"goldfish"};

  private static final String[] PIPES = {
          "/dev/socket/qemud",
          "/dev/qemu_pipe"
  };

  //phone number is prefix +1555521 plus emulator suffix 5554, 5556... etc.
  private static final String[] EMU_PHONE_NUMBERS = {
          "15555215554", "15555215556", "15555215558", "15555215560", "15555215562", "15555215564",
          "15555215566", "15555215568", "15555215570", "15555215572", "15555215574", "15555215576",
          "15555215578", "15555215580", "15555215582", "15555215584"
  };

  private static final String[] X86_FILES = {
          "ueventd.android_x86.rc",
          "x86.prop",
          "ueventd.ttVM_x86.rc",
          "init.ttVM_x86.rc",
          "fstab.ttVM_x86",
          "fstab.vbox86",
          "init.vbox86.rc",
          "ueventd.vbox86.rc"
  };

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

  private boolean hasTelephony() {
    PackageManager packageManager = reactContext.getPackageManager();
    boolean isSupport = packageManager.hasSystemFeature(PackageManager.FEATURE_TELEPHONY);
    return isSupport;
  }

  /*
    Regions of methods to validate if has those properties specific from emulators
    Those as Emu, NoxPlayer, Bluestacks, etc.. This checking methods required some
    Additional phone permissions as READ_SMS, READ_PHONE_NUMBERS, READ_PHONE_STATE
    Necessary to effectively check those program that emulates Android OS, to prevent
    or blocking then base upon this methods checking
  */
  private boolean hasEmuPhoneNumber() {
    TelephonyManager telephonyManager =
            (TelephonyManager) reactContext.getSystemService(Context.TELEPHONY_SERVICE);

    if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED
            && ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_PHONE_NUMBERS) != PackageManager.PERMISSION_GRANTED
            && ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {

      @SuppressLint({"HardwareIds", "MissingPermission"}) String emuPhoneNumber = telephonyManager.getLine1Number();

      for (String number : EMU_PHONE_NUMBERS) {
        if (number.equalsIgnoreCase(emuPhoneNumber)) {
          return true;
        }

      }
    }

    return false;
  }

  private boolean hasEmuImsi() {
    TelephonyManager telephonyManager =
            (TelephonyManager) reactContext.getSystemService(Context.TELEPHONY_SERVICE);
    if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
      @SuppressLint({"HardwareIds", "MissingPermission"}) String imsi = telephonyManager.getSubscriberId();

      for (String known_imsi : EMU_IMSI_IDS) {
        if (known_imsi.equalsIgnoreCase(imsi)) {
          return true;
        }
      }
    }

    return false;
  }

  private boolean hasEmuOperatorName() {
    String emuOperatorName = ((TelephonyManager)
            reactContext.getSystemService(Context.TELEPHONY_SERVICE)).getNetworkOperatorName();
    if (emuOperatorName.equalsIgnoreCase("android")) {
      return true;
    }
    return false;
  }

  private boolean hasEmuDeviceId() {
    TelephonyManager telephonyManager =
            (TelephonyManager) reactContext.getSystemService(Context.TELEPHONY_SERVICE);

    if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
      @SuppressLint({"HardwareIds", "MissingPermission"}) String deviceId = telephonyManager.getDeviceId();

      for (String known_deviceId : EMU_DEVICE_IDS) {
        if (known_deviceId.equalsIgnoreCase(deviceId)) {
          return true;
        }

      }
    }

    return false;
  }

  private boolean checkTelephony() {
    if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.READ_PHONE_STATE)
            == PackageManager.PERMISSION_GRANTED && this.isTelephony && hasTelephony()) {
      return hasEmuPhoneNumber()
              || hasEmuDeviceId()
              || hasEmuImsi()
              || hasEmuOperatorName();
    }
    return false;
  }

  private boolean checkQEmuDrivers() {
    for (File drivers_file : new File[]{new File("/proc/tty/drivers"), new File("/proc/cpuinfo")}) {
      if (drivers_file.exists() && drivers_file.canRead()) {
        byte[] data = new byte[1024];
        try {
          InputStream is = new FileInputStream(drivers_file);
          is.read(data);
          is.close();
        } catch (Exception exception) {
          exception.printStackTrace();
        }

        String driver_data = new String(data);
        for (String known_qemu_driver : QEMU_DRIVERS) {
          if (driver_data.contains(known_qemu_driver)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  private boolean checkFiles(String[] targets, String type) {
    for (String pipe : targets) {
      File qemu_file = new File(pipe);
      if (qemu_file.exists()) {
        return true;
      }
    }
    return false;
  }

  private String getProp(Context context, String property) {
    try {
      ClassLoader classLoader = context.getClassLoader();
      Class<?> systemProperties = classLoader.loadClass("android.os.SystemProperties");

      Method get = systemProperties.getMethod("get", String.class);

      Object[] params = new Object[1];
      params[0] = property;

      return (String) get.invoke(systemProperties, params);
    } catch (Exception exception) {
      // empty catch
    }
    return null;
  }

  private static boolean checkEth0Interface() {
    try {
      for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements(); ) {
        NetworkInterface intf = en.nextElement();
        if (intf.getName().equals("eth0"))
          return true;
      }
    } catch (SocketException ex) {
    }
    return false;
  }

  private boolean checkAdvanced() {
    boolean isTelephony = checkTelephony();
    boolean isGeny = checkFiles(GENY_FILES,"Geny");
    boolean isAndy = checkFiles(ANDY_FILES,"Andy");
    boolean isNox = checkFiles(NOX_FILES,"Nox");
    boolean isQEmu = checkQEmuDrivers();
    boolean isPipes = checkFiles(PIPES,"Pipes");
    boolean isQEmuX86 = checkFiles(X86_FILES,"X86");

    boolean result = isTelephony
            || isGeny
            || isAndy
            || isNox
            || isQEmu
            || isPipes
            || checkEth0Interface()
            || isQEmuX86;
    return result;
  }

  private boolean CheckBuildInfo(){
    return Build.FINGERPRINT.startsWith("generic")
            || Build.MODEL.contains("google_sdk")
            || Build.MODEL.toLowerCase().contains("droid4x")
            || Build.MODEL.contains("Emulator")
            || Build.MODEL.contains("Android SDK built for x86")
            || Build.MANUFACTURER.contains("Genymotion")
            || Build.HARDWARE.equals("goldfish")
            || Build.HARDWARE.equals("vbox86")
            || Build.PRODUCT.equals("sdk")
            || Build.PRODUCT.equals("google_sdk")
            || Build.PRODUCT.equals("sdk_x86")
            || Build.PRODUCT.equals("vbox86p")
            || Build.BOARD.toLowerCase().contains("nox")
            || Build.BOOTLOADER.toLowerCase().contains("nox")
            || Build.ID.contains("FRF91")
            || Build.HARDWARE.contains("ranchu")
            || Build.HARDWARE.toLowerCase().contains("nox")
            || Build.PRODUCT.toLowerCase().contains("nox")
            || Build.SERIAL.toLowerCase().contains("nox")
            || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
            || Build.USER.contains("android-build")
            || Build.TAGS.contains("test-keys")
            || Build.SERIAL == null
            || "google_sdk".equals(Build.PRODUCT);
  }

  private boolean checkPackageName() {
    mListPackageName.add("com.google.android.launcher.layouts.genymotion");
    mListPackageName.add("com.bluestacks");
    mListPackageName.add("com.bluestacks.appmart");
    mListPackageName.add("com.bignox.app");
    mListPackageName.add("com.vphone.launcher");
    mListPackageName.add("com.bluestacks.gamepophome");
    mListPackageName.add("com.bluestacks.settings");

    if (!isCheckPackage || mListPackageName.isEmpty()) {
      return false;
    }
    final PackageManager packageManager = reactContext.getPackageManager();
    for (final String pkgName : mListPackageName) {
      final Intent tryIntent = packageManager.getLaunchIntentForPackage(pkgName);
      if (tryIntent != null) {
        final List<ResolveInfo> resolveInfos = packageManager.queryIntentActivities(tryIntent, PackageManager.MATCH_DEFAULT_ONLY);
        if (!resolveInfos.isEmpty()) {
          return true;
        }
      }
    }
    return false;
  }

  private Boolean isEmulator() {
    boolean result = false;

    if (!result) {
      result = CheckBuildInfo();
    }

    if (!result) {
      result = checkPackageName();
    }

    if (!result) {
      result = checkAdvanced();
    }


    return result;
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
    } else {
      constants.put("supportedABIs", new String[]{ Build.CPU_ABI });
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
