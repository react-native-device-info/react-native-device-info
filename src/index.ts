import { useState, useEffect, useCallback } from 'react';
import { Platform, Dimensions, NativeEventEmitter, NativeModules } from 'react-native';
import RNDeviceInfo from './internal/nativeInterface';
import devicesWithNotch from './internal/devicesWithNotch';
import { DeviceType, PowerState, AsyncHookResult } from './internal/types';
import { useOnMount } from './internal/async-hook-wrappers';

const OS = Platform.OS;

let uniqueId: string;
export function getUniqueId() {
  if (!uniqueId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      uniqueId = RNDeviceInfo.uniqueId;
    } else {
      uniqueId = 'unknown';
    }
  }
  return uniqueId;
}

let instanceId: string;
export async function getInstanceId() {
  if (!instanceId) {
    if (OS === 'android') {
      instanceId = await RNDeviceInfo.getInstanceId();
    } else {
      instanceId = 'unknown';
    }
  }
  return instanceId;
}

export function getInstanceIdSync() {
  if (!instanceId) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      serialNumber = await RNDeviceInfo.getSerialNumber();
    } else {
      serialNumber = 'unknown';
    }
  }
  return serialNumber;
}

export function getSerialNumberSync() {
  if (!serialNumber) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      androidId = await RNDeviceInfo.getAndroidId();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

export function getAndroidIdSync() {
  if (!androidId) {
    if (OS === 'android') {
      androidId = RNDeviceInfo.getAndroidIdSync();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

export async function getIpAddress() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.getIpAddress();
  }
  return 'unknown';
}

export function getIpAddressSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.getIpAddressSync();
  }
  return 'unknown';
}

export async function isCameraPresent() {
  if (OS === 'android' || OS === 'windows' || OS === 'web') {
    return RNDeviceInfo.isCameraPresent();
  }
  return false;
}

export function isCameraPresentSync() {
  if (OS === 'android' || OS === 'windows' || OS === 'web') {
    return RNDeviceInfo.isCameraPresentSync();
  }
  return false;
}

export async function getMacAddress() {
  if (OS === 'android') {
    return RNDeviceInfo.getMacAddress();
  } else if (OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

export function getMacAddressSync() {
  if (OS === 'android') {
    return RNDeviceInfo.getMacAddressSync();
  } else if (OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

let deviceId: string;
export function getDeviceId() {
  if (!deviceId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'windows') {
      manufacturer = await RNDeviceInfo.getSystemManufacturer();
    } else if (OS === 'ios') {
      manufacturer = 'Apple';
    } else {
      manufacturer = 'unknown';
    }
  }
  return manufacturer;
}

export function getManufacturerSync() {
  if (!manufacturer) {
    if (OS === 'android' || OS === 'windows') {
      manufacturer = RNDeviceInfo.getSystemManufacturerSync();
    } else if (OS === 'ios') {
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
    if (OS === 'ios' || OS === 'android' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'ios') {
      systemName = RNDeviceInfo.systemName;
    } else if (OS === 'android') {
      systemName = 'Android';
    } else if (OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios') {
      buildId = await RNDeviceInfo.getBuildId();
    } else {
      buildId = 'unknown';
    }
  }
  return buildId;
}

export function getBuildIdSync() {
  if (!buildId) {
    if (OS === 'android' || OS === 'ios') {
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
    if (OS === 'android') {
      apiLevel = await RNDeviceInfo.getApiLevel();
    } else {
      apiLevel = -1;
    }
  }
  return apiLevel;
}

export function getApiLevelSync() {
  if (!apiLevel) {
    if (OS === 'android') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      deviceName = await RNDeviceInfo.getDeviceName();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export function getDeviceNameSync() {
  if (!deviceName) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      deviceName = RNDeviceInfo.getDeviceNameSync();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export async function getUsedMemory() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.getUsedMemory();
  }
  return -1;
}

export function getUsedMemorySync() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.getUsedMemorySync();
  }
  return -1;
}

let userAgent: string;
export async function getUserAgent() {
  if (!userAgent) {
    if (OS === 'android' || OS === 'ios' || OS === 'web') {
      userAgent = await RNDeviceInfo.getUserAgent();
    } else {
      userAgent = 'unknown';
    }
  }
  return userAgent;
}

export async function getFontScale() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getFontScale();
  }
  return 'unknown';
}

export function getFontScaleSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getFontScaleSync();
  }
  return 'unknown';
}

let bootloader: string;
export async function getBootloader() {
  if (!bootloader) {
    if (OS === 'android') {
      bootloader = await RNDeviceInfo.getBootloader();
    } else {
      bootloader = 'unknown';
    }
  }
  return bootloader;
}

