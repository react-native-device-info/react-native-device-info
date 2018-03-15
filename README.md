# react-native-device-info

[![npm version](https://badge.fury.io/js/react-native-device-info.svg)](http://badge.fury.io/js/react-native-device-info)

Device Information for [React Native](https://github.com/facebook/react-native).

## TOC

* [Installation](#installation)
* [Linking](#linking)
* [Usage](#usage)
* [API](#api)
* [Troubleshooting](#troubleshooting)
* [Release Notes](#release-notes)
* [react-native-web](#react-native-web)

## Installation

Using npm:

```shell
npm install --save react-native-device-info
```

or using yarn:

```shell
yarn add react-native-device-info
```

> ⚠️ If you are on React Native > 0.47, you must use version 0.11.0 of this library or higher

## Linking

### Automatic

```shell
react-native link react-native-device-info
```

(or using [`rnpm`](https://github.com/rnpm/rnpm) for versions of React Native < 0.27)

```shell
rnpm link react-native-device-info
```

### Manual

<details>
    <summary>iOS (via Cocoa Pods)</summary>

Add the following line to your build targets in your `Podfile`

`pod 'RNDeviceInfo', :path => '../node_modules/react-native-device-info'`

Then run `pod install`

</details>

<details>
    <summary>iOS (without Cocoa Pods)</summary>

In XCode, in the project navigator:

* Right click _Libraries_
* Add Files to _[your project's name]_
* Go to `node_modules/react-native-device-info`
* Add the `.xcodeproj` file

In XCode, in the project navigator, select your project.

* Add the `libRNDeviceInfo.a` from the _deviceinfo_ project to your project's _Build Phases ➜ Link Binary With Libraries_
* Click `.xcodeproj` file you added before in the project navigator and go the _Build Settings_ tab. Make sure _All_ is toggled on (instead of _Basic_).
* Look for _Header Search Paths_ and make sure it contains both `$(SRCROOT)/../react-native/React` and `$(SRCROOT)/../../React`
* Mark both as recursive (should be OK by default).

Run your project (Cmd+R)

(Thanks to @brysgo for writing the instructions)

</details>

<details>
    <summary>Android</summary>

* **_optional_** in `android/build.gradle`:

```gradle
...
  ext {
    // dependency versions
    googlePlayServicesVersion = "<Your play services version>" // default: "+"
    compileSdkVersion = "<Your compile SDK version>" // default: 23
    buildToolsVersion = "<Your build tools version>" // default: "25.0.2"
    targetSdkVersion = "<Your target SDK version>" // default: 22
  }
...
```

* in `android/app/build.gradle`:

```diff
dependencies {
    ...
    compile "com.facebook.react:react-native:+"  // From node_modules
+   compile project(':react-native-device-info')
}
```

* in `android/settings.gradle`:

```diff
...
include ':app'
+ include ':react-native-device-info'
+ project(':react-native-device-info').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-device-info/android')
```

#### With React Native 0.29+

* in `MainApplication.java`:

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

* in `MainActivity.java`:

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

</details>

<details>
    <summary>Windows</summary>

* Open the solution in Visual Studio for your Windows apps
* right click your in the Explorer and click Add > Existing Project...
* Navigate to `./<app-name>/node_modules/react-native-device-info/windows/RNDeviceInfo` and add `RNDeviceInfo.csproj`
* this time right click on your React Native Windows app under your solutions directory and click Add > Reference...
* check the `RNDeviceInfo` you just added and press ok
* open up `MainReactNativeHost.cs` for your app and edit the file like so:

```diff
+ using RNDeviceInfo;
......
        protected override List<IReactPackage> Packages => new List<IReactPackage>
        {
            new MainReactPackage(),
+           new RNDeviceInfoPackage(),
        };
```

(Thanks to @josephan for writing the instructions)

</details>

## Usage

```js
var DeviceInfo = require('react-native-device-info');
// or import DeviceInfo from 'react-native-device-info';
```

## API

| Method                                            | Return Type         |  iOS | Android | Windows | Since  |
| ------------------------------------------------- | ------------------- | :--: | :-----: | :-----: | ------ |
| [getAPILevel()](#getapilevel)                     | `number`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getApplicationName()](#getapplicationname)       | `string`            |  ✅  |   ✅    |   ✅    | 0.14.0 |
| [getBatteryLevel()](#getbatterylevel)             | `Promise<number>`   |  ✅  |   ✅    |   ✅    | 0.18.0 |
| [getBrand()](#getbrand)                           | `string`            |  ✅  |   ✅    |   ✅    | 0.9.3  |
| [getBuildNumber()](#getbuildnumber)               | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getBundleId()](#getbundleid)                     | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getCarrier()](#getcarrier)                       | `string`            |  ✅  |   ✅    |   ❌    | 0.13.0 |
| [getDeviceCountry()](#getdevicecountry)           | `string`            |  ✅  |   ✅    |   ✅    | 0.9.0  |
| [getDeviceId()](#getdeviceid)                     | `string`            |  ✅  |   ✅    |   ✅    | 0.5.0  |
| [getDeviceLocale()](#getdevicelocale)             | `string`            |  ✅  |   ✅    |   ✅    | 0.7.0  |
| [getDeviceName()](#getdevicename)                 | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getFirstInstallTime()](#getfirstinstalltime)     | `number`            |  ❌  |   ✅    |   ✅    | 0.12.0 |
| [getFontScale()](#getfontscale)                   | `number`            |  ✅  |   ✅    |   ❌    | 0.15.0 |
| [getFreeDiskStorage()](#getfreediskstorage)       | `number`            |  ✅  |   ✅    |   ❌    | 0.15.0 |
| [getIPAddress()](#getipaddress)                   | `Promise<string>`   |  ❌  |   ✅    |   ✅    | 0.12.0 |
| [getInstallReferrer()](#getinstallreferrer)       | `string`            |  ❌  |   ✅    |   ❌    | 0.19.0 |
| [getInstanceID()](#getinstanceid)                 | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getLastUpdateTime()](#getlastupdatetime)         | `number`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getMACAddress()](#getmacaddress)                 | `Promise<string>`   |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getManufacturer()](#getmanufacturer)             | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getMaxMemory()](#getmaxmemory)                   | `number`            |  ❌  |   ✅    |   ✅    | 0.14.0 |
| [getModel()](#getmodel)                           | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getPhoneNumber()](#getphonenumber)               | `string`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getReadableVersion()](#getreadableversion)       | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getSerialNumber()](#getserialnumber)             | `string`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getSystemName()](#getsystemname)                 | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getSystemVersion()](#getsystemversion)           | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getTimezone()](#gettimezone)                     | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getTotalDiskCapacity()](#gettotaldiskcapacity)   | `number`            |  ✅  |   ✅    |   ❌    | 0.15.0 |
| [getTotalMemory()](#gettotalmemory)               | `number`            |  ✅  |   ✅    |   ❌    | 0.14.0 |
| [getUniqueID()](#getuniqueid)                     | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getUserAgent()](#getuseragent)                   | `string`            |  ✅  |   ✅    |   ❌    | 0.7.0  |
| [getVersion()](#getversion)                       | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [is24Hour()](#is24hour)                           | `boolean`           |  ✅  |   ✅    |   ✅    | 0.13.0 |
| [isEmulator()](#isemulator)                       | `boolean`           |  ✅  |   ✅    |   ✅    | ?      |
| [isPinOrFingerprintSet()](#ispinorfingerprintset) | (callback)`boolean` |  ✅  |   ✅    |   ✅    | 0.10.1 |
| [isTablet()](#istablet)                           | `boolean`           |  ✅  |   ✅    |   ✅    | ?      |

---

### getAPILevel()

Gets the API level.

**Examples**

```js
const apiLevel = DeviceInfo.getAPILevel();

// iOS: ?
// Android: 25
// Windows: ?
```

**Notes**

> See [API Levels](https://developer.android.com/guide/topics/manifest/uses-sdk-element.html#ApiLevels)

---

### getApplicationName()

Gets the application name.

**Examples**

```js
const appName = DeviceInfo.getApplicationName(); // "Learnium Mobile"
```

---

### getBatteryLevel()

Gets the battery level of the device as a float comprised between 0 and 1.

**Examples**

```js
DeviceInfo.getBatteryLevel().then(batteryLevel => {
  // 0.759999
});
```

**Notes**

> Returns -1 on the iOS Simulator

---

### getBrand()

Gets the device brand.

**Examples**

```js
const brand = DeviceInfo.getBrand();

// iOS: "Apple"
// Android: "Xiaomi"
// Windows: ?
```

---

### getBuildNumber()

Gets the application build number.

**Examples**

```js
const buildNumber = DeviceInfo.getBuildNumber();

// iOS: "89"
// Android: 4
// Windows: ?
```

**Notes**

> There is a type inconsistency: Android return an integer instead of the documented string.

---

### getBundleId()

Gets the application bundle identifier.

**Examples**

```js
const bundleId = DeviceInfo.getBundleId(); // "com.learnium.mobile"
```

---

### getCarrier()

Gets the carrier name (network operator).

**Examples**

```js
const carrier = DeviceInfo.getCarrier(); // "SOFTBANK"
```

---

### getDeviceCountry()

Gets the device country based on the locale information.

**Examples**

```js
const deviceCountry = DeviceInfo.getDeviceCountry(); // "US"
```

---

### getDeviceId()

Gets the device ID.

**Examples**

```js
const deviceId = DeviceInfo.getDeviceId();

// iOS: "iPhone7,2"
// Android: "goldfish"
// Windows: ?
```

---

### getDeviceLocale()

Gets the device locale.

**Examples**

```js
const deviceLocale = DeviceInfo.getDeviceLocale();

// iOS: "en"
// Android: "en-US"
// Windows: ?
```

---

### getDeviceName()

Gets the device name.

**Examples**

```js
const deviceName = DeviceInfo.getDeviceName();

// iOS: "Becca's iPhone 6"
// Android: ?
// Windows: ?
```

**Android Permissions**

* [android.permission.BLUETOOTH](https://developer.android.com/reference/android/Manifest.permission.html#BLUETOOTH)

---

### getFirstInstallTime()

Gets the time at which the app was first installed, in milliseconds.

**Examples**

```js
const firstInstallTime = DeviceInfo.getFirstInstallTime();

// Android: 1517681764528
```

---

### getFontScale()

Gets the device font scale.
The font scale is the ratio of the current system font to the "normal" font size, so if normal text is 10pt and the system font is currently 15pt, the font scale would be 1.5
This can be used to determine if accessability settings has been changed for the device; you may want to re-layout certain views if the font scale is significantly larger ( > 2.0 )

**Examples**

```js
const fontScale = DeviceInfo.getFontScale(); // 1.2
```

---

### getFreeDiskStorage()

Gets available storage size, in bytes.

**Examples**

```js
const freeDiskStorage = DeviceInfo.getFreeDiskStorage();

// Android: 17179869184
// iOS: 17179869184
```

**Notes**

> From [developer.android.com](<https://developer.android.com/reference/android/os/Environment.html#getExternalStorageDirectory()>):
>
> Return the primary shared/external storage directory.
>
> Note: don't be confused by the word "external" here. This directory can better be thought as
> media/shared storage. It is a filesystem that can hold a relatively large amount of data and
> that is shared across all applications (does not enforce permissions). Traditionally this is
> an SD card, but it may also be implemented as built-in storage in a device that is distinct
> from the protected internal storage and can be mounted as a filesystem on a computer.

---

### getIPAddress()

Gets the device current IP address.

**Examples**

```js
DeviceInfo.getIPAddress().then(ip => {
  // "92.168.32.44"
});
```

**Android Permissions**

* [android.permission.ACCESS_WIFI_STATE](https://developer.android.com/reference/android/Manifest.permission.html#ACCESS_WIFI_STATE)

---

### getInstallReferrer

Gets the referrer string upon application installation.

**Examples**

```js
const referrer = DeviceInfo.getInstallReferrer();

// If the app was installed from https://play.google.com/store/apps/details?id=com.myapp&referrer=my_install_referrer
// the result will be "my_install_referrer"
```

---

### getInstanceID()

Gets the application instance ID.

**Examples**

```js
const instanceId = DeviceInfo.getInstanceID();

// Android: ?
```

**Notes**

> See https://developers.google.com/instance-id/

---

### getLastUpdateTime()

Gets the time at which the app was last updated, in milliseconds.

**Examples**

```js
const lastUpdateTime = DeviceInfo.getLastUpdateTime();

// Android: 1517681764992
```

---

### getMACAddress()

Gets the network adapter MAC address.

**Examples**

```js
DeviceInfo.getMACAddress().then(mac => {
  // "E5:12:D8:E5:69:97"
});
```

**Android Permissions**

* [android.permission.ACCESS_WIFI_STATE](https://developer.android.com/reference/android/Manifest.permission.html#ACCESS_WIFI_STATE)

---

### getManufacturer()

Gets the device manufacturer.

**Examples**

```js
const manufacturer = DeviceInfo.getManufacturer();

// iOS: "Apple"
// Android: "Google"
// Windows: ?
```

---

### getMaxMemory()

Returns the maximum amount of memory that the VM will attempt to use, in bytes.

**Examples**

```js
const maxMemory = DeviceInfo.getMaxMemory(); // 402653183
```

---

### getModel()

Gets the device model.

**Examples**

```js
const model = DeviceInfo.getModel();

// iOS: ?
// Android: ?
// Windows: ?
```

---

### getPhoneNumber()

Gets the device phone number.

**Examples**

```js
const phoneNumber = DeviceInfo.getPhoneNumber();

// Android: ?
```

**Android Permissions**

* [android.permission.READ_PHONE_STATE](https://developer.android.com/reference/android/Manifest.permission.html#READ_PHONE_STATE)

**Notes**

> This can return `undefined` in certain cases and should not be relied on. [SO entry on the subject](https://stackoverflow.com/questions/2480288/programmatically-obtain-the-phone-number-of-the-android-phone#answer-2480307).

---

### getReadableVersion()

Gets the application human readable version.

**Examples**

```js
const readableVersion = DeviceInfo.getReadableVersion();

// iOS: 1.0.1
// Android: 1.0.1
// Windows: ?
```

---

### getSerialNumber()

Gets the device serial number.

**Examples**

```js
const serialNumber = DeviceInfo.getSerialNumber();

// iOS: undefined
// Android: ?
// Windows: ?
```

---

### getSystemName()

Gets the device OS name.

**Examples**

```js
const systemName = DeviceInfo.getSystemName();

// iOS: "iOS"
// Android: "Android"
// Windows: ?
```

---

### getSystemVersion()

Gets the device OS version.

**Examples**

```js
const systemVersion = DeviceInfo.getSystemVersion();

// iOS: "11.0"
// Android: "7.1.1"
// Windows: ?
```

---

### getTimezone()

Gets the device default timezone.

**Examples**

```js
const timezone = DeviceInfo.getTimezone(); // "Africa/Tunis"
```

---

### getTotalDiskCapacity()

Gets full disk storage size, in bytes.

**Examples**

```js
const storageSize = DeviceInfo.getTotalDiskCapacity();

// Android: 17179869184
// iOS: 17179869184
```

---

### getTotalMemory()

Gets the device total memory, in bytes.

**Examples**

```js
const totalMemory = DeviceInfo.getTotalMemory(); // 1995018240
```

---

### getUniqueID()

Gets the device unique ID.

**Examples**

```js
const uniqueId = DeviceInfo.getUniqueID();

// iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
// Android: "dd96dec43fb81c97"
// Windows: ?
```

**Notes**

> * iOS: This is [`IDFV`](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) so it will change if all apps from the current apps vendor have been previously uninstalled.
> * android: Prior to Oreo, this id ([ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID)) will always be the same once you set up your phone.

---

### getUserAgent()

Gets the device User Agent.

**Examples**

```js
const userAgent = DeviceInfo.getUserAgent();

// iOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143"
// Android: ?
// Windows: ?
```

---

### getVersion()

Gets the application version.

**Examples**

```js
const version = DeviceInfo.getVersion();

// iOS: "1.0"
// Android: "1.0
// Windows: ?
```

---

### is24Hour()

Tells if the user preference is set to 24-hour format.

**Examples**

```js
const is24Hour = DeviceInfo.is24Hour(); // true
```

---

### isEmulator()

Tells if the application is running in an emulator.

**Examples**

```js
const isEmulator = DeviceInfo.isEmulator(); // false
```

---

### isPinOrFingerprintSet()

Tells if a PIN number or a fingerprint was set for the device.

**Examples**

```js
DeviceInfo.isPinOrFingerprintSet()(isPinOrFingerprintSet => {
  if (!isPinOrFingerprintSet) {
    // ...
  }
});
```

**Notes**

> * Since the device setting for PIN/Fingerprint can be modified while the app is still open, this is available via callback instead of as a constant.
> * iOS: Not supported for iOS < 9

---

### isTablet()

Tells if the device is a tablet.

**Examples**

```js
const isTablet = DeviceInfo.isTablet(); // true
```

## Troubleshooting

When installing or using `react-native-device-info`, you may encounter the following problems:

<details>
  <summary>[android] - Unable to merge dex / Multiple dex files / Problems with `com.google.android.gms`</summary>

`react-native-device-info` uses `com.google.android.gms:play-services-gcm` to provide [getInstance()][#getinstance].
This can lead to conflicts when building the Android application.

If you're using a different version of `com.google.android.gms:play-services-gcm` in your app, you can define the
`googlePlayServicesVersion` gradle variable in your `build.gradle` file to tell `react-native-device-info` what version
it should require.

If you're using a different library that conflicts with `com.google.android.gms:play-services-gcm`, you can simply
ignore this dependency in your gradle file:

```
 compile(project(':react-native-device-info')) {
    exclude group: 'com.google.android.gms'
}
```

</details>

<details>
  <summary>[ios] - ld: library not found for -lRNDeviceInfo-tvOS</summary>

Seems to be a bug caused by `react-native link`. You can manually delete `libRNDeviceInfo-tvOS.a` in `Xcode -> [Your iOS build target] -> Build Phrases -> Link Binary with Libraries`.

</details>

<details>
  <summary>[tests] - Cannot run my test suite when using this library</summary>

`react-native-device-info` contains native code, and needs to be mocked.

Here's how to do it with jest for example:

```
// in your package.json:
"jest": {
  "setupFiles": [
    "./testenv.js"
  ],


// testenv.js:
jest.mock('react-native-device-info', () => {
  return {
    getModel: jest.fn(),
  };
});
```

</details>

## Release Notes

See the [CHANGELOG.md](https://github.com/rebeccahughes/react-native-device-info/blob/master/CHANGELOG.md).

## react-native-web

As a courtesy to developers, this library was made compatible in v0.17.0 with [react-native-web](https://github.com/necolas/react-native-web) by providing an empty polyfill in order to avoid breaking builds.

Only [getUserAgent()](#getuseragent) will return a correct value. All other API methods will return an "empty" value of its documented return type: `0` for numbers, `''` for strings, `false` for booleans.
