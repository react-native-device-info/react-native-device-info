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
  getUniqueID: () => string;
  getManufacturer: () => string;
  getBrand: () => string;
  getModel: () => string;
  getDeviceId: () => string;
  getSystemName: () => string;
  getSystemVersion: () => string;
  getBuildId: () => string;
  getBundleId: () => string;
  getApplicationName: () => string;
  getBuildNumber: () => string;
  getVersion: () => string;
  getReadableVersion: () => string;
  getDeviceName: () => string;
  getUserAgent: () => string;
  getDeviceLocale: () => string;
  getPreferredLocales: () => Array<string>;
  getDeviceCountry: () => string;
  getTimezone: () => string;
  getInstanceID: () => string;
  getInstallReferrer: () => string | null;
  isEmulator: () => boolean;
  isTablet: () => boolean;
  getFontScale: () => number;
  getBootloader: () => string;
  getDevice: () => string;
  getDisplay: () => string;
  getFingerprint: () => string;
  getHardware: () => string;
  getHost: () => string;
  getProduct: () => string;
  getTags: () => string;
  getType: () => string;
  getBaseOS: () => string;
  getPreviewSdkInt: () => number;
  getSecurityPatch: () => string;
  getCodename: () => string;
  getIncremental: () => string;
  is24Hour: () => boolean;
  isPinOrFingerprintSet(): (
    cb: (isPinOrFingerprintSet: boolean) => void
  ) => void;
  hasNotch: () => boolean;
  getFirstInstallTime: () => number;
  getLastUpdateTime: () => number;
  getSerialNumber: () => string;
  getIPAddress: () => Promise<string>;
  getCameraPresence: () => Promise<boolean>;
  getMACAddress: () => Promise<string>;
  getPhoneNumber: () => string;
  getAPILevel: () => number;
  getCarrier: () => string;
  getTotalMemory: () => number;
  getMaxMemory: () => number;
  getTotalDiskCapacity: () => number;
  getFreeDiskStorage: () => number;
  getBatteryLevel: () => Promise<number>;
  getPowerState: () => Promise<PowerState>;
  isBatteryCharging: () => Promise<boolean>;
  isLandscape: () => boolean;
  isAirPlaneMode: () => Promise<boolean>;
  getDeviceType: () => DeviceType;
  isAutoDateAndTime: () => Promise<boolean>;
  isAutoTimeZone: () => Promise<boolean>;
  supportedABIs: () => string[];
  supported32BitAbis: () => string[];
  supported64BitAbis: () => string[];
  hasSystemFeature: (feature: string) => Promise<boolean>;
  getSystemAvailableFeatures: () => Promise<string[]>;
  isLocationEnabled: () => Promise<boolean>;
  getAvailableLocationProviders: () => Promise<LocationProviderInfo>;
};

export default _default;
