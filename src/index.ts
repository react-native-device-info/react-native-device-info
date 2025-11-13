import { useCallback, useEffect, useState } from 'react';
import { Dimensions, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { useOnEvent, useOnMount } from './internal/asyncHookWrappers';
import devicesWithDynamicIsland from './internal/devicesWithDynamicIsland';
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
  AvailableCapacityType,
  DeviceType,
  LocationProviderInfo,
  PowerState,
  AppSetIdInfo,
} from './internal/types';

const [getUniqueIdInternal, getUniqueIdSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'uniqueId',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getUniqueId(),
  syncGetter: () => RNDeviceInfo.getUniqueIdSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the unique ID information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getUniqueId();
 * ```
 */
export const getUniqueId = getUniqueIdInternal;
/**
 * Synchronous variant of {@link getUniqueId}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getUniqueIdSync();
 * ```
 */
export const getUniqueIdSync = getUniqueIdSyncInternal;

let uniqueId: string;
/**
 * Preloads the unique ID on iOS so that {@link getUniqueId} can resolve synchronously later in the app lifecycle.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await syncUniqueId();
 * ```
 */
export async function syncUniqueId() {
  if (Platform.OS === 'ios') {
    uniqueId = await RNDeviceInfo.syncUniqueId();
  } else {
    uniqueId = await getUniqueId();
  }
  return uniqueId;
}

const [getInstanceIdInternal, getInstanceIdSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'instanceId',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getInstanceId(),
  syncGetter: () => RNDeviceInfo.getInstanceIdSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the instance ID information reported by the native platform.
 * @example
 * ```ts
 * const result = await getInstanceId();
 * ```
 */
export const getInstanceId = getInstanceIdInternal;
/**
 * Synchronous variant of {@link getInstanceId}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getInstanceIdSync();
 * ```
 */
export const getInstanceIdSync = getInstanceIdSyncInternal;

const [getSerialNumberInternal, getSerialNumberSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'serialNumber',
  supportedPlatforms: ['android', 'windows'],
  getter: () => RNDeviceInfo.getSerialNumber(),
  syncGetter: () => RNDeviceInfo.getSerialNumberSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the serial number information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getSerialNumber();
 * ```
 */
export const getSerialNumber = getSerialNumberInternal;
/**
 * Synchronous variant of {@link getSerialNumber}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getSerialNumberSync();
 * ```
 */
export const getSerialNumberSync = getSerialNumberSyncInternal;

const [getAndroidIdInternal, getAndroidIdSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'androidId',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getAndroidId(),
  syncGetter: () => RNDeviceInfo.getAndroidIdSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the Android ID information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getAndroidId();
 * ```
 */
export const getAndroidId = getAndroidIdInternal;
/**
 * Synchronous variant of {@link getAndroidId}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getAndroidIdSync();
 * ```
 */
export const getAndroidIdSync = getAndroidIdSyncInternal;

/**
 * Retrieves the app set ID information reported by the native platform.
 *
 *![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getAppSetId();
 * ```
 */
export const getAppSetId = () =>
  getSupportedPlatformInfoAsync({
    memoKey: 'appSetId',
    defaultValue: { id: 'unknown', scope: -1 },
    supportedPlatforms: ['android'],
    getter: () => RNDeviceInfo.getAppSetId(),
  });

const [getIpAddressInternal, getIpAddressSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getIpAddress(),
  syncGetter: () => RNDeviceInfo.getIpAddressSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the IP address information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getIpAddress();
 * ```
 */
export const getIpAddress = getIpAddressInternal;
/**
 * Synchronous variant of {@link getIpAddress}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getIpAddressSync();
 * ```
 */
export const getIpAddressSync = getIpAddressSyncInternal;

const [isCameraPresentInternal, isCameraPresentSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.isCameraPresent(),
  syncGetter: () => RNDeviceInfo.isCameraPresentSync(),
  defaultValue: false,
});
/**
 * Returns true when at least one hardware camera is available on the device.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isCameraPresent();
 * ```
 */
export const isCameraPresent = isCameraPresentInternal;
/**
 * Synchronous variant of {@link isCameraPresent}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isCameraPresentSync();
 * ```
 */
export const isCameraPresentSync = isCameraPresentSyncInternal;

/**
 * Retrieves the WiFi MAC address on Android and returns a constant placeholder for other platforms.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getMacAddress();
 * ```
 */
export async function getMacAddress() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getMacAddress();
  } else if (Platform.OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

/**
 * Synchronous variant of {@link getMacAddress}.
 *
 * @example
 * ```ts
 * const result = getMacAddressSync();
 * ```
 */
export function getMacAddressSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getMacAddressSync();
  } else if (Platform.OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

/**
 * Retrieves the device ID information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getDeviceId();
 * ```
 */
export const getDeviceId = () =>
  getSupportedPlatformInfoSync({
    defaultValue: 'unknown',
    memoKey: 'deviceId',
    getter: () => RNDeviceInfo.deviceId,
    supportedPlatforms: ['android', 'ios', 'windows'],
  });

const [getManufacturerInternal, getManufacturerSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'manufacturer',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () =>
    Platform.OS == 'ios' ? Promise.resolve('Apple') : RNDeviceInfo.getSystemManufacturer(),
  syncGetter: () => (Platform.OS == 'ios' ? 'Apple' : RNDeviceInfo.getSystemManufacturerSync()),
  defaultValue: 'unknown',
});
/**
 * Retrieves the manufacturer information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getManufacturer();
 * ```
 */
export const getManufacturer = getManufacturerInternal;
/**
 * Synchronous variant of {@link getManufacturer}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getManufacturerSync();
 * ```
 */
export const getManufacturerSync = getManufacturerSyncInternal;

/**
 * Retrieves the model information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getModel();
 * ```
 */
export const getModel = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'model',
    defaultValue: 'unknown',
    supportedPlatforms: ['ios', 'android', 'windows'],
    getter: () => RNDeviceInfo.model,
  });

/**
 * Retrieves the brand information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBrand();
 * ```
 */
export const getBrand = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'brand',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.brand,
  });

/**
 * Retrieves the system name information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getSystemName();
 * ```
 */
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

/**
 * Retrieves the system version information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getSystemVersion();
 * ```
 */
export const getSystemVersion = () =>
  getSupportedPlatformInfoSync({
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.systemVersion,
    supportedPlatforms: ['android', 'ios', 'windows'],
    memoKey: 'systemVersion',
  });

