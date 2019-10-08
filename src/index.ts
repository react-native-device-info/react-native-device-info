import { Platform, Dimensions } from 'react-native';
import RNDeviceInfo from './internal/nativeInterface';
import devicesWithNotch from './internal/devicesWithNotch';
import { DeviceType } from './internal/types';

const OS = Platform.OS;

let uniqueId: string;
export function getUniqueId() {
  if (!uniqueId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      uniqueId = RNDeviceInfo.uniqueId
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
  if (OS === 'android' || OS === 'windows') {
    return RNDeviceInfo.isCameraPresent();
  }
  return false;
}

export function isCameraPresentSync() {
  if (OS === 'android' || OS === 'windows') {
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

export async function getReadableVersion() {
  return (await getVersion()) + '.' + (await getBuildNumber());
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

export async function getUsedMemory() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getUsedMemory();
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
  return Promise.resolve('unknown');
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

let baseOs: string;
export async function getBaseOs() {
  if (!baseOs) {
    if (OS === 'android') {
      baseOs = await RNDeviceInfo.getBaseOs();
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

export async function isPinOrFingerprintSet() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.isPinOrFingerprintSet();
  }
  return Promise.resolve(false);
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

let installReferrer: string;
export async function getInstallReferrer() {
  if (!installReferrer) {
    if (OS === 'android') {
      installReferrer = await RNDeviceInfo.getInstallReferrer();
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

export async function getPhoneNumber() {
  if (OS === 'android') {
    return RNDeviceInfo.getPhoneNumber();
  }
  return Promise.resolve('unknown');
}

export async function getCarrier() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getCarrier();
  }
  return Promise.resolve('unknown');
}

let totalMemory: number;
export async function getTotalMemory() {
  if (!totalMemory) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      totalMemory = await RNDeviceInfo.getTotalMemory();
    } else {
      totalMemory = -1;
    }
  }
  return totalMemory;
}

let maxMemory: number;
export async function getMaxMemory() {
  if (!maxMemory) {
    if (OS === 'android' || OS === 'windows') {
      maxMemory = await RNDeviceInfo.getMaxMemory();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export async function getTotalDiskCapacity() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getTotalDiskCapacity();
  }
  return Promise.resolve(-1);
}

export async function getFreeDiskStorage() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getFreeDiskStorage();
  }
  return Promise.resolve(-1);
}

export async function getBatteryLevel() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.getBatteryLevel();
  }
  return Promise.resolve(-1);
}

export async function getPowerState() {
  if (OS === 'ios' || OS === 'android') {
    return RNDeviceInfo.getPowerState();
  }
  return Promise.resolve({});
}

export async function isBatteryCharging() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isBatteryCharging();
  }
  return Promise.resolve(false);
}

export async function isLandscape() {
  return Promise.resolve(isLandscapeSync());
}

function isLandscapeSync() {
  const { height, width } = Dimensions.get('window');
  return width >= height;
}

export async function isAirplaneMode() {
  if (OS === 'android') {
    return RNDeviceInfo.isAirplaneMode();
  }
  return Promise.resolve(false);
}

let deviceType: DeviceType;
export async function getDeviceType() {
  if (!deviceType) {
    if (OS === 'android' || OS === 'ios') {
      deviceType = await RNDeviceInfo.getDeviceType();
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

export async function hasSystemFeature(feature: string) {
  if (OS === 'android') {
    return RNDeviceInfo.hasSystemFeature(feature);
  }
  return Promise.resolve(false);
}

export async function getSystemAvailableFeatures() {
  if (OS === 'android') {
    return RNDeviceInfo.getSystemAvailableFeatures();
  }
  return Promise.resolve([]);
}

export async function isLocationEnabled() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isLocationEnabled();
  }
  return Promise.resolve(false);
}

export async function getAvailableLocationProviders() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getAvailableLocationProviders();
  }
  return Promise.resolve({});
}

export default {
  getUniqueId,
  getInstanceId,
  getSerialNumber,
  getAndroidId,
  getIpAddress,
  getIpAddressSync,
  isCameraPresent,
  isCameraPresentSync,
  getMacAddress,
  getDeviceId,
  getManufacturer,
  getModel,
  getBrand,
  getSystemName,
  getSystemVersion,
  getBuildId,
  getApiLevel,
  getBundleId,
  getApplicationName,
  getBuildNumber,
  getVersion,
  getReadableVersion,
  getDeviceName,
  getUsedMemory,
  getUserAgent,
  getFontScale,
  getBootloader,
  getDevice,
  getDisplay,
  getFingerprint,
  getHardware,
  getHost,
  getProduct,
  getTags,
  getType,
  getBaseOs,
  getPreviewSdkInt,
  getSecurityPatch,
  getCodename,
  getIncremental,
  isEmulator,
  isPinOrFingerprintSet,
  hasNotch,
  getFirstInstallTime,
  getInstallReferrer,
  getLastUpdateTime,
  getPhoneNumber,
  getCarrier,
  getTotalMemory,
  getMaxMemory,
  getTotalDiskCapacity,
  getFreeDiskStorage,
  getBatteryLevel,
  getPowerState,
  isBatteryCharging,
  isLandscape,
  isAirplaneMode,
  getDeviceType,
  supportedAbis,
  supported32BitAbis,
  supported64BitAbis,
  hasSystemFeature,
  getSystemAvailableFeatures,
  isLocationEnabled,
  getAvailableLocationProviders,
};
