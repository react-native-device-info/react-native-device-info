// should be imported this way: 
// import DeviceInfo from 'react-native-device-info';

declare class DeviceInfo {
  public static getUniqueID(): string;
  public static getManufacturer(): string;
  public static getBrand(): string;
  public static getModel(): string;
  public static getDeviceId(): string;
  public static getSystemName(): string;
  public static getSystemVersion(): string;
  public static getBundleId(): string;
  public static getBuildNumber(): string;
  public static getVersion(): string;
  public static getReadableVersion(): string;
  public static getDeviceName(): string;
  public static getUserAgent(): string;
  public static getDeviceLocale(): string;
  public static getDeviceCountry(): string;
  public static getTimezone(): string;
  public static getInstanceID(): string;
  public static isEmulator(): boolean;
  public static isTablet(): boolean;
  public static isPinOrFingerprintSet(cb: (isSet: boolean) => void): void;
}

export default DeviceInfo;