const [getBuildIdInternal, getBuildIdSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'buildId',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getBuildId(),
  syncGetter: () => RNDeviceInfo.getBuildIdSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the build ID information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getBuildId();
 * ```
 */
export const getBuildId = getBuildIdInternal;
/**
 * Synchronous variant of {@link getBuildId}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBuildIdSync();
 * ```
 */
export const getBuildIdSync = getBuildIdSyncInternal;

const [getApiLevelInternal, getApiLevelSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'apiLevel',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getApiLevel(),
  syncGetter: () => RNDeviceInfo.getApiLevelSync(),
  defaultValue: -1,
});
/**
 * Retrieves the API level information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getApiLevel();
 * ```
 */
export const getApiLevel = getApiLevelInternal;
/**
 * Synchronous variant of {@link getApiLevel}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getApiLevelSync();
 * ```
 */
export const getApiLevelSync = getApiLevelSyncInternal;

/**
 * Retrieves the bundle ID information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBundleId();
 * ```
 */
export const getBundleId = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'bundleId',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.bundleId,
  });

const [
  getInstallerPackageNameInternal,
  getInstallerPackageNameSyncInternal,
] = getSupportedPlatformInfoFunctions({
  memoKey: 'installerPackageName',
  supportedPlatforms: ['android', 'windows', 'ios'],
  getter: () => RNDeviceInfo.getInstallerPackageName(),
  syncGetter: () => RNDeviceInfo.getInstallerPackageNameSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the installer package name information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getInstallerPackageName();
 * ```
 */
export const getInstallerPackageName = getInstallerPackageNameInternal;
/**
 * Synchronous variant of {@link getInstallerPackageName}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getInstallerPackageNameSync();
 * ```
 */
export const getInstallerPackageNameSync = getInstallerPackageNameSyncInternal;

/**
 * Retrieves the application name information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getApplicationName();
 * ```
 */
export const getApplicationName = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'appName',
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.appName,
    supportedPlatforms: ['android', 'ios', 'windows'],
  });

/**
 * Retrieves the build number information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBuildNumber();
 * ```
 */
export const getBuildNumber = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'buildNumber',
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.buildNumber,
    defaultValue: 'unknown',
  });

/**
 * Retrieves the version information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getVersion();
 * ```
 */
export const getVersion = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'version',
    defaultValue: 'unknown',
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.appVersion,
  });

/**
 * Retrieves the readable version information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getReadableVersion();
 * ```
 */
export function getReadableVersion() {
  return getVersion() + '.' + getBuildNumber();
}

const [getDeviceNameInternal, getDeviceNameSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getDeviceName(),
  syncGetter: () => RNDeviceInfo.getDeviceNameSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the device name information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getDeviceName();
 * ```
 */
export const getDeviceName = getDeviceNameInternal;
/**
 * Synchronous variant of {@link getDeviceName}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getDeviceNameSync();
 * ```
 */
export const getDeviceNameSync = getDeviceNameSyncInternal;

const [getUsedMemoryInternal, getUsedMemorySyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getUsedMemory(),
  syncGetter: () => RNDeviceInfo.getUsedMemorySync(),
  defaultValue: -1,
});
/**
 * Retrieves the used memory information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getUsedMemory();
 * ```
 */
export const getUsedMemory = getUsedMemoryInternal;
/**
 * Synchronous variant of {@link getUsedMemory}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getUsedMemorySync();
 * ```
 */
export const getUsedMemorySync = getUsedMemorySyncInternal;

/**
 * Retrieves the user agent information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getUserAgent();
 * ```
 */
export const getUserAgent = () =>
  getSupportedPlatformInfoAsync({
    memoKey: 'userAgent',
    defaultValue: 'unknown',
    supportedPlatforms: ['android', 'ios', 'web'],
    getter: () => RNDeviceInfo.getUserAgent(),
  });

/**
 * Synchronous variant of {@link getUserAgent}.
 *
 *![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getUserAgentSync();
 * ```
 */
export const getUserAgentSync = () =>
  getSupportedPlatformInfoSync({
    memoKey: 'userAgentSync',
    defaultValue: 'unknown',
    supportedPlatforms: ['android', 'web'],
    getter: () => RNDeviceInfo.getUserAgentSync(),
  });

const [getFontScaleInternal, getFontScaleSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getFontScale(),
  syncGetter: () => RNDeviceInfo.getFontScaleSync(),
  defaultValue: -1,
});
/**
 * Retrieves the font scale information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getFontScale();
 * ```
 */
export const getFontScale = getFontScaleInternal;
/**
 * Synchronous variant of {@link getFontScale}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getFontScaleSync();
 * ```
 */
export const getFontScaleSync = getFontScaleSyncInternal;

