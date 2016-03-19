## react-native-device-info

[![npm version](https://badge.fury.io/js/react-native-device-info@2x.png)](http://badge.fury.io/js/react-native-device-info)

Device Information for react-native

## Installation

First you need to install react-native-device-info:

```javascript
npm install react-native-device-info --save
```

### Installation (iOS)

In XCode, in the project navigator:
- Right click Libraries
- Add Files to [your project's name]
- Go to node_modules/react-native-device-info
- Add the .xcodeproj file

In XCode, in the project navigator, select your project.
- Add the libRNDeviceInfo.a from the deviceinfo project to your project's Build Phases ➜ Link Binary With Libraries
- Click .xcodeproj file you added before in the project navigator and go the Build Settings tab. Make sure 'All' is toggled on (instead of 'Basic').
- Look for Header Search Paths and make sure it contains both $(SRCROOT)/../react-native/React and $(SRCROOT)/../../React - mark both as recursive. (Should be OK by default.)

Run your project (Cmd+R)

(Thanks to @brysgo for writing the instructions)

### Installation (Android)

* Add Gradle configuration changes

Run `react-native link react-native-device-info` in your project root.

* register module (in MainActivity.java)

On React Native 0.18+:

```java
import com.learnium.RNDeviceInfo.RNDeviceInfo;  // <--- import

public class MainActivity extends ReactActivity {
  ......

  /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new RNDeviceInfo(), // <------ add here
        new MainReactPackage());
    }
}
```

(Thanks to @chirag04 for writing the instructions)

* If you want to get the device name in Android add this to your AndroidManifest.xml (optional)

```xml
...
<uses-permission android:name="android.permission.BLUETOOTH"/>
```

## Release Notes

 * 0.9.0 adds support for device country and changes the iOS device name to match Apple branding
 * 0.8.4 don't use destructuring
 * 0.8.3 removes the default bluetooth permission
 * 0.8.2 change deployment target to iOS 8
 * 0.8.1 removes unnecessary peerDependencies
 * 0.8.0 tweaks how device locale works on Android. If it's available it will use the toLanguageTag that is more inline with iOS. (See #14)
 * 0.7.0 adds two new parameters, Device Locale and User Agent.
 * 0.5.0 adds a new parameter; Device Id. On iOS this is the hardware string for the current device (e.g. "iPhone7,2"). On Android we use the BOARD field which is the name of the underlying board, e.g. "goldfish". The way that the module gets the device model on iOS has also changed to be based on the Device Id; now instead of getting a generic product family e.g. "iPhone", it will return the specific model e.g. "iPhone 6".

## Example

```js
var DeviceInfo = require('react-native-device-info');

console.log("Device Unique ID", DeviceInfo.getUniqueID());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9
// * note this is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled

console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple

console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone 6

console.log("Device ID", DeviceInfo.getDeviceId());  // e.g. iPhone7,2 / or the board on Android e.g. goldfish

console.log("Device Name", DeviceInfo.getSystemName());  // e.g. iPhone OS

console.log("Device Version", DeviceInfo.getSystemVersion());  // e.g. 9.0

console.log("Bundle Id", DeviceInfo.getBundleId());  // e.g. com.learnium.mobile

console.log("Build Number", DeviceInfo.getBuildNumber());  // e.g. 89

console.log("App Version", DeviceInfo.getVersion());  // e.g. 1.1.0

console.log("App Version (Readable)", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89

console.log("Device Name", DeviceInfo.getDeviceName());  // e.g. Becca's iPhone 6

console.log("User Agent", DeviceInfo.getUserAgent()); // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)

console.log("Device Locale", DeviceInfo.getDeviceLocale()); // e.g en-US

console.log("Device Country", DeviceInfo.getDeviceCountry()); // e.g US
```
