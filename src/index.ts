import { useCallback, useEffect, useState } from 'react';
import { Dimensions, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { useOnEvent, useOnMount } from './internal/asyncHookWrappers';
import devicesWithNotch from './internal/devicesWithNotch';
import RNDeviceInfo from './internal/nativeInterface';
import { getSupportedPlatformInfoFunctions } from './internal/supported-platform-info';
import { DeviceInfoModule } from './internal/privateTypes';
import { AsyncHookResult, DeviceType, LocationProviderInfo, PowerState } from './internal/types';

let uniqueId: string;
export function getUniqueId() {
  if (!uniqueId) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      uniqueId = RNDeviceInfo.uniqueId;
    } else {
      uniqueId = 'unknown';
    }
  }
  return uniqueId;
}

export async function syncUniqueId() {
  if (Platform.OS === 'ios') {
    uniqueId = await RNDeviceInfo.syncUniqueId();
  } else {
    uniqueId = getUniqueId();
  }
  return uniqueId;
}

export const [getInstanceId, getInstanceIdSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'instanceId',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getInstanceId(),
  syncGetter: () => RNDeviceInfo.getInstanceIdSync(),
  defaultValue: 'unknown',
});

let serialNumber: string;
export async function getSerialNumber() {
  if (!serialNumber) {
    if (Platform.OS === 'android') {
      serialNumber = await RNDeviceInfo.getSerialNumber();
    } else {
      serialNumber = 'unknown';
    }
  }
  return serialNumber;
}

export function getSerialNumberSync() {
  if (!serialNumber) {
    if (Platform.OS === 'android') {
      serialNumber = RNDeviceInfo.getSerialNumberSync();
    } else {
      serialNumber = 'unknown';
    }
  }
  return serialNumber;
}

export const [getAndroidId, getAndroidIdSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'androidId',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getAndroidId(),
  syncGetter: () => RNDeviceInfo.getAndroidIdSync(),
  defaultValue: 'unknown',
});

export async function getIpAddress() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
    return RNDeviceInfo.getIpAddress();
  }
  return 'unknown';
}

export function getIpAddressSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
    return RNDeviceInfo.getIpAddressSync();
  }
  return 'unknown';
}

export const [isCameraPresent, isCameraPresentSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.isCameraPresent(),
  syncGetter: () => RNDeviceInfo.isCameraPresentSync(),
  defaultValue: false,
});

export async function getMacAddress() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getMacAddress();
  } else if (Platform.OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

export function getMacAddressSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getMacAddressSync();
  } else if (Platform.OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

let deviceId: string;
export function getDeviceId() {
  if (!deviceId) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      deviceId = RNDeviceInfo.deviceId;
    } else {
      deviceId = 'unknown';
    }
  }
  return deviceId;
}

export const [getManufacturer, getManufacturerSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'manufacturer',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () =>
    Platform.OS == 'ios' ? Promise.resolve('Apple') : RNDeviceInfo.getSystemManufacturer(),
  syncGetter: () => (Platform.OS == 'ios' ? 'Apple' : RNDeviceInfo.getSystemManufacturerSync()),
  defaultValue: 'unknown',
});

let model: string;
export function getModel() {
  if (!model) {
    if (Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'windows') {
      model = RNDeviceInfo.model;
    } else {
      model = 'unknown';
    }
  }
  return model;
}

let brand: string;
export function getBrand() {
  if (!brand) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      brand = RNDeviceInfo.brand;
    } else {
      brand = 'unknown';
    }
  }
  return brand;
}

let systemName: string;
export function getSystemName() {
  if (!systemName) {
    if (Platform.OS === 'ios') {
      systemName = RNDeviceInfo.systemName;
    } else if (Platform.OS === 'android') {
      systemName = 'Android';
    } else if (Platform.OS === 'windows') {
      systemName = 'Windows';
    } else {
      systemName = 'unknown';
    }
  }
  return systemName;
}

let systemVersion: string;
export function getSystemVersion() {
  if (!systemVersion) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      systemVersion = RNDeviceInfo.systemVersion;
    } else {
      systemVersion = 'unknown';
    }
  }
  return systemVersion;
}

export const [getBuildId, getBuildIdSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'buildId',
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getBuildId(),
  syncGetter: () => RNDeviceInfo.getBuildIdSync(),
  defaultValue: 'unknown',
});

