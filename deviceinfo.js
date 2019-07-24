/**
 * @providesModule react-native-device-info
 */
import { Platform, NativeModules, Dimensions } from 'react-native';

var RNDeviceInfo = NativeModules.RNDeviceInfo;

if (Platform.OS === 'web' || Platform.OS === 'dom') {
  RNDeviceInfo = require('./web');
}
if (!RNDeviceInfo) {
  // Produce an error if we don't have the native module
  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    Platform.OS === 'web' ||
    Platform.OS === 'dom'
  ) {
    throw new Error(`@react-native-community/react-native-device-info: NativeModule.RNDeviceInfo is null. To fix this issue try these steps:
  • Run \`react-native link react-native-device-info\` in the project root.
  • Rebuild and re-run the app.
  • If you are using CocoaPods on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.
  If none of these fix the issue, please open an issue on the Github repository: https://github.com/react-native-community/react-native-device-info`);
  }

  RNDeviceInfo = require('./default');
}

const devicesWithNotch = [
  {
    brand: 'Apple',
    model: 'iPhone X',
  },
  {
    brand: 'Apple',
    model: 'iPhone XS',
  },
  {
    brand: 'Apple',
    model: 'iPhone XS Max',
  },
  {
    brand: 'Apple',
    model: 'iPhone XR',
  },
  {
    brand: 'Asus',
    model: 'ZenFone 5',
  },
  {
    brand: 'Asus',
    model: 'ZenFone 5z',
  },
  {
    brand: 'google',
    model: 'Pixel 3 XL',
  },
  {
    brand: 'Huawei',
    model: 'P20',
  },
  {
    brand: 'Huawei',
    model: 'P20 Plus',
  },
  {
    brand: 'Huawei',
    model: 'P20 Lite',
  },
  {
    brand: 'Huawei',
    model: 'ANE-LX1',
  },
  {
    brand: 'Huawei',
    model: 'INE-LX1',
  },
  {
    brand: 'Huawei',
    model: 'Honor 10',
  },
  {
    brand: 'Huawei',
    model: 'Mate 20 Lite',
  },
  {
    brand: 'Huawei',
    model: 'Mate 20 Pro',
  },
  {
    brand: 'Huawei',
    model: 'P30 Lite',
  },
  {
    brand: 'Huawei',
    model: 'P30 Pro',
  },
  {
    brand: 'Huawei',
    model: 'Nova 3',
  },
  {
    brand: 'Huawei',
    model: 'Nova 3i',
  },
  {
    brand: 'Leagoo',
    model: 'S9',
  },
  {
    brand: 'LG',
    model: 'G7',
  },
  {
    brand: 'LG',
    model: 'G7 ThinQ',
  },
  {
    brand: 'LG',
    model: 'G7+ ThinQ',
  },
  {
    brand: 'LG',
    model: 'LM-Q910', //G7 One
  },
  {
    brand: 'LG',
    model: 'LM-G710', //G7 ThinQ
  },
  {
    brand: 'LG',
    model: 'LM-V405', //V40 ThinQ
  },
  {
    brand: 'Motorola',
    model: 'Moto g7 Play',
  },
  {
    brand: 'Motorola',
    model: 'Moto g7 Power',
  },
  {
    brand: 'Motorola',
    model: 'One',
  },
  {
    brand: 'Nokia',
    model: '5.1 Plus',
  },
  {
    brand: 'Nokia',
    model: '6.1 Plus',
  },
  {
    brand: 'Nokia',
    model: '7.1',
  },
  {
    brand: 'Nokia',
    model: '8.1',
  },
  {
    brand: 'OnePlus',
    model: '6',
  },
  {
    brand: 'OnePlus',
    model: 'A6003',
  },
  {
    brand: 'ONEPLUS',
    model: 'A6000',
  },
  {
    brand: 'OnePlus',
    model: 'OnePlus A6003',
  },
  {
    brand: 'OnePlus',
    model: 'ONEPLUS A6010',
  },
  {
    brand: 'OnePlus',
    model: 'ONEPLUS A6013',
  },
  {
    brand: 'OnePlus',
    model: 'ONEPLUS A6000',
  },
  {
    brand: 'Oppo',
    model: 'R15',
  },
  {
    brand: 'Oppo',
    model: 'R15 Pro',
  },
  {
    brand: 'Oppo',
    model: 'F7',
  },
  {
    brand: 'Oukitel',
    model: 'U18',
  },
  {
    brand: 'Sharp',
    model: 'Aquos S3',
  },
  {
    brand: 'Vivo',
    model: 'V9',
  },
  {
    brand: 'Vivo',
    model: 'X21',
  },
  {
    brand: 'Vivo',
    model: 'X21 UD',
  },
  {
    brand: 'xiaomi',
    model: 'MI 8',
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 Explorer Edition',
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 SE',
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 UD',
  },
  {
    brand: 'xiaomi',
    model: 'MI 8 Lite',
  },
  {
    brand: 'xiaomi',
    model: 'POCO F1',
  },
  {
    brand: 'xiaomi',
    model: 'POCOPHONE F1',
  },
  {
    brand: 'xiaomi',
    model: 'Redmi 6 Pro',
  },
  {
    brand: 'xiaomi',
    model: 'Redmi Note 7',
  },
  {
    brand: 'xiaomi',
    model: 'Mi A2 Lite',
  },
];

