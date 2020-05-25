import { DeviceType, LocationProviderInfo, PowerState, AsyncHookResult } from './types';

export type NotchDevice = {
  brand: string;
  model: string;

  [key: string]: string;
};

interface NativeConstants {
  appName: string;
  appVersion: string;
  brand: string;
  buildNumber: string;
  bundleId: string;
  deviceId: string;
  deviceType: DeviceType;
  isTablet: boolean;
  model: string;
  systemName: string;
  systemVersion: string;
  uniqueId: string;
}

interface HiddenNativeMethods {
  getPowerState: () => Promise<PowerState>;
  getPowerStateSync: () => PowerState;
  getSupported32BitAbis: () => Promise<string[]>;
  getSupported32BitAbisSync: () => string[];
  getSupported64BitAbis: () => Promise<string[]>;
  getSupported64BitAbisSync: () => string[];
  getSupportedAbis: () => Promise<string[]>;
  getSupportedAbisSync: () => string[];
  getSystemManufacturer: () => Promise<string>;
  getSystemManufacturerSync: () => string;
}

interface ExposedNativeMethods {
  getAndroidId: () => Promise<string>;
  getAndroidIdSync: () => string;
  getApiLevel: () => Promise<number>;
  getApiLevelSync: () => number;
  getAvailableLocationProviders: () => Promise<LocationProviderInfo>;
  getAvailableLocationProvidersSync: () => LocationProviderInfo;
  getBaseOs: () => Promise<string>;
  getBaseOsSync: () => string;
  getBatteryLevel: () => Promise<number>;
  getBatteryLevelSync: () => number;
  getBootloader: () => Promise<string>;
  getBootloaderSync: () => string;
  getBuildId: () => Promise<string>;
  getBuildIdSync: () => string;
  getCarrier: () => Promise<string>;
  getCarrierSync: () => string;
  getCodename: () => Promise<string>;
  getCodenameSync: () => string;
  getDevice: () => Promise<string>;
  getDeviceName: () => Promise<string>;
  getDeviceNameSync: () => string;
  getDeviceSync: () => string;
  getDeviceToken: () => Promise<string>;
  getDisplay: () => Promise<string>;
  getDisplaySync: () => string;
  getFingerprint: () => Promise<string>;
  getFingerprintSync: () => string;
  getFirstInstallTime: () => Promise<number>;
  getFirstInstallTimeSync: () => number;
  getFontScale: () => Promise<number>;
  getFontScaleSync: () => number;
  getFreeDiskStorage: () => Promise<number>;
  getFreeDiskStorageSync: () => number;
  getHardware: () => Promise<string>;
  getHardwareSync: () => string;
  getHost: () => Promise<string>;
  getHostSync: () => string;
  getIncremental: () => Promise<string>;
  getIncrementalSync: () => string;
  getInstallerPackageName: () => Promise<string>;
  getInstallerPackageNameSync: () => string;
  getInstallReferrer: () => Promise<string>;
  getInstallReferrerSync: () => string;
  getInstanceId: () => Promise<string>;
  getInstanceIdSync: () => string;
  getIpAddress: () => Promise<string>;
  getIpAddressSync: () => string;
  getLastUpdateTime: () => Promise<number>;
  getLastUpdateTimeSync: () => number;
  getMacAddress: () => Promise<string>;
  getMacAddressSync: () => string;
  getMaxMemory: () => Promise<number>;
  getMaxMemorySync: () => number;
  getPhoneNumber: () => Promise<string>;
  getPhoneNumberSync: () => string;
  getPreviewSdkInt: () => Promise<number>;
  getPreviewSdkIntSync: () => number;
  getProduct: () => Promise<string>;
  getProductSync: () => string;
  getSecurityPatch: () => Promise<string>;
  getSecurityPatchSync: () => string;
  getSerialNumber: () => Promise<string>;
  getSerialNumberSync: () => string;
  getSystemAvailableFeatures: () => Promise<string[]>;
  getSystemAvailableFeaturesSync: () => string[];
  getTags: () => Promise<string>;
  getTagsSync: () => string;
  getTotalDiskCapacity: () => Promise<number>;
  getTotalDiskCapacitySync: () => number;
  getTotalMemory: () => Promise<number>;
  getTotalMemorySync: () => number;
  getType: () => Promise<string>;
  getTypeSync: () => string;
  getUsedMemory: () => Promise<number>;
  getUsedMemorySync: () => number;
  getUserAgent: () => Promise<string>;
  getUserAgentSync: () => string;
  hasSystemFeature: (feature: string) => Promise<boolean>;
  hasSystemFeatureSync: (feature: string) => boolean;
  isAirplaneMode: () => Promise<boolean>;
  isAirplaneModeSync: () => boolean;
  isBatteryCharging: () => Promise<boolean>;
  isBatteryChargingSync: () => boolean;
  isCameraPresent: () => Promise<boolean>;
  isCameraPresentSync: () => boolean;
  isEmulator: () => Promise<boolean>;
  isEmulatorSync: () => boolean;
  isHeadphonesConnected: () => Promise<boolean>;
  isHeadphonesConnectedSync: () => boolean;
  isLocationEnabled: () => Promise<boolean>;
  isLocationEnabledSync: () => boolean;
  isPinOrFingerprintSet: () => Promise<boolean>;
  isPinOrFingerprintSetSync: () => boolean;
  syncUniqueId: () => Promise<string>;
}

export interface DeviceInfoNativeModule
  extends NativeConstants,
    HiddenNativeMethods,
    ExposedNativeMethods {}

export interface DeviceInfoModule extends ExposedNativeMethods {
  getApplicationName: () => string;
  getBrand: () => string;
  getBuildNumber: () => string;
  getBundleId: () => string;
  getDeviceId: () => string;
  getDeviceType: () => string;
  getManufacturer: () => Promise<string>;
  getManufacturerSync: () => string;
  getModel: () => string;
  getPowerState: () => Promise<PowerState | {}>;
  getPowerStateSync: () => PowerState | {};
  getReadableVersion: () => string;
  getSystemName: () => string;
  getSystemVersion: () => string;
  getUniqueId: () => string;
  getVersion: () => string;
  hasNotch: () => boolean;
  hasSystemFeature: (feature: string) => Promise<boolean>;
  hasSystemFeatureSync: (feature: string) => boolean;
  isLandscape: () => Promise<boolean>;
  isLandscapeSync: () => boolean;
  isTablet: () => boolean;
  supported32BitAbis: () => Promise<string[]>;
  supported32BitAbisSync: () => string[];
  supported64BitAbis: () => Promise<string[]>;
  supported64BitAbisSync: () => string[];
  supportedAbis: () => Promise<string[]>;
  supportedAbisSync: () => string[];
  useBatteryLevel: () => number | null;
  useBatteryLevelIsLow: () => number | null;
  useDeviceName: () => AsyncHookResult<string>;
  useFirstInstallTime: () => AsyncHookResult<number>;
  useHasSystemFeature: (feature: string) => AsyncHookResult<boolean>;
  useIsEmulator: () => AsyncHookResult<boolean>;
  usePowerState: () => PowerState | {};
}
