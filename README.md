# react-native-device-info

[![npm version](https://badge.fury.io/js/react-native-device-info.svg)](http://badge.fury.io/js/react-native-device-info)

Device Information for [React Native](https://github.com/facebook/react-native)

## Install

```shell
npm install --save react-native-device-info
```

#### RN > 0.47 use 0.11 or higher

## Automatically link

#### With React Native 0.27+

```shell
react-native link react-native-device-info
```

#### With older versions of React Native

You need [`rnpm`](https://github.com/rnpm/rnpm) (`npm install -g rnpm`)

```shell
rnpm link react-native-device-info
```

## Manually link

### iOS (via Cocoa Pods)
Add the following line to your build targets in your `Podfile`

`pod 'RNDeviceInfo', :path => '../node_modules/react-native-device-info'`

Then run `pod install`

### iOS (without Cocoa Pods)

In XCode, in the project navigator:
- Right click _Libraries_
- Add Files to _[your project's name]_
- Go to `node_modules/react-native-device-info`
- Add the `.xcodeproj` file

In XCode, in the project navigator, select your project.
- Add the `libRNDeviceInfo.a` from the _deviceinfo_ project to your project's _Build Phases ➜ Link Binary With Libraries_
- Click `.xcodeproj` file you added before in the project navigator and go the _Build Settings_ tab. Make sure _All_ is toggled on (instead of _Basic_).
- Look for _Header Search Paths_ and make sure it contains both `$(SRCROOT)/../react-native/React` and `$(SRCROOT)/../../React`
- Mark both as recursive (should be OK by default).

Run your project (Cmd+R)

(Thanks to @brysgo for writing the instructions)

### Android

- in `android/app/build.gradle`:

```diff
dependencies {
    ...
    compile "com.facebook.react:react-native:+"  // From node_modules
+   compile project(':react-native-device-info')
}
```

- in `android/settings.gradle`:

```diff
...
include ':app'
+ include ':react-native-device-info'
+ project(':react-native-device-info').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-device-info/android')
```

#### With React Native 0.29+

- in `MainApplication.java`:

```diff
+ import com.learnium.RNDeviceInfo.RNDeviceInfo;

  public class MainApplication extends Application implements ReactApplication {
    //......

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
+         new RNDeviceInfo(),
          new MainReactPackage()
      );
    }

    ......
  }
```

#### With older versions of React Native:

- in `MainActivity.java`:

```diff
+ import com.learnium.RNDeviceInfo.RNDeviceInfo;

  public class MainActivity extends ReactActivity {
    ......

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
+       new RNDeviceInfo(),
        new MainReactPackage()
      );
    }
  }
```

(Thanks to @chirag04 for writing the instructions)

### Windows
- Open the solution in Visual Studio for your Windows apps
- right click your in the Explorer and click Add > Existing Project...
- Navigate to `./<app-name>/node_modules/react-native-device-info/windows/RNDeviceInfo` and add `RNDeviceInfo.csproj`
- this time right click on your React Native Windows app under your solutions directory and click Add > Reference...
- check the `RNDeviceInfo` you just added and press ok
- open up `MainPage.cs` for your app and edit the file like so:

```diff
+ using RNDeviceInfo;
......
            get
            {
                return new List<IReactPackage>
                {
                    new MainReactPackage(),
+                   new RNDeviceInfoPackage(),
                };
            }
```

(Thanks to @josephan for writing the instructions)

## Permissions

Add the appropriate, optional permissions to your `AndroidManifest.xml`:

```xml
...
<uses-permission android:name="android.permission.BLUETOOTH"/>         <!-- for Device Name -->
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>  <!-- for Phone Number -->
```

## Release Notes

See [CHANGELOG.md](https://github.com/rebeccahughes/react-native-device-info/blob/master/CHANGELOG.md)

## Example

```js
var DeviceInfo = require('react-native-device-info');
// or import DeviceInfo from 'react-native-device-info';
```

| Name                       | Method                             | Return                                                                                        | Notes                                                                                                               |
| :------------------------- | :-------------------------------   | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------    |
| Device Unique ID           | `getUniqueID()`                    | `string` e.g. "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"                                          | This is IDFV on iOS so it will change if all apps from the current apps vendor have been previously uninstalled.    |
| Device Manufacturer        | `getManufacturer()`                | `string` e.g. "Apple"                                                                         |                                                                                                                     |
| Device Brand               | `getBrand()`                       | `string` e.g. "Apple / htc / Xiaomi"                                                          |                                                                                                                     |
| Device Model               | `getModel()`                       | `string` e.g. "iPhone 6"                                                                      |                                                                                                                     |
| Device ID                  | `getDeviceId()`                    | `string` e.g. "iPhone7,2"                                                                     | Or the board on Android e.g. goldfish                                                                               |
| System Name                | `getSystemName()`                  | `string` e.g. "iPhone OS"                                                                     |                                                                                                                     |
| System Version             | `getSystemVersion()`               | `string` e.g. "9.0"                                                                           |                                                                                                                     |
| Bundle ID                  | `getBundleId()`                    | `string` e.g. "com.learnium.mobile"                                                           |                                                                                                                     |
| Build Number               | `getBuildNumber()`                 | `string` e.g. "89"                                                                            |                                                                                                                     |
| App Version                | `getVersion()`                     | `string` e.g. "1.1.0"                                                                         |                                                                                                                     |
| App Version (Readable)     | `getReadableVersion()`             | `string` e.g. "1.1.0.89"                                                                      |                                                                                                                     |
| Device Name                | `getDeviceName()`                  | `string` e.g. "Becca's iPhone 6"                                                              |                                                                                                                     |
| User Agent                 | `getUserAgent()`                   | `string` e.g. "Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)" |                                                                                                                     |
| Device Locale              | `getDeviceLocale()`                | `string` e.g. "en-US"                                                                         |                                                                                                                     |
| Device Country             | `getDeviceCountry()`               | `string` e.g. "US"                                                                            |                                                                                                                     |
| Timezone                   | `getTimezone()`                    | `string` e.g. "America/Mexico_City"                                                           |                                                                                                                     |
| App is running in emulator | `isEmulator()`                     | `boolean` e.g. true                                                                           | if app is running in emulator return true                                                                           |
| App is running on a tablet | `isTablet()`                       | `boolean` e.g. true                                                                           | if app is running on a tablet return true                                                                           |
| PIN or fingerprint set     | `isPinOrFingerprintSet()`          | `(callback: (isPinOrFingerprintSet: boolean) => void) => void`                                | Only supported in Android and iOS 9.0 and above                                                                     |
| API Level                  | `getAPILevel()`                    | `number` e.g. 25                                                                              | ANDROID ONLY - see [API Levels](https://developer.android.com/guide/topics/manifest/uses-sdk-element.html#ApiLevels)|
| App Instance ID            | `getInstanceID()`                  | `string`                                                                                      | ANDROID ONLY - see https://developers.google.com/instance-id/                                                       |
| Phone Number               | `getPhoneNumber()`                 | `?string` e.g. "2348675309" or ""                                                             | Only supported in Android                                                                                           |
| First Install Time         | `getFirstInstallTime()`            | `number` e.g. 1505607068808                                                                   | Only supported in Android                                                                                           |
| Last Install Time          | `getLastUpdateTime()`              | `number` e.g. 1505607068808                                                                   | Only supported in Android                                                                                           |
| Serial Number              | `getSerialNumber()`                | `string`                                                                                      | Only supported in Android
| IP Address                 | `getIPAddress()`                   | `Promise<string>`                                                                             | Only supported in Android
| MAC Address                | `getMACAddress()`                  | `Promise<string>`                                                                             | Only supported in Android

Since the device setting for PIN/Fingerprint can be modified while the app is still open, this is available via callback instead of as a constant.  To use, pass a callback function to the returned bridge function in your javascript:

```js
RNDeviceInfo.isPinOrFingerprintSet()(isPinOrFingerprintSet => {
  if (!isPinOrFingerprintSet) {
    ...
  }
}
```
