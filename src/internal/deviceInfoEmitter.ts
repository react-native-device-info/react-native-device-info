import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import NativeRNDeviceInfo from './NativeRNDeviceInfo';

export const deviceInfoEmitter = new NativeEventEmitter(
  Platform.select({ ios: NativeRNDeviceInfo, default: NativeModules.RNDeviceInfo })
);
