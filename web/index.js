/**
 * react-native-web empty polyfill.
 */
var RNDeviceInfo = require('../default');

RNDeviceInfo.userAgent = window.navigator.userAgent;

module.exports = RNDeviceInfo;
