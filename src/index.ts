import { useCallback, useEffect, useState } from 'react';
import { Dimensions, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { useOnEvent, useOnMount } from './internal/asyncHookWrappers';
import devicesWithNotch from './internal/devicesWithNotch';
import RNDeviceInfo from './internal/nativeInterface';
import {
  getSupportedPlatformInfoAsync,
  getSupportedPlatformInfoFunctions,
  getSupportedPlatformInfoSync,
} from './internal/supported-platform-info';
import { DeviceInfoModule } from './internal/privateTypes';
import type {
  AsyncHookResult,
  DeviceType,
  LocationProviderInfo,
  PowerState,
} from './internal/types';

export const getUniqueId = () =>
  getSupportedPlatformInfoSync({
    defaultValue: 'unknown',
    memoKey: 'uniqueId',
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.uniqueId,
  });

let uniqueId: string;
export async function syncUniqueId() {
  if (Platform.OS === 'ios') {
    uniqueId = await RNDeviceInfo.syncUniqueId();
  } else {
    uniqueId = getUniqueId();
  }
  return uniqueId;
}

export const [getInstanceId, getInstanceIdSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'instanceId',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getInstanceId(),
  syncGetter: () => RNDeviceInfo.getInstanceIdSync(),
  defaultValue: 'unknown',
});

export const [getSerialNumber, getSerialNumberSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'serialNumber',
  supportedPlatforms: ['android', 'windows'],
  getter: () => RNDeviceInfo.getSerialNumber(),
  syncGetter: () => RNDeviceInfo.getSerialNumberSync(),
  defaultValue: 'unknown',
});

export const [getAndroidId, getAndroidIdSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'androidId',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getAndroidId(),
  syncGetter: () => RNDeviceInfo.getAndroidIdSync(),
  defaultValue: 'unknown',
});

export const [getIpAddress, getIpAddressSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getIpAddress(),
  syncGetter: () => RNDeviceInfo.getIpAddressSync(),
  defaultValue: 'unknown',
});

export const [isCameraPresent, isCameraPresentSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.isCameraPresent(),
  syncGetter: () => RNDeviceInfo.isCameraPresentSync(),
  defaultValue: false,
});

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

export const getDeviceId = () =>
  getSupportedPlatformInfoSync({
    defaultValue: 'unknown',
    memoKey: 'deviceId',
    getter: () => RNDeviceInfo.deviceId,
    supportedPlatforms: ['android', 'ios', 'windows'],
  });

export const [getManufacturer, getManufacturerSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'manufacturer',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () =>
    Platform.OS == 'ios' ? Promise.resolve('Apple') : RNDeviceInfo.getSystemManufacturer(),
  syncGetter: () => (Platform.OS == 'ios' ? 'Apple' : RNDeviceInfo.getSystemManufacturerSync()),
  defaultValue: 'unknown',
});

export const getModel = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'model',
    defaultValue: 'unknown',
    supportedPlatforms: ['ios', 'android', 'windows'],
    getter: () => RNDeviceInfo.model,
  });

export const getBrand = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'brand',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.brand,
  });

export const getSystemName = () =>
  getSupportedPlatformInfoSync({
    defaultValue: 'unknown',
    supportedPlatforms: ['ios', 'android', 'windows'],
    memoKey: 'systemName',
    getter: () =>
      Platform.select({
        ios: RNDeviceInfo.systemName,
        android: 'Android',
        windows: 'Windows',
        default: 'unknown',
      }),
  });

export const getSystemVersion = () =>
  getSupportedPlatformInfoSync({
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.systemVersion,
    supportedPlatforms: ['android', 'ios', 'windows'],
    memoKey: 'systemVersion',
  });

export const [getBuildId, getBuildIdSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'buildId',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getBuildId(),
  syncGetter: () => RNDeviceInfo.getBuildIdSync(),
  defaultValue: 'unknown',
});

export const [getApiLevel, getApiLevelSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'apiLevel',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getApiLevel(),
  syncGetter: () => RNDeviceInfo.getApiLevelSync(),
  defaultValue: -1,
});

export const getBundleId = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'bundleId',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.bundleId,
  });

export const [
  getInstallerPackageName,
  getInstallerPackageNameSync,
] = getSupportedPlatformInfoFunctions({
  memoKey: 'installerPackageName',
  supportedPlatforms: ['android', 'windows', 'ios'],
  getter: () => RNDeviceInfo.getInstallerPackageName(),
  syncGetter: () => RNDeviceInfo.getInstallerPackageNameSync(),
  defaultValue: 'unknown',
});

