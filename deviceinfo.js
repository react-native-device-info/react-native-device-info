/**
 * @providesModule react-native-device-info
 */

var RNDeviceInfo = require('react-native').NativeModules.RNDeviceInfo;

module.exports = {
  getUniqueID: _ => RNDeviceInfo.uniqueId,
  getInstanceID: _ => RNDeviceInfo.instanceId,
  getSerialNumber: _ => RNDeviceInfo.serialNumber,
  getIPAddress: _ => RNDeviceInfo.getIpAddress(),
  getMACAddress: _ => RNDeviceInfo.getMacAddress(),
  getMac: _ => RNDeviceInfo.mac,
  getDeviceId: _ => RNDeviceInfo.deviceId,
  getManufacturer: _ => RNDeviceInfo.systemManufacturer,
  getModel: _ => RNDeviceInfo.model,
  getBrand: _ => RNDeviceInfo.brand,
  getSystemName: _ => RNDeviceInfo.systemName,
  getSystemVersion: _ => RNDeviceInfo.systemVersion,
  getBundleId: _ => RNDeviceInfo.bundleId,
  getBuildNumber: _ => RNDeviceInfo.buildNumber,
  getVersion: _ => RNDeviceInfo.appVersion,
  getReadableVersion: _ => RNDeviceInfo.appVersion + "." + RNDeviceInfo.buildNumber,
  getDeviceName: _ => RNDeviceInfo.deviceName,
  getUserAgent: _ => RNDeviceInfo.userAgent,
  getDeviceLocale: _ => RNDeviceInfo.deviceLocale,
  getDeviceCountry: _ => RNDeviceInfo.deviceCountry,
  getTimezone: _ => RNDeviceInfo.timezone,
  isEmulator: _ => RNDeviceInfo.isEmulator,
  isTablet: _ => RNDeviceInfo.isTablet,
  isPinOrFingerprintSet: _ => RNDeviceInfo.isPinOrFingerprintSet,
};