export const [getApiLevel, getApiLevelSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'apiLevel',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getApiLevel(),
  syncGetter: () => RNDeviceInfo.getApiLevelSync(),
  defaultValue: -1,
});

let bundleId: string;
export function getBundleId() {
  if (!bundleId) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      bundleId = RNDeviceInfo.bundleId;
    } else {
      bundleId = 'unknown';
    }
  }
  return bundleId;
}

export const [
  getInstallerPackageName,
  getInstallerPackageNameSync,
] = getSupportedPlatformInfoFunctions({
  memoKey: 'installerPackageName',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getInstallerPackageName(),
  syncGetter: () => RNDeviceInfo.getInstallerPackageNameSync(),
  defaultValue: 'unknown',
});

let appName: string;
export function getApplicationName() {
  if (!appName) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      appName = RNDeviceInfo.appName;
    } else {
      appName = 'unknown';
    }
  }
  return appName;
}

let buildNumber: string;
export function getBuildNumber() {
  if (!buildNumber) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      buildNumber = RNDeviceInfo.buildNumber;
    } else {
      buildNumber = 'unknown';
    }
  }
  return buildNumber;
}

let version: string;
export function getVersion() {
  if (!version) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      version = RNDeviceInfo.appVersion;
    } else {
      version = 'unknown';
    }
  }
  return version;
}

export function getReadableVersion() {
  return getVersion() + '.' + getBuildNumber();
}

export const [getDeviceName, getDeviceNameSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'deviceName',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getDeviceName(),
  syncGetter: () => RNDeviceInfo.getDeviceNameSync(),
  defaultValue: 'unknown',
});

export const [getUsedMemory, getUsedMemorySync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'web'],
  getter: () => RNDeviceInfo.getUsedMemory(),
  syncGetter: () => RNDeviceInfo.getUsedMemorySync(),
  defaultValue: -1,
});

let userAgent: string;
export async function getUserAgent() {
  if (!userAgent) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
      userAgent = await RNDeviceInfo.getUserAgent();
    } else {
      userAgent = 'unknown';
    }
  }
  return userAgent;
}

export function getUserAgentSync() {
  if (!userAgent) {
    // getUserAgentSync is not available on iOS since it rely on an completion operation
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      userAgent = RNDeviceInfo.getUserAgentSync();
    } else {
      userAgent = 'unknown';
    }
  }
  return userAgent;
}

export const [getFontScale, getFontScaleSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getFontScale(),
  syncGetter: () => RNDeviceInfo.getFontScaleSync(),
  defaultValue: -1,
});

export const [getBootloader, getBootloaderSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'bootloader',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getBootloader(),
  syncGetter: () => RNDeviceInfo.getBootloaderSync(),
  defaultValue: 'unknown',
});

export const [getDevice, getDeviceSync] = getSupportedPlatformInfoFunctions({
  getter: () => RNDeviceInfo.getDevice(),
  syncGetter: () => RNDeviceInfo.getDeviceSync(),
  defaultValue: 'unknown',
  memoKey: 'device',
  supportedPlatforms: ['android'],
});

export const [getDisplay, getDisplaySync] = getSupportedPlatformInfoFunctions({
  memoKey: 'display',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getDisplay(),
  syncGetter: () => RNDeviceInfo.getDisplaySync(),
  defaultValue: 'unknown',
});

let fingerprint: string;
export async function getFingerprint() {
  if (!fingerprint) {
    if (Platform.OS === 'android') {
      fingerprint = await RNDeviceInfo.getFingerprint();
    } else {
      fingerprint = 'unknown';
    }
  }
  return fingerprint;
}

export function getFingerprintSync() {
  if (!fingerprint) {
    if (Platform.OS === 'android') {
      fingerprint = RNDeviceInfo.getFingerprintSync();
    } else {
      fingerprint = 'unknown';
    }
  }
  return fingerprint;
}

export const [getHardware, getHardwareSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'hardware',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getHardware(),
  syncGetter: () => RNDeviceInfo.getHardwareSync(),
  defaultValue: 'unknown',
});

let host: string;
export async function getHost() {
  if (!host) {
    if (Platform.OS === 'android') {
      host = await RNDeviceInfo.getHost();
    } else {
      host = 'unknown';
    }
  }
  return host;
}