const [getBootloaderInternal, getBootloaderSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'bootloader',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getBootloader(),
  syncGetter: () => RNDeviceInfo.getBootloaderSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the bootloader information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getBootloader();
 * ```
 */
export const getBootloader = getBootloaderInternal;
/**
 * Synchronous variant of {@link getBootloader}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBootloaderSync();
 * ```
 */
export const getBootloaderSync = getBootloaderSyncInternal;

const [getDeviceInternal, getDeviceSyncInternal] = getSupportedPlatformInfoFunctions({
  getter: () => RNDeviceInfo.getDevice(),
  syncGetter: () => RNDeviceInfo.getDeviceSync(),
  defaultValue: 'unknown',
  memoKey: 'device',
  supportedPlatforms: ['android'],
});
/**
 * Retrieves the device information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getDevice();
 * ```
 */
export const getDevice = getDeviceInternal;
/**
 * Synchronous variant of {@link getDevice}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getDeviceSync();
 * ```
 */
export const getDeviceSync = getDeviceSyncInternal;

const [getDisplayInternal, getDisplaySyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'display',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getDisplay(),
  syncGetter: () => RNDeviceInfo.getDisplaySync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the display information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getDisplay();
 * ```
 */
export const getDisplay = getDisplayInternal;
/**
 * Synchronous variant of {@link getDisplay}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getDisplaySync();
 * ```
 */
export const getDisplaySync = getDisplaySyncInternal;

const [getFingerprintInternal, getFingerprintSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'fingerprint',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getFingerprint(),
  syncGetter: () => RNDeviceInfo.getFingerprintSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the fingerprint information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getFingerprint();
 * ```
 */
export const getFingerprint = getFingerprintInternal;
/**
 * Synchronous variant of {@link getFingerprint}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getFingerprintSync();
 * ```
 */
export const getFingerprintSync = getFingerprintSyncInternal;

const [getHardwareInternal, getHardwareSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'hardware',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getHardware(),
  syncGetter: () => RNDeviceInfo.getHardwareSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the hardware information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getHardware();
 * ```
 */
export const getHardware = getHardwareInternal;
/**
 * Synchronous variant of {@link getHardware}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getHardwareSync();
 * ```
 */
export const getHardwareSync = getHardwareSyncInternal;

const [getHostInternal, getHostSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'host',
  supportedPlatforms: ['android', 'windows'],
  getter: () => RNDeviceInfo.getHost(),
  syncGetter: () => RNDeviceInfo.getHostSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the host information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getHost();
 * ```
 */
export const getHost = getHostInternal;
/**
 * Synchronous variant of {@link getHost}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getHostSync();
 * ```
 */
export const getHostSync = getHostSyncInternal;

const [getHostNamesInternal, getHostNamesSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'hostNames',
  supportedPlatforms: ['windows'],
  getter: () => RNDeviceInfo.getHostNames(),
  syncGetter: () => RNDeviceInfo.getHostNamesSync(),
  defaultValue: [] as string[],
});
/**
 * Retrieves the host names information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getHostNames();
 * ```
 */
export const getHostNames = getHostNamesInternal;
/**
 * Synchronous variant of {@link getHostNames}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getHostNamesSync();
 * ```
 */
export const getHostNamesSync = getHostNamesSyncInternal;

const [getProductInternal, getProductSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'product',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getProduct(),
  syncGetter: () => RNDeviceInfo.getProductSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the product information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getProduct();
 * ```
 */
export const getProduct = getProductInternal;
/**
 * Synchronous variant of {@link getProduct}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getProductSync();
 * ```
 */
export const getProductSync = getProductSyncInternal;

const [getTagsInternal, getTagsSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'tags',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getTags(),
  syncGetter: () => RNDeviceInfo.getTagsSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the tags information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getTags();
 * ```
 */
export const getTags = getTagsInternal;
/**
 * Synchronous variant of {@link getTags}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getTagsSync();
 * ```
 */
export const getTagsSync = getTagsSyncInternal;

const [getTypeInternal, getTypeSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'type',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getType(),
  syncGetter: () => RNDeviceInfo.getTypeSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the type information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getType();
 * ```
 */
export const getType = getTypeInternal;
/**
 * Synchronous variant of {@link getType}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getTypeSync();
 * ```
 */
export const getTypeSync = getTypeSyncInternal;

const [getBaseOsInternal, getBaseOsSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'baseOs',
  supportedPlatforms: ['android', 'web', 'windows'],
  getter: () => RNDeviceInfo.getBaseOs(),
  syncGetter: () => RNDeviceInfo.getBaseOsSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the base OS information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getBaseOs();
 * ```
 */
export const getBaseOs = getBaseOsInternal;
/**
 * Synchronous variant of {@link getBaseOs}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBaseOsSync();
 * ```
 */
export const getBaseOsSync = getBaseOsSyncInternal;

const [getPreviewSdkIntInternal, getPreviewSdkIntSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'previewSdkInt',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getPreviewSdkInt(),
  syncGetter: () => RNDeviceInfo.getPreviewSdkIntSync(),
  defaultValue: -1,
});
/**
 * Retrieves the preview SDK int information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getPreviewSdkInt();
 * ```
 */
export const getPreviewSdkInt = getPreviewSdkIntInternal;
/**
 * Synchronous variant of {@link getPreviewSdkInt}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getPreviewSdkIntSync();
 * ```
 */
export const getPreviewSdkIntSync = getPreviewSdkIntSyncInternal;

const [getSecurityPatchInternal, getSecurityPatchSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'securityPatch',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSecurityPatch(),
  syncGetter: () => RNDeviceInfo.getSecurityPatchSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the security patch information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getSecurityPatch();
 * ```
 */
export const getSecurityPatch = getSecurityPatchInternal;
/**
 * Synchronous variant of {@link getSecurityPatch}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getSecurityPatchSync();
 * ```
 */
export const getSecurityPatchSync = getSecurityPatchSyncInternal;

const [getCodenameInternal, getCodenameSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'codeName',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getCodename(),
  syncGetter: () => RNDeviceInfo.getCodenameSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the codename information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getCodename();
 * ```
 */
export const getCodename = getCodenameInternal;
/**
 * Synchronous variant of {@link getCodename}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getCodenameSync();
 * ```
 */
export const getCodenameSync = getCodenameSyncInternal;

const [getIncrementalInternal, getIncrementalSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'incremental',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getIncremental(),
  syncGetter: () => RNDeviceInfo.getIncrementalSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the incremental information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getIncremental();
 * ```
 */
export const getIncremental = getIncrementalInternal;
/**
 * Synchronous variant of {@link getIncremental}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getIncrementalSync();
 * ```
 */
export const getIncrementalSync = getIncrementalSyncInternal;

const [isEmulatorInternal, isEmulatorSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'emulator',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.isEmulator(),
  syncGetter: () => RNDeviceInfo.isEmulatorSync(),
  defaultValue: false,
});
/**
 * Returns true when the current runtime is an emulator or simulator.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isEmulator();
 * ```
 */
export const isEmulator = isEmulatorInternal;
/**
 * Synchronous variant of {@link isEmulator}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isEmulatorSync();
 * ```
 */
export const isEmulatorSync = isEmulatorSyncInternal;

/**
 * Returns true when the device is classified as a tablet by the native OS.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isTablet();
 * ```
 */
export const isTablet = () =>
  getSupportedPlatformInfoSync({
    defaultValue: false,
    supportedPlatforms: ['android', 'ios', 'windows'],
    memoKey: 'tablet',
    getter: () => RNDeviceInfo.isTablet,
  });

/**
 * Returns true on Android devices that declare the low-RAM flag.
 *
 *![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isLowRamDevice();
 * ```
 */
export const isLowRamDevice = () =>
  getSupportedPlatformInfoSync({
    defaultValue: false,
    supportedPlatforms: ['android'],
    memoKey: 'lowRam',
    getter: () => RNDeviceInfo.isLowRamDevice,
  });

/**
 * Returns true when Display Zoom is enabled on iOS.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isDisplayZoomed();
 * ```
 */
export const isDisplayZoomed = () =>
  getSupportedPlatformInfoSync({
    defaultValue: false,
    supportedPlatforms: ['ios'],
    memoKey: 'zoomed',
    getter: () => RNDeviceInfo.isDisplayZoomed,
  });

const [isPinOrFingerprintSetInternal, isPinOrFingerprintSetSyncInternal] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['android', 'ios', 'windows'],
    getter: () => RNDeviceInfo.isPinOrFingerprintSet(),
    syncGetter: () => RNDeviceInfo.isPinOrFingerprintSetSync(),
    defaultValue: false,
  }
);
/**
 * Returns true when the user has configured any secure lock method such as a PIN or biometric.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isPinOrFingerprintSet();
 * ```
 */
export const isPinOrFingerprintSet = isPinOrFingerprintSetInternal;
/**
 * Synchronous variant of {@link isPinOrFingerprintSet}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isPinOrFingerprintSetSync();
 * ```
 */
export const isPinOrFingerprintSetSync = isPinOrFingerprintSetSyncInternal;

let notch: boolean;
/**
 * Checks the current device against a curated list to determine if a screen notch is present.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = hasNotch();
 * ```
 */
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

let dynamicIsland: boolean;
/**
 * Determines whether the iOS device ships with a Dynamic Island cutout.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = hasDynamicIsland();
 * ```
 */
export function hasDynamicIsland() {
  if (dynamicIsland === undefined) {
    let _brand = getBrand();
    let _model = getModel();
    dynamicIsland =
      devicesWithDynamicIsland.findIndex(
        (item) =>
          item.brand.toLowerCase() === _brand.toLowerCase() &&
          item.model.toLowerCase() === _model.toLowerCase()
      ) !== -1;
  }
  return dynamicIsland;
}

const [hasGmsInternal, hasGmsSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.hasGms(),
  syncGetter: () => RNDeviceInfo.hasGmsSync(),
  defaultValue: false,
});
/**
 * Reports whether the device has GMS support.
 *
 *![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await hasGms();
 * ```
 */
export const hasGms = hasGmsInternal;
/**
 * Synchronous variant of {@link hasGms}.
 *
 * @example
 * ```ts
 * const result = hasGmsSync();
 * ```
 */
export const hasGmsSync = hasGmsSyncInternal;

const [hasHmsInternal, hasHmsSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.hasHms(),
  syncGetter: () => RNDeviceInfo.hasHmsSync(),
  defaultValue: false,
});
/**
 * Reports whether the device has HMS support.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await hasHms();
 * ```
 */
export const hasHms = hasHmsInternal;
/**
 * Synchronous variant of {@link hasHms}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = hasHmsSync();
 * ```
 */
export const hasHmsSync = hasHmsSyncInternal;

const [getFirstInstallTimeInternal, getFirstInstallTimeSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'firstInstallTime',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getFirstInstallTime(),
  syncGetter: () => RNDeviceInfo.getFirstInstallTimeSync(),
  defaultValue: -1,
});
/**
 * Retrieves the first install time information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getFirstInstallTime();
 * ```
 */
export const getFirstInstallTime = getFirstInstallTimeInternal;
/**
 * Synchronous variant of {@link getFirstInstallTime}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getFirstInstallTimeSync();
 * ```
 */
export const getFirstInstallTimeSync = getFirstInstallTimeSyncInternal;

const [getInstallReferrerInternal, getInstallReferrerSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'installReferrer',
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.getInstallReferrer(),
  syncGetter: () => RNDeviceInfo.getInstallReferrerSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the install referrer information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getInstallReferrer();
 * ```
 */
export const getInstallReferrer = getInstallReferrerInternal;
/**
 * Synchronous variant of {@link getInstallReferrer}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getInstallReferrerSync();
 * ```
 */
export const getInstallReferrerSync = getInstallReferrerSyncInternal;

const [getLastUpdateTimeInternal, getLastUpdateTimeSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'lastUpdateTime',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getLastUpdateTime(),
  syncGetter: () => RNDeviceInfo.getLastUpdateTimeSync(),
  defaultValue: -1,
});
/**
 * Retrieves the last update time information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getLastUpdateTime();
 * ```
 */
export const getLastUpdateTime = getLastUpdateTimeInternal;
/**
 * Synchronous variant of {@link getLastUpdateTime}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getLastUpdateTimeSync();
 * ```
 */
export const getLastUpdateTimeSync = getLastUpdateTimeSyncInternal;

const [getStartupTimeInternal, getStartupTimeSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'startupTime',
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getStartupTime(),
  syncGetter: () => RNDeviceInfo.getStartupTimeSync(),
  defaultValue: -1,
});
/**
 * Retrieves the startup time information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getStartupTime();
 * ```
 */
export const getStartupTime = getStartupTimeInternal;
/**
 * Synchronous variant of {@link getStartupTime}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getStartupTimeSync();
 * ```
 */
export const getStartupTimeSync = getStartupTimeSyncInternal;

const [getCarrierInternal, getCarrierSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getCarrier(),
  syncGetter: () => RNDeviceInfo.getCarrierSync(),
  defaultValue: 'unknown',
});
/**
 * Retrieves the carrier information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getCarrier();
 * ```
 */
export const getCarrier = getCarrierInternal;
/**
 * Synchronous variant of {@link getCarrier}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getCarrierSync();
 * ```
 */
export const getCarrierSync = getCarrierSyncInternal;

const [getTotalMemoryInternal, getTotalMemorySyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'totalMemory',
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getTotalMemory(),
  syncGetter: () => RNDeviceInfo.getTotalMemorySync(),
  defaultValue: -1,
});
/**
 * Retrieves the total memory information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getTotalMemory();
 * ```
 */
export const getTotalMemory = getTotalMemoryInternal;
/**
 * Synchronous variant of {@link getTotalMemory}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getTotalMemorySync();
 * ```
 */
export const getTotalMemorySync = getTotalMemorySyncInternal;

const [getMaxMemoryInternal, getMaxMemorySyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: 'maxMemory',
  supportedPlatforms: ['android', 'windows', 'web'],
  getter: () => RNDeviceInfo.getMaxMemory(),
  syncGetter: () => RNDeviceInfo.getMaxMemorySync(),
  defaultValue: -1,
});
/**
 * Retrieves the max memory information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getMaxMemory();
 * ```
 */