export const getApplicationName = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'appName',
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.appName,
    supportedPlatforms: ['android', 'ios', 'windows'],
  });

export const getBuildNumber = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'buildNumber',
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.buildNumber,
    defaultValue: 'unknown',
  });

export const getVersion = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'version',
    defaultValue: 'unknown',
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.appVersion,
  });

export function getReadableVersion() {
  return getVersion() + '.' + getBuildNumber();
}

export const [getDeviceName, getDeviceNameSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'deviceName',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getDeviceName(),
  syncGetter: () => RNDeviceInfo.getDeviceNameSync(),
  defaultValue: 'unknown',
});

export const [getUsedMemory, getUsedMemorySync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getUsedMemory(),
  syncGetter: () => RNDeviceInfo.getUsedMemorySync(),
  defaultValue: -1,
});

export const getUserAgent = () =>
  getSupportedPlatformInfoAsync({
    memoKey: 'userAgent',
    defaultValue: 'unknown',
    supportedPlatforms: ['android', 'ios', 'web'],
    getter: () => RNDeviceInfo.getUserAgent(),
  });

export const getUserAgentSync = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'userAgent',
    defaultValue: 'unknown',
    supportedPlatforms: ['android', 'web'],
    getter: () => RNDeviceInfo.getUserAgentSync(),
  });

export const [getFontScale, getFontScaleSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getFontScale(),
  syncGetter: () => RNDeviceInfo.getFontScaleSync(),
  defaultValue: -1,
});

export const [getBootloader, getBootloaderSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'bootloader',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getBootloader(),
  syncGetter: () => RNDeviceInfo.getBootloaderSync(),
  defaultValue: 'unknown',
});

export const [getDevice, getDeviceSync] = getSupportedPlatformInfoFunctions({
  getter: () => RNDeviceInfo.getDevice(),
  syncGetter: () => RNDeviceInfo.getDeviceSync(),
  defaultValue: 'unknown',
  memoKey: 'device',
  supportedPlatforms: ['android'],
});

export const [getDisplay, getDisplaySync] = getSupportedPlatformInfoFunctions({
  memoKey: 'display',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getDisplay(),
  syncGetter: () => RNDeviceInfo.getDisplaySync(),
  defaultValue: 'unknown',
});

export const [getFingerprint, getFingerprintSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'fingerprint',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getFingerprint(),
  syncGetter: () => RNDeviceInfo.getFingerprintSync(),
  defaultValue: 'unknown',
});

export const [getHardware, getHardwareSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'hardware',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getHardware(),
  syncGetter: () => RNDeviceInfo.getHardwareSync(),
  defaultValue: 'unknown',
});

export const [getHost, getHostSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'host',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getHost(),
  syncGetter: () => RNDeviceInfo.getHostSync(),
  defaultValue: 'unknown',
});

export const [getProduct, getProductSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'product',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getProduct(),
  syncGetter: () => RNDeviceInfo.getProductSync(),
  defaultValue: 'unknown',
});

export const [getTags, getTagsSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'tags',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getTags(),
  syncGetter: () => RNDeviceInfo.getTagsSync(),
  defaultValue: 'unknown',
});

export const [getType, getTypeSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'type',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getType(),
  syncGetter: () => RNDeviceInfo.getTypeSync(),
  defaultValue: 'unknown',
});

export const [getBaseOs, getBaseOsSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'baseOs',
  supportedPlatforms: ['android', 'web', 'windows'],
  getter: () => RNDeviceInfo.getBaseOs(),
  syncGetter: () => RNDeviceInfo.getBaseOsSync(),
  defaultValue: 'unknown',
});

export const [getPreviewSdkInt, getPreviewSdkIntSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'previewSdkInt',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getPreviewSdkInt(),
  syncGetter: () => RNDeviceInfo.getPreviewSdkIntSync(),
  defaultValue: -1,
});

export const [getSecurityPatch, getSecurityPatchSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'securityPatch',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSecurityPatch(),
  syncGetter: () => RNDeviceInfo.getSecurityPatchSync(),
  defaultValue: 'unknown',
});

export const [getCodename, getCodenameSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'codeName',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getCodename(),
  syncGetter: () => RNDeviceInfo.getCodenameSync(),
  defaultValue: 'unknown',
});

export const [getIncremental, getIncrementalSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'incremental',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getIncremental(),
  syncGetter: () => RNDeviceInfo.getIncrementalSync(),
  defaultValue: 'unknown',
});

export const [isEmulator, isEmulatorSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'emulator',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.isEmulator(),
  syncGetter: () => RNDeviceInfo.isEmulatorSync(),
  defaultValue: false,
});

