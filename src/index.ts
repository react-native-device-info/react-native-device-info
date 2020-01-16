import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PlatformOSType,
} from 'react-native';
import { useOnMount } from './internal/asyncHookWrappers';
import devicesWithNotch from './internal/devicesWithNotch';
import RNDeviceInfo from './internal/nativeInterface';
import { DeviceInfoModule } from './internal/privateTypes';
import { AsyncHookResult, DeviceType, PowerState } from './internal/types';

let uniqueId: string;
export function getUniqueId() {
  if (!uniqueId) {
    if (isSupportedPlatform('android', 'ios', 'windows')) {
      uniqueId = RNDeviceInfo.uniqueId;
    } else {
      uniqueId = 'unknown';
    }
  }
  return uniqueId;
}

const isSupportedPlatform = (...supportedPlatforms: Array<PlatformOSType>) => {
  return supportedPlatforms.includes(Platform.OS);
};

let instanceId: string;
export async function getInstanceId() {
  if (!instanceId) {
    if (isSupportedPlatform('android')) {
      instanceId = await RNDeviceInfo.getInstanceId();
    } else {
      instanceId = 'unknown';
    }
  }
  return instanceId;
}

export function getInstanceIdSync() {
  if (!instanceId) {
    if (isSupportedPlatform('android')) {
      instanceId = RNDeviceInfo.getInstanceIdSync();
    } else {
      instanceId = 'unknown';
    }
  }
  return instanceId;
}

let serialNumber: string;
export async function getSerialNumber() {
  if (!serialNumber) {
    if (isSupportedPlatform('android')) {
      serialNumber = await RNDeviceInfo.getSerialNumber();
    } else {
      serialNumber = 'unknown';
    }
  }
  return serialNumber;
}

export function getSerialNumberSync() {
  if (!serialNumber) {
    if (isSupportedPlatform('android')) {
      serialNumber = RNDeviceInfo.getSerialNumberSync();
    } else {
      serialNumber = 'unknown';
    }
  }
  return serialNumber;
}

