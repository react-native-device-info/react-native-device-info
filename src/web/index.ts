import { NativeEventEmitter, NativeModules } from 'react-native';

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

let isBatteryChargingNow = false,
  batteryLevel = -1,
  powerState = {};

type BatteryEventListenerIdentifiers =
  | 'chargingchange'
  | 'levelchange'
  | 'chargingtimechange'
  | 'dischargingtimechange';
type BatteryEventListener = (event: BatteryEventListenerIdentifiers, cb: () => void) => void;

type Battery = {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener: BatteryEventListener;
};

interface ExtendedNavigator extends Navigator {
  getBattery?: () => Promise<Battery>;
  deviceMemory?: number;
}

type Memory = {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
};

interface ExtendedPerformance extends Performance {
  memory?: Memory;
}

const extendedPerformance: ExtendedPerformance = window.performance;
const extendedNavigator: ExtendedNavigator = navigator;

export const getMaxMemorySync = () => {
  if (extendedPerformance && extendedPerformance.memory) {
    return extendedPerformance.memory.jsHeapSizeLimit;
  }
  return -1;
};

export const getInstallReferrerSync = () => {
  return document.referrer;
};

export const isAirplaneModeSync = () => {
  return !navigator.onLine;
};

export const getUserAgentSync = () => {
  return window.navigator.userAgent;
};

export const isLocationEnabledSync = () => {
  return !!navigator.geolocation;
};

export const getTotalMemorySync = () => {
  if (extendedNavigator && extendedNavigator.deviceMemory) {
    return extendedNavigator.deviceMemory * 1000000000;
  }
  return -1;
};

export const getUsedMemorySync = () => {
  if (extendedPerformance && extendedPerformance.memory) {
    return extendedPerformance.memory.usedJSHeapSize;
  }
  return -1;
};

export const getPowerStateInternal = (battery: Battery) => {
  const { level, charging, chargingTime, dischargingTime } = battery;

  return {
    batteryLevel: level,
    lowPowerMode: false,
    batteryState: level === 1 ? 'full' : charging ? 'charging' : 'unplugged',
    chargingTime,
    dischargingTime,
  };
};

const init = async () => {
  if (extendedNavigator.getBattery) {
    const battery = await extendedNavigator.getBattery();

    isBatteryChargingNow = battery.charging;

    battery.addEventListener('chargingchange', () => {
      const { charging } = battery;

      isBatteryChargingNow = charging;
      powerState = getPowerStateInternal(battery);

      deviceInfoEmitter.emit('RNDeviceInfo_powerStateDidChange', powerState);
    });

    battery.addEventListener('levelchange', () => {
      const { level } = battery;

      batteryLevel = level;
      powerState = getPowerStateInternal(battery);

      deviceInfoEmitter.emit('RNDeviceInfo_batteryLevelDidChange', level);
      if (level < 0.2) {
        deviceInfoEmitter.emit('RNDeviceInfo_batteryLevelIsLow', level);
      }
    });
  }
};

export const getBaseOsSync = () => {
  const userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];

  let os = platform;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
};

export const getInstallReferrer = async () => {
  return getInstallReferrerSync();
};

export const getUserAgent = async () => {
  return getUserAgentSync();
};

export const isBatteryCharging = async () => {
  if (extendedNavigator.getBattery) {
    const battery = await extendedNavigator.getBattery();
    return battery.charging;
  }
  return false;
};

export const isBatteryChargingSync = () => {
  return isBatteryChargingNow;
};

export const isCameraPresent = async () => {
  if (navigator.mediaDevices) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return !!devices.find(d => d.kind === 'videoinput');
  }
  return false;
};

export const isCameraPresentSync = async () => {
  console.log(
    '[react-native-device-info] isCameraPresentSync not supported - please use isCameraPresent'
  );
  return false;
};

export const getBatteryLevel = async () => {
  if (extendedNavigator.getBattery) {
    const battery = await extendedNavigator.getBattery();
    return battery.level;
  }
  return -1;
};