export const isTablet = () =>
  getSupportedPlatformInfoSync({
    defaultValue: false,
    supportedPlatforms: ['android', 'ios', 'windows'],
    memoKey: 'tablet',
    getter: () => RNDeviceInfo.isTablet,
  });

export const [isPinOrFingerprintSet, isPinOrFingerprintSetSync] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.isPinOrFingerprintSet(),
    syncGetter: () => RNDeviceInfo.isPinOrFingerprintSetSync(),
    defaultValue: false,
  }
);

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

export const [hasGms, hasGmsSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.hasGms(),
  syncGetter: () => RNDeviceInfo.hasGmsSync(),
  defaultValue: false,
});

export const [hasHms, hasHmsSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.hasHms(),
  syncGetter: () => RNDeviceInfo.hasHmsSync(),
  defaultValue: false,
});

export const [getFirstInstallTime, getFirstInstallTimeSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'firstInstallTime',
  supportedPlatforms: ['android', 'windows'],
  getter: () => RNDeviceInfo.getFirstInstallTime(),
  syncGetter: () => RNDeviceInfo.getFirstInstallTimeSync(),
  defaultValue: -1,
});

export const [getInstallReferrer, getInstallReferrerSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'installReferrer',
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.getInstallReferrer(),
  syncGetter: () => RNDeviceInfo.getInstallReferrerSync(),
  defaultValue: 'unknown',
});

export const [getLastUpdateTime, getLastUpdateTimeSync] = getSupportedPlatformInfoFunctions({
  memoKey: 'lastUpdateTime',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getLastUpdateTime(),
  syncGetter: () => RNDeviceInfo.getLastUpdateTimeSync(),
  defaultValue: -1,
});

export const [getPhoneNumber, getPhoneNumberSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getPhoneNumber(),
  syncGetter: () => RNDeviceInfo.getPhoneNumberSync(),
  defaultValue: 'unknown',
});

export const [getCarrier, getCarrierSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getCarrier(),
  syncGetter: () => RNDeviceInfo.getCarrierSync(),
  defaultValue: 'unknown',
});

export const [getTotalMemory, getTotalMemorySync] = getSupportedPlatformInfoFunctions({
  memoKey: 'totalMemory',
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getTotalMemory(),
  syncGetter: () => RNDeviceInfo.getTotalMemorySync(),
  defaultValue: -1,
});

export const [getMaxMemory, getMaxMemorySync] = getSupportedPlatformInfoFunctions({
  memoKey: 'maxMemory',
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.getMaxMemory(),
  syncGetter: () => RNDeviceInfo.getMaxMemorySync(),
  defaultValue: -1,
});

export const [getTotalDiskCapacity, getTotalDiskCapacitySync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getTotalDiskCapacity(),
  syncGetter: () => RNDeviceInfo.getTotalDiskCapacitySync(),
  defaultValue: -1,
});

export async function getTotalDiskCapacityOld() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getTotalDiskCapacityOld();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getTotalDiskCapacity();
  }

  return -1;
}

export function getTotalDiskCapacityOldSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getTotalDiskCapacityOldSync();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getTotalDiskCapacitySync();
  }

  return -1;
}

export const [getFreeDiskStorage, getFreeDiskStorageSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getFreeDiskStorage(),
  syncGetter: () => RNDeviceInfo.getFreeDiskStorageSync(),
  defaultValue: -1,
});

export async function getFreeDiskStorageOld() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getFreeDiskStorageOld();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getFreeDiskStorage();
  }

  return -1;
}

export function getFreeDiskStorageOldSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getFreeDiskStorageOldSync();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getFreeDiskStorageSync();
  }

  return -1;
}

export const [getBatteryLevel, getBatteryLevelSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getBatteryLevel(),
  syncGetter: () => RNDeviceInfo.getBatteryLevelSync(),
  defaultValue: -1,
});

export const [getPowerState, getPowerStateSync] = getSupportedPlatformInfoFunctions<
  Partial<PowerState>
>({
  supportedPlatforms: ['ios', 'android', 'windows', 'web'],
  getter: () => RNDeviceInfo.getPowerState(),
  syncGetter: () => RNDeviceInfo.getPowerStateSync(),
  defaultValue: {},
});

export const [isBatteryCharging, isBatteryChargingSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.isBatteryCharging(),
  syncGetter: () => RNDeviceInfo.isBatteryChargingSync(),
  defaultValue: false,
});

export async function isLandscape() {
  return Promise.resolve(isLandscapeSync());
}

