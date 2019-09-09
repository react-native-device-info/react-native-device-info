/**
 * @providesModule react-native-device-info
 */
import { Platform, NativeModules, Dimensions } from 'react-native';

var RNDeviceInfo = NativeModules.RNDeviceInfo;
var OS = Platform.OS;

if (OS === 'web' || OS === 'dom') {
  RNDeviceInfo = require('./web');
}
if (!RNDeviceInfo) {
  // Produce an error if we don't have the native module
  if (OS === 'android' || OS === 'ios' || OS === 'web' || OS === 'dom') {
    throw new Error(`@react-native-community/react-native-device-info: NativeModule.RNDeviceInfo is null. To fix this issue try these steps:
  • For react-native <= 0.59: Run \`react-native link react-native-device-info\` in the project root.
  • Rebuild and re-run the app.
  • If you are using CocoaPods on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.
  If none of these fix the issue, please open an issue on the Github repository: https://github.com/react-native-community/react-native-device-info`);
  }
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

let uniqueId;
export async function getUniqueId() {
  if (!uniqueId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      uniqueId = await RNDeviceInfo.getUniqueId();
    } else {
      uniqueId = 'unknown';
    }
  }
  return uniqueId;
}

export function getUniqueIdSync() {
  if (!uniqueId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      uniqueId = RNDeviceInfo.getUniqueIdSync();
    } else {
      uniqueId = 'unknown';
    }
  }
  return uniqueId;
}

let instanceId;
export async function getInstanceId() {
  if (!instanceId) {
    if (OS === 'android') {
      instanceId = await RNDeviceInfo.getInstanceId();
    } else {
      instanceId = 'unknown';
    }
  }
  return instanceId;
}

export function getInstanceIdSync() {
  if (!instanceId) {
    if (OS === 'android') {
      instanceId = RNDeviceInfo.getInstanceIdSync();
    } else {
      instanceId = 'unknown';
    }
  }
  return instanceId;
}

let serialNumber;
export async function getSerialNumber() {
  if (!serialNumber) {
    if (OS === 'android') {
      serialNumber = await RNDeviceInfo.getSerialNumber();
    } else {
      serialNumber = 'unknown';
    }
  }
  return serialNumber;
}

export function getSerialNumberSync() {
  if (!serialNumber) {
    if (OS === 'android') {
      serialNumber = RNDeviceInfo.getSerialNumberSync();
    } else {
      serialNumber = 'unknown';
    }
  }
  return serialNumber;
}

let androidId;
export async function getAndroidId() {
  if (!androidId) {
    if (OS === 'android') {
      androidId = await RNDeviceInfo.getAndroidId();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

export function getAndroidIdSync() {
  if (!androidId) {
    if (OS === 'android') {
      androidId = RNDeviceInfo.getAndroidIdSync();
    } else {
      androidId = 'unknown';
    }
  }
  return androidId;
}

export async function getIpAddress() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.getIpAddress();
  }
  return 'unknown';
}

export function getIpAddressSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.getIpAddressSync();
  }
  return 'unknown';
}

export async function getCameraPresence() {
  if (OS === 'android' || OS === 'windows') {
    return RNDeviceInfo.getCameraPresence();
  }
  return false;
}

export function getCameraPresenceSync() {
  if (OS === 'android' || OS === 'windows') {
    return RNDeviceInfo.getCameraPresenceSync();
  }
  return false;
}

export async function getMacAddress() {
  if (OS === 'android') {
    return RNDeviceInfo.getMacAddress();
  }
  if (OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

export function getMacAddressSync() {
  if (OS === 'android') {
    return RNDeviceInfo.getMacAddressSync();
  }
  if (OS === 'ios') {
    return '02:00:00:00:00:00';
  }
  return 'unknown';
}

let deviceId;
export async function getDeviceId() {
  if (!deviceId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      deviceId = await RNDeviceInfo.getDeviceId();
    } else {
      deviceId = 'unknown';
    }
  }
  return deviceId;
}

export function getDeviceIdSync() {
  if (!deviceId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      deviceId = RNDeviceInfo.getDeviceIdSync();
    } else {
      deviceId = 'unknown';
    }
  }
  return deviceId;
}