export function getBootloaderSync() {
  if (!bootloader) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      device = await RNDeviceInfo.getDevice();
    } else {
      device = 'unknown';
    }
  }
  return device;
}

export function getDeviceSync() {
  if (!device) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      display = await RNDeviceInfo.getDisplay();
    } else {
      display = 'unknown';
    }
  }
  return display;
}

export function getDisplaySync() {
  if (!display) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      fingerprint = await RNDeviceInfo.getFingerprint();
    } else {
      fingerprint = 'unknown';
    }
  }
  return fingerprint;
}

export function getFingerprintSync() {
  if (!fingerprint) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      hardware = await RNDeviceInfo.getHardware();
    } else {
      hardware = 'unknown';
    }
  }
  return hardware;
}

export function getHardwareSync() {
  if (!hardware) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      host = await RNDeviceInfo.getHost();
    } else {
      host = 'unknown';
    }
  }
  return host;
}

export function getHostSync() {
  if (!host) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      product = await RNDeviceInfo.getProduct();
    } else {
      product = 'unknown';
    }
  }
  return product;
}

export function getProductSync() {
  if (!product) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      tags = await RNDeviceInfo.getTags();
    } else {
      tags = 'unknown';
    }
  }
  return tags;
}

export function getTagsSync() {
  if (!tags) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      type = await RNDeviceInfo.getType();
    } else {
      type = 'unknown';
    }
  }
  return type;
}

export function getTypeSync() {
  if (!type) {
    if (OS === 'android') {
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
    if (OS === 'android' || OS === 'web') {
      baseOs = await RNDeviceInfo.getBaseOs();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

export function getBaseOsSync() {
  if (!baseOs) {
    if (OS === 'android' || OS === 'web') {
      baseOs = RNDeviceInfo.getBaseOsSync();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

let previewSdkInt: number | 'unknown';
export async function getPreviewSdkInt() {
  if (!previewSdkInt) {
    if (OS === 'android') {
      previewSdkInt = await RNDeviceInfo.getPreviewSdkInt();
    } else {
      previewSdkInt = 'unknown';
    }
  }
  return previewSdkInt;
}

export function getPreviewSdkIntSync() {
  if (!previewSdkInt) {
    if (OS === 'android') {
      previewSdkInt = RNDeviceInfo.getPreviewSdkIntSync();
    } else {
      previewSdkInt = 'unknown';
    }
  }
  return previewSdkInt;
}

let securityPatch: string;
export async function getSecurityPatch() {
  if (!securityPatch) {
    if (OS === 'android') {
      securityPatch = await RNDeviceInfo.getSecurityPatch();
    } else {
      securityPatch = 'unknown';
    }
  }
  return securityPatch;
}

export function getSecurityPatchSync() {
  if (!securityPatch) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      codeName = await RNDeviceInfo.getCodename();
    } else {
      codeName = 'unknown';
    }
  }
  return codeName;
}

export function getCodenameSync() {
  if (!codeName) {
    if (OS === 'android') {
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
    if (OS === 'android') {
      incremental = await RNDeviceInfo.getIncremental();
    } else {
      incremental = 'unknown';
    }
  }
  return incremental;
}

export function getIncrementalSync() {
  if (!incremental) {
    if (OS === 'android') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      emulator = await RNDeviceInfo.isEmulator();
    } else {
      emulator = false;
    }
  }
  return emulator;
}

export function isEmulatorSync() {
  if (!emulator) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      tablet = RNDeviceInfo.isTablet;
    } else {
      tablet = false;
    }
  }
  return tablet;
}

export async function isPinOrFingerprintSet() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.isPinOrFingerprintSet();
  }
  return false;
}

export function isPinOrFingerprintSetSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'windows') {
      firstInstallTime = await RNDeviceInfo.getFirstInstallTime();
    } else {
      firstInstallTime = -1;
    }
  }
  return firstInstallTime;
}

