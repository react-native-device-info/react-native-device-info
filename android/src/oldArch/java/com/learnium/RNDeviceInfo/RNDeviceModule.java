package com.learnium.RNDeviceInfo;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.KeyguardManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.FeatureInfo;
import android.location.LocationManager;
import android.media.AudioManager;
import android.media.MediaCodecInfo;
import android.media.MediaCodecList;
import android.net.wifi.WifiManager;
import android.net.wifi.WifiInfo;
import android.os.Build;
import android.os.Environment;
import android.os.PowerManager;
import android.os.StatFs;
import android.os.BatteryManager;
import android.provider.Settings;
import android.webkit.WebSettings;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.app.ActivityManager;
import android.hardware.Camera;
import android.hardware.camera2.CameraManager;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.learnium.RNDeviceInfo.resolver.DeviceIdResolver;
import com.learnium.RNDeviceInfo.resolver.DeviceTypeResolver;

import java.lang.reflect.Method;
import java.net.InetAddress;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.lang.Runtime;
import java.net.NetworkInterface;
import java.math.BigInteger;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Nonnull;

import static android.content.Context.ACTIVITY_SERVICE;
import static android.os.BatteryManager.BATTERY_STATUS_CHARGING;
import static android.os.BatteryManager.BATTERY_STATUS_FULL;
import static android.provider.Settings.Secure.getString;

@ReactModule(name = RNDeviceModuleManager.NAME)
public class RNDeviceModule extends ReactContextBaseJavaModule {
    private final RNDeviceModuleManager module;