let manufacturer;
export async function getManufacturer() {
  if (!manufacturer) {
    if (OS === 'android' || OS === 'windows') {
      manufacturer = await RNDeviceInfo.getSystemManufacturer();
    } else if (OS === 'ios') {
      manufacturer = 'Apple';
    } else {
      manufacturer = 'unknown';
    }
  }
  return manufacturer;
}

export function getManufacturerSync() {
  if (!manufacturer) {
    if (OS === 'android' || OS === 'windows') {
      manufacturer = RNDeviceInfo.getSystemManufacturerSync();
    } else if (OS === 'ios') {
      manufacturer = 'Apple';
    } else {
      manufacturer = 'unknown';
    }
  }
  return manufacturer;
}

let model;
export async function getModel() {
  if (!model) {
    if (OS === 'ios') {
      let deviceName;
      let device = await RNDeviceInfo.getDeviceId();
      if (deviceId) {
        deviceName = deviceNamesByCode[device];
        if (!deviceName) {
          // Not found on database. At least guess main device type from string contents:
          if (device.startsWith('iPod')) {
            deviceName = 'iPod Touch';
          } else if (device.startsWith('iPad')) {
            deviceName = 'iPad';
          } else if (device.startsWith('iPhone')) {
            deviceName = 'iPhone';
          } else if (device.startsWith('AppleTV')) {
            deviceName = 'Apple TV';
          }
        }
      }
      model = deviceName;
    } else if (OS === 'android' || OS === 'windows') {
      model = await RNDeviceInfo.getModel();
    } else {
      model = 'unknown';
    }
  }
  return model;
}

export function getModelSync() {
  if (!model) {
    if (OS === 'ios') {
      var deviceName;
      var device = RNDeviceInfo.getDeviceIdSync();
      if (device) {
        deviceName = deviceNamesByCode[device];
        if (!deviceName) {
          // Not found on database. At least guess main device type from string contents:
          if (device.startsWith('iPod')) {
            deviceName = 'iPod Touch';
          } else if (device.startsWith('iPad')) {
            deviceName = 'iPad';
          } else if (device.startsWith('iPhone')) {
            deviceName = 'iPhone';
          } else if (device.startsWith('AppleTV')) {
            deviceName = 'Apple TV';
          }
        }
      }
      model = deviceName;
    } else if (OS === 'android' || OS === 'windows') {
      model = RNDeviceInfo.getModelSync();
    } else {
      model = 'unknown';
    }
  }
  return model;
}

let brand;
export async function getBrand() {
  if (!brand) {
    if (OS === 'android' || OS === 'windows') {
      brand = await RNDeviceInfo.getBrand();
    } else if (OS === 'ios') {
      brand = 'Apple';
    } else {
      brand = 'unknown';
    }
  }
  return brand;
}

export function getBrandSync() {
  if (!brand) {
    if (OS === 'android' || OS === 'windows') {
      return RNDeviceInfo.getBrandSync();
    } else if (OS === 'ios') {
      return 'Apple';
    } else {
      brand = 'unknown';
    }
    return brand;
  }
}

let systemName;
export async function getSystemName() {
  if (!systemName) {
    if (OS === 'ios') {
      systemName = await RNDeviceInfo.getSystemName();
    } else if (OS === 'android') {
      systemName = 'Android';
    } else if (OS === 'windows') {
      systemName = 'Windows';
    } else {
      systemName = 'unknown';
    }
  }
  return systemName;
}

export function getSystemNameSync() {
  if (!systemName) {
    if (OS === 'ios') {
      systemName = RNDeviceInfo.getSystemNameSync();
    } else if (OS === 'android') {
      systemName = 'Android';
    } else if (OS === 'windows') {
      systemName = 'Windows';
    } else {
      systemName = 'unknown';
    }
  }
  return systemName;
}