export function getFirstInstallTimeSync() {
  if (!firstInstallTime) {
    if (OS === 'android' || OS === 'windows') {
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
    if (OS === 'android' || OS === 'web') {
      installReferrer = await RNDeviceInfo.getInstallReferrer();
    } else {
      installReferrer = 'unknown';
    }
  }
  return installReferrer;
}

export function getInstallReferrerSync() {
  if (!installReferrer) {
    if (OS === 'android' || OS === 'web') {
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
    if (OS === 'android') {
      lastUpdateTime = await RNDeviceInfo.getLastUpdateTime();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export function getLastUpdateTimeSync() {
  if (!lastUpdateTime) {
    if (OS === 'android') {
      lastUpdateTime = RNDeviceInfo.getLastUpdateTimeSync();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export async function getPhoneNumber() {
  if (OS === 'android') {
    return RNDeviceInfo.getPhoneNumber();
  }
  return 'unknown';
}

export function getPhoneNumberSync() {
  if (OS === 'android') {
    return RNDeviceInfo.getPhoneNumberSync();
  }
  return 'unknown';
}

export async function getCarrier() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getCarrier();
  }
  return 'unknown';
}

export function getCarrierSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getCarrierSync();
  }
  return 'unknown';
}

let totalMemory: number;
export async function getTotalMemory() {
  if (!totalMemory) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows' || OS === 'web') {
      totalMemory = await RNDeviceInfo.getTotalMemory();
    } else {
      totalMemory = -1;
    }
  }
  return totalMemory;
}

export function getTotalMemorySync() {
  if (!totalMemory) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows' || OS === 'web') {
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
    if (OS === 'android' || OS === 'windows' || OS === 'web') {
      maxMemory = await RNDeviceInfo.getMaxMemory();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export function getMaxMemorySync() {
  if (!maxMemory) {
    if (OS === 'android' || OS === 'windows' || OS === 'web') {
      maxMemory = RNDeviceInfo.getMaxMemorySync();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export async function getTotalDiskCapacity() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.getTotalDiskCapacity();
  }
  return -1;
}

export function getTotalDiskCapacitySync() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.getTotalDiskCapacitySync();
  }
  return -1;
}

export async function getFreeDiskStorage() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.getFreeDiskStorage();
  }
  return -1;
}

export function getFreeDiskStorageSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.getFreeDiskStorageSync();
  }
  return -1;
}

export async function getBatteryLevel() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows' || OS === 'web') {
    return RNDeviceInfo.getBatteryLevel();
  }
  return -1;
}

export function getBatteryLevelSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows' || OS === 'web') {
    return RNDeviceInfo.getBatteryLevelSync();
  }
  return -1;
}

export async function getPowerState() {
  if (OS === 'ios' || OS === 'android' || OS === 'web') {
    return RNDeviceInfo.getPowerState();
  }
  return {};
}

export function getPowerStateSync() {
  if (OS === 'ios' || OS === 'android' || OS === 'web') {
    return RNDeviceInfo.getPowerStateSync();
  }
  return {};
}

export async function isBatteryCharging() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.isBatteryCharging();
  }
  return false;
}

export function isBatteryChargingSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
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
  if (OS === 'android' || OS === 'web') {
    return RNDeviceInfo.isAirplaneMode();
  }
  return Promise.resolve(false);
}

export function isAirplaneModeSync() {
  if (OS === 'android' || OS === 'web') {
    return RNDeviceInfo.isAirplaneModeSync();
  }
  return false;
}