export const getMaxMemory = getMaxMemoryInternal;
/**
 * Synchronous variant of {@link getMaxMemory}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getMaxMemorySync();
 * ```
 */
export const getMaxMemorySync = getMaxMemorySyncInternal;

const [getTotalDiskCapacityInternal, getTotalDiskCapacitySyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getTotalDiskCapacity(),
  syncGetter: () => RNDeviceInfo.getTotalDiskCapacitySync(),
  defaultValue: -1,
});
/**
 * Retrieves the total disk capacity information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getTotalDiskCapacity();
 * ```
 */
export const getTotalDiskCapacity = getTotalDiskCapacityInternal;
/**
 * Synchronous variant of {@link getTotalDiskCapacity}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getTotalDiskCapacitySync();
 * ```
 */
export const getTotalDiskCapacitySync = getTotalDiskCapacitySyncInternal;

/**
 * Backwards-compatible wrapper for the legacy total disk capacity calculation on Android.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getTotalDiskCapacityOld();
 * ```
 */
export async function getTotalDiskCapacityOld() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getTotalDiskCapacityOld();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getTotalDiskCapacity();
  }

  return -1;
}

/**
 * Synchronous variant of {@link getTotalDiskCapacityOld}.
 *
 * @example
 * ```ts
 * const result = getTotalDiskCapacityOldSync();
 * ```
 */
export function getTotalDiskCapacityOldSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getTotalDiskCapacityOldSync();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getTotalDiskCapacitySync();
  }

  return -1;
}

const [getFreeDiskStorageInternal, getFreeDiskStorageSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: (storageType: AvailableCapacityType = 'total') => {
    if (Platform.OS === 'ios') {
      return RNDeviceInfo.getFreeDiskStorage(storageType);
    } else {
      return RNDeviceInfo.getFreeDiskStorage();
    }
  },
  syncGetter: (storageType: AvailableCapacityType = 'total') => {
    if (Platform.OS === 'ios') {
      return RNDeviceInfo.getFreeDiskStorageSync(storageType);
    } else {
      return RNDeviceInfo.getFreeDiskStorageSync();
    }
  },
  defaultValue: -1,
});
/**
 * Retrieves the free disk storage information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getFreeDiskStorage();
 * ```
 */
export const getFreeDiskStorage = getFreeDiskStorageInternal;
/**
 * Synchronous variant of {@link getFreeDiskStorage}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getFreeDiskStorageSync();
 * ```
 */
export const getFreeDiskStorageSync = getFreeDiskStorageSyncInternal;

/**
 * Backwards-compatible wrapper for the legacy free disk storage calculation on Android.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getFreeDiskStorageOld();
 * ```
 */
export async function getFreeDiskStorageOld() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getFreeDiskStorageOld();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getFreeDiskStorage();
  }

  return -1;
}

/**
 * Synchronous variant of {@link getFreeDiskStorageOld}.
 *
 * @example
 * ```ts
 * const result = getFreeDiskStorageOldSync();
 * ```
 */
export function getFreeDiskStorageOldSync() {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.getFreeDiskStorageOldSync();
  }
  if (Platform.OS === 'ios' || Platform.OS === 'windows' || Platform.OS === 'web') {
    return getFreeDiskStorageSync();
  }

  return -1;
}

const [getBatteryLevelInternal, getBatteryLevelSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.getBatteryLevel(),
  syncGetter: () => RNDeviceInfo.getBatteryLevelSync(),
  defaultValue: -1,
});
/**
 * Retrieves the battery level information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getBatteryLevel();
 * ```
 */
export const getBatteryLevel = getBatteryLevelInternal;
/**
 * Synchronous variant of {@link getBatteryLevel}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBatteryLevelSync();
 * ```
 */
export const getBatteryLevelSync = getBatteryLevelSyncInternal;

const [getPowerStateInternal, getPowerStateSyncInternal] = getSupportedPlatformInfoFunctions<
  Partial<PowerState>
>({
  supportedPlatforms: ['ios', 'android', 'windows', 'web'],
  getter: () => RNDeviceInfo.getPowerState(),
  syncGetter: () => RNDeviceInfo.getPowerStateSync(),
  defaultValue: {},
});
/**
 * Retrieves the power state information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getPowerState();
 * ```
 */
export const getPowerState = getPowerStateInternal;
/**
 * Synchronous variant of {@link getPowerState}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getPowerStateSync();
 * ```
 */
export const getPowerStateSync = getPowerStateSyncInternal;

const [isBatteryChargingInternal, isBatteryChargingSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'windows', 'web'],
  getter: () => RNDeviceInfo.isBatteryCharging(),
  syncGetter: () => RNDeviceInfo.isBatteryChargingSync(),
  defaultValue: false,
});
/**
 * Returns true while the device battery is actively charging.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isBatteryCharging();
 * ```
 */
export const isBatteryCharging = isBatteryChargingInternal;
/**
 * Synchronous variant of {@link isBatteryCharging}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isBatteryChargingSync();
 * ```
 */
export const isBatteryChargingSync = isBatteryChargingSyncInternal;

/**
 * Resolves to true when the current screen dimensions indicate landscape orientation.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isLandscape();
 * ```
 */
export async function isLandscape() {
  return Promise.resolve(isLandscapeSync());
}

/**
 * Synchronous variant of {@link isLandscape}.
 *
 * @example
 * ```ts
 * const result = isLandscapeSync();
 * ```
 */
export function isLandscapeSync() {
  const { height, width } = Dimensions.get('window');
  return width >= height;
}

const [isAirplaneModeInternal, isAirplaneModeSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'web'],
  getter: () => RNDeviceInfo.isAirplaneMode(),
  syncGetter: () => RNDeviceInfo.isAirplaneModeSync(),
  defaultValue: false,
});
/**
 * Returns true when the platform reports airplane mode is enabled.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isAirplaneMode();
 * ```
 */
export const isAirplaneMode = isAirplaneModeInternal;
/**
 * Synchronous variant of {@link isAirplaneMode}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isAirplaneModeSync();
 * ```
 */
export const isAirplaneModeSync = isAirplaneModeSyncInternal;

/**
 * Retrieves the device type information reported by the native platform.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getDeviceType();
 * ```
 */