let systemVersion;
export async function getSystemVersion() {
  if (!systemVersion) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      systemVersion = await RNDeviceInfo.getSystemVersion();
    } else {
      systemVersion = 'unknown';
    }
  }
  return systemVersion;
}

export function getSystemVersionSync() {
  if (!systemVersion) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      systemVersion = RNDeviceInfo.getSystemVersionSync();
    } else {
      systemVersion = 'unknown';
    }
  }
  return systemVersion;
}

let buildId;
export async function getBuildId() {
  if (!buildId) {
    if (OS === 'android' || OS === 'ios') {
      buildId = await RNDeviceInfo.getBuildId();
    } else {
      buildId = 'unknown';
    }
  }
  return buildId;
}

export function getBuildIdSync() {
  if (!buildId) {
    if (OS === 'android' || OS === 'ios') {
      buildId = RNDeviceInfo.getBuildIdSync();
    }
    buildId = 'unknown';
  }
  return buildId;
}

let apiLevel;
export async function getApiLevel() {
  if (!apiLevel) {
    if (OS === 'android') {
      apiLevel = await RNDeviceInfo.getApiLevel();
    } else {
      apiLevel = -1;
    }
  }
  return apiLevel;
}

export function getApiLevelSync() {
  if (!apiLevel) {
    if (OS === 'android') {
      apiLevel = RNDeviceInfo.getApiLevelSync();
    } else {
      apiLevel = -1;
    }
  }
  return apiLevel;
}

let bundleId;
export async function getBundleId() {
  if (!bundleId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      bundleId = await RNDeviceInfo.getBundleId();
    } else {
      bundleId = 'unknown';
    }
  }
  return bundleId;
}

export function getBundleIdSync() {
  if (!bundleId) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      bundleId = RNDeviceInfo.getBundleIdSync();
    } else {
      bundleId = 'unknown';
    }
  }
  return bundleId;
}

let appName;
export async function getApplicationName() {
  if (!appName) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      appName = await RNDeviceInfo.getAppName();
    } else {
      appName = 'unknown';
    }
  }
  return appName;
}

export function getApplicationNameSync() {
  if (!appName) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      appName = RNDeviceInfo.getAppNameSync();
    } else {
      appName = 'unknown';
    }
  }
  return appName;
}

let buildNumber;
export async function getBuildNumber() {
  if (!buildNumber) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      buildNumber = await RNDeviceInfo.getBuildNumber();
    } else {
      buildNumber = 'unknown';
    }
  }
  return buildNumber;
}

export function getBuildNumberSync() {
  if (!buildNumber) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      buildNumber = RNDeviceInfo.getBuildNumberSync();
    } else {
      buildNumber = 'unknown';
    }
  }
  return buildNumber;
}

let version;
export async function getVersion() {
  if (!version) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      version = await RNDeviceInfo.getAppVersion();
    } else {
      version = 'unknown';
    }
  }
  return version;
}

export function getVersionSync() {
  if (!version) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      version = RNDeviceInfo.getAppVersionSync();
    } else {
      version = 'unknown';
    }
  }
  return version;
}

export async function getReadableVersion() {
  return (await RNDeviceInfo.getAppVersion()) + '.' + (await RNDeviceInfo.getBuildNumber());
}

export function getReadableVersionSync() {
  return RNDeviceInfo.getAppVersionSync() + '.' + RNDeviceInfo.getBuildNumberSync();
}

let deviceName;
export async function getDeviceName() {
  if (!deviceName) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      deviceName = await RNDeviceInfo.getDeviceName();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export function getDeviceNameSync() {
  if (!deviceName) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      deviceName = RNDeviceInfo.getDeviceNameSync();
    } else {
      deviceName = 'unknown';
    }
  }
  return deviceName;
}

export async function getUsedMemory() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getUsedMemory();
  }
  return -1;
}

export function getUsedMemorySync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getUsedMemorySync();
  }
  return -1;
}

let userAgent;
export async function getUserAgent() {
  if (!userAgent) {
    if (OS === 'android' || OS === 'ios' || OS === 'web') {
      userAgent = await RNDeviceInfo.getUserAgent();
    } else {
      userAgent = 'unknown';
    }
  }
  return userAgent;
}

