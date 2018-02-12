/**
 * This is essentially a polyfill for browsers which have a limited subset
 * of RNDeviceInfo's native information.
 */

module.exports = {
  uniqueId: '',
  instanceId: '',
  serialNumber: '',
  getIpAddress: () => new Promise((resolve, reject) => resolve('0.0.0.0')),
  getMacAddress: () => new Promise((resolve, reject) => resolve('00:00:00:00')),
  deviceId: '',
  systemManufacturer: '',
  model: '',
  brand: '',
  systemName: '',
  systemVersion: '',
  apiLevel: 0,
  bundleId: '',
  appName: '',
  buildNumber: 0,
  appVersion: 0,
  deviceName: '',
  userAgent: window.navigator.userAgent,
  deviceLocale: '',
  deviceCountry: '',
  timezone: new Date().getTimezoneOffset(), // unreliable!
  fontScale: 1,
  isEmulator: false,
  isTablet: false,
  is24Hour: false,
  isPinOrFingerprintSet: callback => callback && callback(false),
  firstInstallTime: 0,
  lastUpdateTime: 0,
  phoneNumber: '',
  carrier: '',
  totalMemory: 0,
  maxMemory: 0,
  totalDiskCapacity: 0,
  freeDiskStorage: 0,
};
