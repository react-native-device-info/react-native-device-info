import { NativeEventEmitter, NativeModules } from 'react-native';

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

let isBatteryCharging = false,
  batteryLevel = -1,
  powerState = {};

const getMaxMemorySync = () => {
  if (window.performance && window.performance.memory) {
    return window.performance.memory.jsHeapSizeLimit;
  }
  return -1;
};

const getInstallReferrerSync = () => {
  return document.referrer;
};

const isAirplaneModeSync = () => {
  return !!navigator.onLine;
};

const getUserAgentSync = () => {
  return window.navigator.userAgent;
};

const isLocationEnabledSync = () => {
  return !!navigator.geolocation;
};

const getTotalMemorySync = () => {
  if (navigator.deviceMemory) {
    return navigator.deviceMemory * 1000000000;
  }
  return -1;
};

const getUsedMemorySync = () => {
  if (window.performance && window.performance.memory) {
    return window.performance.memory.usedJSHeapSize;
  }
  return -1;
};

const getPowerState = battery => {
  const { level, charging, chargingtime, dischargingtime } = battery;

  return {
    batteryLevel: level,
    lowPowerMode: false,
    batteryState: level === 1 ? 'full' : charging ? 'charging' : 'unplugged',
    chargingtime,
    dischargingtime,
  };
};

const init = async () => {
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();

    isBatteryCharging = battery.charging;

    battery.addEventListener('chargingchange', () => {
      const { charging } = battery;

      isBatteryCharging = charging;
      powerState = getPowerState(battery);

      deviceInfoEmitter.emit('RNDeviceInfo_powerStateDidChange', powerState);
    });

    battery.addEventListener('levelchange', () => {
      const { level } = battery;

      batteryLevel = level;
      powerState = getPowerState(battery);

      deviceInfoEmitter.emit('RNDeviceInfo_batteryLevelDidChange', level);
      if (level < 0.2) {
        deviceInfoEmitter.emit('RNDeviceInfo_batteryLevelIsLow', level);
      }
    });
  }
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
module.exports = {
  getInstallReferrer: async () => {
    return getInstallReferrerSync();
  },
  getInstallReferrerSync,
  getUserAgent: async () => {
    return getUserAgentSync();
  },
  getUserAgentSync,
  isBatteryCharging: async () => {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      return battery.level;
    }
    return false;
  },
  isBatteryChargingSync: async () => {
    return isBatteryCharging;
  },
  isCameraPresent: async () => {
    if (navigator.getBattery) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return !!devices.find(d => d.kind === 'videoinput');
    }
    return false;
  },
  isCameraPresentSync: async () => {
    console.log(
      '[react-native-device-info] isCameraPresentSync not supported - please use isCameraPresent'
    );
    return false;
  },
  getBatteryLevel: async () => {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      return battery.level;
    }
    return -1;
  },
  getBatteryLevelSync: () => {
    return batteryLevel;
  },
  isLocationEnabled: async () => {
    return isLocationEnabledSync();
  },
  isLocationEnabledSync,
  isAirplaneMode: async () => {
    return isAirplaneModeSync();
  },
  isAirplaneModeSync,
  getBaseOs: async () => {
    return getBaseOsSync();
  },
  getBaseOsSync,
  getTotalDiskCapacity: async () => {
    if (navigator.storage && navigator.storage.estimate) {
      const { quota } = await navigator.storage.estimate();
      return quota;
    }
    return -1;
  },
  getTotalDiskCapacitySync: () => {
    console.log(
      '[react-native-device-info] getTotalDiskCapacitySync not supported - please use getTotalDiskCapacity'
    );
    return -1;
  },
  getFreeDiskStorage: async () => {
    if (navigator.storage && navigator.storage.estimate) {
      const { quota, usage } = await navigator.storage.estimate();
      return quota - usage;
    }
    return -1;
  },
  getFreeDiskStorageSync: () => {
    console.log(
      '[react-native-device-info] getFreeDiskStorageSync not supported - please use getFreeDiskStorage'
    );
    return -1;
  },
  getMaxMemory: async () => {
    return getMaxMemorySync();
  },
  getMaxMemorySync,
  getUsedMemory: async () => {
    return getUsedMemorySync();
  },
  getUsedMemorySync,
  getTotalMemory: async () => {
    return getTotalMemorySync();
  },
  getTotalMemorySync,
  getPowerState: async () => {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();

      return getPowerState(battery);
    }
    return {};
  },
  getPowerStateSync: () => {
    return powerState;
  },
};