export function getUserAgentSync() {
  throw new Error('getUserAgent is only available async');
}

export async function getFontScale() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getFontScale();
  }
  return Promise.resolve('unknown');
}

export function getFontScaleSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getFontScaleSync();
  }
  return 'unknown';
}

let bootloader;
export async function getBootloader() {
  if (!bootloader) {
    if (OS === 'android') {
      bootloader = await RNDeviceInfo.getBootloader();
    } else {
      bootloader = 'unknown';
    }
  }
  return bootloader;
}

export function getBootloaderSync() {
  if (!bootloader) {
    if (OS === 'android') {
      bootloader = RNDeviceInfo.getBootloaderSync();
    } else {
      bootloader = 'unknown';
    }
  }
  return bootloader;
}

export async function getDevice() {
  if (OS === 'android') {
    return RNDeviceInfo.getDevice();
  }
  return Promise.resolve('unknown');
}

export function getDeviceSync() {
  if (OS === 'android') {
    return RNDeviceInfo.getDeviceSync();
  }
  return 'unknown';
}

let display;
export async function getDisplay() {
  if (!display) {
    if (OS === 'android') {
      display = await RNDeviceInfo.getDisplay();
    } else {
      display = 'unknown';
    }
  }
  return display;
}

export function getDisplaySync() {
  if (!display) {
    if (OS === 'android') {
      display = RNDeviceInfo.getDisplaySync();
    } else {
      display = 'unknown';
    }
  }
  return display;
}

let fingerprint;
export async function getFingerprint() {
  if (!fingerprint) {
    if (OS === 'android') {
      fingerprint = await RNDeviceInfo.getFingerprint();
    } else {
      fingerprint = 'unknown';
    }
  }
  return fingerprint;
}

export function getFingerprintSync() {
  if (!fingerprint) {
    if (OS === 'android') {
      fingerprint = RNDeviceInfo.getFingerprintSync();
    } else {
      fingerprint = 'unknown';
    }
  }
  return fingerprint;
}

let hardware;
export async function getHardware() {
  if (!hardware) {
    if (OS === 'android') {
      hardware = await RNDeviceInfo.getHardware();
    } else {
      hardware = 'unknown';
    }
  }
  return hardware;
}

export function getHardwareSync() {
  if (!hardware) {
    if (OS === 'android') {
      hardware = RNDeviceInfo.getHardwareSync();
    } else {
      hardware = 'unknown';
    }
  }
  return hardware;
}

let host;
export async function getHost() {
  if (!host) {
    if (OS === 'android') {
      host = await RNDeviceInfo.getHost();
    } else {
      host = 'unknown';
    }
  }
  return host;
}

export function getHostSync() {
  if (!host) {
    if (OS === 'android') {
      host = RNDeviceInfo.getHostSync();
    } else {
      host = 'unknown';
    }
  }
  return host;
}

let product;
export async function getProduct() {
  if (!product) {
    if (OS === 'android') {
      product = await RNDeviceInfo.getProduct();
    } else {
      product = 'unknown';
    }
  }
  return product;
}

export function getProductSync() {
  if (!product) {
    if (OS === 'android') {
      product = RNDeviceInfo.getProductSync();
    } else {
      product = 'unknown';
    }
  }
  return product;
}

let tags;
export async function getTags() {
  if (!tags) {
    if (OS === 'android') {
      tags = await RNDeviceInfo.getTags();
    } else {
      tags = 'unknown';
    }
  }
  return tags;
}

export function getTagsSync() {
  if (!tags) {
    if (OS === 'android') {
      tags = RNDeviceInfo.getTagsSync();
    } else {
      tags = 'unknown';
    }
  }
  return tags;
}

let type;
export async function getType() {
  if (!type) {
    if (OS === 'android') {
      type = await RNDeviceInfo.getType();
    } else {
      type = 'unknown';
    }
  }
  return type;
}

