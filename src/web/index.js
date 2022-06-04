import { NativeEventEmitter, NativeModules } from 'react-native';

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

let batteryCharging = false,
  batteryLevel = -1,
  powerState = {};

const _readPowerState = (battery) => {
  const { level, charging, chargingtime, dischargingtime } = battery;

  return {
    batteryLevel: level,
    lowPowerMode: false,
    batteryState: level === 1 ? 'full' : charging ? 'charging' : 'unplugged',
    chargingtime,
    dischargingtime,
  };
};

export const getMaxMemorySync = () => {
  if (window.performance && window.performance.memory) {
    return window.performance.memory.jsHeapSizeLimit;
  }
  return -1;
};

export const getInstallReferrerSync = () => {
  return document.referrer;
};

export const isAirplaneModeSync = () => {
  return !!navigator.onLine;
};

export const getUserAgentSync = () => {
  return window.navigator.userAgent;
};

export const isLocationEnabledSync = () => {
  return !!navigator.geolocation;
};

export const getTotalMemorySync = () => {
  if (navigator.deviceMemory) {
    return navigator.deviceMemory * 1000000000;
  }
  return -1;
};

export const getUsedMemorySync = () => {
  if (window.performance && window.performance.memory) {
    return window.performance.memory.usedJSHeapSize;
  }
  return -1;
};

const init = () => {
  if (typeof navigator === 'undefined' || !navigator.getBattery) return;

  navigator.getBattery().then((battery) => {
    batteryCharging = battery.charging;

    battery.addEventListener('chargingchange', () => {
      const { charging } = battery;

      batteryCharging = charging;
      powerState = _readPowerState(battery);

      deviceInfoEmitter.emit('RNDeviceInfo_powerStateDidChange', powerState);
    });

    battery.addEventListener('levelchange', () => {
      const { level } = battery;

      batteryLevel = level;
      powerState = _readPowerState(battery);

      deviceInfoEmitter.emit('RNDeviceInfo_batteryLevelDidChange', level);
      if (level < 0.2) {
        deviceInfoEmitter.emit('RNDeviceInfo_batteryLevelIsLow', level);
      }
    });
  });
};

const getBaseOsSync = () => {
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

init();
/**
 * react-native-web empty polyfill.
 */

export const getInstallReferrer = async () => {
  return getInstallReferrerSync();
};

export const getUserAgent = async () => {
  return getUserAgentSync();
};

export const isBatteryCharging = async () => {
  if (navigator.getBattery) {
    return navigator.getBattery().then(battery => battery.charging);
  }
  return false;
};

export const isBatteryChargingSync = () => {
  return batteryCharging;
};

export const isCameraPresent = async () => {
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    return navigator.mediaDevices.enumerateDevices().then(devices => {
      return !!devices.find((d) => d.kind === 'videoinput');
    });
  }
  return false;
};

export const isCameraPresentSync = () => {
  console.log(
    '[react-native-device-info] isCameraPresentSync not supported - please use isCameraPresent'
  );
  return false;
};

export const getBatteryLevel = async () => {
  if (navigator.getBattery) {
    return navigator.getBattery().then(battery => battery.level);
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
    return navigator.storage.estimate().then(({ quota }) => quota)
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
    return navigator.storage.estimate().then(({ quota, usage }) => quota - usage)
  }
  return -1;
};

export const getFreeDiskStorageSync = () => {
  console.log(
    '[react-native-device-info] getFreeDiskStorageSync not supported - please use getFreeDiskStorage'
  );
  return -1;
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
  if (navigator.getBattery) {
    return navigator.getBattery().then((battery) => _readPowerState(battery))
  }
  return {};
};

export const getPowerStateSync = () => {
  return powerState;
};
