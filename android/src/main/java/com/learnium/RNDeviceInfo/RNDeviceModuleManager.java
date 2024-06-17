package com.learnium.RNDeviceInfo;

import static android.content.Context.ACTIVITY_SERVICE;
import static android.os.BatteryManager.BATTERY_STATUS_CHARGING;
import static android.os.BatteryManager.BATTERY_STATUS_FULL;
import static android.provider.Settings.Secure.getString;

import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.KeyguardManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.FeatureInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraManager;
import android.location.LocationManager;
import android.media.AudioManager;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Environment;
import android.os.PowerManager;
import android.os.StatFs;
import android.provider.Settings;
import android.view.inputmethod.InputMethodManager;
import android.view.inputmethod.InputMethodInfo;
import android.telephony.TelephonyManager;
import android.webkit.WebSettings;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.learnium.RNDeviceInfo.resolver.DeviceIdResolver;
import com.learnium.RNDeviceInfo.resolver.DeviceTypeResolver;

import java.lang.reflect.Method;
import java.math.BigInteger;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

import javax.annotation.Nonnull;

public class RNDeviceModuleManager {
    public static final String NAME = "RNDeviceInfo";
    private final DeviceTypeResolver deviceTypeResolver;
    private final DeviceIdResolver deviceIdResolver;
    private final RNInstallReferrerClient installReferrerClient;
    private BroadcastReceiver receiver;
    private BroadcastReceiver headphoneConnectionReceiver;
    private BroadcastReceiver headphoneWiredConnectionReceiver;
    private BroadcastReceiver headphoneBluetoothConnectionReceiver;
    private final ReactApplicationContext reactContext;
    private InputMethodManager inputMethodManager;

    private double mLastBatteryLevel = -1;
    private String mLastBatteryState = "";
    private boolean mLastPowerSaveState = false;

    private static final String BATTERY_STATE = "batteryState";
    private static final String BATTERY_LEVEL = "batteryLevel";
    private static final String LOW_POWER_MODE = "lowPowerMode";