const deviceNamesByCode = {
  'iPod1,1': 'iPod Touch', // (Original)
  'iPod2,1': 'iPod Touch', // (Second Generation)
  'iPod3,1': 'iPod Touch', // (Third Generation)
  'iPod4,1': 'iPod Touch', // (Fourth Generation)
  'iPod5,1': 'iPod Touch', // (Fifth Generation)
  'iPod7,1': 'iPod Touch', // (Sixth Generation)
  'iPhone1,1': 'iPhone', // (Original)
  'iPhone1,2': 'iPhone 3G', // (3G)
  'iPhone2,1': 'iPhone 3GS', // (3GS)
  'iPad1,1': 'iPad', // (Original)
  'iPad2,1': 'iPad 2', //
  'iPad2,2': 'iPad 2', //
  'iPad2,3': 'iPad 2', //
  'iPad2,4': 'iPad 2', //
  'iPad3,1': 'iPad', // (3rd Generation)
  'iPad3,2': 'iPad', // (3rd Generation)
  'iPad3,3': 'iPad', // (3rd Generation)
  'iPhone3,1': 'iPhone 4', // (GSM)
  'iPhone3,2': 'iPhone 4', // iPhone 4
  'iPhone3,3': 'iPhone 4', // (CDMA/Verizon/Sprint)
  'iPhone4,1': 'iPhone 4S', //
  'iPhone5,1': 'iPhone 5', // (model A1428, AT&T/Canada)
  'iPhone5,2': 'iPhone 5', // (model A1429, everything else)
  'iPad3,4': 'iPad', // (4th Generation)
  'iPad3,5': 'iPad', // (4th Generation)
  'iPad3,6': 'iPad', // (4th Generation)
  'iPad2,5': 'iPad Mini', // (Original)
  'iPad2,6': 'iPad Mini', // (Original)
  'iPad2,7': 'iPad Mini', // (Original)
  'iPhone5,3': 'iPhone 5c', // (model A1456, A1532 | GSM)
  'iPhone5,4': 'iPhone 5c', // (model A1507, A1516, A1526 (China), A1529 | Global)
  'iPhone6,1': 'iPhone 5s', // (model A1433, A1533 | GSM)
  'iPhone6,2': 'iPhone 5s', // (model A1457, A1518, A1528 (China), A1530 | Global)
  'iPhone7,1': 'iPhone 6 Plus', //
  'iPhone7,2': 'iPhone 6', //
  'iPhone8,1': 'iPhone 6s', //
  'iPhone8,2': 'iPhone 6s Plus', //
  'iPhone8,4': 'iPhone SE', //
  'iPhone9,1': 'iPhone 7', // (model A1660 | CDMA)
  'iPhone9,3': 'iPhone 7', // (model A1778 | Global)
  'iPhone9,2': 'iPhone 7 Plus', // (model A1661 | CDMA)
  'iPhone9,4': 'iPhone 7 Plus', // (model A1784 | Global)
  'iPhone10,3': 'iPhone X', // (model A1865, A1902)
  'iPhone10,6': 'iPhone X', // (model A1901)
  'iPhone10,1': 'iPhone 8', // (model A1863, A1906, A1907)
  'iPhone10,4': 'iPhone 8', // (model A1905)
  'iPhone10,2': 'iPhone 8 Plus', // (model A1864, A1898, A1899)
  'iPhone10,5': 'iPhone 8 Plus', // (model A1897)
  'iPhone11,2': 'iPhone XS', // (model A2097, A2098)
  'iPhone11,4': 'iPhone XS Max', // (model A1921, A2103)
  'iPhone11,6': 'iPhone XS Max', // (model A2104)
  'iPhone11,8': 'iPhone XR', // (model A1882, A1719, A2105)
  'iPad4,1': 'iPad Air', // 5th Generation iPad (iPad Air) - Wifi
  'iPad4,2': 'iPad Air', // 5th Generation iPad (iPad Air) - Cellular
  'iPad4,3': 'iPad Air', // 5th Generation iPad (iPad Air)
  'iPad4,4': 'iPad Mini 2', // (2nd Generation iPad Mini - Wifi)
  'iPad4,5': 'iPad Mini 2', // (2nd Generation iPad Mini - Cellular)
  'iPad4,6': 'iPad Mini 2', // (2nd Generation iPad Mini)
  'iPad4,7': 'iPad Mini 3', // (3rd Generation iPad Mini)
  'iPad4,8': 'iPad Mini 3', // (3rd Generation iPad Mini)
  'iPad4,9': 'iPad Mini 3', // (3rd Generation iPad Mini)
  'iPad5,1': 'iPad Mini 4', // (4th Generation iPad Mini)
  'iPad5,2': 'iPad Mini 4', // (4th Generation iPad Mini)
  'iPad5,3': 'iPad Air 2', // 6th Generation iPad (iPad Air 2)
  'iPad5,4': 'iPad Air 2', // 6th Generation iPad (iPad Air 2)
  'iPad6,3': 'iPad Pro 9.7-inch', // iPad Pro 9.7-inch
  'iPad6,4': 'iPad Pro 9.7-inch', // iPad Pro 9.7-inch
  'iPad6,7': 'iPad Pro 12.9-inch', // iPad Pro 12.9-inch
  'iPad6,8': 'iPad Pro 12.9-inch', // iPad Pro 12.9-inch
  'iPad7,1': 'iPad Pro 12.9-inch', // 2nd Generation iPad Pro 12.5-inch - Wifi
  'iPad7,2': 'iPad Pro 12.9-inch', // 2nd Generation iPad Pro 12.5-inch - Cellular
  'iPad7,3': 'iPad Pro 10.5-inch', // iPad Pro 10.5-inch - Wifi
  'iPad7,4': 'iPad Pro 10.5-inch', // iPad Pro 10.5-inch - Cellular
  'iPad7,5': 'iPad (6th generation)', // iPad (6th generation) - Wifi
  'iPad7,6': 'iPad (6th generation)', // iPad (6th generation) - Cellular
  'iPad8,1': 'iPad Pro 11-inch (3rd generation)', // iPad Pro 11 inch (3rd generation) - Wifi
  'iPad8,2': 'iPad Pro 11-inch (3rd generation)', // iPad Pro 11 inch (3rd generation) - 1TB - Wifi
  'iPad8,3': 'iPad Pro 11-inch (3rd generation)', // iPad Pro 11 inch (3rd generation) - Wifi + cellular
  'iPad8,4': 'iPad Pro 11-inch (3rd generation)', // iPad Pro 11 inch (3rd generation) - 1TB - Wifi + cellular
  'iPad8,5': 'iPad Pro 12.9-inch (3rd generation)', // iPad Pro 12.9 inch (3rd generation) - Wifi
  'iPad8,6': 'iPad Pro 12.9-inch (3rd generation)', // iPad Pro 12.9 inch (3rd generation) - 1TB - Wifi
  'iPad8,7': 'iPad Pro 12.9-inch (3rd generation)', // iPad Pro 12.9 inch (3rd generation) - Wifi + cellular
  'iPad8,8': 'iPad Pro 12.9-inch (3rd generation)', // iPad Pro 12.9 inch (3rd generation) - 1TB - Wifi + cellular
  'AppleTV2,1': 'Apple TV', // Apple TV (2nd Generation)
  'AppleTV3,1': 'Apple TV', // Apple TV (3rd Generation)
  'AppleTV3,2': 'Apple TV', // Apple TV (3rd Generation - Rev A)
  'AppleTV5,3': 'Apple TV', // Apple TV (4th Generation)
  'AppleTV6,2': 'Apple TV 4K', // Apple TV 4K
};