export const getDeviceType = () => {
  return getSupportedPlatformInfoSync({
    memoKey: 'deviceType',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.deviceType,
  });
};

/**
 * Synchronous variant of {@link getDeviceType}.
 *
 * @example
 * ```ts
 * const result = getDeviceTypeSync();
 * ```
 */
export const getDeviceTypeSync = () => {
  return getSupportedPlatformInfoSync({
    memoKey: 'deviceType',
    supportedPlatforms: ['android', 'ios', 'windows'],
    defaultValue: 'unknown',
    getter: () => RNDeviceInfo.deviceType,
  });
};

const [supportedAbisInternal, supportedAbisSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: '_supportedAbis',
  supportedPlatforms: ['android', 'ios', 'windows'],
  getter: () => RNDeviceInfo.getSupportedAbis(),
  syncGetter: () => RNDeviceInfo.getSupportedAbisSync(),
  defaultValue: [] as string[],
});
/**
 * Lists the supported ABIs reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await supportedAbis();
 * ```
 */
export const supportedAbis = supportedAbisInternal;
/**
 * Synchronous variant of {@link supportedAbis}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = supportedAbisSync();
 * ```
 */
export const supportedAbisSync = supportedAbisSyncInternal;

const [supported32BitAbisInternal, supported32BitAbisSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: '_supported32BitAbis',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSupported32BitAbis(),
  syncGetter: () => RNDeviceInfo.getSupported32BitAbisSync(),
  defaultValue: [] as string[],
});
/**
 * Lists the supported 32 bit ABIs reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await supported32BitAbis();
 * ```
 */
export const supported32BitAbis = supported32BitAbisInternal;
/**
 * Synchronous variant of {@link supported32BitAbis}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = supported32BitAbisSync();
 * ```
 */
export const supported32BitAbisSync = supported32BitAbisSyncInternal;

const [supported64BitAbisInternal, supported64BitAbisSyncInternal] = getSupportedPlatformInfoFunctions({
  memoKey: '_supported64BitAbis',
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSupported64BitAbis(),
  syncGetter: () => RNDeviceInfo.getSupported64BitAbisSync(),
  defaultValue: [],
});
/**
 * Lists the supported 64 bit ABIs reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await supported64BitAbis();
 * ```
 */
export const supported64BitAbis = supported64BitAbisInternal;
/**
 * Synchronous variant of {@link supported64BitAbis}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = supported64BitAbisSync();
 * ```
 */
export const supported64BitAbisSync = supported64BitAbisSyncInternal;

/**
 * Reports whether the requested Android system feature is available on the device.
 *
 *![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const hasCamera = await hasSystemFeature('android.hardware.camera.any');
 * ```
 */
export async function hasSystemFeature(feature: string) {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.hasSystemFeature(feature);
  }
  return false;
}

/**
 * Synchronous variant of {@link hasSystemFeature}.
 *
 * @example
 * ```ts
 * const hasCamera = hasSystemFeatureSync('android.hardware.camera.any');
 * ```
 */
export function hasSystemFeatureSync(feature: string) {
  if (Platform.OS === 'android') {
    return RNDeviceInfo.hasSystemFeatureSync(feature);
  }
  return false;
}

/**
 * Helper that classifies a normalized battery level as "low" using platform-specific thresholds.
 *
 * @example
 * ```ts
 * const isLow = isLowBatteryLevel(0.12);
 * ```
 */
export function isLowBatteryLevel(level: number): boolean {
  if (Platform.OS === 'android') {
    return level < 0.15;
  }
  return level < 0.2;
}

const [
  getSystemAvailableFeaturesInternal,
  getSystemAvailableFeaturesSyncInternal,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSystemAvailableFeatures(),
  syncGetter: () => RNDeviceInfo.getSystemAvailableFeaturesSync(),
  defaultValue: [] as string[],
});
/**
 * Retrieves the system available features information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getSystemAvailableFeatures();
 * ```
 */
export const getSystemAvailableFeatures = getSystemAvailableFeaturesInternal;
/**
 * Synchronous variant of {@link getSystemAvailableFeatures}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getSystemAvailableFeaturesSync();
 * ```
 */
export const getSystemAvailableFeaturesSync = getSystemAvailableFeaturesSyncInternal;

const [isLocationEnabledInternal, isLocationEnabledSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios', 'web'],
  getter: () => RNDeviceInfo.isLocationEnabled(),
  syncGetter: () => RNDeviceInfo.isLocationEnabledSync(),
  defaultValue: false,
});
/**
 * Returns true when the system-wide location services switch is enabled.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isLocationEnabled();
 * ```
 */
export const isLocationEnabled = isLocationEnabledInternal;
/**
 * Synchronous variant of {@link isLocationEnabled}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isLocationEnabledSync();
 * ```
 */
export const isLocationEnabledSync = isLocationEnabledSyncInternal;

const [isHeadphonesConnectedInternal, isHeadphonesConnectedSyncInternal] = getSupportedPlatformInfoFunctions(
  {
    supportedPlatforms: ['android', 'ios'],
    getter: () => RNDeviceInfo.isHeadphonesConnected(),
    syncGetter: () => RNDeviceInfo.isHeadphonesConnectedSync(),
    defaultValue: false,
  }
);
/**
 * Returns true when any headphones are connected to the device.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isHeadphonesConnected();
 * ```
 */
export const isHeadphonesConnected = isHeadphonesConnectedInternal;
/**
 * Synchronous variant of {@link isHeadphonesConnected}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isHeadphonesConnectedSync();
 * ```
 */
export const isHeadphonesConnectedSync = isHeadphonesConnectedSyncInternal;

const [
  isWiredHeadphonesConnectedInternal,
  isWiredHeadphonesConnectedSyncInternal,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.isWiredHeadphonesConnected(),
  syncGetter: () => RNDeviceInfo.isWiredHeadphonesConnectedSync(),
  defaultValue: false,
});
/**
 * Returns true when wired headphones are detected.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isWiredHeadphonesConnected();
 * ```
 */
export const isWiredHeadphonesConnected = isWiredHeadphonesConnectedInternal;
/**
 * Synchronous variant of {@link isWiredHeadphonesConnected}.
 *
 * @example
 * ```ts
 * const result = isWiredHeadphonesConnectedSync();
 * ```
 */
export const isWiredHeadphonesConnectedSync = isWiredHeadphonesConnectedSyncInternal;

