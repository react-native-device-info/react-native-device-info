// should be imported this way:
// import DeviceInfo from 'react-native-device-info';

export type DeviceType = 'Handset' | 'Tablet' | 'Tv' | 'Unknown';

export type BatteryState = 'unknown' | 'unplugged' | 'charging' | 'full';

export interface PowerState {
  batteryLevel: number;
  batteryState: BatteryState;
  lowPowerMode: boolean;
  [key: string]: any;
}

export interface LocationProviderInfo {
  [key: string]: boolean;
}

declare const _default: {
  getUniqueID: () => Promise<string>;
  getManufacturer: () => Promise<string>;
  getBrand: () => Promise<string>;
  getModel: () => Promise<string>;
  getDeviceId: () => Promise<string>;
  getSystemName: () => Promise<string>;
  getSystemVersion: () => Promise<string>;
  getBuildId: () => Promise<string>;
  getBundleId: () => Promise<string>;
  getApplicationName: () => Promise<string>;
  getBuildNumber: () => Promise<string>;
  getVersion: () => Promise<string>;
  getReadableVersion: () => Promise<string>;
  getDeviceName: () => Promise<string>;
  getUsedMemory: () => Promise<number>;
  getUserAgent: () => Promise<string>;
  getInstanceID: () => Promise<string>;
  getInstallReferrer: () => string | null;
  isEmulator: () => Promise<boolean>;
  isTablet: () => Promise<boolean>;
  getFontScale: () => Promise<number>;
  getBootloader: () => Promise<string>;
  getDevice: () => Promise<string>;
  getDisplay: () => Promise<string>;
  getFingerprint: () => Promise<string>;
  getHardware: () => Promise<string>;
  getHost: () => Promise<string>;
  getProduct: () => Promise<string>;
  getTags: () => Promise<string>;
  getType: () => Promise<string>;
  getBaseOS: () => Promise<string>;
  getPreviewSdkInt: () => Promise<number>;
  getSecurityPatch: () => Promise<string>;
  getCodename: () => Promise<string>;
  getIncremental: () => Promise<string>;
  isPinOrFingerprintSet(): () => Promise<boolean>
  hasNotch: () => Promise<boolean>;
  getFirstInstallTime: () => Promise<number>;
  getLastUpdateTime: () => Promise<number>;
  getSerialNumber: () => Promise<string>;
  getIPAddress: () => Promise<string>;
  getCameraPresence: () => Promise<boolean>;
  getMACAddress: () => Promise<string>;
  getPhoneNumber: () => Promise<string>;
  getAPILevel: () => Promise<number>;
  getCarrier: () => Promise<string>;
  getTotalMemory: () => Promise<number>;
  getMaxMemory: () => Promise<number>;
  getTotalDiskCapacity: () => Promise<number>;
  getFreeDiskStorage: () => Promise<number>;
  getBatteryLevel: () => Promise<number>;
  getPowerState: () => Promise<PowerState>;
  isBatteryCharging: () => Promise<boolean>;
  isLandscape: () => Promise<boolean>;
  isAirPlaneMode: () => Promise<boolean>;
  getDeviceType: () => Promise<DeviceType>;
  supportedAbis: () => Promise<string[]>;
  supported32BitAbis: () => Promise<string[]>;
  supported64BitAbis: () => Promise<string[]>;
  hasSystemFeature: (feature: string) => Promise<boolean>;
  getSystemAvailableFeatures: () => Promise<string[]>;
  isLocationEnabled: () => Promise<boolean>;
  getAvailableLocationProviders: () => Promise<LocationProviderInfo>;
};

export default _default;