export default {
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
  getCameraPresence: function() {
    return RNDeviceInfo.getCameraPresence();
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
    if (Platform.OS === 'ios') {
      var deviceName;
      var deviceId = RNDeviceInfo.deviceId;
      if (deviceId) {
        deviceName = deviceNamesByCode[deviceId];
        if (!deviceName) {
          // Not found on database. At least guess main device type from string contents:
          if (deviceId.startsWith('iPod')) {
            deviceName = 'iPod Touch';
          } else if (deviceId.startsWith('iPad')) {
            deviceName = 'iPad';
          } else if (deviceId.startsWith('iPhone')) {
            deviceName = 'iPhone';
          } else if (deviceId.startsWith('AppleTV')) {
            deviceName = 'Apple TV';
          }
        }
      }
      return deviceName;
    } else {
      return RNDeviceInfo.model;
    }
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
  getBuildId: function() {
    return RNDeviceInfo.buildId;
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
  getPreferredLocales: function() {
    return RNDeviceInfo.preferredLocales;
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
  getBootloader: function() {
    return RNDeviceInfo.bootloader;
  },
  getDevice: function() {
    return RNDeviceInfo.device;
  },
  getDisplay: function() {
    return RNDeviceInfo.display;
  },
  getFingerprint: function() {
    return RNDeviceInfo.fingerprint;
  },
  getHardware: function() {
    return RNDeviceInfo.hardware;
  },
  getHost: function() {
    return RNDeviceInfo.host;
  },
  getProduct: function() {
    return RNDeviceInfo.product;
  },
  getTags: function() {
    return RNDeviceInfo.tags;
  },
  getType: function() {
    return RNDeviceInfo.type;
  },
  getBaseOS: function() {
    return RNDeviceInfo.baseOS;
  },
  getPreviewSdkInt: function() {
    return RNDeviceInfo.previewSdkInt;
  },
  getSecurityPatch: function() {
    return RNDeviceInfo.securityPatch;
  },
  getCodename: function() {
    return RNDeviceInfo.codename;
  },
  getIncremental: function() {
    return RNDeviceInfo.incremental;
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
  hasNotch: function() {
    return (
      devicesWithNotch.findIndex(
        item =>
          item.brand.toLowerCase() === RNDeviceInfo.brand.toLowerCase() &&
          item.model.toLowerCase() === this.getModel().toLowerCase()
      ) !== -1
    );
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
  getPowerState: function() {
    return RNDeviceInfo.getPowerState();
  },
  isBatteryCharging: function() {
    return RNDeviceInfo.isBatteryCharging();
  },
  isLandscape: function() {
    const { height, width } = Dimensions.get('window');
    return width >= height;
  },
  isAirPlaneMode: function() {
    return RNDeviceInfo.isAirPlaneMode();
  },
  getDeviceType: function() {
    return RNDeviceInfo.deviceType;
  },
  isAutoDateAndTime: function() {
    return RNDeviceInfo.isAutoDateAndTime();
  },
  isAutoTimeZone: function() {
    return RNDeviceInfo.isAutoTimeZone();
  },
  supportedABIs: function() {
    return RNDeviceInfo.supportedABIs;
  },
  supported32BitAbis: function() {
    return RNDeviceInfo.supported32BitAbis;
  },
  supported64BitAbis: function() {
    return RNDeviceInfo.supported64BitAbis;
  },
  hasSystemFeature: function(feature) {
    return RNDeviceInfo.hasSystemFeature(feature);
  },
  getSystemAvailableFeatures: function() {
    return RNDeviceInfo.getSystemAvailableFeatures();
  },
  isLocationEnabled: function() {
    return RNDeviceInfo.isLocationEnabled();
  },
  getAvailableLocationProviders: function() {
    return RNDeviceInfo.getAvailableLocationProviders();
  },
};