let deviceType: DeviceType;
export function getDeviceType() {
  if (!deviceType) {
    if (OS === 'android' || OS === 'ios') {
      deviceType = RNDeviceInfo.deviceType;
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

export function getDeviceTypeSync() {
  if (!deviceType) {
    if (OS === 'android' || OS === 'ios') {
      deviceType = RNDeviceInfo.deviceType;
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

let _supportedAbis: Array<string>;
export async function supportedAbis() {
  if (!_supportedAbis) {
    if (OS === 'android' || OS === 'ios') {
      _supportedAbis = await RNDeviceInfo.getSupportedAbis();
    } else {
      _supportedAbis = [];
    }
  }
  return _supportedAbis;
}

export function supportedAbisSync() {
  if (!_supportedAbis) {
    if (OS === 'android' || OS === 'ios') {
      _supportedAbis = RNDeviceInfo.getSupportedAbisSync();
    } else {
      _supportedAbis = [];
    }
  }
  return _supportedAbis;
}

let _supported32BitAbis: Array<string>;
export async function supported32BitAbis() {
  if (!_supported32BitAbis) {
    if (OS === 'android') {
      _supported32BitAbis = await RNDeviceInfo.getSupported32BitAbis();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

export function supported32BitAbisSync() {
  if (!_supported32BitAbis) {
    if (OS === 'android') {
      _supported32BitAbis = RNDeviceInfo.getSupported32BitAbisSync();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

let _supported64BitAbis: Array<string>;
export async function supported64BitAbis() {
  if (!_supported64BitAbis) {
    if (OS === 'android') {
      _supported64BitAbis = await RNDeviceInfo.getSupported64BitAbis();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

export function supported64BitAbisSync() {
  if (!_supported64BitAbis) {
    if (OS === 'android') {
      _supported64BitAbis = RNDeviceInfo.getSupported64BitAbisSync();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

export async function hasSystemFeature(feature: string) {
  if (OS === 'android') {
    return RNDeviceInfo.hasSystemFeature(feature);
  }
  return false;
}

export function hasSystemFeatureSync(feature: string) {
  if (OS === 'android') {
    return RNDeviceInfo.hasSystemFeatureSync(feature);
  }
  return false;
}

export async function getSystemAvailableFeatures() {
  if (OS === 'android') {
    return RNDeviceInfo.getSystemAvailableFeatures();
  }
  return [];
}

export function getSystemAvailableFeaturesSync() {
  if (OS === 'android') {
    return RNDeviceInfo.getSystemAvailableFeaturesSync();
  }
  return [];
}

export async function isLocationEnabled() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.isLocationEnabled();
  }
  return false;
}

export function isLocationEnabledSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'web') {
    return RNDeviceInfo.isLocationEnabledSync();
  }
  return false;
}

export function isHeadphonesConnected() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isHeadphonesConnected();
  }
  return false;
}

export function isHeadphonesConnectedSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isHeadphonesConnectedSync();
  }
  return false;
}

export async function getAvailableLocationProviders() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getAvailableLocationProviders();
  }
  return {};
}

export function getAvailableLocationProvidersSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getAvailableLocationProvidersSync();
  }
  return {};
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

export default {
  getUniqueId,
  getInstanceId,
  getInstanceIdSync,
  getSerialNumber,
  getSerialNumberSync,
  getAndroidId,
  getAndroidIdSync,
  getIpAddress,
  getIpAddressSync,
  isCameraPresent,
  isCameraPresentSync,
  getMacAddress,
  getMacAddressSync,
  getDeviceId,
  getManufacturer,
  getManufacturerSync,
  getModel,
  getBrand,
  getSystemName,
  getSystemVersion,
  getBuildId,
  getBuildIdSync,
  getApiLevel,
  getApiLevelSync,
  getBundleId,
  getApplicationName,
  getBuildNumber,
  getVersion,
  getReadableVersion,
  getDeviceName,
  getDeviceNameSync,
  getUsedMemory,
  getUsedMemorySync,
  getUserAgent,
  getFontScale,
  getFontScaleSync,
  getBootloader,
  getBootloaderSync,
  getDevice,
  getDeviceSync,
  getDisplay,
  getDisplaySync,
  getFingerprint,
  getFingerprintSync,
  getHardware,
  getHardwareSync,
  getHost,
  getHostSync,
  getProduct,
  getProductSync,
  getTags,
  getTagsSync,
  getType,
  getTypeSync,
  getBaseOs,
  getBaseOsSync,
  getPreviewSdkInt,
  getPreviewSdkIntSync,
  getSecurityPatch,
  getSecurityPatchSync,
  getCodename,
  getCodenameSync,
  getIncremental,
  getIncrementalSync,
  isEmulator,
  isEmulatorSync,
  isPinOrFingerprintSet,
  isPinOrFingerprintSetSync,
  hasNotch,
  getFirstInstallTime,
  getFirstInstallTimeSync,
  getInstallReferrer,
  getInstallReferrerSync,
  getLastUpdateTime,
  getLastUpdateTimeSync,
  getPhoneNumber,
  getPhoneNumberSync,
  getCarrier,
  getCarrierSync,
  getTotalMemory,
  getTotalMemorySync,
  getMaxMemory,
  getMaxMemorySync,
  getTotalDiskCapacity,
  getTotalDiskCapacitySync,
  getFreeDiskStorage,
  getFreeDiskStorageSync,
  getBatteryLevel,
  getBatteryLevelSync,
  getPowerState,
  getPowerStateSync,
  isBatteryCharging,
  isBatteryChargingSync,
  isLandscape,
  isLandscapeSync,
  isAirplaneMode,
  isAirplaneModeSync,
  isTablet,
  getDeviceType,
  supportedAbis,
  supportedAbisSync,
  supported32BitAbis,
  supported32BitAbisSync,
  supported64BitAbis,
  supported64BitAbisSync,
  hasSystemFeature,
  hasSystemFeatureSync,
  getSystemAvailableFeatures,
  getSystemAvailableFeaturesSync,
  isLocationEnabled,
  isLocationEnabledSync,
  isHeadphonesConnected,
  isHeadphonesConnectedSync,
  getAvailableLocationProviders,
  getAvailableLocationProvidersSync,
  useBatteryLevel,
  useBatteryLevelIsLow,
  usePowerState,
  useFirstInstallTime,
  useDeviceName,
  useHasSystemFeature,
  useIsEmulator,
};
