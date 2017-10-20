/**
 * @providesModule react-native-device-info
 */

var RNDeviceInfo = require('react-native').NativeModules.RNDeviceInfo;

module.exports = {
  getUniqueID: function () {
    return RNDeviceInfo.uniqueId;
  },
  getInstanceID: function() {
    return RNDeviceInfo.instanceId;
  },
  getSerialNumber: function () {
    return RNDeviceInfo.serialNumber;
  },
  getIPAddress: function () {
    return RNDeviceInfo.getIpAddress();
  },
  getMACAddress: function () {
    return RNDeviceInfo.getMacAddress();
  },
  getDeviceId: function () {
    return RNDeviceInfo.deviceId;
  },
  getManufacturer: function () {
    return RNDeviceInfo.systemManufacturer;
  },
  getModel: function () {
    return RNDeviceInfo.model;
  },
  getBrand: function () {
    return RNDeviceInfo.brand;
  },
  getSystemName: function () {
    return RNDeviceInfo.systemName;
  },
  getSystemVersion: function () {
    return RNDeviceInfo.systemVersion;
  },
  getAPILevel: function () {
    return RNDeviceInfo.apiLevel;
  },
  getBundleId: function() {
    return RNDeviceInfo.bundleId;
  },
  getBuildNumber: function() {
    return RNDeviceInfo.buildNumber;
  },
  getVersion: function() {
    return RNDeviceInfo.appVersion;
  },
  getReadableVersion: function() {
    return RNDeviceInfo.appVersion + "." + RNDeviceInfo.buildNumber;
  },
  getDeviceName: function() {
    return RNDeviceInfo.deviceName;
  },
  getUserAgent: function() {
    return RNDeviceInfo.userAgent;
  },
  getDeviceLocale: function() {
    return RNDeviceInfo.deviceLocale;
  },
  getDeviceCountry: function() {
    return RNDeviceInfo.deviceCountry;
  },
  getTimezone: function() {
    return RNDeviceInfo.timezone;
  },
  isEmulator: function() {
    return RNDeviceInfo.isEmulator;
  },
  isTablet: function() {
    return RNDeviceInfo.isTablet;
  },
  isPinOrFingerprintSet: function () {
    return RNDeviceInfo.isPinOrFingerprintSet;
  },
  getFirstInstallTime: function () {
    return RNDeviceInfo.firstInstallTime;
  },
  getLastUpdateTime: function () {
    return RNDeviceInfo.lastUpdateTime;
  },
  getPhoneNumber: function () {
    return RNDeviceInfo.phoneNumber;
  }
};