const [
  isBluetoothHeadphonesConnectedInternal,
  isBluetoothHeadphonesConnectedSyncInternal,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.isBluetoothHeadphonesConnected(),
  syncGetter: () => RNDeviceInfo.isBluetoothHeadphonesConnectedSync(),
  defaultValue: false,
});
/**
 * Returns true when Bluetooth headphones are connected.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isBluetoothHeadphonesConnected();
 * ```
 */
export const isBluetoothHeadphonesConnected = isBluetoothHeadphonesConnectedInternal;
/**
 * Synchronous variant of {@link isBluetoothHeadphonesConnected}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isBluetoothHeadphonesConnectedSync();
 * ```
 */
export const isBluetoothHeadphonesConnectedSync = isBluetoothHeadphonesConnectedSyncInternal;

const [isMouseConnectedInternal, isMouseConnectedSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['windows'],
  getter: () => RNDeviceInfo.isMouseConnected(),
  syncGetter: () => RNDeviceInfo.isMouseConnectedSync(),
  defaultValue: false,
});
/**
 * Returns true when a pointing device is connected (Windows).
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isMouseConnected();
 * ```
 */
export const isMouseConnected = isMouseConnectedInternal;
/**
 * Synchronous variant of {@link isMouseConnected}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isMouseConnectedSync();
 * ```
 */
export const isMouseConnectedSync = isMouseConnectedSyncInternal;

const [isKeyboardConnectedInternal, isKeyboardConnectedSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['windows'],
  getter: () => RNDeviceInfo.isKeyboardConnected(),
  syncGetter: () => RNDeviceInfo.isKeyboardConnectedSync(),
  defaultValue: false,
});
/**
 * Returns true when a hardware keyboard is connected (Windows).
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isKeyboardConnected();
 * ```
 */
export const isKeyboardConnected = isKeyboardConnectedInternal;
/**
 * Synchronous variant of {@link isKeyboardConnected}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = isKeyboardConnectedSync();
 * ```
 */
export const isKeyboardConnectedSync = isKeyboardConnectedSyncInternal;

const [
  getSupportedMediaTypeListInternal,
  getSupportedMediaTypeListSyncInternal,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android'],
  getter: () => RNDeviceInfo.getSupportedMediaTypeList(),
  syncGetter: () => RNDeviceInfo.getSupportedMediaTypeListSync(),
  defaultValue: [],
});
/**
 * Retrieves the supported media type list information reported by the native platform.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getSupportedMediaTypeList();
 * ```
 */
export const getSupportedMediaTypeList = getSupportedMediaTypeListInternal;
/**
 * Synchronous variant of {@link getSupportedMediaTypeList}.
 *
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getSupportedMediaTypeListSync();
 * ```
 */
export const getSupportedMediaTypeListSync = getSupportedMediaTypeListSyncInternal;

/**
 * Returns true when Windows tablet mode is currently active.
 *
 *![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await isTabletMode();
 * ```
 */
export const isTabletMode = () =>
  getSupportedPlatformInfoAsync({
    supportedPlatforms: ['windows'],
    getter: () => RNDeviceInfo.isTabletMode(),
    defaultValue: false,
  });

const [
  getAvailableLocationProvidersInternal,
  getAvailableLocationProvidersSyncInternal,
] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['android', 'ios'],
  getter: () => RNDeviceInfo.getAvailableLocationProviders(),
  syncGetter: () => RNDeviceInfo.getAvailableLocationProvidersSync(),
  defaultValue: {},
});
/**
 * Retrieves the available location providers information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getAvailableLocationProviders();
 * ```
 */
export const getAvailableLocationProviders = getAvailableLocationProvidersInternal;
/**
 * Synchronous variant of {@link getAvailableLocationProviders}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getAvailableLocationProvidersSync();
 * ```
 */
export const getAvailableLocationProvidersSync = getAvailableLocationProvidersSyncInternal;

const [getBrightnessInternal, getBrightnessSyncInternal] = getSupportedPlatformInfoFunctions({
  supportedPlatforms: ['ios'],
  getter: () => RNDeviceInfo.getBrightness(),
  syncGetter: () => RNDeviceInfo.getBrightnessSync(),
  defaultValue: -1,
});
/**
 * Retrieves the brightness information reported by the native platform.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getBrightness();
 * ```
 */
export const getBrightness = getBrightnessInternal;
/**
 * Synchronous variant of {@link getBrightness}.
 *
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = getBrightnessSync();
 * ```
 */
export const getBrightnessSync = getBrightnessSyncInternal;

/**
 * Retrieves the native APNS device token that can be used for remote push notifications on iOS.
 *
 *![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```ts
 * const result = await getDeviceToken();
 * ```
 */
export async function getDeviceToken() {
  if (Platform.OS === 'ios') {
    return RNDeviceInfo.getDeviceToken();
  }
  return 'unknown';
}

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);
/**
 * React hook that streams battery level updates emitted by the native module.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function BatteryIndicator() {
 *   const level = useBatteryLevel();
 *   return <Text>{level ?? 'unknown'}%</Text>;
 * }
 * ```
 */
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

/**
 * React hook that notifies when the battery crosses the low-level threshold.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io-badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function LowBatteryBanner() {
 *   const level = useBatteryLevelIsLow();
 *   if (level == null) {
 *     return null;
 *   }
 *   return <Banner title={`Battery low (${Math.round(level * 100)}%)`} />;
 * }
 * ```
 */
export function useBatteryLevelIsLow(): number | null {
  const [batteryLevelIsLow, setBatteryLevelIsLow] = useState<number | null>(null);

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: number = await getBatteryLevel();
      isLowBatteryLevel(initialValue) && setBatteryLevelIsLow(initialValue);
    };

    setInitialValue();

    const onChange = (level: number) => {
      setBatteryLevelIsLow(level);
    };

    const subscription = deviceInfoEmitter.addListener('RNDeviceInfo_batteryLevelIsLow', onChange);

    return () => subscription.remove();
  }, []);

  return batteryLevelIsLow;
}

/**
 * React hook that subscribes to power state changes and returns a partial {@link PowerState}.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ✅](https://img.shields.io/badge/Web-%E2%9C%85-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function ChargingStatus() {
 *   const powerState = usePowerState();
 *   return <Text>{powerState.batteryState}</Text>;
 * }
 * ```
 */
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

