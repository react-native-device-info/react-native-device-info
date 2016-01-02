## react-native-device-info

Device Information for react-native

## Installation

First you need to install react-native-device-info:

```javascript
npm install react-native-device-info --save
```

### Installation (iOS)

In XCode, in the project navigator, right click Libraries ➜ Add Files to [your project's name] Go to node_modules ➜ react-native-device-info and add the .xcodeproj file

In XCode, in the project navigator, select your project. Add the lib*.a from the deviceinfo project to your project's Build Phases ➜ Link Binary With Libraries Click .xcodeproj file you added before in the project navigator and go the Build Settings tab. Make sure 'All' is toggled on (instead of 'Basic'). Look for Header Search Paths and make sure it contains both $(SRCROOT)/../react-native/React and $(SRCROOT)/../../React - mark both as recursive.

Run your project (Cmd+R)

(Thanks to @brysgo for writing the instructions)

### Installation (Android)

* In `android/setting.gradle`

```gradle
...
include ':RNDeviceInfo', ':app'
project(':RNDeviceInfo').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-device-info/android')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':RNDeviceInfo')
}
```

* register module (in MainActivity.java)

```java
import com.learnium.RNDeviceInfo.*;  // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new RNDeviceInfo())              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }

  ......

}
```

(Thanks to @chirag04 for writing the instructions)

* If you want to get the device name in Android add this to your AndroidManifest.xml

```xml
...
<uses-permission android:name="android.permission.BLUETOOTH"/>
```

## Release Notes

0.5.0 adds a new parameter; Device Id. On iOS this is the hardware string for the current device (e.g.
"iPhone7,2"). On Android we use the BOARD field which is the name of the underlying board, e.g. "goldfish".
The way that the module gets the device model on iOS has also changed to be based on the Device Id; now
instead of getting a generic product family e.g. "iPhone", it will return the specific model e.g. "iPhone 6".

## Example

```js
var DeviceInfo = require('react-native-device-info');

console.log("Device Unique ID", DeviceInfo.getUniqueID());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9

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

```
