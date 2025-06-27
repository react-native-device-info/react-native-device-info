/* eslint-disable prettier/prettier */
// NativeRNDeviceInfo.ts

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getApplicationName(): string;
  getBaseOs(): Promise<string>;
  getBuildId(): Promise<string>;
  getBatteryLevel(): Promise<number>;
  getBrand(): string;
  getBuildNumber(): string;
  getBundleId(): string;
  isCameraPresent(): Promise<boolean>;
  getDeviceId(): string;
  getDeviceName(): Promise<string>;
  getFirstInstallTime(): Promise<number>;
  getFontScale(): Promise<number>;
  getFreeDiskStorage(): Promise<number>;
  getFreeDiskStorageOld(): Promise<number>;
  getHost(): Promise<string>;
  getHostNames(): Promise<string[]>;
  getIpAddress(): Promise<string>;
  getInstallerPackageName(): Promise<string>;
  getInstallReferrer(): Promise<string>;
  getManufacturer(): Promise<string>;
  getMaxMemory(): Promise<number>;
  getModel(): string;
  //getPowerState(): Promise<Record<string, unknown>>;
  getReadableVersion(): string;
  getSerialNumber(): Promise<string>;
  getSystemName(): string;
  getSystemVersion(): string;
  getTotalDiskCapacity(): Promise<number>;
  getTotalDiskCapacityOld(): Promise<number>;
  getUniqueId(): Promise<string>;
  getUsedMemory(): Promise<number>;
  getVersion(): string;
  hasNotch(): boolean;
  hasDynamicIsland(): boolean;
  isBatteryCharging(): Promise<boolean>;
  isEmulator(): Promise<boolean>;
  isKeyboardConnected(): Promise<boolean>;
  isLandscape(): Promise<boolean>;
  isMouseConnected(): Promise<boolean>
  isPinOrFingerprintSet(): Promise<boolean>;
  isTablet(): boolean;
  isTabletMode(): Promise<boolean>;
  supportedAbis(): Promise<string[]>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNDeviceInfo');