export function getTypeSync() {
  if (!type) {
    if (OS === 'android') {
      type = RNDeviceInfo.getTypeSync();
    } else {
      type = 'unknown';
    }
  }
  return type;
}

let baseOs;
export async function getBaseOs() {
  if (!baseOs) {
    if (OS === 'android') {
      baseOs = await RNDeviceInfo.getBaseOs();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

export function getBaseOsSync() {
  if (!baseOs) {
    if (OS === 'android') {
      baseOs = RNDeviceInfo.getBaseOsSync();
    } else {
      baseOs = 'unknown';
    }
  }
  return baseOs;
}

let previewSdkInt;
export async function getPreviewSdkInt() {
  if (!previewSdkInt) {
    if (OS === 'android') {
      previewSdkInt = await RNDeviceInfo.getPreviewSdkInt();
    } else {
      previewSdkInt = 'unknown';
    }
  }
  return previewSdkInt;
}

export function getPreviewSdkIntSync() {
  if (!previewSdkInt) {
    if (OS === 'android') {
      previewSdkInt = RNDeviceInfo.getPreviewSdkIntSync();
    } else {
      previewSdkInt = 'unknown';
    }
  }
  return previewSdkInt;
}

let securityPatch;
export async function getSecurityPatch() {
  if (!securityPatch) {
    if (OS === 'android') {
      securityPatch = await RNDeviceInfo.getSecurityPatch();
    } else {
      securityPatch = 'unknown';
    }
  }
  return securityPatch;
}

export function getSecurityPatchSync() {
  if (!securityPatch) {
    if (OS === 'android') {
      securityPatch = RNDeviceInfo.getSecurityPatchSync();
    } else {
      securityPatch = 'unknown';
    }
  }
  return securityPatch;
}

let codeName;
export async function getCodename() {
  if (!codeName) {
    if (OS === 'android') {
      codeName = await RNDeviceInfo.getCodename();
    } else {
      codeName = 'unknown';
    }
  }
  return codeName;
}

export function getCodenameSync() {
  if (!codeName) {
    if (OS === 'android') {
      codeName = RNDeviceInfo.getCodenameSync();
    } else {
      codeName = 'unknown';
    }
  }
  return codeName;
}

let incremental;
export async function getIncremental() {
  if (!incremental) {
    if (OS === 'android') {
      incremental = await RNDeviceInfo.getIncremental();
    } else {
      incremental = 'unknown';
    }
  }
  return incremental;
}

export function getIncrementalSync() {
  if (!incremental) {
    if (OS === 'android') {
      incremental = RNDeviceInfo.getIncrementalSync();
    } else {
      incremental = 'unknown';
    }
  }
  return incremental;
}

let emulator;
export async function isEmulator() {
  if (!emulator) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      emulator = await RNDeviceInfo.isEmulator();
    } else {
      emulator = false;
    }
  }
  return emulator;
}

export function isEmulatorSync() {
  if (!emulator) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      emulator = RNDeviceInfo.isEmulatorSync();
    } else {
      emulator = false;
    }
  }
  return emulator;
}

let tablet;
export async function isTablet() {
  if (!tablet) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      tablet = await RNDeviceInfo.isTablet();
    } else {
      tablet = false;
    }
  }
  return tablet;
}

export function isTabletSync() {
  if (!tablet) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      tablet = RNDeviceInfo.isTabletSync();
    } else {
      tablet = false;
    }
  }
  return tablet;
}

export async function isPinOrFingerprintSet() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.isPinOrFingerprintSet();
  }
  return Promise.resolve(false);
}

export function isPinOrFingerprintSetSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.isPinOrFingerprintSetSync();
  }
  return false;
}

let notch;
export async function hasNotch() {
  if (!notch) {
    let _brand = await getBrand();
    let _model = await getModel();
    notch =
      devicesWithNotch.findIndex(
        item =>
          item.brand.toLowerCase() === _brand.toLowerCase() &&
          item.model.toLowerCase() === _model.toLowerCase()
      ) !== -1;
  }
  return notch;
}

