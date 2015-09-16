/**
 * @providesModule react-native-device-info
 */

var { RNDeviceInfo } = require('react-native').NativeModules;

export default class CurrentDeviceIOS {
 static getUniqueID() {
   return RNDeviceInfo.deviceId;
 }

 static getManufacturer() {
   return "Apple";
 }

 static getModel() {
   return RNDeviceInfo.model;
 }

 static getSystemName() {
   return RNDeviceInfo.systemName;
 }

 static getSystemVersion() {
   return RNDeviceInfo.systemVersion;
 }
}