export function getHostSync() {
  if (!host) {
    if (Platform.OS === 'android') {
      host = RNDeviceInfo.getHostSync();
    } else {
      host = 'unknown';
    }
  }
  return host;
}

let product: string;
export async function getProduct() {
  if (!product) {
    if (Platform.OS === 'android') {
      product = await RNDeviceInfo.getProduct();
    } else {
      product = 'unknown';
    }
  }
  return product;
}

export function getProductSync() {
  if (!product) {
    if (Platform.OS === 'android') {
      product = RNDeviceInfo.getProductSync();
    } else {
      product = 'unknown';
    }
  }
  return product;
}

let tags: string;
export async function getTags() {
  if (!tags) {
    if (Platform.OS === 'android') {
      tags = await RNDeviceInfo.getTags();
    } else {
      tags = 'unknown';
    }
  }
  return tags;
}

export function getTagsSync() {
  if (!tags) {
    if (Platform.OS === 'android') {
      tags = RNDeviceInfo.getTagsSync();
    } else {
      tags = 'unknown';
    }
  }
  return tags;
}

export const [getType, getTypeSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'type',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getType(),
  syncGetter: () => RNDeviceInfo.getTypeSync(),
  defaultValue: 'unknown',
});

let baseOs: string;
export async function getBaseOs() {
  if (!baseOs) {
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      baseOs = await RNDeviceInfo.getBaseOs();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

export function getBaseOsSync() {
  if (!baseOs) {
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      baseOs = RNDeviceInfo.getBaseOsSync();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

export const [getPreviewSdkInt, getPreviewSdkIntSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'previewSdkInt',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getPreviewSdkInt(),
  syncGetter: () => RNDeviceInfo.getPreviewSdkIntSync(),
  defaultValue: -1,
});

let securityPatch: string;
export async function getSecurityPatch() {
  if (!securityPatch) {
    if (Platform.OS === 'android') {
      securityPatch = await RNDeviceInfo.getSecurityPatch();
    } else {
      securityPatch = 'unknown';
    }
  }
  return securityPatch;
}

export function getSecurityPatchSync() {
  if (!securityPatch) {
    if (Platform.OS === 'android') {
      securityPatch = RNDeviceInfo.getSecurityPatchSync();
    } else {
      securityPatch = 'unknown';
    }
  }
  return securityPatch;
}

export const [getCodename, getCodenameSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'codeName',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getCodename(),
  syncGetter: () => RNDeviceInfo.getCodenameSync(),
  defaultValue: 'unknown',
});

let incremental: string;
export async function getIncremental() {
  if (!incremental) {
    if (Platform.OS === 'android') {
      incremental = await RNDeviceInfo.getIncremental();
    } else {
      incremental = 'unknown';
    }
  }
  return incremental;
}

export function getIncrementalSync() {
  if (!incremental) {
    if (Platform.OS === 'android') {
      incremental = RNDeviceInfo.getIncrementalSync();
    } else {
      incremental = 'unknown';
    }
  }
  return incremental;
}

export const [isEmulator, isEmulatorSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'emulator',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.isEmulator(),
  syncGetter: () => RNDeviceInfo.isEmulatorSync(),
  defaultValue: false,
});

let tablet: boolean;
export function isTablet() {
  if (tablet === undefined) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      tablet = RNDeviceInfo.isTablet;
    } else {
      tablet = false;
    }
  }
  return tablet;
}

export const [isPinOrFingerprintSet, isPinOrFingerprintSetSync] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.isPinOrFingerprintSet(),
    syncGetter: () => RNDeviceInfo.isPinOrFingerprintSetSync(),
    defaultValue: false,
  }
);

let notch: boolean;
export function hasNotch() {
  if (notch === undefined) {
    let _brand = getBrand();
    let _model = getModel();
    notch =
      devicesWithNotch.findIndex(
        (item) =>
          item.brand.toLowerCase() === _brand.toLowerCase() &&
          item.model.toLowerCase() === _model.toLowerCase()
      ) !== -1;
  }
  return notch;
}

export const [getFirstInstallTime, getFirstInstallTimeSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'firstInstallTime',
  supportedPlatforms: ['android', 'windows'],
  getter: () => RNDeviceInfo.getFirstInstallTime(),
  syncGetter: () => RNDeviceInfo.getFirstInstallTimeSync(),
  defaultValue: -1,
});

