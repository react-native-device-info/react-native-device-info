import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

type BatteryState = 'unknown' | 'unplugged' | 'charging' | 'full';
type DeviceType = 'Handset' | 'Tablet' | 'Tv' | 'Desktop' | 'GamingConsole' | 'unknown';
type PowerState = {
  batteryLevel: number;
  batteryState: BatteryState;
  lowPowerMode: boolean;
  [key: string]: unknown;
};
type LocationProviderInfo = { [key: string]: boolean };

export interface Spec extends TurboModule {
  getDeviceNameSync(): string;
  getDeviceName(): Promise<string>;
  getCarrierSync(): string;
  getCarrier(): Promise<string>;
  getBuildIdSync(): string;
  getBuildId(): Promise<string>;
  getUniqueId(): Promise<string>;
  getUniqueIdSync(): string;
  syncUniqueId(): Promise<string>;
  isEmulator(): Promise<boolean>;
  isEmulatorSync(): boolean;
  getDeviceToken(): Promise<string>;
  getFontScale(): Promise<number>;
  getFontScaleSync(): number;
  getTotalMemory(): Promise<number>;
  getTotalMemorySync(): number;
  getTotalDiskCapacity(): Promise<number>;
  getTotalDiskCapacitySync(): number;
  getFreeDiskStorage(): Promise<number>;
  getFreeDiskStorageSync(): number;
  getSupportedAbis(): Promise<Array<string>>;
  getSupportedAbisSync(): Array<string>;
  getIpAddressSync(): string;
  getIpAddress(): Promise<string>;
  isPinOrFingerprintSetSync(): boolean;
  isPinOrFingerprintSet(): Promise<boolean>;
  getPowerStateSync(): PowerState;
  getPowerState(): Promise<PowerState>;
  getBatteryLevelSync(): number;
  getBatteryLevel(): Promise<number>;
  isBatteryChargingSync(): boolean;
  isBatteryCharging(): Promise<boolean>;
  isLocationEnabledSync(): boolean;
  isLocationEnabled(): Promise<boolean>;
  isHeadphonesConnectedSync(): boolean;
  isHeadphonesConnected(): Promise<boolean>;
  getUsedMemorySync(): number;
  getUsedMemory(): Promise<number>;
  getUserAgent(): Promise<string>;
  getAvailableLocationProviders(): Promise<LocationProviderInfo>;
  getAvailableLocationProvidersSync(): LocationProviderInfo;
  getInstallerPackageName(): Promise<string>;
  getInstallerPackageNameSync(): string;
  getBrightness(): Promise<number>;
  getBrightnessSync(): number;
  getFirstInstallTime(): Promise<number>;
  getFirstInstallTimeSync(): number;
  getConstants(): {
    appName: string;
    appVersion: string;
    brand: string;
    buildNumber: string;
    bundleId: string;
    deviceId: string;
    deviceType: DeviceType;
    isTablet: boolean;
    isLowRamDevice: boolean;
    isDisplayZoomed: boolean;
    model: string;
    systemName: string;
    systemVersion: string;
  };
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNDeviceInfo');