export function hasNotchSync() {
  if (!notch) {
    let _brand = getBrandSync();
    let _model = getModelSync();
    notch =
      devicesWithNotch.findIndex(
        item =>
          item.brand.toLowerCase() === _brand.toLowerCase() &&
          item.model.toLowerCase() === _model.toLowerCase()
      ) !== -1;
  }
  return notch;
}

let firstInstallTime;
export async function getFirstInstallTime() {
  if (!firstInstallTime) {
    if (OS === 'android' || OS === 'windows') {
      firstInstallTime = await RNDeviceInfo.getFirstInstallTime();
    } else {
      firstInstallTime = -1;
    }
  }
  return firstInstallTime;
}

export function getFirstInstallTimeSync() {
  if (!firstInstallTime) {
    if (OS === 'android' || OS === 'windows') {
      firstInstallTime = RNDeviceInfo.getFirstInstallTimeSync();
    } else {
      firstInstallTime = -1;
    }
  }
  return firstInstallTime;
}

let installReferrer;
export async function getInstallReferrer() {
  if (!installReferrer) {
    if (OS === 'android') {
      installReferrer = await RNDeviceInfo.getInstallReferrer();
    } else {
      installReferrer = 'unknown';
    }
  }
  return installReferrer;
}

export function getInstallReferrerSync() {
  if (!installReferrer) {
    if (OS === 'android') {
      installReferrer = RNDeviceInfo.getInstallReferrerSync();
    } else {
      installReferrer = 'unknown';
    }
  }
  return installReferrer;
}

let lastUpdateTime;
export async function getLastUpdateTime() {
  if (!lastUpdateTime) {
    if (OS === 'android') {
      lastUpdateTime = await RNDeviceInfo.getLastUpdateTime();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export function getLastUpdateTimeSync() {
  if (!lastUpdateTime) {
    if (OS === 'android') {
      lastUpdateTime = RNDeviceInfo.getLastUpdateTimeSync();
    } else {
      lastUpdateTime = -1;
    }
  }
  return lastUpdateTime;
}

export async function getPhoneNumber() {
  if (OS === 'android') {
    return RNDeviceInfo.getPhoneNumber();
  }
  return Promise.resolve('unknown');
}

export function getPhoneNumberSync() {
  if (OS === 'android') {
    return RNDeviceInfo.getPhoneNumberSync();
  }
  return 'unknown';
}

export async function getCarrier() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getCarrier();
  }
  return Promise.resolve('unknown');
}

export function getCarrierSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getCarrierSync();
  }
  return 'unknown';
}

let totalMemory;
export async function getTotalMemory() {
  if (!totalMemory) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      totalMemory = await RNDeviceInfo.getTotalMemory();
    } else {
      totalMemory = -1;
    }
  }
  return totalMemory;
}

export function getTotalMemorySync() {
  if (!totalMemory) {
    if (OS === 'android' || OS === 'ios' || OS === 'windows') {
      totalMemory = RNDeviceInfo.getTotalMemorySync();
    } else {
      totalMemory = -1;
    }
  }
  return totalMemory;
}

let maxMemory;
export async function getMaxMemory() {
  if (!maxMemory) {
    if (OS === 'android' || OS === 'windows') {
      maxMemory = await RNDeviceInfo.getMaxMemory();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export function getMaxMemorySync() {
  if (!maxMemory) {
    if (OS === 'android' || OS === 'windows') {
      maxMemory = RNDeviceInfo.getMaxMemorySync();
    } else {
      maxMemory = -1;
    }
  }
  return maxMemory;
}

export async function getTotalDiskCapacity() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getTotalDiskCapacity();
  }
  return Promise.resolve(-1);
}

export function getTotalDiskCapacitySync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getTotalDiskCapacitySync();
  }
  return -1;
}

export async function getFreeDiskStorage() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getFreeDiskStorage();
  }
  return Promise.resolve(-1);
}

export function getFreeDiskStorageSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getFreeDiskStorageSync();
  }
  return -1;
}

