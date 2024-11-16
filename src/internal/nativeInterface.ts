import { Platform, NativeModules } from 'react-native';
import { DeviceInfoNativeModule } from './privateTypes';

let RNDeviceInfo: DeviceInfoNativeModule | undefined = NativeModules.RNDeviceInfo;

// @ts-ignore
if (Platform.OS === 'web' || Platform.OS === 'dom') {
  RNDeviceInfo = require('../web');
}

if (!RNDeviceInfo) {
  // Produce an error if we don't have the native module
  if (
    Platform.OS === 'android' ||
    Platform.OS === 'ios' ||
    Platform.OS === 'web' ||
    // @ts-ignore
    Platform.OS === 'dom'
  ) {
    throw new Error(`react-native-device-info: NativeModule.RNDeviceInfo is null. To fix this issue try these steps:
  • For react-native <= 0.59: Run \`react-native link react-native-device-info\` in the project root.
  • Rebuild and re-run the app.
  • If you are using CocoaPods on iOS, run \`pod install\` in the \`ios\` directory and then rebuild and re-run the app. You may also need to re-open Xcode to get the new pods.
  If none of these fix the issue, please open an issue on the Github repository: https://github.com/react-native-device-info/react-native-device-info`);
  }
}

export default RNDeviceInfo as DeviceInfoNativeModule;