    public RNDeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.module = new RNDeviceModuleManager(reactContext);
    }

    @Override
    public void initialize() {
        module.initialize();
    }

    @Override
    public void onCatalystInstanceDestroy() {
        module.cleanUp();
    }

    @Override
    @Nonnull
    public String getName() {
        return module.getName();
    }

    public static SharedPreferences getRNDISharedPreferences(Context context) {
        return context.getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
    }

    @Override
    public Map<String, Object> getConstants() {
        return module.getConstants();
    }

    @ReactMethod
    public void addListener(String eventName) {
    }

    @ReactMethod
    public void removeListeners(Integer count) {
    }

    @ReactMethod
    public void isEmulator(Promise p) {
        module.isEmulator(p);
    }

    @SuppressLint("HardwareIds")
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isEmulatorSync() {
        return module.isEmulatorSync();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public float getFontScaleSync() {
        return module.getFontScaleSync();
    }

    @ReactMethod
    public void getFontScale(Promise p) {
        module.getFontScale(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isPinOrFingerprintSetSync() {
        return module.isPinOrFingerprintSetSync();
    }

    @ReactMethod
    public void isPinOrFingerprintSet(Promise p) {
        module.isPinOrFingerprintSet(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    @SuppressWarnings("ConstantConditions")
    public String getIpAddressSync() {
        return module.getIpAddressSync();
    }

    @ReactMethod
    public void getIpAddress(Promise p) {
        module.getIpAddress(p);
    }

    @SuppressWarnings("deprecation")
    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isCameraPresentSync() {
        return module.isCameraPresentSync();
    }

    @ReactMethod
    public void isCameraPresent(Promise p) {
        module.isCameraPresent(p);
    }

    @SuppressLint("HardwareIds")
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getMacAddressSync() {
        return module.getMacAddressSync();
    }

    @ReactMethod
    public void getMacAddress(Promise p) {
        module.getMacAddress(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getCarrierSync() {
        return module.getCarrierSync();
    }

    @ReactMethod
    public void getCarrier(Promise p) {
        module.getCarrier(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getTotalDiskCapacitySync() {
        return module.getTotalDiskCapacitySync();
    }

    @ReactMethod
    public void getTotalDiskCapacity(Promise p) {
        module.getTotalDiskCapacity(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getFreeDiskStorageSync() {
        return module.getFreeDiskStorageSync();
    }

    @ReactMethod
    public void getFreeDiskStorage(Promise p) {
        module.getFreeDiskStorage(p);
    }

    @Deprecated
    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getTotalDiskCapacityOldSync() {
        return module.getTotalDiskCapacityOldSync();
    }

    @ReactMethod
    public void getTotalDiskCapacityOld(Promise p) {
        module.getTotalDiskCapacityOld(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getFreeDiskStorageOldSync() {
        return module.getFreeDiskStorageOldSync();
    }

    @ReactMethod
    public void getFreeDiskStorageOld(Promise p) {
        module.getFreeDiskStorageOld(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isBatteryChargingSync() {
        return module.isBatteryChargingSync();
    }

    @ReactMethod
    public void isBatteryCharging(Promise p) {
        module.isBatteryCharging(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getUsedMemorySync() {
        return module.getUsedMemorySync();
    }

    @ReactMethod
    public void getUsedMemory(Promise p) {
        module.getUsedMemory(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getPowerStateSync() {
        return module.getPowerStateSync();
    }

    @ReactMethod
    public void getPowerState(Promise p) {
        module.getPowerState(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getBatteryLevelSync() {
        return module.getBatteryLevelSync();
    }

    @ReactMethod
    public void getBatteryLevel(Promise p) {
        module.getBatteryLevel(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isAirplaneModeSync() {
        return module.isAirplaneModeSync();
    }

    @ReactMethod
    public void isAirplaneMode(Promise p) {
        module.isAirplaneMode(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean hasGmsSync() {
        return module.hasGmsSync();
    }

    @ReactMethod
    public void hasGms(Promise p) {
        module.hasGms(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean hasHmsSync() {
        return module.hasHmsSync();
    }

    @ReactMethod
    public void hasHms(Promise p) {
        module.hasHms(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean hasSystemFeatureSync(String feature) {
        return module.hasSystemFeatureSync(feature);
    }

    @ReactMethod
    public void hasSystemFeature(String feature, Promise p) {
        module.hasSystemFeature(feature, p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getSystemAvailableFeaturesSync() {
        return module.getSystemAvailableFeaturesSync();
    }

    @ReactMethod
    public void getSystemAvailableFeatures(Promise p) {
        module.getSystemAvailableFeatures(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isLocationEnabledSync() {
        return module.isLocationEnabledSync();
    }

    @ReactMethod
    public void isLocationEnabled(Promise p) {
        module.isLocationEnabled(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isHeadphonesConnectedSync() {
        return module.isHeadphonesConnectedSync();
    }

    @ReactMethod
    public void isHeadphonesConnected(Promise p) {
        module.isHeadphonesConnected(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isWiredHeadphonesConnectedSync() {
        return module.isWiredHeadphonesConnectedSync()
    }

    @ReactMethod
    public void isWiredHeadphonesConnected(Promise p) { module.isWiredHeadphonesConnectedSync(); }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isBluetoothHeadphonesConnectedSync() {
        return module.isBluetoothHeadphonesConnectedSync();
    }

    @ReactMethod
    public void isBluetoothHeadphonesConnected(Promise p) { module.isBluetoothHeadphonesConnectedSync(); }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getAvailableLocationProvidersSync() {
        return module.getAvailableLocationProvidersSync();
    }

    @ReactMethod
    public void getAvailableLocationProviders(Promise p) {
        module.getAvailableLocationProviders(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getInstallReferrerSync() {
        return module.getInstallReferrerSync();
    }

    @ReactMethod
    public void getInstallReferrer(Promise p) {
        module.getInstallReferrer(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getInstallerPackageNameSync() {
        return module.getInstallerPackageNameSync();
    }

    @ReactMethod
    public void getInstallerPackageName(Promise p) {
        module.getInstallerPackageName(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getFirstInstallTimeSync() {
        return module.getFirstInstallTimeSync();
    }

    @ReactMethod
    public void getFirstInstallTime(Promise p) {
        module.getFirstInstallTime(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getLastUpdateTimeSync() {
        return module.getLastUpdateTimeSync();
    }

    @ReactMethod
    public void getLastUpdateTime(Promise p) {
        module.getLastUpdateTime(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getDeviceNameSync() {
        return module.getDeviceNameSync();
    }

    @ReactMethod
    public void getDeviceName(Promise p) {
        module.getDeviceName(p);
    }

    @SuppressLint({"HardwareIds", "MissingPermission"})
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getSerialNumberSync() {
        return module.getSerialNumberSync();
    }

    @ReactMethod
    public void getSerialNumber(Promise p) {
        module.getSerialNumber(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getDeviceSync() {
        return module.getDeviceSync();
    }

    @ReactMethod
    public void getDevice(Promise p) {
        module.getDevice(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getBuildIdSync() {
        return module.getBuildIdSync();
    }

    @ReactMethod
    public void getBuildId(Promise p) {
        module.getBuildId(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public int getApiLevelSync() {
        return module.getApiLevelSync();
    }

    @ReactMethod
    public void getApiLevel(Promise p) {
        module.getApiLevel(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getBootloaderSync() {
        return module.getBootloaderSync();
    }

    @ReactMethod
    public void getBootloader(Promise p) {
        module.getBootloader(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getDisplaySync() {
        return module.getDisplaySync();
    }

    @ReactMethod
    public void getDisplay(Promise p) {
        module.getDisplay(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getFingerprintSync() {
        return module.getFingerprintSync();
    }

    @ReactMethod
    public void getFingerprint(Promise p) {
        module.getFingerprint(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getHardwareSync() {
        return module.getHardwareSync();
    }

    @ReactMethod
    public void getHardware(Promise p) {
        module.getHardware(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getHostSync() {
        return module.getHostSync();
    }

    @ReactMethod
    public void getHost(Promise p) {
        module.getHost(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getProductSync() {
        return module.getProductSync();
    }

    @ReactMethod
    public void getProduct(Promise p) {
        module.getProduct(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getTagsSync() {
        return module.getTagsSync();
    }

    @ReactMethod
    public void getTags(Promise p) {
        module.getTags(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getTypeSync() {
        return module.getTypeSync();
    }

    @ReactMethod
    public void getType(Promise p) {
        module.getType(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getSystemManufacturerSync() {
        return module.getSystemManufacturerSync();
    }

    @ReactMethod
    public void getSystemManufacturer(Promise p) {
        module.getSystemManufacturer(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getCodenameSync() {
        return module.getCodenameSync();
    }

    @ReactMethod
    public void getCodename(Promise p) {
        module.getCodename(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getIncrementalSync() {
        return module.getIncrementalSync();
    }

    @ReactMethod
    public void getIncremental(Promise p) {
        module.getIncremental(p);
    }

    @SuppressLint("HardwareIds")
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getUniqueIdSync() {
        return module.getUniqueIdSync();
    }

    @ReactMethod
    public void getUniqueId(Promise p) {
        module.getUniqueId(p);
    }

    @SuppressLint("HardwareIds")
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getAndroidIdSync() {
        return module.getAndroidIdSync();
    }

    @ReactMethod
    public void getAndroidId(Promise p) {
        module.getAndroidId(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getMaxMemorySync() {
        return module.getMaxMemorySync();
    }

    @ReactMethod
    public void getMaxMemory(Promise p) {
        module.getMaxMemory(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public double getTotalMemorySync() {
        return module.getTotalMemorySync();
    }

    @ReactMethod
    public void getTotalMemory(Promise p) {
        module.getTotalMemory(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    @SuppressWarnings({"ConstantConditions", "deprecation"})
    public String getInstanceIdSync() {
        return module.getInstanceIdSync();
    }

    @ReactMethod
    public void getInstanceId(Promise p) {
        module.getInstanceId(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getBaseOsSync() {
        return module.getBaseOsSync();
    }

    @ReactMethod
    public void getBaseOs(Promise p) {
        module.getBaseOs(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public int getPreviewSdkIntSync() {
        return module.getPreviewSdkIntSync();
    }

    @ReactMethod
    public void getPreviewSdkInt(Promise p) {
        module.getPreviewSdkInt(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getSecurityPatchSync() {
        return module.getSecurityPatchSync();
    }

    @ReactMethod
    public void getSecurityPatch(Promise p) {
        module.getSecurityPatch(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getUserAgentSync() {
        return module.getUserAgentSync();
    }

    @ReactMethod
    public void getUserAgent(Promise p) {
        module.getUserAgent(p);
    }

    @SuppressLint({"HardwareIds", "MissingPermission"})
    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getPhoneNumberSync() {
        return module.getPhoneNumberSync();
    }

    @ReactMethod
    public void getPhoneNumber(Promise p) {
        module.getPhoneNumber(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getSupportedAbisSync() {
        return module.getSupportedAbisSync();
    }

    @ReactMethod
    public void getSupportedAbis(Promise p) {
        module.getSupportedAbis(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getSupported32BitAbisSync() {
        return module.getSupported32BitAbisSync();
    }

    @ReactMethod
    public void getSupported32BitAbis(Promise p) {
        module.getSupported32BitAbis(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getSupported64BitAbisSync() {
        return module.getSupported64BitAbisSync();
    }

    @ReactMethod
    public void getSupported64BitAbis(Promise p) {
        module.getSupported64BitAbis(p);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray getSupportedMediaTypeListSync() {
        return module.getSupportedMediaTypeListSync();
    }

    @ReactMethod
    public void getSupportedMediaTypeList(Promise p) {
        module.getSupportedMediaTypeList(p);
    }
}