export async function getBatteryLevel() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.getBatteryLevel();
  }
  return Promise.resolve(-1);
}

export function getBatteryLevelSync() {
  if (OS === 'android' || OS === 'ios' || OS === 'windows') {
    return RNDeviceInfo.getBatteryLevelSync();
  }
  return -1;
}

export async function getPowerState() {
  if (OS === 'ios') {
    return RNDeviceInfo.getPowerState();
  }
  return Promise.resolve({});
}

export function getPowerStateSync() {
  if (OS === 'ios') {
    return RNDeviceInfo.getPowerStateSync();
  }
  return {};
}

export async function isBatteryCharging() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isBatteryCharging();
  }
  return Promise.resolve(false);
}

export function isBatteryChargingSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isBatteryChargingSync();
  }
  return false;
}

export async function isLandscape() {
  return Promise.resolve(isLandscapeSync());
}

export function isLandscapeSync() {
  const { height, width } = Dimensions.get('window');
  return width >= height;
}

export async function isAirplaneMode() {
  if (OS === 'android') {
    return RNDeviceInfo.isAirplaneMode();
  }
  return Promise.resolve(false);
}

export function isAirplaneModeSync() {
  if (OS === 'android') {
    return RNDeviceInfo.isAirplaneModeSync();
  }
  return false;
}

