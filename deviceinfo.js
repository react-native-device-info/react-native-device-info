/**
 * @providesModule react-native-device-info
 */

var { RNDeviceInfo } = require('react-native').NativeModules;
var React = require('react-native');
var {Platform} = React;

module.exports = {
  getUniqueID: function () {
    return RNDeviceInfo.uniqueId;
  },
  getImei: function (){
     return (Platform.OS === 'android') ? RNDeviceInfo.imei : '';
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
  getSystemName: function () {
    return RNDeviceInfo.systemName;
  },
  getSystemVersion: function () {
    return RNDeviceInfo.systemVersion;
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
  }
};