let installReferrer: string;
export async function getInstallReferrer() {
  if (!installReferrer) {
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      installReferrer = await RNDeviceInfo.getInstallReferrer();
    } else {
      installReferrer = 'unknown';
    }
  }
  return installReferrer;
}

export function getInstallReferrerSync() {
  if (!installReferrer) {
    if (Platform.OS === 'android' || Platform.OS === 'web') {
      installReferrer = RNDeviceInfo.getInstallReferrerSync();
    } else {
      installReferrer = 'unknown';
    }
  }
  return installReferrer;
}

export const [getLastUpdateTime, getLastUpdateTimeSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'lastUpdateTime',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getLastUpdateTime(),
  syncGetter: () => RNDeviceInfo.getLastUpdateTimeSync(),
  defaultValue: -1,
});

export const [getPhoneNumber, getPhoneNumberSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getPhoneNumber(),
  syncGetter: () => RNDeviceInfo.getPhoneNumberSync(),
  defaultValue: 'unknown',
});

export const [getCarrier, getCarrierSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getCarrier(),
  syncGetter: () => RNDeviceInfo.getCarrierSync(),
  defaultValue: 'unknown',
});

export const [getTotalMemory, getTotalMemorySync] = getSupportedPlatformInfoFunctions({
  memoKey: 'totalMemory',
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getTotalMemory(),
  syncGetter: () => RNDeviceInfo.getTotalMemorySync(),
  defaultValue: -1,
});

export const [getMaxMemory, getMaxMemorySync] = getSupportedPlatformInfoFunctions({
  memoKey: 'maxMemory',
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.getMaxMemory(),
  syncGetter: () => RNDeviceInfo.getMaxMemorySync(),
  defaultValue: -1,
});

export const [getTotalDiskCapacity, getTotalDiskCapacitySync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'web'],
  getter: () => RNDeviceInfo.getTotalDiskCapacity(),
  syncGetter: () => RNDeviceInfo.getTotalDiskCapacitySync(),
  defaultValue: -1,
});

export async function getTotalDiskCapacityOld() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getTotalDiskCapacityOld();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'web') {
    return getTotalDiskCapacity();
  }

  return -1;
}

export function getTotalDiskCapacityOldSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getTotalDiskCapacityOldSync();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'web') {
    return getTotalDiskCapacitySync();
  }

  return -1;
}

export const [getFreeDiskStorage, getFreeDiskStorageSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'web'],
  getter: () => RNDeviceInfo.getFreeDiskStorage(),
  syncGetter: () => RNDeviceInfo.getFreeDiskStorageSync(),
  defaultValue: -1,
});

export async function getFreeDiskStorageOld() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getFreeDiskStorageOld();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'web') {
    return getFreeDiskStorage();
  }

  return -1;
}

export function getFreeDiskStorageOldSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getFreeDiskStorageOldSync();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'web') {
    return getFreeDiskStorageSync();
  }

  return -1;
}

export const [getBatteryLevel, getBatteryLevelSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getBatteryLevel(),
  syncGetter: () => RNDeviceInfo.getBatteryLevelSync(),
  defaultValue: -1,
});

export const [getPowerState, getPowerStateSync] = getSupportedPlatformInfoFunctions<
  PowerState | {}
>({
  supportedPlatforms: ['ios', 'android', 'web'],
  getter: () => RNDeviceInfo.getPowerState(),
  syncGetter: () => RNDeviceInfo.getPowerStateSync(),
  defaultValue: {},
});

export const [isBatteryCharging, isBatteryChargingSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'web'],
  getter: () => RNDeviceInfo.isBatteryCharging(),
  syncGetter: () => RNDeviceInfo.isBatteryChargingSync(),
  defaultValue: false,
});

export async function isLandscape() {
  return Promise.resolve(isLandscapeSync());
}

export function isLandscapeSync() {
  const { height, width } = Dimensions.get('window');
  return width >= height;
}

export const [isAirplaneMode, isAirplaneModeSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'web'],
  getter: () => RNDeviceInfo.isAirplaneMode(),
  syncGetter: () => RNDeviceInfo.isAirplaneModeSync(),
  defaultValue: false,
});