let deviceType;
export async function getDeviceType() {
  if (!deviceType) {
    if (OS === 'android' || OS === 'ios') {
      deviceType = await RNDeviceInfo.getDeviceType();
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

export function getDeviceTypeSync() {
  if (!deviceType) {
    if (OS === 'android' || OS === 'ios') {
      deviceType = RNDeviceInfo.getDeviceTypeSync();
    } else {
      deviceType = 'unknown';
    }
  }
  return deviceType;
}

let _supportedAbis;
export async function supportedAbis() {
  if (!_supportedAbis) {
    if (OS === 'android' || OS === 'ios') {
      _supportedAbis = await RNDeviceInfo.getSupportedAbis();
    } else {
      _supportedAbis = [];
    }
  }
  return _supportedAbis;
}

export function supportedAbisSync() {
  if (!_supportedAbis) {
    if (OS === 'android' || OS === 'ios') {
      _supportedAbis = RNDeviceInfo.getSupportedAbisSync();
    } else {
      _supportedAbis = [];
    }
  }
  return _supportedAbis;
}

let _supported32BitAbis;
export async function supported32BitAbis() {
  if (!_supported32BitAbis) {
    if (OS === 'android') {
      _supported32BitAbis = await RNDeviceInfo.getSupported32BitAbis();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

export function supported32BitAbisSync() {
  if (!_supported32BitAbis) {
    if (OS === 'android') {
      _supported32BitAbis = RNDeviceInfo.getSupported32BitAbisSync();
    } else {
      _supported32BitAbis = [];
    }
  }
  return _supported32BitAbis;
}

let _supported64BitAbis;
export async function supported64BitAbis() {
  if (!_supported64BitAbis) {
    if (OS === 'android') {
      _supported64BitAbis = await RNDeviceInfo.getSupported64BitAbis();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

export function supported64BitAbisSync() {
  if (!_supported64BitAbis) {
    if (OS === 'android') {
      _supported64BitAbis = RNDeviceInfo.getSupported64BitAbisSync();
    } else {
      _supported64BitAbis = [];
    }
  }
  return _supported64BitAbis;
}

export async function hasSystemFeature(feature) {
  if (OS === 'android') {
    return RNDeviceInfo.hasSystemFeature(feature);
  }
  return Promise.resolve(false);
}

export function hasSystemFeatureSync(feature) {
  if (OS === 'android') {
    return RNDeviceInfo.hasSystemFeatureSync(feature);
  }
  return false;
}

export async function getSystemAvailableFeatures() {
  if (OS === 'android') {
    return RNDeviceInfo.getSystemAvailableFeatures();
  }
  return Promise.resolve([]);
}

export function getSystemAvailableFeaturesSync() {
  if (OS === 'android') {
    return RNDeviceInfo.getSystemAvailableFeaturesSync();
  }
  return [];
}

export async function isLocationEnabled() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isLocationEnabled();
  }
  return Promise.resolve(false);
}

export function isLocationEnabledSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.isLocationEnabledSync();
  }
  return false;
}

export async function getAvailableLocationProviders() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getAvailableLocationProviders();
  }
  return Promise.resolve({});
}

export function getAvailableLocationProvidersSync() {
  if (OS === 'android' || OS === 'ios') {
    return RNDeviceInfo.getAvailableLocationProvidersSync();
  }
  return {};
}

export default {
  getUniqueId,
  getUniqueIdSync,
  getInstanceId,
  getInstanceIdSync,
  getSerialNumber,
  getSerialNumberSync,
  getAndroidId,
  getAndroidIdSync,
  getIpAddress,
  getIpAddressSync,
  getCameraPresence,
  getCameraPresenceSync,
  getMacAddress,
  getMacAddressSync,
  getDeviceId,
  getDeviceIdSync,
  getManufacturer,
  getManufacturerSync,
  getModel,
  getModelSync,
  getBrand,
  getBrandSync,
  getSystemName,
  getSystemNameSync,
  getSystemVersion,
  getSystemVersionSync,
  getBuildId,
  getBuildIdSync,
  getApiLevel,
  getApiLevelSync,
  getBundleId,
  getBundleIdSync,
  getApplicationName,
  getApplicationNameSync,
  getBuildNumber,
  getBuildNumberSync,
  getVersion,
  getVersionSync,
  getReadableVersion,
  getReadableVersionSync,
  getDeviceName,
  getDeviceNameSync,
  getUsedMemory,
  getUsedMemorySync,
  getUserAgent,
  getUserAgentSync,
  getFontScale,
  getFontScaleSync,
  getBootloader,
  getBootloaderSync,
  getDevice,
  getDeviceSync,
  getDisplay,
  getDisplaySync,
  getFingerprint,
  getFingerprintSync,
  getHardware,
  getHardwareSync,
  getHost,
  getHostSync,
  getProduct,
  getProductSync,
  getTags,
  getTagsSync,
  getType,
  getTypeSync,
  getBaseOs,
  getBaseOsSync,
  getPreviewSdkInt,
  getPreviewSdkIntSync,
  getSecurityPatch,
  getSecurityPatchSync,
  getCodename,
  getCodenameSync,
  getIncremental,
  getIncrementalSync,
  isEmulator,
  isEmulatorSync,
  isTablet,
  isTabletSync,
  isPinOrFingerprintSet,
  isPinOrFingerprintSetSync,
  hasNotch,
  hasNotchSync,
  getFirstInstallTime,
  getFirstInstallTimeSync,
  getInstallReferrer,
  getInstallReferrerSync,
  getLastUpdateTime,
  getLastUpdateTimeSync,
  getPhoneNumber,
  getPhoneNumberSync,
  getCarrier,
  getCarrierSync,
  getTotalMemory,
  getTotalMemorySync,
  getMaxMemory,
  getMaxMemorySync,
  getTotalDiskCapacity,
  getTotalDiskCapacitySync,
  getFreeDiskStorage,
  getFreeDiskStorageSync,
  getBatteryLevel,
  getBatteryLevelSync,
  getPowerState,
  getPowerStateSync,
  isBatteryCharging,
  isBatteryChargingSync,
  isLandscape,
  isLandscapeSync,
  isAirplaneMode,
  isAirplaneModeSync,
  getDeviceType,
  getDeviceTypeSync,
  supportedAbis,
  supportedAbisSync,
  supported32BitAbis,
  supported32BitAbisSync,
  supported64BitAbis,
  supported64BitAbisSync,
  hasSystemFeature,
  hasSystemFeatureSync,
  getSystemAvailableFeatures,
  getSystemAvailableFeaturesSync,
  isLocationEnabled,
  isLocationEnabledSync,
  getAvailableLocationProviders,
  getAvailableLocationProvidersSync,
};