export function isLandscapeSync() {
  const { height, width } = Dimensions.get('window');
  return width >= height;
}

export const [isAirplaneMode, isAirplaneModeSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'web'],
  getter: () => RNDeviceInfo.isAirplaneMode(),
  syncGetter: () => RNDeviceInfo.isAirplaneModeSync(),
  defaultValue: false,
});

export const getDeviceType = () => {
  return getSupportedPlatformInfoSync({
    memoKey: 'deviceType',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.deviceType,
  });
};

export const getDeviceTypeSync = () => {
  return getSupportedPlatformInfoSync({
    memoKey: 'deviceType',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.deviceType,
  });
};

export const [supportedAbis, supportedAbisSync] = getSupportedPlatformInfoFunctions({
  memoKey: '_supportedAbis',
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getSupportedAbis(),
  syncGetter: () => RNDeviceInfo.getSupportedAbisSync(),
  defaultValue: [] as string[],
});

export const [supported32BitAbis, supported32BitAbisSync] = getSupportedPlatformInfoFunctions({
  memoKey: '_supported32BitAbis',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSupported32BitAbis(),
  syncGetter: () => RNDeviceInfo.getSupported32BitAbisSync(),
  defaultValue: [] as string[],
});

export const [supported64BitAbis, supported64BitAbisSync] = getSupportedPlatformInfoFunctions({
  memoKey: '_supported64BitAbis',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSupported64BitAbis(),
  syncGetter: () => RNDeviceInfo.getSupported64BitAbisSync(),
  defaultValue: [],
});

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

export const [
  getSystemAvailableFeatures,
  getSystemAvailableFeaturesSync,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSystemAvailableFeatures(),
  syncGetter: () => RNDeviceInfo.getSystemAvailableFeaturesSync(),
  defaultValue: [] as string[],
});

export const [isLocationEnabled, isLocationEnabledSync] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'web'],
  getter: () => RNDeviceInfo.isLocationEnabled(),
  syncGetter: () => RNDeviceInfo.isLocationEnabledSync(),
  defaultValue: false,
});

export const [isHeadphonesConnected, isHeadphonesConnectedSync] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['android', 'ios'],
    getter: () => RNDeviceInfo.isHeadphonesConnected(),
    syncGetter: () => RNDeviceInfo.isHeadphonesConnectedSync(),
    defaultValue: false,
  }
);

export const [isMouseConnected, isMouseConnectedSync] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['windows'],
    getter: () => RNDeviceInfo.isMouseConnected(),
    syncGetter: () => RNDeviceInfo.isMouseConnectedSync(),
    defaultValue: false,
  }
);

export const [isKeyboardConnected, isKeyboardConnectedSync] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['windows'],
    getter: () => RNDeviceInfo.isKeyboardConnected(),
    syncGetter: () => RNDeviceInfo.isKeyboardConnectedSync(),
    defaultValue: false,
  }
);

export const isTabletMode = () => getSupportedPlatformInfoAsync(
  {
    supportedPlatforms: ['windows'],
    getter: () => RNDeviceInfo.isTabletMode(),
    defaultValue: false,
  }
);

export const [
  getAvailableLocationProviders,
  getAvailableLocationProvidersSync,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getAvailableLocationProviders(),
  syncGetter: () => RNDeviceInfo.getAvailableLocationProvidersSync(),
  defaultValue: {},
});

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

export function usePowerState(): Partial<PowerState> {
  const [powerState, setPowerState] = useState<Partial<PowerState>>({});

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: Partial<PowerState> = await getPowerState();
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

export function useIsHeadphonesConnected(): AsyncHookResult<boolean> {
  return useOnEvent('RNDeviceInfo_headphoneConnectionDidChange', isHeadphonesConnected, false);
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

export function useManufacturer(): AsyncHookResult<string> {
  return useOnMount(getManufacturer, 'unknown');
}

export type { AsyncHookResult, DeviceType, LocationProviderInfo, PowerState };

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
  getFreeDiskStorageOld,
  getFreeDiskStorageSync,
  getFreeDiskStorageOldSync,
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
  getTotalDiskCapacityOld,
  getTotalDiskCapacitySync,
  getTotalDiskCapacityOldSync,
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
  hasGms,
  hasGmsSync,
  hasHms,
  hasHmsSync,
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
  isMouseConnected,
  isMouseConnectedSync,
  isKeyboardConnected,
  isKeyboardConnectedSync,
  isTabletMode,
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
  useManufacturer,
  useIsHeadphonesConnected,
};

export default deviceInfoModule;