let deviceType: DeviceType;
export function getDeviceType() {
  if (!deviceType) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      deviceType = RNDeviceInfo.deviceType;
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

export function getDeviceTypeSync() {
  if (!deviceType) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      deviceType = RNDeviceInfo.deviceType;
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

export const [supportedAbis, supportedAbisSync] = getSupportedPlatformInfoFunctions({
  memoKey: '_supportedAbis',
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getSupportedAbis(),
  syncGetter: () => RNDeviceInfo.getSupportedAbisSync(),
  defaultValue: [] as string[],
});

let _supported32BitAbis: string[];
export async function supported32BitAbis() {
  if (!_supported32BitAbis) {
    if (Platform.OS === 'android') {
      _supported32BitAbis = await RNDeviceInfo.getSupported32BitAbis();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

export function supported32BitAbisSync() {
  if (!_supported32BitAbis) {
    if (Platform.OS === 'android') {
      _supported32BitAbis = RNDeviceInfo.getSupported32BitAbisSync();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

export const [supported64BitAbis, supported64BitAbisSync] = getSupportedPlatformInfoFunctions({
  memoKey: '_supported64BitAbis',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSupported64BitAbis(),
  syncGetter: () => RNDeviceInfo.getSupported64BitAbisSync(),
  defaultValue: [],
});

export async function hasSystemFeature(feature: string) {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.hasSystemFeature(feature);
  }
  return false;
}

export function hasSystemFeatureSync(feature: string) {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.hasSystemFeatureSync(feature);
  }
  return false;
}

export const [
  getSystemAvailableFeatures,
  getSystemAvailableFeaturesSync,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSystemAvailableFeatures(),
  syncGetter: () => RNDeviceInfo.getSystemAvailableFeaturesSync(),
  defaultValue: [] as string[],
});

export const [isLocationEnabled, isLocationEnabledSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'web'],
  getter: () => RNDeviceInfo.isLocationEnabled(),
  syncGetter: () => RNDeviceInfo.isLocationEnabledSync(),
  defaultValue: false,
});

export const [isHeadphonesConnected, isHeadphonesConnectedSync] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['android', 'ios'],
    getter: () => RNDeviceInfo.isHeadphonesConnected(),
    syncGetter: () => RNDeviceInfo.isHeadphonesConnectedSync(),
    defaultValue: false,
  }
);

export const [
  getAvailableLocationProviders,
  getAvailableLocationProvidersSync,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getAvailableLocationProviders(),
  syncGetter: () => RNDeviceInfo.getAvailableLocationProvidersSync(),
  defaultValue: {},
});

export async function getDeviceToken() {
  if (Platform.OS === 'ios') {
    return RNDeviceInfo.getDeviceToken();
  }
  return 'unknown';
}

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);
export function useBatteryLevel(): number | null {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: number = await getBatteryLevel();
      setBatteryLevel(initialValue);
    };

    const onChange = (level: number) => {
      setBatteryLevel(level);
    };

    setInitialValue();

    const subscription = deviceInfoEmitter.addListener(
      'RNDeviceInfo_batteryLevelDidChange',
      onChange
    );

    return () => subscription.remove();
  }, []);

  return batteryLevel;
}

export function useBatteryLevelIsLow(): number | null {
  const [batteryLevelIsLow, setBatteryLevelIsLow] = useState<number | null>(null);

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: number = await getBatteryLevel();
      setBatteryLevelIsLow(initialValue);
    };

    const onChange = (level: number) => {
      setBatteryLevelIsLow(level);
    };

    setInitialValue();

    const subscription = deviceInfoEmitter.addListener('RNDeviceInfo_batteryLevelIsLow', onChange);

    return () => subscription.remove();
  }, []);

  return batteryLevelIsLow;
}

export function usePowerState(): PowerState | {} {
  const [powerState, setPowerState] = useState<PowerState | {}>({});

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: PowerState | {} = await getPowerState();
      setPowerState(initialValue);
    };

    const onChange = (state: PowerState) => {
      setPowerState(state);
    };

    setInitialValue();

    const subscription = deviceInfoEmitter.addListener(
      'RNDeviceInfo_powerStateDidChange',
      onChange
    );

    return () => subscription.remove();
  }, []);

  return powerState;
}

export function useIsHeadphonesConnected(): AsyncHookResult<boolean> {
  return useOnEvent('RNDeviceInfo_headphoneConnectionDidChange', isHeadphonesConnected, false);
}

export function useFirstInstallTime(): AsyncHookResult<number> {
  return useOnMount(getFirstInstallTime, -1);
}