let androidId: string;
export async function getAndroidId() {
  if (!androidId) {
    if (isSupportedPlatform('android')) {
      androidId = await RNDeviceInfo.getAndroidId();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

export function getAndroidIdSync() {
  if (!androidId) {
    if (isSupportedPlatform('android')) {
      androidId = RNDeviceInfo.getAndroidIdSync();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

export async function getIpAddress() {
  if (isSupportedPlatform('android', 'ios', 'windows')) {
    return RNDeviceInfo.getIpAddress();
  }
  return 'unknown';
}

export function getIpAddressSync() {
  if (isSupportedPlatform('android', 'ios', 'windows')) {
    return RNDeviceInfo.getIpAddressSync();
  }
  return 'unknown';
}

export async function isCameraPresent() {
  if (isSupportedPlatform('android', 'windows', 'web')) {
    return RNDeviceInfo.isCameraPresent();
  }
  return false;
}

export function isCameraPresentSync() {
  if (isSupportedPlatform('android', 'windows', 'web')) {
    return RNDeviceInfo.isCameraPresentSync();
  }
  return false;
}

export async function getMacAddress() {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.getMacAddress();
  } else if (isSupportedPlatform('ios')) {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

export function getMacAddressSync() {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.getMacAddressSync();
  } else if (isSupportedPlatform('ios')) {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

let deviceId: string;
export function getDeviceId() {
  if (!deviceId) {
    if (isSupportedPlatform('android', 'ios', 'windows')) {
      deviceId = RNDeviceInfo.deviceId;
    } else {
      deviceId = 'unknown';
    }
  }
  return deviceId;
}

let manufacturer: string;
export async function getManufacturer() {
  if (!manufacturer) {
    if (isSupportedPlatform('android', 'windows')) {
      manufacturer = await RNDeviceInfo.getSystemManufacturer();
    } else if (isSupportedPlatform('ios')) {
      manufacturer = 'Apple';
    } else {
      manufacturer = 'unknown';
    }
  }
  return manufacturer;
}

export function getManufacturerSync() {
  if (!manufacturer) {
    if (isSupportedPlatform('android', 'windows')) {
      manufacturer = RNDeviceInfo.getSystemManufacturerSync();
    } else if (isSupportedPlatform('ios')) {
      manufacturer = 'Apple';
    } else {
      manufacturer = 'unknown';
    }
  }
  return manufacturer;
}

let model: string;
export function getModel() {
  if (!model) {
    if (isSupportedPlatform('ios', 'android', 'windows')) {
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
    if (isSupportedPlatform('android', 'ios', 'windows')) {
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
    if (isSupportedPlatform('ios')) {
      systemName = RNDeviceInfo.systemName;
    } else if (isSupportedPlatform('android')) {
      systemName = 'Android';
    } else if (isSupportedPlatform('windows')) {
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
    if (isSupportedPlatform('android', 'ios', 'windows')) {
      systemVersion = RNDeviceInfo.systemVersion;
    } else {
      systemVersion = 'unknown';
    }
  }
  return systemVersion;
}

let buildId: string;
export async function getBuildId() {
  if (!buildId) {
    if (isSupportedPlatform('android', 'ios')) {
      buildId = await RNDeviceInfo.getBuildId();
    } else {
      buildId = 'unknown';
    }
  }
  return buildId;
}

export function getBuildIdSync() {
  if (!buildId) {
    if (isSupportedPlatform('android', 'ios')) {
      buildId = RNDeviceInfo.getBuildIdSync();
    } else {
      buildId = 'unknown';
    }
  }
  return buildId;
}

let apiLevel: number;
export async function getApiLevel() {
  if (!apiLevel) {
    if (isSupportedPlatform('android')) {
      apiLevel = await RNDeviceInfo.getApiLevel();
    } else {
      apiLevel = -1;
    }
  }
  return apiLevel;
}

export function getApiLevelSync() {
  if (!apiLevel) {
    if (isSupportedPlatform('android')) {
      apiLevel = RNDeviceInfo.getApiLevelSync();
    } else {
      apiLevel = -1;
    }
  }
  return apiLevel;
}

let bundleId: string;
export function getBundleId() {
  if (!bundleId) {
    if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
      bundleId = RNDeviceInfo.bundleId;
    } else {
      bundleId = 'unknown';
    }
  }
  return bundleId;
}

let appName: string;
export function getApplicationName() {
  if (!appName) {
    if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
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
    if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
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
    if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
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

let deviceName: string;
export async function getDeviceName() {
  if (!deviceName) {
    if (isSupportedPlatform('android', 'ios', 'windows')) {
      deviceName = await RNDeviceInfo.getDeviceName();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export function getDeviceNameSync() {
  if (!deviceName) {
    if (isSupportedPlatform('android', 'ios', 'windows')) {
      deviceName = RNDeviceInfo.getDeviceNameSync();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export async function getUsedMemory() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.getUsedMemory();
  }
  return -1;
}

export function getUsedMemorySync() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.getUsedMemorySync();
  }
  return -1;
}

let userAgent: string;
export async function getUserAgent() {
  if (!userAgent) {
    if (isSupportedPlatform('android', 'ios', 'web')) {
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
    if (isSupportedPlatform('android', 'web')) {
      userAgent = RNDeviceInfo.getUserAgentSync();
    } else {
      userAgent = 'unknown';
    }
  }
  return userAgent;
}

export async function getFontScale() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.getFontScale();
  }
  return -1;
}

export function getFontScaleSync() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.getFontScaleSync();
  }
  return -1;
}

let bootloader: string;
export async function getBootloader() {
  if (!bootloader) {
    if (isSupportedPlatform('android')) {
      bootloader = await RNDeviceInfo.getBootloader();
    } else {
      bootloader = 'unknown';
    }
  }
  return bootloader;
}

export function getBootloaderSync() {
  if (!bootloader) {
    if (isSupportedPlatform('android')) {
      bootloader = RNDeviceInfo.getBootloaderSync();
    } else {
      bootloader = 'unknown';
    }
  }
  return bootloader;
}

let device: string;
export async function getDevice() {
  if (!device) {
    if (isSupportedPlatform('android')) {
      device = await RNDeviceInfo.getDevice();
    } else {
      device = 'unknown';
    }
  }
  return device;
}

export function getDeviceSync() {
  if (!device) {
    if (isSupportedPlatform('android')) {
      device = RNDeviceInfo.getDeviceSync();
    } else {
      device = 'unknown';
    }
  }
  return device;
}

let display: string;
export async function getDisplay() {
  if (!display) {
    if (isSupportedPlatform('android')) {
      display = await RNDeviceInfo.getDisplay();
    } else {
      display = 'unknown';
    }
  }
  return display;
}

export function getDisplaySync() {
  if (!display) {
    if (isSupportedPlatform('android')) {
      display = RNDeviceInfo.getDisplaySync();
    } else {
      display = 'unknown';
    }
  }
  return display;
}

let fingerprint: string;
export async function getFingerprint() {
  if (!fingerprint) {
    if (isSupportedPlatform('android')) {
      fingerprint = await RNDeviceInfo.getFingerprint();
    } else {
      fingerprint = 'unknown';
    }
  }
  return fingerprint;
}

export function getFingerprintSync() {
  if (!fingerprint) {
    if (isSupportedPlatform('android')) {
      fingerprint = RNDeviceInfo.getFingerprintSync();
    } else {
      fingerprint = 'unknown';
    }
  }
  return fingerprint;
}

let hardware: string;
export async function getHardware() {
  if (!hardware) {
    if (isSupportedPlatform('android')) {
      hardware = await RNDeviceInfo.getHardware();
    } else {
      hardware = 'unknown';
    }
  }
  return hardware;
}

export function getHardwareSync() {
  if (!hardware) {
    if (isSupportedPlatform('android')) {
      hardware = RNDeviceInfo.getHardwareSync();
    } else {
      hardware = 'unknown';
    }
  }
  return hardware;
}

let host: string;
export async function getHost() {
  if (!host) {
    if (isSupportedPlatform('android')) {
      host = await RNDeviceInfo.getHost();
    } else {
      host = 'unknown';
    }
  }
  return host;
}

export function getHostSync() {
  if (!host) {
    if (isSupportedPlatform('android')) {
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
    if (isSupportedPlatform('android')) {
      product = await RNDeviceInfo.getProduct();
    } else {
      product = 'unknown';
    }
  }
  return product;
}

export function getProductSync() {
  if (!product) {
    if (isSupportedPlatform('android')) {
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
    if (isSupportedPlatform('android')) {
      tags = await RNDeviceInfo.getTags();
    } else {
      tags = 'unknown';
    }
  }
  return tags;
}

export function getTagsSync() {
  if (!tags) {
    if (isSupportedPlatform('android')) {
      tags = RNDeviceInfo.getTagsSync();
    } else {
      tags = 'unknown';
    }
  }
  return tags;
}

let type: string;
export async function getType() {
  if (!type) {
    if (isSupportedPlatform('android')) {
      type = await RNDeviceInfo.getType();
    } else {
      type = 'unknown';
    }
  }
  return type;
}

export function getTypeSync() {
  if (!type) {
    if (isSupportedPlatform('android')) {
      type = RNDeviceInfo.getTypeSync();
    } else {
      type = 'unknown';
    }
  }
  return type;
}

let baseOs: string;
export async function getBaseOs() {
  if (!baseOs) {
    if (isSupportedPlatform('android', 'web')) {
      baseOs = await RNDeviceInfo.getBaseOs();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

export function getBaseOsSync() {
  if (!baseOs) {
    if (isSupportedPlatform('android', 'web')) {
      baseOs = RNDeviceInfo.getBaseOsSync();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

let previewSdkInt: number;
export async function getPreviewSdkInt() {
  if (!previewSdkInt) {
    if (isSupportedPlatform('android')) {
      previewSdkInt = await RNDeviceInfo.getPreviewSdkInt();
    } else {
      previewSdkInt = -1;
    }
  }
  return previewSdkInt;
}

export function getPreviewSdkIntSync() {
  if (!previewSdkInt) {
    if (isSupportedPlatform('android')) {
      previewSdkInt = RNDeviceInfo.getPreviewSdkIntSync();
    } else {
      previewSdkInt = -1;
    }
  }
  return previewSdkInt;
}

let securityPatch: string;
export async function getSecurityPatch() {
  if (!securityPatch) {
    if (isSupportedPlatform('android')) {
      securityPatch = await RNDeviceInfo.getSecurityPatch();
    } else {
      securityPatch = 'unknown';
    }
  }
  return securityPatch;
}

export function getSecurityPatchSync() {
  if (!securityPatch) {
    if (isSupportedPlatform('android')) {
      securityPatch = RNDeviceInfo.getSecurityPatchSync();
    } else {
      securityPatch = 'unknown';
    }
  }
  return securityPatch;
}

let codeName: string;
export async function getCodename() {
  if (!codeName) {
    if (isSupportedPlatform('android')) {
      codeName = await RNDeviceInfo.getCodename();
    } else {
      codeName = 'unknown';
    }
  }
  return codeName;
}

export function getCodenameSync() {
  if (!codeName) {
    if (isSupportedPlatform('android')) {
      codeName = RNDeviceInfo.getCodenameSync();
    } else {
      codeName = 'unknown';
    }
  }
  return codeName;
}

let incremental: string;
export async function getIncremental() {
  if (!incremental) {
    if (isSupportedPlatform('android')) {
      incremental = await RNDeviceInfo.getIncremental();
    } else {
      incremental = 'unknown';
    }
  }
  return incremental;
}

export function getIncrementalSync() {
  if (!incremental) {
    if (isSupportedPlatform('android')) {
      incremental = RNDeviceInfo.getIncrementalSync();
    } else {
      incremental = 'unknown';
    }
  }
  return incremental;
}

let emulator: boolean;
export async function isEmulator() {
  if (!emulator) {
    if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
      emulator = await RNDeviceInfo.isEmulator();
    } else {
      emulator = false;
    }
  }
  return emulator;
}

export function isEmulatorSync() {
  if (!emulator) {
    if (isSupportedPlatform('android', 'ios', 'windows')) {
      emulator = RNDeviceInfo.isEmulatorSync();
    } else {
      emulator = false;
    }
  }
  return emulator;
}

let tablet: boolean;
export function isTablet() {
  if (!tablet) {
    if (isSupportedPlatform('android', 'ios', 'windows')) {
      tablet = RNDeviceInfo.isTablet;
    } else {
      tablet = false;
    }
  }
  return tablet;
}

export async function isPinOrFingerprintSet() {
  if (isSupportedPlatform('android', 'ios', 'windows')) {
    return RNDeviceInfo.isPinOrFingerprintSet();
  }
  return false;
}

export function isPinOrFingerprintSetSync() {
  if (isSupportedPlatform('android', 'ios', 'windows')) {
    return RNDeviceInfo.isPinOrFingerprintSetSync();
  }
  return false;
}

let notch: boolean;
export function hasNotch() {
  if (!notch) {
    let _brand = getBrand();
    let _model = getModel();
    notch =
      devicesWithNotch.findIndex(
        item =>
          item.brand.toLowerCase() === _brand.toLowerCase() &&
          item.model.toLowerCase() === _model.toLowerCase()
      ) !== -1;
  }
  return notch;
}

let firstInstallTime: number;
export async function getFirstInstallTime() {
  if (!firstInstallTime) {
    if (isSupportedPlatform('android', 'windows')) {
      firstInstallTime = await RNDeviceInfo.getFirstInstallTime();
    } else {
      firstInstallTime = -1;
    }
  }
  return firstInstallTime;
}

export function getFirstInstallTimeSync() {
  if (!firstInstallTime) {
    if (isSupportedPlatform('android', 'windows')) {
      firstInstallTime = RNDeviceInfo.getFirstInstallTimeSync();
    } else {
      firstInstallTime = -1;
    }
  }
  return firstInstallTime;
}

let installReferrer: string;
export async function getInstallReferrer() {
  if (!installReferrer) {
    if (isSupportedPlatform('android', 'web')) {
      installReferrer = await RNDeviceInfo.getInstallReferrer();
    } else {
      installReferrer = 'unknown';
    }
  }
  return installReferrer;
}

export function getInstallReferrerSync() {
  if (!installReferrer) {
    if (isSupportedPlatform('android', 'web')) {
      installReferrer = RNDeviceInfo.getInstallReferrerSync();
    } else {
      installReferrer = 'unknown';
    }
  }
  return installReferrer;
}

let lastUpdateTime: number;
export async function getLastUpdateTime() {
  if (!lastUpdateTime) {
    if (isSupportedPlatform('android')) {
      lastUpdateTime = await RNDeviceInfo.getLastUpdateTime();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export function getLastUpdateTimeSync() {
  if (!lastUpdateTime) {
    if (isSupportedPlatform('android')) {
      lastUpdateTime = RNDeviceInfo.getLastUpdateTimeSync();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export async function getPhoneNumber() {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.getPhoneNumber();
  }
  return 'unknown';
}

export function getPhoneNumberSync() {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.getPhoneNumberSync();
  }
  return 'unknown';
}

export async function getCarrier() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.getCarrier();
  }
  return 'unknown';
}

export function getCarrierSync() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.getCarrierSync();
  }
  return 'unknown';
}

let totalMemory: number;
export async function getTotalMemory() {
  if (!totalMemory) {
    if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
      totalMemory = await RNDeviceInfo.getTotalMemory();
    } else {
      totalMemory = -1;
    }
  }
  return totalMemory;
}

export function getTotalMemorySync() {
  if (!totalMemory) {
    if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
      totalMemory = RNDeviceInfo.getTotalMemorySync();
    } else {
      totalMemory = -1;
    }
  }
  return totalMemory;
}

let maxMemory: number;
export async function getMaxMemory() {
  if (!maxMemory) {
    if (isSupportedPlatform('android', 'windows', 'web')) {
      maxMemory = await RNDeviceInfo.getMaxMemory();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export function getMaxMemorySync() {
  if (!maxMemory) {
    if (isSupportedPlatform('android', 'windows', 'web')) {
      maxMemory = RNDeviceInfo.getMaxMemorySync();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export async function getTotalDiskCapacity() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.getTotalDiskCapacity();
  }
  return -1;
}

export function getTotalDiskCapacitySync() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.getTotalDiskCapacitySync();
  }
  return -1;
}

export async function getFreeDiskStorage() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.getFreeDiskStorage();
  }
  return -1;
}

export function getFreeDiskStorageSync() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.getFreeDiskStorageSync();
  }
  return -1;
}

export async function getBatteryLevel() {
  if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
    return RNDeviceInfo.getBatteryLevel();
  }
  return -1;
}

export function getBatteryLevelSync() {
  if (isSupportedPlatform('android', 'ios', 'windows', 'web')) {
    return RNDeviceInfo.getBatteryLevelSync();
  }
  return -1;
}

export async function getPowerState() {
  if (isSupportedPlatform('ios', 'android', 'web')) {
    return RNDeviceInfo.getPowerState();
  }
  return {};
}

export function getPowerStateSync() {
  if (isSupportedPlatform('ios', 'android', 'web')) {
    return RNDeviceInfo.getPowerStateSync();
  }
  return {};
}

export async function isBatteryCharging() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.isBatteryCharging();
  }
  return false;
}

export function isBatteryChargingSync() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.isBatteryChargingSync();
  }
  return false;
}

export async function isLandscape() {
  return Promise.resolve(isLandscapeSync());
}

export function isLandscapeSync() {
  const { height, width } = Dimensions.get('window');
  return width >= height;
}

export async function isAirplaneMode() {
  if (isSupportedPlatform('android', 'web')) {
    return RNDeviceInfo.isAirplaneMode();
  }
  return Promise.resolve(false);
}

export function isAirplaneModeSync() {
  if (isSupportedPlatform('android', 'web')) {
    return RNDeviceInfo.isAirplaneModeSync();
  }
  return false;
}

let deviceType: DeviceType;
export function getDeviceType() {
  if (!deviceType) {
    if (isSupportedPlatform('android', 'ios')) {
      deviceType = RNDeviceInfo.deviceType;
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

export function getDeviceTypeSync() {
  if (!deviceType) {
    if (isSupportedPlatform('android', 'ios')) {
      deviceType = RNDeviceInfo.deviceType;
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

let _supportedAbis: string[];
export async function supportedAbis() {
  if (!_supportedAbis) {
    if (isSupportedPlatform('android', 'ios')) {
      _supportedAbis = await RNDeviceInfo.getSupportedAbis();
    } else {
      _supportedAbis = [];
    }
  }
  return _supportedAbis;
}

export function supportedAbisSync() {
  if (!_supportedAbis) {
    if (isSupportedPlatform('android', 'ios')) {
      _supportedAbis = RNDeviceInfo.getSupportedAbisSync();
    } else {
      _supportedAbis = [];
    }
  }
  return _supportedAbis;
}

let _supported32BitAbis: string[];
export async function supported32BitAbis() {
  if (!_supported32BitAbis) {
    if (isSupportedPlatform('android')) {
      _supported32BitAbis = await RNDeviceInfo.getSupported32BitAbis();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

export function supported32BitAbisSync() {
  if (!_supported32BitAbis) {
    if (isSupportedPlatform('android')) {
      _supported32BitAbis = RNDeviceInfo.getSupported32BitAbisSync();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

let _supported64BitAbis: string[];
export async function supported64BitAbis() {
  if (!_supported64BitAbis) {
    if (isSupportedPlatform('android')) {
      _supported64BitAbis = await RNDeviceInfo.getSupported64BitAbis();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

export function supported64BitAbisSync() {
  if (!_supported64BitAbis) {
    if (isSupportedPlatform('android')) {
      _supported64BitAbis = RNDeviceInfo.getSupported64BitAbisSync();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

export async function hasSystemFeature(feature: string) {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.hasSystemFeature(feature);
  }
  return false;
}

export function hasSystemFeatureSync(feature: string) {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.hasSystemFeatureSync(feature);
  }
  return false;
}

export async function getSystemAvailableFeatures() {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.getSystemAvailableFeatures();
  }
  return [];
}

export function getSystemAvailableFeaturesSync() {
  if (isSupportedPlatform('android')) {
    return RNDeviceInfo.getSystemAvailableFeaturesSync();
  }
  return [];
}

export async function isLocationEnabled() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.isLocationEnabled();
  }
  return false;
}

export function isLocationEnabledSync() {
  if (isSupportedPlatform('android', 'ios', 'web')) {
    return RNDeviceInfo.isLocationEnabledSync();
  }
  return false;
}

export async function isHeadphonesConnected() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.isHeadphonesConnected();
  }
  return false;
}

export function isHeadphonesConnectedSync() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.isHeadphonesConnectedSync();
  }
  return false;
}

export async function getAvailableLocationProviders() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.getAvailableLocationProviders();
  }
  return {};
}

export function getAvailableLocationProvidersSync() {
  if (isSupportedPlatform('android', 'ios')) {
    return RNDeviceInfo.getAvailableLocationProvidersSync();
  }
  return {};
}

export async function getDeviceToken() {
  if (isSupportedPlatform('ios')) {
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
  getFreeDiskStorageSync,
  getHardware,
  getHardwareSync,
  getHost,
  getHostSync,
  getIncremental,
  getIncrementalSync,
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
  getTotalDiskCapacitySync,
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
  useBatteryLevel,
  useBatteryLevelIsLow,
  useDeviceName,
  useFirstInstallTime,
  useHasSystemFeature,
  useIsEmulator,
  usePowerState,
};

export default deviceInfoModule;
