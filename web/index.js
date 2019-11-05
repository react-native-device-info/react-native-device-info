import { NativeEventEmitter, NativeModules } from 'react-native';

const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

let isBatteryCharging = false,
  batteryLevel = -1,
  powerState = {};

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

init();
/**
 * react-native-web empty polyfill.
 */
module.exports = {
  getUserAgent: () => {
    return Promise.resolve(window.navigator.userAgent);
  },
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
    return !!navigator.geolocation;
  },
  isLocationEnabledSync: () => {
    return !!navigator.geolocation;
  },
  isAirplaneMode: async () => {
    return !!navigator.onLine;
  },
  isAirplaneModeSync: () => {
    return !!navigator.onLine;
  },
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
