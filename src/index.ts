import { useCallback, useEffect, useState } from 'react';
import { Dimensions, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { useOnMount } from './internal/asyncHookWrappers';
import devicesWithNotch from './internal/devicesWithNotch';
import RNDeviceInfo from './internal/nativeInterface';
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

let instanceId: string;
export async function getInstanceId() {
  if (!instanceId) {
    if (Platform.OS === 'android') {
      instanceId = await RNDeviceInfo.getInstanceId();
    } else {
      instanceId = 'unknown';
    }
  }
  return instanceId;
}

export function getInstanceIdSync() {
  if (!instanceId) {
    if (Platform.OS === 'android') {
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

let androidId: string;
export async function getAndroidId() {
  if (!androidId) {
    if (Platform.OS === 'android') {
      androidId = await RNDeviceInfo.getAndroidId();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

export function getAndroidIdSync() {
  if (!androidId) {
    if (Platform.OS === 'android') {
      androidId = RNDeviceInfo.getAndroidIdSync();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

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

export async function isCameraPresent() {
  if (Platform.OS === 'android' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return RNDeviceInfo.isCameraPresent();
  }
  return false;
}

export function isCameraPresentSync() {
  if (Platform.OS === 'android' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return RNDeviceInfo.isCameraPresentSync();
  }
  return false;
}

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

let manufacturer: string;
export async function getManufacturer() {
  if (!manufacturer) {
    if (Platform.OS === 'android' || Platform.OS === 'windows') {
      manufacturer = await RNDeviceInfo.getSystemManufacturer();
    } else if (Platform.OS === 'ios') {
      manufacturer = 'Apple';
    } else {
      manufacturer = 'unknown';
    }
  }
  return manufacturer;
}

export function getManufacturerSync() {
  if (!manufacturer) {
    if (Platform.OS === 'android' || Platform.OS === 'windows') {
      manufacturer = RNDeviceInfo.getSystemManufacturerSync();
    } else if (Platform.OS === 'ios') {
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

let buildId: string;
export async function getBuildId() {
  if (!buildId) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      buildId = await RNDeviceInfo.getBuildId();
    } else {
      buildId = 'unknown';
    }
  }
  return buildId;
}

export function getBuildIdSync() {
  if (!buildId) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
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
    if (Platform.OS === 'android') {
      apiLevel = await RNDeviceInfo.getApiLevel();
    } else {
      apiLevel = -1;
    }
  }
  return apiLevel;
}

export function getApiLevelSync() {
  if (!apiLevel) {
    if (Platform.OS === 'android') {
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
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      bundleId = RNDeviceInfo.bundleId;
    } else {
      bundleId = 'unknown';
    }
  }
  return bundleId;
}

let installerPackageName: string;
export async function getInstallerPackageName() {
  if (!installerPackageName) {
    if (Platform.OS === 'android') {
      installerPackageName = await RNDeviceInfo.getInstallerPackageName();
    } else {
      installerPackageName = 'unknown';
    }
  }

  return installerPackageName;
}

export function getInstallerPackageNameSync() {
  if (!installerPackageName) {
    if (Platform.OS === 'android') {
      installerPackageName = RNDeviceInfo.getInstallerPackageNameSync();
    } else {
      installerPackageName = 'unknown';
    }
  }

  return installerPackageName;
}

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

let deviceName: string;
export async function getDeviceName() {
  if (!deviceName) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      deviceName = await RNDeviceInfo.getDeviceName();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export function getDeviceNameSync() {
  if (!deviceName) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      deviceName = RNDeviceInfo.getDeviceNameSync();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export async function getUsedMemory() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.getUsedMemory();
  }
  return -1;
}

export function getUsedMemorySync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.getUsedMemorySync();
  }
  return -1;
}

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

export async function getFontScale() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.getFontScale();
  }
  return -1;
}

export function getFontScaleSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.getFontScaleSync();
  }
  return -1;
}

let bootloader: string;
export async function getBootloader() {
  if (!bootloader) {
    if (Platform.OS === 'android') {
      bootloader = await RNDeviceInfo.getBootloader();
    } else {
      bootloader = 'unknown';
    }
  }
  return bootloader;
}

export function getBootloaderSync() {
  if (!bootloader) {
    if (Platform.OS === 'android') {
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
    if (Platform.OS === 'android') {
      device = await RNDeviceInfo.getDevice();
    } else {
      device = 'unknown';
    }
  }
  return device;
}

export function getDeviceSync() {
  if (!device) {
    if (Platform.OS === 'android') {
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
    if (Platform.OS === 'android') {
      display = await RNDeviceInfo.getDisplay();
    } else {
      display = 'unknown';
    }
  }
  return display;
}

export function getDisplaySync() {
  if (!display) {
    if (Platform.OS === 'android') {
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

let hardware: string;
export async function getHardware() {
  if (!hardware) {
    if (Platform.OS === 'android') {
      hardware = await RNDeviceInfo.getHardware();
    } else {
      hardware = 'unknown';
    }
  }
  return hardware;
}

export function getHardwareSync() {
  if (!hardware) {
    if (Platform.OS === 'android') {
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

let type: string;
export async function getType() {
  if (!type) {
    if (Platform.OS === 'android') {
      type = await RNDeviceInfo.getType();
    } else {
      type = 'unknown';
    }
  }
  return type;
}

export function getTypeSync() {
  if (!type) {
    if (Platform.OS === 'android') {
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

let previewSdkInt: number;
export async function getPreviewSdkInt() {
  if (!previewSdkInt) {
    if (Platform.OS === 'android') {
      previewSdkInt = await RNDeviceInfo.getPreviewSdkInt();
    } else {
      previewSdkInt = -1;
    }
  }
  return previewSdkInt;
}

export function getPreviewSdkIntSync() {
  if (!previewSdkInt) {
    if (Platform.OS === 'android') {
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

let codeName: string;
export async function getCodename() {
  if (!codeName) {
    if (Platform.OS === 'android') {
      codeName = await RNDeviceInfo.getCodename();
    } else {
      codeName = 'unknown';
    }
  }
  return codeName;
}

export function getCodenameSync() {
  if (!codeName) {
    if (Platform.OS === 'android') {
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

let emulator: boolean;
export async function isEmulator() {
  if (emulator === undefined) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      emulator = await RNDeviceInfo.isEmulator();
    } else {
      emulator = false;
    }
  }
  return emulator;
}

export function isEmulatorSync() {
  if (emulator === undefined) {
    if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
      emulator = RNDeviceInfo.isEmulatorSync();
    } else {
      emulator = false;
    }
  }
  return emulator;
}

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

export async function isPinOrFingerprintSet() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
    return RNDeviceInfo.isPinOrFingerprintSet();
  }
  return false;
}

export function isPinOrFingerprintSetSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'windows') {
    return RNDeviceInfo.isPinOrFingerprintSetSync();
  }
  return false;
}

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

let firstInstallTime: number;
export async function getFirstInstallTime() {
  if (!firstInstallTime) {
    if (Platform.OS === 'android' || Platform.OS === 'windows') {
      firstInstallTime = await RNDeviceInfo.getFirstInstallTime();
    } else {
      firstInstallTime = -1;
    }
  }
  return firstInstallTime;
}

export function getFirstInstallTimeSync() {
  if (!firstInstallTime) {
    if (Platform.OS === 'android' || Platform.OS === 'windows') {
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

let lastUpdateTime: number;
export async function getLastUpdateTime() {
  if (!lastUpdateTime) {
    if (Platform.OS === 'android') {
      lastUpdateTime = await RNDeviceInfo.getLastUpdateTime();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export function getLastUpdateTimeSync() {
  if (!lastUpdateTime) {
    if (Platform.OS === 'android') {
      lastUpdateTime = RNDeviceInfo.getLastUpdateTimeSync();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export async function getPhoneNumber() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getPhoneNumber();
  }
  return 'unknown';
}

export function getPhoneNumberSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getPhoneNumberSync();
  }
  return 'unknown';
}

export async function getCarrier() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.getCarrier();
  }
  return 'unknown';
}

export function getCarrierSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.getCarrierSync();
  }
  return 'unknown';
}

let totalMemory: number;
export async function getTotalMemory() {
  if (!totalMemory) {
    if (
      Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      Platform.OS === 'windows' ||
      Platform.OS === 'web'
    ) {
      totalMemory = await RNDeviceInfo.getTotalMemory();
    } else {
      totalMemory = -1;
    }
  }
  return totalMemory;
}

export function getTotalMemorySync() {
  if (!totalMemory) {
    if (
      Platform.OS === 'android' ||
      Platform.OS === 'ios' ||
      Platform.OS === 'windows' ||
      Platform.OS === 'web'
    ) {
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
    if (Platform.OS === 'android' || Platform.OS === 'windows' || Platform.OS === 'web') {
      maxMemory = await RNDeviceInfo.getMaxMemory();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export function getMaxMemorySync() {
  if (!maxMemory) {
    if (Platform.OS === 'android' || Platform.OS === 'windows' || Platform.OS === 'web') {
      maxMemory = RNDeviceInfo.getMaxMemorySync();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export async function getTotalDiskCapacity() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.getTotalDiskCapacity();
  }
  return -1;
}

export function getTotalDiskCapacitySync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.getTotalDiskCapacitySync();
  }
  return -1;
}

export async function getFreeDiskStorage() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.getFreeDiskStorage();
  }
  return -1;
}

export function getFreeDiskStorageSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.getFreeDiskStorageSync();
  }
  return -1;
}

export async function getBatteryLevel() {
  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    Platform.OS === 'windows' ||
    Platform.OS === 'web'
  ) {
    return RNDeviceInfo.getBatteryLevel();
  }
  return -1;
}

export function getBatteryLevelSync() {
  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    Platform.OS === 'windows' ||
    Platform.OS === 'web'
  ) {
    return RNDeviceInfo.getBatteryLevelSync();
  }
  return -1;
}

export async function getPowerState() {
  if (Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'web') {
    return RNDeviceInfo.getPowerState();
  }
  return {};
}

export function getPowerStateSync() {
  if (Platform.OS === 'ios' || Platform.OS === 'android' || Platform.OS === 'web') {
    return RNDeviceInfo.getPowerStateSync();
  }
  return {};
}

export async function isBatteryCharging() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.isBatteryCharging();
  }
  return false;
}

export function isBatteryChargingSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
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
  if (Platform.OS === 'android' || Platform.OS === 'web') {
    return RNDeviceInfo.isAirplaneMode();
  }
  return Promise.resolve(false);
}

export function isAirplaneModeSync() {
  if (Platform.OS === 'android' || Platform.OS === 'web') {
    return RNDeviceInfo.isAirplaneModeSync();
  }
  return false;
}

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

let _supportedAbis: string[];
export async function supportedAbis() {
  if (!_supportedAbis) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      _supportedAbis = await RNDeviceInfo.getSupportedAbis();
    } else {
      _supportedAbis = [];
    }
  }
  return _supportedAbis;
}

export function supportedAbisSync() {
  if (!_supportedAbis) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
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

let _supported64BitAbis: string[];
export async function supported64BitAbis() {
  if (!_supported64BitAbis) {
    if (Platform.OS === 'android') {
      _supported64BitAbis = await RNDeviceInfo.getSupported64BitAbis();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

export function supported64BitAbisSync() {
  if (!_supported64BitAbis) {
    if (Platform.OS === 'android') {
      _supported64BitAbis = RNDeviceInfo.getSupported64BitAbisSync();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

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

export async function getSystemAvailableFeatures() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getSystemAvailableFeatures();
  }
  return [];
}

export function getSystemAvailableFeaturesSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getSystemAvailableFeaturesSync();
  }
  return [];
}

export async function isLocationEnabled() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.isLocationEnabled();
  }
  return false;
}

export function isLocationEnabledSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
    return RNDeviceInfo.isLocationEnabledSync();
  }
  return false;
}

export async function isHeadphonesConnected() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.isHeadphonesConnected();
  }
  return false;
}

export function isHeadphonesConnectedSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.isHeadphonesConnectedSync();
  }
  return false;
}

export async function getAvailableLocationProviders() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.getAvailableLocationProviders();
  }
  return {};
}

export function getAvailableLocationProvidersSync() {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return RNDeviceInfo.getAvailableLocationProvidersSync();
  }
  return {};
}

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
  getFreeDiskStorageSync,
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
  syncUniqueId,
  useBatteryLevel,
  useBatteryLevelIsLow,
  useDeviceName,
  useFirstInstallTime,
  useHasSystemFeature,
  useIsEmulator,
  usePowerState,
};

export default deviceInfoModule;
