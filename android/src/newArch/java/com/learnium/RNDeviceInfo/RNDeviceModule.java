package com.learnium.RNDeviceInfo;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;

import javax.annotation.Nonnull;

public class RNDeviceModule extends NativeRNDeviceInfoAndroidSpec {
    private final RNDeviceModuleManager module;

    public RNDeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.module = new RNDeviceModuleManager(reactContext);
    }

    @Override
    public void initialize() {
        this.module.initialize();
    }

    @Override
    public void invalidate() {
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

    @Nullable
    @Override
    public Map<String, Object> getTypedExportedConstants() {
        return module.getConstants();
    }

    @Override
    public void addListener(String eventName) {
    }

    @Override
    public void removeListeners(double count) {
    }

    @Override
    public void isEmulator(Promise p) {
        module.isEmulator(p);
    }

    @SuppressLint("HardwareIds")
    @Override
    public boolean isEmulatorSync() {
        return module.isEmulatorSync();
    }

    @Override
    public double getFontScaleSync() {
        return module.getFontScaleSync();
    }

    @Override
    public void getFontScale(Promise p) {
        module.getFontScale(p);
    }

    @Override
    public boolean isPinOrFingerprintSetSync() {
        return module.isPinOrFingerprintSetSync();
    }

    @Override
    public void syncUniqueId(Promise p) {
        module.getUniqueId(p);
    }

    @Override
    public void isPinOrFingerprintSet(Promise p) {
        module.isPinOrFingerprintSet(p);
    }

    @Override
    @SuppressWarnings("ConstantConditions")
    public String getIpAddressSync() {
        return module.getIpAddressSync();
    }

    @Override
    public void getIpAddress(Promise p) {
        module.getIpAddress(p);
    }

    @Override
    public boolean isCameraPresentSync() {
        return module.isCameraPresentSync();
    }

    @Override
    public void isCameraPresent(Promise p) {
        module.isCameraPresent(p);
    }

    @SuppressLint("HardwareIds")
    @Override
    public String getMacAddressSync() {
        return module.getMacAddressSync();
    }

    @Override
    public void getMacAddress(Promise p) {
        module.getMacAddress(p);
    }

    @Override
    public String getCarrierSync() {
        return module.getCarrierSync();
    }

    @Override
    public void getCarrier(Promise p) {
        module.getCarrier(p);
    }

    @Override
    public double getTotalDiskCapacitySync() {
        return module.getTotalDiskCapacitySync();
    }

    @Override
    public void getTotalDiskCapacity(Promise p) {
        module.getTotalDiskCapacity(p);
    }

    @Override
    public double getFreeDiskStorageSync() {
        return module.getFreeDiskStorageSync();
    }

    @Override
    public void getFreeDiskStorage(Promise p) {
        module.getFreeDiskStorage(p);
    }

    @Deprecated
    @Override
    public double getTotalDiskCapacityOldSync() {
        return module.getTotalDiskCapacityOldSync();
    }

    @Override
    public void getTotalDiskCapacityOld(Promise p) {
        module.getTotalDiskCapacityOld(p);
    }

    @Override
    public double getFreeDiskStorageOldSync() {
        return module.getFreeDiskStorageOldSync();
    }

    @Override
    public void getFreeDiskStorageOld(Promise p) {
        module.getFreeDiskStorageOld(p);
    }

    @Override
    public boolean isBatteryChargingSync() {
        return module.isBatteryChargingSync();
    }

    @Override
    public void isBatteryCharging(Promise p) {
        module.isBatteryCharging(p);
    }

    @Override
    public double getUsedMemorySync() {
        return module.getUsedMemorySync();
    }

    @Override
    public void getUsedMemory(Promise p) {
        module.getUsedMemory(p);
    }

    @Override
    public WritableMap getPowerStateSync() {
        return module.getPowerStateSync();
    }

    @Override
    public void getPowerState(Promise p) {
        module.getPowerState(p);
    }

    @Override
    public double getBatteryLevelSync() {
        return module.getBatteryLevelSync();
    }

    @Override
    public void getBatteryLevel(Promise p) {
        module.getBatteryLevel(p);
    }

    @Override
    public boolean isAirplaneModeSync() {
        return module.isAirplaneModeSync();
    }

    @Override
    public void isAirplaneMode(Promise p) {
        module.isAirplaneMode(p);
    }

    @Override
    public boolean hasGmsSync() {
        return module.hasGmsSync();
    }

    @Override
    public void hasGms(Promise p) {
        module.hasGms(p);
    }

    @Override
    public boolean hasHmsSync() {
        return module.hasHmsSync();
    }

    @Override
    public void hasHms(Promise p) {
        module.hasHms(p);
    }

    @Override
    public boolean hasSystemFeatureSync(String feature) {
        return module.hasSystemFeatureSync(feature);
    }

    @Override
    public void hasSystemFeature(String feature, Promise p) {
        module.hasSystemFeature(feature, p);
    }

    @Override
    public WritableArray getSystemAvailableFeaturesSync() {
        return module.getSystemAvailableFeaturesSync();
    }

    @Override
    public void getSystemAvailableFeatures(Promise p) {
        module.getSystemAvailableFeatures(p);
    }

    @Override
    public boolean isLocationEnabledSync() {
        return module.isLocationEnabledSync();
    }

    @Override
    public void isLocationEnabled(Promise p) {
        module.isLocationEnabled(p);
    }

    @Override
    public boolean isHeadphonesConnectedSync() {
        return module.isHeadphonesConnectedSync();
    }

    @Override
    public void isHeadphonesConnected(Promise p) {
        module.isHeadphonesConnected(p);
    }

    @Override
    public boolean isWiredHeadphonesConnectedSync() {
        return module.isWiredHeadphonesConnectedSync()
    }

    @Override
    public void isWiredHeadphonesConnected(Promise p) { module.isWiredHeadphonesConnectedSync(); }

    @Override
    public boolean isBluetoothHeadphonesConnectedSync() {
        return module.isBluetoothHeadphonesConnectedSync();
    }

    @Override
    public void isBluetoothHeadphonesConnected(Promise p) { module.isBluetoothHeadphonesConnectedSync(); }

    @Override
    public WritableMap getAvailableLocationProvidersSync() {
        return module.getAvailableLocationProvidersSync();
    }

    @Override
    public void getAvailableLocationProviders(Promise p) {
        module.getAvailableLocationProviders(p);
    }

    @Override
    public String getInstallReferrerSync() {
        return module.getInstallReferrerSync();
    }

    @Override
    public void getInstallReferrer(Promise p) {
        module.getInstallReferrer(p);
    }

    @Override
    public String getInstallerPackageNameSync() {
        return module.getInstallerPackageNameSync();
    }

    @Override
    public void getInstallerPackageName(Promise p) {
        module.getInstallerPackageName(p);
    }

    @Override
    public double getFirstInstallTimeSync() {
        return module.getFirstInstallTimeSync();
    }

    @Override
    public void getFirstInstallTime(Promise p) {
        module.getFirstInstallTime(p);
    }

    @Override
    public double getLastUpdateTimeSync() {
        return module.getLastUpdateTimeSync();
    }

    @Override
    public void getLastUpdateTime(Promise p) {
        module.getLastUpdateTime(p);
    }

    @Override
    public String getDeviceNameSync() {
        return module.getDeviceNameSync();
    }

    @Override
    public void getDeviceName(Promise p) {
        module.getDeviceName(p);
    }

    @Override
    public String getSerialNumberSync() {
        return module.getSerialNumberSync();
    }

    @Override
    public void getSerialNumber(Promise p) {
        module.getSerialNumber(p);
    }

    @Override
    public String getDeviceSync() {
        return module.getDeviceSync();
    }

    @Override
    public void getDeviceToken(Promise promise) {
    }

    @Override
    public void getDevice(Promise p) {
        module.getDevice(p);
    }

    @Override
    public String getBuildIdSync() {
        return module.getBuildIdSync();
    }

    @Override
    public void getBuildId(Promise p) {
        module.getBuildId(p);
    }

    @Override
    public double getApiLevelSync() {
        return module.getApiLevelSync();
    }

    @Override
    public void getApiLevel(Promise p) {
        module.getApiLevel(p);
    }

    @Override
    public String getBootloaderSync() {
        return module.getBootloaderSync();
    }

    @Override
    public void getBootloader(Promise p) {
        module.getBootloader(p);
    }

    @Override
    public String getDisplaySync() {
        return module.getDisplaySync();
    }

    @Override
    public void getDisplay(Promise p) {
        module.getDisplay(p);
    }

    @Override
    public String getFingerprintSync() {
        return module.getFingerprintSync();
    }

    @Override
    public void getFingerprint(Promise p) {
        module.getFingerprint(p);
    }

    @Override
    public String getHardwareSync() {
        return module.getHardwareSync();
    }

    @Override
    public void getHardware(Promise p) {
        module.getHardware(p);
    }

    @Override
    public String getHostSync() {
        return module.getHostSync();
    }

    @Override
    public void getHost(Promise p) {
        module.getHost(p);
    }

    @Override
    public String getProductSync() {
        return module.getProductSync();
    }

    @Override
    public void getProduct(Promise p) {
        module.getProduct(p);
    }

    @Override
    public String getTagsSync() {
        return module.getTagsSync();
    }

    @Override
    public void getTags(Promise p) {
        module.getTags(p);
    }

    @Override
    public String getTypeSync() {
        return module.getTypeSync();
    }

    @Override
    public void getType(Promise p) {
        module.getType(p);
    }

    @Override
    public String getSystemManufacturerSync() {
        return module.getSystemManufacturerSync();
    }

    @Override
    public void getSystemManufacturer(Promise p) {
        module.getSystemManufacturer(p);
    }

    @Override
    public String getCodenameSync() {
        return module.getCodenameSync();
    }

    @Override
    public void getCodename(Promise p) {
        module.getCodename(p);
    }

    @Override
    public String getIncrementalSync() {
        return module.getIncrementalSync();
    }

    @Override
    public void getIncremental(Promise p) {
        module.getIncremental(p);
    }

    @SuppressLint("HardwareIds")
    @Override
    public String getUniqueIdSync() {
        return module.getUniqueIdSync();
    }

    @Override
    public void getUniqueId(Promise p) {
        module.getUniqueId(p);
    }

    @SuppressLint("HardwareIds")
    @Override
    public String getAndroidIdSync() {
        return module.getUniqueIdSync();
    }

    @Override
    public void getAndroidId(Promise p) {
        module.getAndroidId(p);
    }

    @Override
    public double getMaxMemorySync() {
        return module.getMaxMemorySync();
    }

    @Override
    public void getMaxMemory(Promise p) {
        module.getMaxMemory(p);
    }

    @Override
    public double getTotalMemorySync() {
        return module.getTotalMemorySync();
    }

    @Override
    public void getTotalMemory(Promise p) {
        module.getTotalMemory(p);
    }

    @Override
    public String getInstanceIdSync() {
        return module.getInstanceIdSync();
    }

    @Override
    public void getInstanceId(Promise p) {
        module.getInstanceId(p);
    }

    @Override
    public String getBaseOsSync() {
        return module.getBaseOsSync();
    }

    @Override
    public void getBaseOs(Promise p) {
        module.getBaseOs(p);
    }

    @Override
    public double getPreviewSdkIntSync() {
        return module.getPreviewSdkIntSync();
    }

    @Override
    public void getPreviewSdkInt(Promise p) {
        module.getPreviewSdkInt(p);
    }

    @Override
    public String getSecurityPatchSync() {
        return module.getSecurityPatchSync();
    }

    @Override
    public void getSecurityPatch(Promise p) {
        module.getSecurityPatch(p);
    }

    @Override
    public String getUserAgentSync() {
        return module.getUserAgentSync();
    }

    @Override
    public void getUserAgent(Promise p) {
        module.getUserAgent(p);
    }

    @SuppressLint({"HardwareIds", "MissingPermission"})
    @Override
    public String getPhoneNumberSync() {
        return module.getPhoneNumberSync();
    }

    @Override
    public void getPhoneNumber(Promise p) {
        module.getPhoneNumber(p);
    }

    @Override
    public WritableArray getSupportedAbisSync() {
        return module.getSupportedAbisSync();
    }

    @Override
    public void getSupportedAbis(Promise p) {
        module.getSupportedAbis(p);
    }

    @Override
    public WritableArray getSupported32BitAbisSync() {
        return module.getSupported32BitAbisSync();
    }

    @Override
    public void getSupported32BitAbis(Promise p) {
        module.getSupported32BitAbis(p);
    }

    @Override
    public WritableArray getSupported64BitAbisSync() {
        return module.getSupported64BitAbisSync();
    }

    @Override
    public void getSupported64BitAbis(Promise p) {
        module.getSupported64BitAbis(p);
    }

    @Override
    public WritableArray getSupportedMediaTypeListSync() {
        return module.getSupportedMediaTypeListSync();
    }

    @Override
    public void getSupportedMediaTypeList(Promise p) {
        module.getSupportedMediaTypeList(p);
    }
}
