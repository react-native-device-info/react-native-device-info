import { Platform } from 'react-native';
import type {
  DeviceType,
  LocationProviderInfo,
  PowerState,
  AsyncHookResult,
  AvailableCapacityType,
  AppSetIdInfo,
} from './types';

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
  isLowRamDevice: boolean;
  isDisplayZoomed: boolean;
  model: string;
  systemName: string;
  systemVersion: string;
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
  getFreeDiskStorage: (storageType?: AvailableCapacityType) => Promise<number>;
  getFreeDiskStorageOld: () => Promise<number>;
  getFreeDiskStorageSync: (storageType?: AvailableCapacityType) => number;
  getFreeDiskStorageOldSync: () => number;
  getHardware: () => Promise<string>;
  getHardwareSync: () => string;
  getHost: () => Promise<string>;
  getHostSync: () => string;
  getHostNames: () => Promise<string[]>;
  getHostNamesSync: () => string[];
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
  getPreviewSdkInt: () => Promise<number>;
  getPreviewSdkIntSync: () => number;
  getProduct: () => Promise<string>;
  getProductSync: () => string;
  getSecurityPatch: () => Promise<string>;
  getSecurityPatchSync: () => string;
  getSerialNumber: () => Promise<string>;
  getSerialNumberSync: () => string;
  getStartupTime: () => Promise<number>;
  getStartupTimeSync: () => number;
  getSystemAvailableFeatures: () => Promise<string[]>;
  getSystemAvailableFeaturesSync: () => string[];
  getTags: () => Promise<string>;
  getTagsSync: () => string;
  getTotalDiskCapacity: () => Promise<number>;
  getTotalDiskCapacityOld: () => Promise<number>;
  getTotalDiskCapacitySync: () => number;
  getTotalDiskCapacityOldSync: () => number;
  getTotalMemory: () => Promise<number>;
  getTotalMemorySync: () => number;
  getType: () => Promise<string>;
  getTypeSync: () => string;
  getUniqueId: () => Promise<string>;
  getUniqueIdSync: () => string;
  getUsedMemory: () => Promise<number>;
  getUsedMemorySync: () => number;
  getUserAgent: () => Promise<string>;
  getUserAgentSync: () => string;
  getBrightness: () => Promise<number>;
  getBrightnessSync: () => number;
  hasGms: () => Promise<boolean>;
  hasGmsSync: () => boolean;
  hasHms: () => Promise<boolean>;
  hasHmsSync: () => boolean;
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
  isWiredHeadphonesConnected: () => Promise<boolean>;
  isWiredHeadphonesConnectedSync: () => boolean;
  isBluetoothHeadphonesConnected: () => Promise<boolean>;
  isBluetoothHeadphonesConnectedSync: () => boolean;
  isLocationEnabled: () => Promise<boolean>;
  isLocationEnabledSync: () => boolean;
  isPinOrFingerprintSet: () => Promise<boolean>;
  isPinOrFingerprintSetSync: () => boolean;
  isMouseConnected: () => Promise<boolean>;
  isMouseConnectedSync: () => boolean;
  isKeyboardConnected: () => Promise<boolean>;
  isKeyboardConnectedSync: () => boolean;
  isTabletMode: () => Promise<boolean>;
  syncUniqueId: () => Promise<string>;
  getSupportedMediaTypeList: () => Promise<string[]>;
  getSupportedMediaTypeListSync: () => string[];
  getAppSetId: () => Promise<AppSetIdInfo>;
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
  getPowerState: () => Promise<Partial<PowerState>>;
  getPowerStateSync: () => Partial<PowerState>;
  getReadableVersion: () => string;
  getSystemName: () => string;
  getSystemVersion: () => string;
  getUniqueId: () => Promise<string>;
  getUniqueIdSync: () => string;
  getVersion: () => string;
  hasNotch: () => boolean;
  hasDynamicIsland: () => boolean;
  hasSystemFeature: (feature: string) => Promise<boolean>;
  hasSystemFeatureSync: (feature: string) => boolean;
  isLandscape: () => Promise<boolean>;
  isLandscapeSync: () => boolean;
  isTablet: () => boolean;
  isLowRamDevice: () => boolean;
  isDisplayZoomed: () => boolean;
  supported32BitAbis: () => Promise<string[]>;
  supported32BitAbisSync: () => string[];
  supported64BitAbis: () => Promise<string[]>;
  supported64BitAbisSync: () => string[];
  supportedAbis: () => Promise<string[]>;
  supportedAbisSync: () => string[];
  /**
   * React hook that streams battery level updates emitted by the native module.
   *
   * @example
   * ```tsx
   * const level = useBatteryLevel();
   * ```
   */
  useBatteryLevel: () => number | null;
  /**
   * React hook that notifies when the battery crosses the low-level threshold.
   *
   * @example
   * ```tsx
   * const level = useBatteryLevelIsLow();
   * ```
   */
  useBatteryLevelIsLow: () => number | null;
  /**
   * React hook that resolves with the human-readable device name when it becomes available.
   *
   * @example
   * ```tsx
   * const { result: name } = useDeviceName();
   * ```
   */
  useDeviceName: () => AsyncHookResult<string>;
  /**
   * React hook that exposes the app's first install timestamp once it is retrieved.
   *
   * @example
   * ```tsx
   * const { result } = useFirstInstallTime();
   * ```
   */
  useFirstInstallTime: () => AsyncHookResult<number>;
  /**
   * React hook that checks for an Android system feature and keeps the result cached.
   *
   * @example
   * ```tsx
   * const { result } = useHasSystemFeature('android.hardware.location.gps');
   * ```
   */
  useHasSystemFeature: (feature: string) => AsyncHookResult<boolean>;
  /**
   * React hook that resolves as soon as the emulator detection result is known.
   *
   * @example
   * ```tsx
   * const { result: emulator } = useIsEmulator();
   * ```
   */
  useIsEmulator: () => AsyncHookResult<boolean>;
  /**
   * React hook that subscribes to power state changes and returns a partial {@link PowerState}.
   *
   * @example
   * ```tsx
   * const powerState = usePowerState();
   * ```
   */
  usePowerState: () => Partial<PowerState>;
  /**
   * React hook that resolves to the device manufacturer string.
   *
   * @example
   * ```tsx
   * const { result: manufacturer } = useManufacturer();
   * ```
   */
  useManufacturer: () => AsyncHookResult<string>;
  /**
   * React hook that resolves to true whenever any headphones are connected.
   *
   * @example
   * ```tsx
   * const { result: connected } = useIsHeadphonesConnected();
   * ```
   */
  useIsHeadphonesConnected: () => AsyncHookResult<boolean>;
  /**
   * React hook that resolves to true whenever wired headphones are connected.
   *
   * @example
   * ```tsx
   * const { result } = useIsWiredHeadphonesConnected();
   * ```
   */
  useIsWiredHeadphonesConnected: () => AsyncHookResult<boolean>;
  /**
   * React hook that resolves to true whenever Bluetooth headphones are connected.
   *
   * @example
   * ```tsx
   * const { result } = useIsBluetoothHeadphonesConnected();
   * ```
   */
  useIsBluetoothHeadphonesConnected: () => AsyncHookResult<boolean>;
  /**
   * React hook that subscribes to screen brightness updates on iOS.
   *
   * @example
   * ```tsx
   * const brightness = useBrightness();
   * ```
   */
  useBrightness: () => number | null;
  getAppSetId: () => Promise<AppSetIdInfo>;
}

export type Getter<T> = (...args: any[]) => T;
export type PlatformArray = typeof Platform.OS[];

export interface GetSupportedPlatformInfoSyncParams<T> {
  getter: Getter<T>;
  supportedPlatforms: PlatformArray;
  defaultValue: T;
  memoKey?: string;
}

export interface GetSupportedPlatformInfoAsyncParams<T>
  extends Omit<GetSupportedPlatformInfoSyncParams<T>, 'getter'> {
  getter: Getter<Promise<T>>;
}

export interface GetFilterPlatformFunctionsParams<T>
  extends GetSupportedPlatformInfoAsyncParams<T> {
  syncGetter: Getter<T>;
}

export interface GetSupportedPlatformInfoFunctionsParams<T>
  extends GetSupportedPlatformInfoAsyncParams<T> {
  syncGetter: Getter<T>;
}