/**
 * React hook that resolves to true whenever any headphones are connected.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function HeadphoneBadge() {
 *   const { result: connected } = useIsHeadphonesConnected();
 *   return connected ? <Badge text="Headphones" /> : null;
 * }
 * ```
 */
export function useIsHeadphonesConnected(): AsyncHookResult<boolean> {
  return useOnEvent('RNDeviceInfo_headphoneConnectionDidChange', isHeadphonesConnected, false);
}

/**
 * React hook that resolves to true whenever wired headphones are connected.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function WiredOnlyNotice() {
 *   const { result } = useIsWiredHeadphonesConnected();
 *   return result ? <Text>Wired audio active</Text> : null;
 * }
 * ```
 */
export function useIsWiredHeadphonesConnected(): AsyncHookResult<boolean> {
  return useOnEvent(
    'RNDeviceInfo_headphoneWiredConnectionDidChange',
    isWiredHeadphonesConnected,
    false
  );
}

/**
 * React hook that resolves to true whenever Bluetooth headphones are connected.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function BluetoothAudioIndicator() {
 *   const { result } = useIsBluetoothHeadphonesConnected();
 *   return result ? <Icon name="bluetooth-audio" /> : null;
 * }
 * ```
 */
export function useIsBluetoothHeadphonesConnected(): AsyncHookResult<boolean> {
  return useOnEvent(
    'RNDeviceInfo_headphoneBluetoothConnectionDidChange',
    isBluetoothHeadphonesConnected,
    false
  );
}

/**
 * React hook that exposes the app's first install timestamp once it is retrieved.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function InstallAge() {
 *   const { result } = useFirstInstallTime();
 *   return <Text>{new Date(result).toLocaleDateString()}</Text>;
 * }
 * ```
 */
export function useFirstInstallTime(): AsyncHookResult<number> {
  return useOnMount(getFirstInstallTime, -1);
}

/**
 * React hook that resolves with the human-readable device name when it becomes available.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function Greeting() {
 *   const { result: name } = useDeviceName();
 *   return <Text>Hello from {name}</Text>;
 * }
 * ```
 */
export function useDeviceName(): AsyncHookResult<string> {
  return useOnMount(getDeviceName, 'unknown');
}

/**
 * React hook that checks for an Android system feature and keeps the result cached.
 *
 * **Compatibility:** ![iOS ❌](https://img.shields.io/badge/iOS-%E2%9D%8C-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function FaceUnlockOnly() {
 *   const { result } = useHasSystemFeature('android.hardware.biometrics.face');
 *   return <Text>{result ? 'Face unlock supported' : 'Face unlock unavailable'}</Text>;
 * }
 * ```
 */
export function useHasSystemFeature(feature: string): AsyncHookResult<boolean> {
  const asyncGetter = useCallback(() => hasSystemFeature(feature), [feature]);
  return useOnMount(asyncGetter, false);
}

/**
 * React hook that resolves as soon as the emulator detection result is known.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function IsEmulatorCallout() {
 *   const { result: emulator } = useIsEmulator();
 *   return emulator ? <Text>Running on emulator</Text> : null;
 * }
 * ```
 */
export function useIsEmulator(): AsyncHookResult<boolean> {
  return useOnMount(isEmulator, false);
}

/**
 * React hook that resolves to the device manufacturer string.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ✅](https://img.shields.io/badge/Android-%E2%9C%85-informational?labelColor=555555) ![Windows ✅](https://img.shields.io/badge/Windows-%E2%9C%85-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ✅](https://img.shields.io/badge/visionOS-%E2%9C%85-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function ManufacturerLine() {
 *   const { result: manufacturer } = useManufacturer();
 *   return <Text>Made by {manufacturer}</Text>;
 * }
 * ```
 */
export function useManufacturer(): AsyncHookResult<string> {
  return useOnMount(getManufacturer, 'unknown');
}

/**
 * React hook that subscribes to screen brightness updates on iOS.
 *
 * **Compatibility:** ![iOS ✅](https://img.shields.io/badge/iOS-%E2%9C%85-informational?labelColor=555555) ![Android ❌](https://img.shields.io/badge/Android-%E2%9D%8C-informational?labelColor=555555) ![Windows ❌](https://img.shields.io/badge/Windows-%E2%9D%8C-informational?labelColor=555555) ![Web ❌](https://img.shields.io/badge/Web-%E2%9D%8C-informational?labelColor=555555) ![visionOS ❌](https://img.shields.io/badge/visionOS-%E2%9D%8C-informational?labelColor=555555)
 *
 * @example
 * ```tsx
 * function BrightnessSlider() {
 *   const brightness = useBrightness();
 *   return <Slider value={brightness ?? 0} disabled />;
 * }
 * ```
 */
export function useBrightness(): number | null {
  const [brightness, setBrightness] = useState<number | null>(null);

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: number = await getBrightness();
      setBrightness(initialValue);
    };

    const onChange = (value: number) => {
      setBrightness(value);
    };

    setInitialValue();

    const subscription = deviceInfoEmitter.addListener(
      'RNDeviceInfo_brightnessDidChange',
      onChange
    );

    return () => subscription.remove();
  }, []);

  return brightness;
}

export type { AsyncHookResult, DeviceType, LocationProviderInfo, PowerState, AppSetIdInfo };

/**
 * CommonJS-style namespace that aggregates every exported API from this module.
 */
export const DeviceInfo: DeviceInfoModule = {
  getAndroidId,
  getAndroidIdSync,
  getApiLevel,
  getAppSetId,
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
  getHostNames,
  getHostNamesSync,
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
  getStartupTime,
  getStartupTimeSync,
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
  getUniqueIdSync,
  getUsedMemory,
  getUsedMemorySync,
  getUserAgent,
  getUserAgentSync,
  getVersion,
  getBrightness,
  getBrightnessSync,
  hasGms,
  hasGmsSync,
  hasHms,
  hasHmsSync,
  hasNotch,
  hasDynamicIsland,
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
  isWiredHeadphonesConnected,
  isWiredHeadphonesConnectedSync,
  isBluetoothHeadphonesConnected,
  isBluetoothHeadphonesConnectedSync,
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
  isLowRamDevice,
  isDisplayZoomed,
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
  useIsWiredHeadphonesConnected,
  useIsBluetoothHeadphonesConnected,
  useBrightness,
  getSupportedMediaTypeList,
  getSupportedMediaTypeListSync,
};

export default DeviceInfo;
