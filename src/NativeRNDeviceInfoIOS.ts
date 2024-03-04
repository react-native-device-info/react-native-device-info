import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type LocationProviderInfo = {
  [key: string]: boolean;
};

export type BatteryState = 'unknown' | 'unplugged' | 'charging' | 'full';

export type PowerState = {
  batteryLevel: number;
  batteryState: BatteryState;
  lowPowerMode: boolean;
  [key: string]: string | number | boolean;
};

export interface Spec extends TurboModule {
  readonly getConstants: () => {
    appName: string;
    appVersion: string;
    brand: string;
    buildNumber: string;
    bundleId: string;
    deviceId: string;
    deviceType: string;
    isTablet: boolean;
    isDisplayZoomed: boolean;
    model: string;
    systemName: string;
    systemVersion: string;
  };
  getAvailableLocationProviders: () => Promise<LocationProviderInfo>;
  getAvailableLocationProvidersSync: () => LocationProviderInfo;
  getBatteryLevel: () => Promise<number>;
  getBatteryLevelSync: () => number;
  getBuildId: () => Promise<string>;
  getBuildIdSync: () => string;
  getCarrier: () => Promise<string>;
  getCarrierSync: () => string;
  getDeviceName: () => Promise<string>;
  getDeviceNameSync: () => string;
  getDeviceToken: () => Promise<string>;
  getFirstInstallTime: () => Promise<number>;
  getFirstInstallTimeSync: () => number;
  getFontScale: () => Promise<number>;
  getFontScaleSync: () => number;
  getFreeDiskStorage: () => Promise<number>;
  getFreeDiskStorageSync: () => number;
  getInstallerPackageName: () => Promise<string>;
  getInstallerPackageNameSync: () => string;
  getIpAddress: () => Promise<string>;
  getIpAddressSync: () => string;
  getTotalDiskCapacity: () => Promise<number>;
  getTotalDiskCapacitySync: () => number;
  getTotalMemory: () => Promise<number>;
  getTotalMemorySync: () => number;
  getUniqueId: () => Promise<string>;
  getUniqueIdSync: () => string;
  getUsedMemory: () => Promise<number>;
  getUsedMemorySync: () => number;
  getUserAgent: () => Promise<string>;
  getBrightness: () => Promise<number>;
  getBrightnessSync: () => number;
  isBatteryCharging: () => Promise<boolean>;
  isBatteryChargingSync: () => boolean;
  isEmulator: () => Promise<boolean>;
  isEmulatorSync: () => boolean;
  isHeadphonesConnected: () => Promise<boolean>;
  isHeadphonesConnectedSync: () => boolean;
  isLocationEnabled: () => Promise<boolean>;
  isLocationEnabledSync: () => boolean;
  isPinOrFingerprintSet: () => Promise<boolean>;
  isPinOrFingerprintSetSync: () => boolean;
  isWiredHeadphonesConnected: () => Promise<boolean>;
  isWiredHeadphonesConnectedSync: () => boolean;
  isBluetoothHeadphonesConnected: () => Promise<boolean>;
  isBluetoothHeadphonesConnectedSync: () => boolean;
  syncUniqueId: () => Promise<string>;
  getPowerState: () => Promise<PowerState>;
  getPowerStateSync: () => PowerState;
  getSupportedAbis: () => Promise<string[]>;
  getSupportedAbisSync: () => string[];
  addListener: (eventName: string) => void;
  removeListeners: (count: number) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNDeviceInfo') as Spec;