export function useDeviceName(): AsyncHookResult<string> {
  return useOnMount(getDeviceName, 'unknown');
}

export function useHasSystemFeature(feature: string): AsyncHookResult<boolean> {
  const asyncGetter = useCallback(() => hasSystemFeature(feature), [feature]);
  return useOnMount(asyncGetter, false);
}

export function useIsEmulator(): AsyncHookResult<boolean> {
  return useOnMount(isEmulator, false);
}

export function useManufacturer(): AsyncHookResult<string> {
  return useOnMount(getManufacturer, 'unknown');
}

export { AsyncHookResult, DeviceType, LocationProviderInfo, PowerState };

const deviceInfoModule: DeviceInfoModule = {
  getAndroidId,
  getAndroidIdSync,
  getApiLevel,
  getApiLevelSync,
  getApplicationName,
  getAvailableLocationProviders,
  getAvailableLocationProvidersSync,
  getBaseOs,
  getBaseOsSync,
  getBatteryLevel,
  getBatteryLevelSync,
  getBootloader,
  getBootloaderSync,
  getBrand,
  getBuildId,
  getBuildIdSync,
  getBuildNumber,
  getBundleId,
  getCarrier,
  getCarrierSync,
  getCodename,
  getCodenameSync,
  getDevice,
  getDeviceId,
  getDeviceName,
  getDeviceNameSync,
  getDeviceSync,
  getDeviceToken,
  getDeviceType,
  getDisplay,
  getDisplaySync,
  getFingerprint,
  getFingerprintSync,
  getFirstInstallTime,
  getFirstInstallTimeSync,
  getFontScale,
  getFontScaleSync,
  getFreeDiskStorage,
  getFreeDiskStorageOld,
  getFreeDiskStorageSync,
  getFreeDiskStorageOldSync,
  getHardware,
  getHardwareSync,
  getHost,
  getHostSync,
  getIncremental,
  getIncrementalSync,
  getInstallerPackageName,
  getInstallerPackageNameSync,
  getInstallReferrer,
  getInstallReferrerSync,
  getInstanceId,
  getInstanceIdSync,
  getIpAddress,
  getIpAddressSync,
  getLastUpdateTime,
  getLastUpdateTimeSync,
  getMacAddress,
  getMacAddressSync,
  getManufacturer,
  getManufacturerSync,
  getMaxMemory,
  getMaxMemorySync,
  getModel,
  getPhoneNumber,
  getPhoneNumberSync,
  getPowerState,
  getPowerStateSync,
  getPreviewSdkInt,
  getPreviewSdkIntSync,
  getProduct,
  getProductSync,
  getReadableVersion,
  getSecurityPatch,
  getSecurityPatchSync,
  getSerialNumber,
  getSerialNumberSync,
  getSystemAvailableFeatures,
  getSystemAvailableFeaturesSync,
  getSystemName,
  getSystemVersion,
  getTags,
  getTagsSync,
  getTotalDiskCapacity,
  getTotalDiskCapacityOld,
  getTotalDiskCapacitySync,
  getTotalDiskCapacityOldSync,
  getTotalMemory,
  getTotalMemorySync,
  getType,
  getTypeSync,
  getUniqueId,
  getUsedMemory,
  getUsedMemorySync,
  getUserAgent,
  getUserAgentSync,
  getVersion,
  hasNotch,
  hasSystemFeature,
  hasSystemFeatureSync,
  isAirplaneMode,
  isAirplaneModeSync,
  isBatteryCharging,
  isBatteryChargingSync,
  isCameraPresent,
  isCameraPresentSync,
  isEmulator,
  isEmulatorSync,
  isHeadphonesConnected,
  isHeadphonesConnectedSync,
  isLandscape,
  isLandscapeSync,
  isLocationEnabled,
  isLocationEnabledSync,
  isPinOrFingerprintSet,
  isPinOrFingerprintSetSync,
  isTablet,
  supported32BitAbis,
  supported32BitAbisSync,
  supported64BitAbis,
  supported64BitAbisSync,
  supportedAbis,
  supportedAbisSync,
  syncUniqueId,
  useBatteryLevel,
  useBatteryLevelIsLow,
  useDeviceName,
  useFirstInstallTime,
  useHasSystemFeature,
  useIsEmulator,
  usePowerState,
  useManufacturer,
  useIsHeadphonesConnected,
};

export default deviceInfoModule;
