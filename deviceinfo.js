/**
 * @providesModule react-native-device-info
 */
import { Platform, NativeModules } from 'react-native';

var RNDeviceInfo = NativeModules.RNDeviceInfo;

if (!RNDeviceInfo && Platform.OS === 'web') {
  RNDeviceInfo = require('./web');
}

module.exports = {
  getUniqueID: function() {
    return RNDeviceInfo.uniqueId;
  },
  getInstanceID: function() {
    return RNDeviceInfo.instanceId;
  },
  getSerialNumber: function() {
    return RNDeviceInfo.serialNumber;
  },
  getIPAddress: function() {
    return RNDeviceInfo.getIpAddress();
  },
  getMACAddress: function() {
    return RNDeviceInfo.getMacAddress();
  },
  getDeviceId: function() {
    return RNDeviceInfo.deviceId;
  },
  getManufacturer: function() {
    return RNDeviceInfo.systemManufacturer;
  },
  getModel: function() {
    return RNDeviceInfo.model;
  },
  getBrand: function() {
    return RNDeviceInfo.brand;
  },
  getSystemName: function() {
    return RNDeviceInfo.systemName;
  },
  getSystemVersion: function() {
    return RNDeviceInfo.systemVersion;
  },
  getAPILevel: function() {
    return RNDeviceInfo.apiLevel;
  },
  getBundleId: function() {
    return RNDeviceInfo.bundleId;
  },
  getApplicationName: function() {
    return RNDeviceInfo.appName;
  },
  getBuildNumber: function() {
    return RNDeviceInfo.buildNumber;
  },
  getVersion: function() {
    return RNDeviceInfo.appVersion;
  },
  getReadableVersion: function() {
    return RNDeviceInfo.appVersion + '.' + RNDeviceInfo.buildNumber;
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
  getFontScale: function() {
    return RNDeviceInfo.fontScale;
  },
  isEmulator: function() {
    return RNDeviceInfo.isEmulator;
  },
  isTablet: function() {
    return RNDeviceInfo.isTablet;
  },
  is24Hour: function() {
    return RNDeviceInfo.is24Hour;
  },
  isPinOrFingerprintSet: function() {
    return RNDeviceInfo.isPinOrFingerprintSet;
  },
  getFirstInstallTime: function() {
    return RNDeviceInfo.firstInstallTime;
  },
  getInstallReferrer: function() {
    return RNDeviceInfo.installReferrer;
  },
  getLastUpdateTime: function() {
    return RNDeviceInfo.lastUpdateTime;
  },
  getPhoneNumber: function() {
    return RNDeviceInfo.phoneNumber;
  },
  getCarrier: function() {
    return RNDeviceInfo.carrier;
  },
  getTotalMemory: function() {
    return RNDeviceInfo.totalMemory;
  },
  getMaxMemory: function() {
    return RNDeviceInfo.maxMemory;
  },
  getTotalDiskCapacity: function() {
    return RNDeviceInfo.totalDiskCapacity;
  },
  getFreeDiskStorage: function() {
    return RNDeviceInfo.freeDiskStorage;
  },
  getBatteryLevel: function() {
    return RNDeviceInfo.getBatteryLevel();
  },
};
