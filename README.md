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

## Example

```js
var DeviceInfo = require('react-native-device-info');

console.log("Device Unique ID", DeviceInfo.getUniqueID());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9

console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple

console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone

console.log("Device Name", DeviceInfo.getSystemName());  // e.g. iPhone OS

console.log("Device Version", DeviceInfo.getSystemVersion());  // e.g. 9.0

```