export const getBatteryLevelSync = () => {
  return batteryLevel;
};

export const isLocationEnabled = async () => {
  return isLocationEnabledSync();
};

export const isAirplaneMode = async () => {
  return isAirplaneModeSync();
};

export const getBaseOs = async () => {
  return getBaseOsSync();
};

export const getTotalDiskCapacity = async () => {
  if (navigator.storage && navigator.storage.estimate) {
    const { quota } = await navigator.storage.estimate();
    return quota;
  }
  return -1;
};

export const getTotalDiskCapacitySync = () => {
  console.log(
    '[react-native-device-info] getTotalDiskCapacitySync not supported - please use getTotalDiskCapacity'
  );
  return -1;
};

export const getFreeDiskStorage = async () => {
  if (navigator.storage && navigator.storage.estimate) {
    const { quota, usage } = await navigator.storage.estimate();
    return quota && usage ? quota - usage : quota ? quota : -1;
  }
  return -1;
};

export const getFreeDiskStorageSync = () => {
  console.log(
    '[react-native-device-info] getFreeDiskStorageSync not supported - please use getFreeDiskStorage'
  );
  return -1;
};

export const isLandscapeSync = () => {
  return window.screen.width > window.screen.height;
};

export const isLandscape = async () => {
  return isLandscapeSync();
};

export const getMaxMemory = async () => {
  return getMaxMemorySync();
};

export const getUsedMemory = async () => {
  return getUsedMemorySync();
};

export const getTotalMemory = async () => {
  return getTotalMemorySync();
};

export const getPowerState = async () => {
  if (extendedNavigator.getBattery) {
    const battery = await extendedNavigator.getBattery();

    return getPowerStateInternal(battery);
  }
  return {};
};

export const getPowerStateSync = () => {
  return powerState;
};

export const getApplicationNameSync = () => {
  return (process && process.env && process.env.REACT_APP_NAME) || document.title;
};

export const getApplicationName = async () => {
  return getApplicationNameSync();
};

export const getLastUpdateTimeSync = () => {
  return process && process.env && process.env.REACT_APP_LAST_UPDATE_TIME;
};

export const getLastUpdateTime = async () => {
  return getLastUpdateTimeSync();
};

export const isEmulator = () => {
  return window.location.hostname === 'localhost';
};

init();

export const appVersion = (process && process.env && process.env.REACT_APP_VERSION) || 'unknown';
export const buildNumber =
  (process && process.env && process.env.REACT_APP_BUILD_NUMBER) || 'unknown';
export const bundleId = (process && process.env && process.env.REACT_APP_BUNDLE_ID) || 'unknown';
export const appName =
  (process && process.env && process.env.REACT_APP_NAME) || document.title || 'unknown';

/**
 * react-native-web empty polyfill.
 */
export default {
  appVersion,
  buildNumber,
  bundleId,
  appName,
  getApplicationName,
  getApplicationNameSync,
  getBaseOs,
  getBaseOsSync,
  getBatteryLevel,
  getBatteryLevelSync,
  getFreeDiskStorage,
  getFreeDiskStorageSync,
  getInstallReferrer,
  getInstallReferrerSync,
  getLastUpdateTime,
  getLastUpdateTimeSync,
  getMaxMemory,
  getMaxMemorySync,
  getPowerState,
  getPowerStateSync,
  getTotalDiskCapacity,
  getTotalDiskCapacitySync,
  getTotalMemory,
  getTotalMemorySync,
  getUsedMemory,
  getUsedMemorySync,
  getUserAgent,
  getUserAgentSync,
  isAirplaneMode,
  isAirplaneModeSync,
  isBatteryCharging,
  isBatteryChargingSync,
  isCameraPresent,
  isCameraPresentSync,
  isEmulator,
  isLandscape,
  isLandscapeSync,
  isLocationEnabled,
  isLocationEnabledSync,
};