    public RNDeviceModuleManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
        this.deviceTypeResolver = new DeviceTypeResolver(reactContext);
        this.deviceIdResolver = new DeviceIdResolver(reactContext);
        this.installReferrerClient = new RNInstallReferrerClient(reactContext.getBaseContext());
        this.inputMethodManager = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);
    }

    public void initialize() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_BATTERY_CHANGED);
        filter.addAction(Intent.ACTION_POWER_CONNECTED);
        filter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        filter.addAction(PowerManager.ACTION_POWER_SAVE_MODE_CHANGED);

        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                WritableMap powerState = getPowerStateFromIntent(intent);

                if (powerState == null) {
                    return;
                }

                String batteryState = powerState.getString(BATTERY_STATE);
                double batteryLevel = powerState.getDouble(BATTERY_LEVEL);
                boolean powerSaveState = powerState.getBoolean(LOW_POWER_MODE);

                if (!mLastBatteryState.equalsIgnoreCase(batteryState) || mLastPowerSaveState != powerSaveState) {
                    sendEvent(reactContext, "RNDeviceInfo_powerStateDidChange", batteryState);
                    mLastBatteryState = batteryState;
                    mLastPowerSaveState = powerSaveState;
                }

                if (mLastBatteryLevel != batteryLevel) {
                    sendEvent(reactContext, "RNDeviceInfo_batteryLevelDidChange", batteryLevel);

                    if (batteryLevel <= .15) {
                        sendEvent(reactContext, "RNDeviceInfo_batteryLevelIsLow", batteryLevel);
                    }

                    mLastBatteryLevel = batteryLevel;
                }
            }
        };

        registerReceiver(reactContext, receiver, filter);
        initializeHeadphoneConnectionReceivers();
    }

    private void initializeHeadphoneConnectionReceivers() {
        // 1. Filter for both wired headset and bluetooth headphones
        IntentFilter filter = new IntentFilter();
        filter.addAction(AudioManager.ACTION_HEADSET_PLUG);
        filter.addAction(AudioManager.ACTION_SCO_AUDIO_STATE_UPDATED);

        headphoneConnectionReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                boolean isConnected = isHeadphonesConnectedSync();
                sendEvent(reactContext, "RNDeviceInfo_headphoneConnectionDidChange", isConnected);
            }
        };

        registerReceiver(reactContext, headphoneConnectionReceiver, filter);

        // 2. Filter for wired headset
        IntentFilter filterWired = new IntentFilter();
        filterWired.addAction(AudioManager.ACTION_HEADSET_PLUG);

        headphoneWiredConnectionReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
            boolean isConnected = isWiredHeadphonesConnectedSync();
            sendEvent(reactContext, "RNDeviceInfo_headphoneWiredConnectionDidChange", isConnected);
            }
        };

        registerReceiver(reactContext, headphoneWiredConnectionReceiver, filter);

        // 3. Filter for bluetooth headphones
        IntentFilter filterBluetooth = new IntentFilter();
        filterBluetooth.addAction(AudioManager.ACTION_SCO_AUDIO_STATE_UPDATED);

        headphoneBluetoothConnectionReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
            boolean isConnected = isBluetoothHeadphonesConnectedSync();
            sendEvent(reactContext, "RNDeviceInfo_headphoneBluetoothConnectionDidChange", isConnected);
            }
        };

        registerReceiver(reactContext, headphoneBluetoothConnectionReceiver, filter);
  }

    public void cleanUp() {
        reactContext.unregisterReceiver(receiver);
        reactContext.unregisterReceiver(headphoneConnectionReceiver);
        reactContext.unregisterReceiver(headphoneWiredConnectionReceiver);
        reactContext.unregisterReceiver(headphoneBluetoothConnectionReceiver);
    }

    @Nonnull
    public String getName() {
        return NAME;
    }

    public static SharedPreferences getRNDISharedPreferences(Context context) {
        return context.getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
    }

    @SuppressLint("MissingPermission")
    private WifiInfo getWifiInfo() {
        WifiManager manager = (WifiManager) reactContext.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        if (manager != null) {
            return manager.getConnectionInfo();
        }
        return null;
    }

    @Nonnull
    private Boolean isLowRamDevice() {
        ActivityManager am = (ActivityManager) reactContext.getSystemService(ACTIVITY_SERVICE);
        boolean isLowRamDevice = false;
        isLowRamDevice = am.isLowRamDevice();
        return isLowRamDevice;
    }

    public Map<String, Object> getConstants() {
        String appVersion, buildNumber, appName;

        try {
            appVersion = getPackageInfo().versionName;
            buildNumber = Integer.toString(getPackageInfo().versionCode);
            appName = reactContext.getApplicationInfo().loadLabel(reactContext.getPackageManager()).toString();
        } catch (Exception e) {
            appVersion = "unknown";
            buildNumber = "unknown";
            appName = "unknown";
        }

        final Map<String, Object> constants = new HashMap<>();

        constants.put("deviceId", Build.BOARD);
        constants.put("bundleId", reactContext.getPackageName());
        constants.put("systemName", "Android");
        constants.put("systemVersion", Build.VERSION.RELEASE);
        constants.put("appVersion", appVersion);
        constants.put("buildNumber", buildNumber);
        constants.put("isTablet", deviceTypeResolver.isTablet());
        constants.put("isLowRamDevice", isLowRamDevice());
        constants.put("appName", appName);
        constants.put("brand", Build.BRAND);
        constants.put("model", Build.MODEL);
        constants.put("deviceType", deviceTypeResolver.getDeviceType().getValue());

        return constants;
    }

    public void isEmulator(Promise p) {
        p.resolve(isEmulatorSync());
    }

    @SuppressLint("HardwareIds")
    public boolean isEmulatorSync() {
        return Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.toLowerCase(Locale.ROOT).contains("droid4x")
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
                || Build.BOARD.toLowerCase(Locale.ROOT).contains("nox")
                || Build.BOOTLOADER.toLowerCase(Locale.ROOT).contains("nox")
                || Build.HARDWARE.toLowerCase(Locale.ROOT).contains("nox")
                || Build.PRODUCT.toLowerCase(Locale.ROOT).contains("nox")
                || Build.SERIAL.toLowerCase(Locale.ROOT).contains("nox")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || this.hasKeyboard("memuime");
    }

    public float getFontScaleSync() {
        return reactContext.getResources().getConfiguration().fontScale;
    }

    public void getFontScale(Promise p) {
        p.resolve(getFontScaleSync());
    }

    public boolean isPinOrFingerprintSetSync() {
        KeyguardManager keyguardManager = (KeyguardManager) reactContext.getSystemService(Context.KEYGUARD_SERVICE);
        if (keyguardManager != null) {
            return keyguardManager.isKeyguardSecure();
        }
        System.err.println("Unable to determine keyguard status. KeyguardManager was null");
        return false;
    }

    public void isPinOrFingerprintSet(Promise p) {
        p.resolve(isPinOrFingerprintSetSync());
    }

    @SuppressWarnings("ConstantConditions")
    public String getIpAddressSync() {
        try {
            return
                    InetAddress.getByAddress(
                                    ByteBuffer
                                            .allocate(4)
                                            .order(ByteOrder.LITTLE_ENDIAN)
                                            .putInt(getWifiInfo().getIpAddress())
                                            .array())
                            .getHostAddress();
        } catch (Exception e) {
            return "unknown";
        }
    }


    public void getIpAddress(Promise p) {
        p.resolve(getIpAddressSync());
    }

    public boolean isCameraPresentSync() {
        CameraManager manager = (CameraManager) reactContext.getSystemService(Context.CAMERA_SERVICE);
        try {
            return manager.getCameraIdList().length > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public void isCameraPresent(Promise p) {
        p.resolve(isCameraPresentSync());
    }

    @SuppressLint("HardwareIds")
    public String getMacAddressSync() {
        WifiInfo wifiInfo = getWifiInfo();
        String macAddress = "";
        if (wifiInfo != null) {
            macAddress = wifiInfo.getMacAddress();
        }

        String permission = "android.permission.INTERNET";
        int res = reactContext.checkCallingOrSelfPermission(permission);

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
                            res1.append(String.format("%02X:", b));
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

        return macAddress;
    }

    public void getMacAddress(Promise p) {
        p.resolve(getMacAddressSync());
    }

    public String getCarrierSync() {
        TelephonyManager telMgr = (TelephonyManager) reactContext.getSystemService(Context.TELEPHONY_SERVICE);
        if (telMgr != null) {
            return telMgr.getNetworkOperatorName();
        } else {
            System.err.println("Unable to get network operator name. TelephonyManager was null");
            return "unknown";
        }
    }

    public void getCarrier(Promise p) {
        p.resolve(getCarrierSync());
    }

    public double getTotalDiskCapacitySync() {
        try {
            StatFs rootDir = new StatFs(Environment.getRootDirectory().getAbsolutePath());
            StatFs dataDir = new StatFs(Environment.getDataDirectory().getAbsolutePath());

            BigInteger rootDirCapacity = getDirTotalCapacity(rootDir);
            BigInteger dataDirCapacity = getDirTotalCapacity(dataDir);

            return rootDirCapacity.add(dataDirCapacity).doubleValue();
        } catch (Exception e) {
            return -1;
        }
    }

    public void getTotalDiskCapacity(Promise p) {
        p.resolve(getTotalDiskCapacitySync());
    }

    private BigInteger getDirTotalCapacity(StatFs dir) {
        long blockCount = dir.getBlockCountLong();
        long blockSize = dir.getBlockSizeLong();
        return BigInteger.valueOf(blockCount).multiply(BigInteger.valueOf(blockSize));
    }

    public double getFreeDiskStorageSync() {
        try {
            StatFs rootDir = new StatFs(Environment.getRootDirectory().getAbsolutePath());
            StatFs dataDir = new StatFs(Environment.getDataDirectory().getAbsolutePath());

            long rootAvailableBlocks = getTotalAvailableBlocks(rootDir);
            long rootBlockSize = getBlockSize(rootDir);
            double rootFree = BigInteger.valueOf(rootAvailableBlocks).multiply(BigInteger.valueOf(rootBlockSize)).doubleValue();

            long dataAvailableBlocks = getTotalAvailableBlocks(dataDir);
            long dataBlockSize = getBlockSize(dataDir);
            double dataFree = BigInteger.valueOf(dataAvailableBlocks).multiply(BigInteger.valueOf(dataBlockSize)).doubleValue();

            return rootFree + dataFree;
        } catch (Exception e) {
            return -1;
        }
    }

    public void getFreeDiskStorage(Promise p) {
        p.resolve(getFreeDiskStorageSync());
    }

    private long getTotalAvailableBlocks(StatFs dir) {
        return dir.getAvailableBlocksLong();
    }

    private long getBlockSize(StatFs dir) {
        return dir.getBlockSizeLong();
    }

    @Deprecated
    public double getTotalDiskCapacityOldSync() {
        try {
            StatFs root = new StatFs(Environment.getRootDirectory().getAbsolutePath());
            return BigInteger.valueOf(root.getBlockCount()).multiply(BigInteger.valueOf(root.getBlockSize())).doubleValue();
        } catch (Exception e) {
            return -1;
        }
    }

    public void getTotalDiskCapacityOld(Promise p) {
        p.resolve(getTotalDiskCapacityOldSync());
    }

    public double getFreeDiskStorageOldSync() {
        try {
            StatFs external = new StatFs(Environment.getExternalStorageDirectory().getAbsolutePath());
            long availableBlocks;
            long blockSize;

            availableBlocks = external.getAvailableBlocksLong();
            blockSize = external.getBlockSizeLong();

            return BigInteger.valueOf(availableBlocks).multiply(BigInteger.valueOf(blockSize)).doubleValue();
        } catch (Exception e) {
            return -1;
        }
    }

    public void getFreeDiskStorageOld(Promise p) {
        p.resolve(getFreeDiskStorageOldSync());
    }

    public boolean isBatteryChargingSync() {
        IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = reactContext.registerReceiver(null, ifilter);
        int status = 0;
        if (batteryStatus != null) {
            status = batteryStatus.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        }
        return status == BATTERY_STATUS_CHARGING;
    }

    public void isBatteryCharging(Promise p) {
        p.resolve(isBatteryChargingSync());
    }

    public double getUsedMemorySync() {
        ActivityManager actMgr = (ActivityManager) reactContext.getSystemService(ACTIVITY_SERVICE);
        if (actMgr != null) {
            int pid = android.os.Process.myPid();
            android.os.Debug.MemoryInfo[] memInfos = actMgr.getProcessMemoryInfo(new int[]{pid});

            if (memInfos.length != 1) {
                System.err.println("Unable to getProcessMemoryInfo. getProcessMemoryInfo did not return any info for the PID");
                return -1;
            }

            android.os.Debug.MemoryInfo memInfo = memInfos[0];

            return memInfo.getTotalPss() * 1024D;
        } else {
            System.err.println("Unable to getProcessMemoryInfo. ActivityManager was null");
            return -1;
        }
    }

    public void getUsedMemory(Promise p) {
        p.resolve(getUsedMemorySync());
    }

    public WritableMap getPowerStateSync() {
        Intent intent = reactContext.registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        return getPowerStateFromIntent(intent);
    }

    public void getPowerState(Promise p) {
        p.resolve(getPowerStateSync());
    }

    public double getBatteryLevelSync() {
        Intent intent = reactContext.registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        WritableMap powerState = getPowerStateFromIntent(intent);

        if (powerState == null) {
            return 0;
        }

        return powerState.getDouble(BATTERY_LEVEL);
    }

    public void getBatteryLevel(Promise p) {
        p.resolve(getBatteryLevelSync());
    }

    public boolean isAirplaneModeSync() {
        boolean isAirplaneMode;
        isAirplaneMode = Settings.Global.getInt(reactContext.getContentResolver(), Settings.Global.AIRPLANE_MODE_ON, 0) != 0;
        return isAirplaneMode;
    }

    public void isAirplaneMode(Promise p) {
        p.resolve(isAirplaneModeSync());
    }

    public boolean hasGmsSync() {
        try {
            Class<?> googleApiAvailability = Class.forName("com.google.android.gms.common.GoogleApiAvailability");
            Method getInstanceMethod = googleApiAvailability.getMethod("getInstance");
            Object gmsObject = getInstanceMethod.invoke(null);
            Method isGooglePlayServicesAvailableMethod = gmsObject.getClass().getMethod("isGooglePlayServicesAvailable", Context.class);
            int isGMS = (int) isGooglePlayServicesAvailableMethod.invoke(gmsObject, reactContext);
            return isGMS == 0; // ConnectionResult.SUCCESS
        } catch (Exception e) {
            return false;
        }
    }

    public void hasGms(Promise p) {
        p.resolve(hasGmsSync());
    }

    public boolean hasHmsSync() {
        try {
            Class<?> huaweiApiAvailability = Class.forName("com.huawei.hms.api.HuaweiApiAvailability");
            Method getInstanceMethod = huaweiApiAvailability.getMethod("getInstance");
            Object hmsObject = getInstanceMethod.invoke(null);
            Method isHuaweiMobileServicesAvailableMethod = hmsObject.getClass().getMethod("isHuaweiMobileServicesAvailable", Context.class);
            int isHMS = (int) isHuaweiMobileServicesAvailableMethod.invoke(hmsObject, reactContext);
            return isHMS == 0; // ConnectionResult.SUCCESS
        } catch (Exception e) {
            return false;
        }
    }

    public void hasHms(Promise p) {
        p.resolve(hasHmsSync());
    }

    public boolean hasSystemFeatureSync(String feature) {
        if (feature == null || feature.isEmpty()) {
            return false;
        }

        return reactContext.getPackageManager().hasSystemFeature(feature);
    }

    public void hasSystemFeature(String feature, Promise p) {
        p.resolve(hasSystemFeatureSync(feature));
    }

    public WritableArray getSystemAvailableFeaturesSync() {
        final FeatureInfo[] featureList = reactContext.getPackageManager().getSystemAvailableFeatures();

        WritableArray promiseArray = Arguments.createArray();
        for (FeatureInfo f : featureList) {
            if (f.name != null) {
                promiseArray.pushString(f.name);
            }
        }

        return promiseArray;
    }

    public void getSystemAvailableFeatures(Promise p) {
        p.resolve(getSystemAvailableFeaturesSync());
    }

    public boolean isLocationEnabledSync() {
        boolean locationEnabled;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            LocationManager mLocationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
            try {
                locationEnabled = mLocationManager.isLocationEnabled();
            } catch (Exception e) {
                System.err.println("Unable to determine if location enabled. LocationManager was null");
                return false;
            }
        } else {
            int locationMode = Settings.Secure.getInt(reactContext.getContentResolver(), Settings.Secure.LOCATION_MODE, Settings.Secure.LOCATION_MODE_OFF);
            locationEnabled = locationMode != Settings.Secure.LOCATION_MODE_OFF;
        }

        return locationEnabled;
    }

    public void isLocationEnabled(Promise p) {
        p.resolve(isLocationEnabledSync());
    }

    public boolean isHeadphonesConnectedSync() {
        AudioManager audioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
        return audioManager.isWiredHeadsetOn() || audioManager.isBluetoothA2dpOn();
    }

    public void isHeadphonesConnected(Promise p) {
        p.resolve(isHeadphonesConnectedSync());
    }

    public boolean isWiredHeadphonesConnectedSync() {
        AudioManager audioManager = (AudioManager)reactContext.getSystemService(Context.AUDIO_SERVICE);
        return audioManager.isWiredHeadsetOn();
    }
    
    public void isWiredHeadphonesConnected(Promise p) {p.resolve(isWiredHeadphonesConnectedSync());}

    public boolean isBluetoothHeadphonesConnectedSync() {
        AudioManager audioManager = (AudioManager)reactContext.getSystemService(Context.AUDIO_SERVICE);
        return audioManager.isBluetoothA2dpOn();
    }
  
    public void isBluetoothHeadphonesConnected(Promise p) {p.resolve(isBluetoothHeadphonesConnectedSync());}

    public WritableMap getAvailableLocationProvidersSync() {
        LocationManager mLocationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
        WritableMap providersAvailability = Arguments.createMap();
        try {
            List<String> providers = mLocationManager.getProviders(false);
            for (String provider : providers) {
                providersAvailability.putBoolean(provider, mLocationManager.isProviderEnabled(provider));
            }
        } catch (Exception e) {
            System.err.println("Unable to get location providers. LocationManager was null");
        }

        return providersAvailability;
    }

    public void getAvailableLocationProviders(Promise p) {
        p.resolve(getAvailableLocationProvidersSync());
    }

    public String getInstallReferrerSync() {
        SharedPreferences sharedPref = getRNDISharedPreferences(reactContext);
        return sharedPref.getString("installReferrer", Build.UNKNOWN);
    }

    public void getInstallReferrer(Promise p) {
        p.resolve(getInstallReferrerSync());
    }

    private PackageInfo getPackageInfo() throws Exception {
        return reactContext.getPackageManager().getPackageInfo(reactContext.getPackageName(), 0);
    }

    public String getInstallerPackageNameSync() {
        String packageName = reactContext.getPackageName();
        String installerPackageName = reactContext.getPackageManager().getInstallerPackageName(packageName);

        return Objects.requireNonNullElse(installerPackageName, "unknown");
    }


    public void getInstallerPackageName(Promise p) {
        p.resolve(getInstallerPackageNameSync());
    }

    public double getFirstInstallTimeSync() {
        try {
            return (double) getPackageInfo().firstInstallTime;
        } catch (Exception e) {
            return -1;
        }
    }

    public void getFirstInstallTime(Promise p) {
        p.resolve(getFirstInstallTimeSync());
    }

    public double getLastUpdateTimeSync() {
        try {
            return (double) getPackageInfo().lastUpdateTime;
        } catch (Exception e) {
            return -1;
        }
    }

    public void getLastUpdateTime(Promise p) {
        p.resolve(getLastUpdateTimeSync());
    }

    public String getDeviceNameSync() {
        try {
            if (Build.VERSION.SDK_INT <= 31) {
                String bluetoothName = Settings.Secure.getString(reactContext.getContentResolver(), "bluetooth_name");
                if (bluetoothName != null) {
                    return bluetoothName;
                }
            }

            if (Build.VERSION.SDK_INT >= 25) {
                String deviceName = Settings.Global.getString(reactContext.getContentResolver(), Settings.Global.DEVICE_NAME);
                if (deviceName != null) {
                    return deviceName;
                }
            }
        } catch (Exception e) {
            // same as default unknown return
        }
        return "unknown";
    }

    public void getDeviceName(Promise p) {
        p.resolve(getDeviceNameSync());
    }

    @SuppressLint({"HardwareIds", "MissingPermission"})
    public String getSerialNumberSync() {
        try {
            if (Build.VERSION.SDK_INT >= 26) {
                // There are a lot of conditions to access to getSerial api
                // For details, see https://developer.android.com/reference/android/os/Build#getSerial()
                // Rather than check each one, just try and rely on the catch below, for discussion on this approach, refer to
                // https://github.com/react-native-device-info/react-native-device-info/issues/1320
                return Build.getSerial();
            } else {
                return Build.SERIAL;
            }
        } catch (Exception e) {
            // This is almost always a PermissionException. We will log it but return unknown
            System.err.println("getSerialNumber failed, it probably should not be used: " + e.getMessage());
        }

        return "unknown";
    }

    public void getSerialNumber(Promise p) {
        p.resolve(getSerialNumberSync());
    }

    public String getDeviceSync() {
        return Build.DEVICE;
    }

    public void getDevice(Promise p) {
        p.resolve(getDeviceSync());
    }

    public String getBuildIdSync() {
        return Build.ID;
    }

    public void getBuildId(Promise p) {
        p.resolve(getBuildIdSync());
    }

    public int getApiLevelSync() {
        return Build.VERSION.SDK_INT;
    }

    public void getApiLevel(Promise p) {
        p.resolve(getApiLevelSync());
    }

    public String getBootloaderSync() {
        return Build.BOOTLOADER;
    }

    public void getBootloader(Promise p) {
        p.resolve(getBootloaderSync());
    }

    public String getDisplaySync() {
        return Build.DISPLAY;
    }

    public void getDisplay(Promise p) {
        p.resolve(getDisplaySync());
    }

    public String getFingerprintSync() {
        return Build.FINGERPRINT;
    }

    public void getFingerprint(Promise p) {
        p.resolve(getFingerprintSync());
    }

    public String getHardwareSync() {
        return Build.HARDWARE;
    }

    public void getHardware(Promise p) {
        p.resolve(getHardwareSync());
    }

    public String getHostSync() {
        return Build.HOST;
    }

    public void getHost(Promise p) {
        p.resolve(getHostSync());
    }

    public String getProductSync() {
        return Build.PRODUCT;
    }

    public void getProduct(Promise p) {
        p.resolve(getProductSync());
    }

    public String getTagsSync() {
        return Build.TAGS;
    }

    public void getTags(Promise p) {
        p.resolve(getTagsSync());
    }

    public String getTypeSync() {
        return Build.TYPE;
    }

    public void getType(Promise p) {
        p.resolve(getTypeSync());
    }

    public String getSystemManufacturerSync() {
        return Build.MANUFACTURER;
    }

    public void getSystemManufacturer(Promise p) {
        p.resolve(getSystemManufacturerSync());
    }

    public String getCodenameSync() {
        return Build.VERSION.CODENAME;
    }

    public void getCodename(Promise p) {
        p.resolve(getCodenameSync());
    }

    public String getIncrementalSync() {
        return Build.VERSION.INCREMENTAL;
    }

    public void getIncremental(Promise p) {
        p.resolve(getIncrementalSync());
    }

    @SuppressLint("HardwareIds")
    public String getUniqueIdSync() {
        return getString(reactContext.getContentResolver(), Settings.Secure.ANDROID_ID);
    }

    public void getUniqueId(Promise p) {
        p.resolve(getUniqueIdSync());
    }

    @SuppressLint("HardwareIds")
    public String getAndroidIdSync() {
        return getUniqueIdSync();
    }

    public void getAndroidId(Promise p) {
        p.resolve(getAndroidIdSync());
    }

    public double getMaxMemorySync() {
        return (double) Runtime.getRuntime().maxMemory();
    }

    public void getMaxMemory(Promise p) {
        p.resolve(getMaxMemorySync());
    }

    public double getTotalMemorySync() {
        ActivityManager actMgr = (ActivityManager) reactContext.getSystemService(ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
        if (actMgr != null) {
            actMgr.getMemoryInfo(memInfo);
        } else {
            System.err.println("Unable to getMemoryInfo. ActivityManager was null");
            return -1;
        }
        return (double) memInfo.totalMem;
    }

    public void getTotalMemory(Promise p) {
        p.resolve(getTotalMemorySync());
    }

    @SuppressWarnings({"ConstantConditions", "deprecation"})
    public String getInstanceIdSync() {
        return deviceIdResolver.getInstanceIdSync();
    }

    public void getInstanceId(Promise p) {
        p.resolve(getInstanceIdSync());
    }

    public String getBaseOsSync() {
        return Build.VERSION.BASE_OS;
    }

    public void getBaseOs(Promise p) {
        p.resolve(getBaseOsSync());
    }

    public int getPreviewSdkIntSync() {
        return Build.VERSION.PREVIEW_SDK_INT;
    }

    public void getPreviewSdkInt(Promise p) {
        p.resolve(getPreviewSdkIntSync());
    }

    public String getSecurityPatchSync() {
        return Build.VERSION.SECURITY_PATCH;
    }

    public void getSecurityPatch(Promise p) {
        p.resolve(getSecurityPatchSync());
    }

    public String getUserAgentSync() {
        try {
            return WebSettings.getDefaultUserAgent(reactContext);
        } catch (RuntimeException e) {
            return System.getProperty("http.agent");
        }
    }

    public void getUserAgent(Promise p) {
        p.resolve(getUserAgentSync());
    }

    public WritableArray getSupportedAbisSync() {
        WritableArray array = new WritableNativeArray();
        for (String abi : Build.SUPPORTED_ABIS) {
            array.pushString(abi);
        }
        return array;
    }

    public void getSupportedAbis(Promise p) {
        p.resolve(getSupportedAbisSync());
    }

    public WritableArray getSupported32BitAbisSync() {
        WritableArray array = new WritableNativeArray();
        for (String abi : Build.SUPPORTED_32_BIT_ABIS) {
            array.pushString(abi);
        }
        return array;
    }

    public void getSupported32BitAbis(Promise p) {
        p.resolve(getSupported32BitAbisSync());
    }

    public WritableArray getSupported64BitAbisSync() {
        WritableArray array = new WritableNativeArray();
        for (String abi : Build.SUPPORTED_64_BIT_ABIS) {
            array.pushString(abi);
        }
        return array;
    }

    public void getSupported64BitAbis(Promise p) {
        p.resolve(getSupported64BitAbisSync());
    }


    private WritableMap getPowerStateFromIntent(Intent intent) {
        if (intent == null) {
            return null;
        }

        int batteryLevel = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int batteryScale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        int isPlugged = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);

        float batteryPercentage = batteryLevel / (float) batteryScale;

        String batteryState = "unknown";

        if (isPlugged == 0) {
            batteryState = "unplugged";
        } else if (status == BATTERY_STATUS_CHARGING) {
            batteryState = "charging";
        } else if (status == BATTERY_STATUS_FULL) {
            batteryState = "full";
        }

        PowerManager powerManager = (PowerManager) reactContext.getSystemService(Context.POWER_SERVICE);
        boolean powerSaveMode = false;
        powerSaveMode = powerManager.isPowerSaveMode();

        WritableMap powerState = Arguments.createMap();
        powerState.putString(BATTERY_STATE, batteryState);
        powerState.putDouble(BATTERY_LEVEL, batteryPercentage);
        powerState.putBoolean(LOW_POWER_MODE, powerSaveMode);

        return powerState;
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable Object data) {
        reactContext.emitDeviceEvent(eventName, data);
    }

    public WritableArray getSupportedMediaTypeListSync() {
        WritableArray writableArray = new WritableNativeArray();
        for (int i = 0; i < MediaCodecList.getCodecCount(); i++) {
            MediaCodecInfo mediaCodecInfo = MediaCodecList.getCodecInfoAt(i);
            String[] supportedTypes = mediaCodecInfo.getSupportedTypes();
            for (String supportedType : supportedTypes) {
                writableArray.pushString(supportedType);
            }
        }
        return writableArray;

    }

    public void getSupportedMediaTypeList(Promise promise) {
        promise.resolve(getSupportedMediaTypeListSync());
    }


    private boolean hasKeyboard(String name) {
        List<InputMethodInfo> inputMethodList = this.inputMethodManager.getEnabledInputMethodList();
        if (inputMethodList != null && !inputMethodList.isEmpty()) {
            for (InputMethodInfo inputMethodInfo : inputMethodList) {
                String serviceName = inputMethodInfo.getServiceName().toLowerCase();
                String id = inputMethodInfo.getId().toLowerCase();
                if (serviceName.contains(name.toLowerCase()) || id.contains(name.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    }


    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    private void registerReceiver(Context context, BroadcastReceiver receiver, IntentFilter filter) {
        if (Build.VERSION.SDK_INT >= 34 && context.getApplicationInfo().targetSdkVersion >= 34) {
            context.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED);
        } else {
            context.registerReceiver(receiver, filter);
        }
    }
}
