# react-native-device-info

[![npm version](https://badge.fury.io/js/react-native-device-info.svg)](http://badge.fury.io/js/react-native-device-info)
[![npm total downloads](https://img.shields.io/npm/dt/react-native-device-info.svg)](https://img.shields.io/npm/dt/react-native-device-info.svg)
[![npm monthly downloads](https://img.shields.io/npm/dm/react-native-device-info.svg)](https://img.shields.io/npm/dm/react-native-device-info.svg)
[![npm weekly downloads](https://img.shields.io/npm/dw/react-native-device-info.svg)](https://img.shields.io/npm/dw/react-native-device-info.svg)



Device Information for [React Native](https://github.com/facebook/react-native).

## TOC

* [Installation](#installation)
* [Linking](#linking)
* [Usage](#usage)
* [API](#api)
* [Troubleshooting](#troubleshooting)
* [Release Notes](#release-notes)
* [react-native-dom / react-native-web](#react-native-dom)

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

## AndroidX Support

AndroidX is supported in a non-breaking / backwards-compatible way by using overrides in your `android/build.gradle` file's "ext" block

<details>
    <summary>Android</summary>

```gradle
...
  ext {
    // dependency versions
    googlePlayServicesVersion = "17.0.0" // default: "16.1.0" - pre-AndroidX, override for AndroidX
    compileSdkVersion = "28" // default: 28 (28 is required for AndroidX)
    targetSdkVersion = "28" // default: 28 (28 is required for AndroidX)
    supportLibVersion = '1.0.2' // Use '28.0.0' or don't specify for old libraries, '1.0.2' or similar for AndroidX
    mediaCompatVersion = '1.0.1' // Do not specify if using old libraries, specify '1.0.1' or similar for androidx.media:media dependency
    supportV4Version = '1.0.0' // Do not specify if using old libraries, specify '1.0.0' or similar for androidx.legacy:legacy-support-v4 dependency
  }
...
```
</details>

## Linking (for React Native <= 0.59 only, React Native >= 0.60 skip this as auto-linking should work)

> ⚠️ This package is loaded async by default to improve start up time on Android

To disable async loading with autolinking, edit react-native.config.js:

```js
module.exports = {
  dependencies: {
    'react-native-device-info': {
      platforms: {
        android: {
          packageInstance: 'new RNDeviceInfo(false)',
        },
      },
    },
  },
};
```

### Automatic

```shell
react-native link react-native-device-info
```
(or using [`rnpm`](https://github.com/rnpm/rnpm) for versions of React Native < 0.27)

```shell
rnpm link react-native-device-info
```
*For iOS users using Pods*
You still need to run `pod install` after running the above link command inside your `IOS` folder.

### Manual

<details>
    <summary>iOS (via CocoaPods)</summary>

Add the following lines to your build targets in your `Podfile`

```
pod 'React', :path => '../node_modules/react-native'

# Explicitly include Yoga if you are using RN >= 0.42.0
pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

pod 'RNDeviceInfo', :path => '../node_modules/react-native-device-info'
  
# React-Native is not great about React double-including from the Podfile
post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == "React"
      target.remove_from_project
    end

    # It removes React & Yoga from the Pods project, as it is already included in the main project.
    targets_to_ignore = %w(React yoga)
    if targets_to_ignore.include? target.name
      target.remove_from_project
    end
  end
end
```

Then run `pod install`

</details>

<details>
    <summary>iOS (without CocoaPods)</summary>

In XCode, in the project navigator:

* Right click _Libraries_
* Add Files to _[your project's name]_
* Go to `node_modules/react-native-device-info/ios`
* Add the file `RNDeviceInfo.xcodeproj`

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
    googlePlayServicesVersion = "<Your play services version>" // default: "16.1.0" - pre-AndroidX, override for AndroidX
    compileSdkVersion = "<Your compile SDK version>" // default: 28
    targetSdkVersion = "<Your target SDK version>" // default: 28
  }
...
```

* in `android/app/build.gradle`:

```diff
dependencies {
    ...
    implementation "com.facebook.react:react-native:+"  // From node_modules
+   implementation project(':react-native-device-info')
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
+         new RNDeviceInfo(), //pass false in constructor to load module synchronously
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

NOTE: If you faced with this error: `Could not resolve all files for configuration ':react-native-device-info:debugCompileClasspath'.`, in `build.gradle` put `google()` in the first line (according to https://stackoverflow.com/a/50748249)

* in `android/build.gradle`:

```diff
allprojects {
    repositories {
+       google()
        ...
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
import DeviceInfo from 'react-native-device-info';
```

## API

| Method                                                            | Return Type         |  iOS | Android | Windows | Since  |
| ----------------------------------------------------------------- | ------------------- | :--: | :-----: | :-----: | ------ |
| [getAPILevel()](#getapilevel)                                     | `number`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getApplicationName()](#getapplicationname)                       | `string`            |  ✅  |   ✅    |   ✅    | 0.14.0 |
| [getBaseOS()](#getbaseOS)                                         | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getBatteryLevel()](#getbatterylevel)                             | `Promise<number>`   |  ✅  |   ✅    |   ✅    | 0.18.0 |
| [getBootloader()](#getbootloader)                                 | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getBrand()](#getbrand)                                           | `string`            |  ✅  |   ✅    |   ✅    | 0.9.3  |
| [getBuildNumber()](#getbuildnumber)                               | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getBundleId()](#getbundleid)                                     | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getCameraPresence()](#getcamerapresence)                         | `Promise<boolean>`  |  ❌  |   ✅    |   ✅    | ?      |
| [getCarrier()](#getcarrier)                                       | `string`            |  ✅  |   ✅    |   ❌    | 0.13.0 |
| [getCodename()](#getcodename)                                     | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getDevice()](#getdevice)                                         | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getDeviceCountry()](#getdevicecountry)                           | `string`            |  ✅  |   ✅    |   ✅    | 0.9.0  |
| [getDeviceId()](#getdeviceid)                                     | `string`            |  ✅  |   ✅    |   ✅    | 0.5.0  |
| [getDeviceLocale()](#getdevicelocale)                             | `string`            |  ✅  |   ✅    |   ✅    | 0.7.0  |
| [getDisplay()](#getdisplay)                                       | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getPreferredLocales()](#getpreferredlocale)                      | `Array<string>`     |  ✅  |   ✅    |   ❌    | ?      |
| [getDeviceName()](#getdevicename)                                 | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getFirstInstallTime()](#getfirstinstalltime)                     | `number`            |  ❌  |   ✅    |   ✅    | 0.12.0 |
| [getFingerprint()](#getfingerprint)                               | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getFontScale()](#getfontscale)                                   | `number`            |  ✅  |   ✅    |   ❌    | 0.15.0 |
| [getFreeDiskStorage()](#getfreediskstorage)                       | `number`            |  ✅  |   ✅    |   ❌    | 0.15.0 |
| [getHardware()](#gethardware)                                     | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getHost()](#gethost)                                             | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getIPAddress()](#getipaddress)                                   | `Promise<string>`   |  ✅  |   ✅    |   ✅    | 0.12.0 |
| [getIncremental()](#getincremental)                               | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getInstallReferrer()](#getinstallreferrer)                       | `string`            |  ❌  |   ✅    |   ❌    | 0.19.0 |
| [getInstanceID()](#getinstanceid)                                 | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getLastUpdateTime()](#getlastupdatetime)                         | `number`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getMACAddress()](#getmacaddress)                                 | `Promise<string>`   |  ✅  |   ✅    |   ❌    | 0.12.0 |
| [getManufacturer()](#getmanufacturer)                             | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getMaxMemory()](#getmaxmemory)                                   | `number`            |  ❌  |   ✅    |   ✅    | 0.14.0 |
| [getModel()](#getmodel)                                           | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getPhoneNumber()](#getphonenumber)                               | `string`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getPowerState()](#getpowerstate)                                 | `Promise<object>`   |  ✅  |   ❌    |   ❌    |        |
| [getProduct()](#getproduct)                                       | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getPreviewSdkInt()](#getPreviewSdkInt)                           | `number`            |  ❌  |   ✅    |   ❌    | ?      |
| [getReadableVersion()](#getreadableversion)                       | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getSerialNumber()](#getserialnumber)                             | `string`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getSecurityPatch()](#getsecuritypatch)                           | `string`            |  ❌  |   ✅    |   ❌    | ? |
| [getSystemName()](#getsystemname)                                 | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getSystemVersion()](#getsystemversion)                           | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getBuildId()](#getbuildid)                                       | `string`            |  ✅  |   ✅    |   ❌    | ?      |
| [getTags()](#gettags)                                             | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getType()](#gettype)                                             | `string`            |  ❌  |   ✅    |   ❌    | ?      |
| [getTimezone()](#gettimezone)                                     | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getTotalDiskCapacity()](#gettotaldiskcapacity)                   | `number`            |  ✅  |   ✅    |   ❌    | 0.15.0 |
| [getTotalMemory()](#gettotalmemory)                               | `number`            |  ✅  |   ✅    |   ❌    | 0.14.0 |
| [getUniqueID()](#getuniqueid)                                     | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [getUserAgent()](#getuseragent)                                   | `string`            |  ✅  |   ✅    |   ❌    | 0.7.0  |
| [getVersion()](#getversion)                                       | `string`            |  ✅  |   ✅    |   ✅    | ?      |
| [is24Hour()](#is24hour)                                           | `boolean`           |  ✅  |   ✅    |   ✅    | 0.13.0 |
| [isAirPlaneMode()](#isairplanemode)                               | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | 0.25.0 |
| [isBatteryCharging()](#isbatterycharging)                         | `Promise<boolean>`  |  ✅  |   ✅    |   ❌    | 0.27.0 |
| [isEmulator()](#isemulator)                                       | `boolean`           |  ✅  |   ✅    |   ✅    | ?      |
| [isPinOrFingerprintSet()](#ispinorfingerprintset)                 | (callback)`boolean` |  ✅  |   ✅    |   ✅    | 0.10.1 |
| [isTablet()](#istablet)                                           | `boolean`           |  ✅  |   ✅    |   ✅    | ?      |
| [hasNotch()](#hasNotch)                                           | `boolean`           |  ✅  |   ✅    |   ✅    | 0.23.0 |
| [isLandscape()](#isLandscape)                                     | `boolean`           |  ✅  |   ✅    |   ✅    | 0.24.0 |
| [getDeviceType()](#getDeviceType)                                 | `string`            |  ✅  |   ✅    |   ❌    | ?      |
| [isAutoDateAndTime()](#isAutoDateAndTime)                         | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | 0.29.0 |
| [isAutoTimeZone()](#isAutoTimeZone)                               | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | 0.29.0 |
| [supported32BitAbis()](#supported32BitAbis)                       | `string[]`          |  ❌  |   ✅    |   ❌    | ?      |
| [supported64BitAbis()](#supported64BitAbis)                       | `string[]`          |  ❌  |   ✅    |   ❌    | ?      |
| [supportedABIs()](#supportedABIs)                                 | `string[]`          |  ✅  |   ✅    |   ❌    | 1.1.0  |
| [hasSystemFeature()](#hassystemfeaturefeature)                    | `Promise<boolean>`  |  ❌  |   ✅    |   ❌    | ?      |
| [getSystemAvailableFeatures()](#getSystemAvailableFeatures)       | `Promise<string[]>` |  ❌  |   ✅    |   ❌    | ?      |
| [isLocationEnabled()](#isLocationEnabled)                         | `Promise<boolean>`  |  ✅  |   ✅    |   ❌    | ?      |
| [getAvailableLocationProviders()](#getAvailableLocationProviders) | `Promise<Object>`   |  ✅  |   ✅    |   ❌    | ?      |

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

### getBaseOS()

The base OS build the product is based on.

**Examples**

```js
const baseOS = DeviceInfo.getBaseOS();

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

> To be able to get actual battery level enable battery monitoring mode for application.
> Add this code:

```objective-c
[UIDevice currentDevice].batteryMonitoringEnabled = true;
```

> to AppDelegate.m application:didFinishLaunchingWithOptions:
>
> Returns -1 on the iOS Simulator

---

### getBootloader()

The system bootloader version number.

**Examples**

```js
const bootloader = DeviceInfo.getBootloader();

// "mw8998-002.0069.00"
```

---

### getBrand()

Gets the device brand.

**Examples**

```js
const brand = DeviceInfo.getBrand();

// iOS: "Apple"
// Android: "xiaomi"
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

### getCameraPresence()

Tells if the device have any camera now. 

**Examples**

```js
DeviceInfo.getCameraPresence()
  .then(isCameraPresent => {
    // true or false
  })
  .catch(cameraAccessException => {
    // is thrown if a camera device could not be queried or opened by the CameraManager on Android
  });
```

**Notes**

> * Hot add/remove of camera is supported.
> * Returns the status of the physical presence of the camera. If camera present but your app don't have permissions to use it, getCameraPresence will still return the true

---

### getCarrier()

Gets the carrier name (network operator).

**Examples**

```js
const carrier = DeviceInfo.getCarrier(); // "SOFTBANK"
```

---

### getCodename()

The current development codename, or the string "REL" if this is a release build.

**Examples**

```js
const codename = DeviceInfo.getCodename();

// "REL"
```

---

### getDevice()

The name of the industrial design.

**Examples**

```js
const device = DeviceInfo.getDevice();

// "walleye"
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

### getDisplay()

A build ID string meant for displaying to the user.

**Examples**

```js
const display = DeviceInfo.getDisplay();

// "OPM2.171026.006.G1"
```

---

### getPreferredLocales()

Gets the preferred locales defined by the user.

**Examples**

```js
const preferredLocales = DeviceInfo.getPreferredLocales();

// iOS: "[es-ES, en-US]"
// Android: "[es-ES, en-US]"
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

### getFingerprint()

A string that uniquely identifies this build.

**Examples**

```js
const fingerprint = DeviceInfo.getFingerprint();

// "google/walleye/walleye:8.1.0/OPM2.171026.006.G1/4820017:user/release-keys"
```

---

### getFontScale()

Gets the device font scale.
The font scale is the ratio of the current system font to the "normal" font size, so if normal text is 10pt and the system font is currently 15pt, the font scale would be 1.5
This can be used to determine if accessability settings has been changed for the device; you may want to re-layout certain views if the font scale is significantly larger ( > 2.0 )

In iOS App Extensions this call always returns 1.0, see #625.

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

### getHardware()

The name of the hardware (from the kernel command line or /proc).

**Examples**

```js
const hardware = DeviceInfo.getHardware();

// "walleye"
```

---

### getHost()

Hostname

**Examples**

```js
const host = DeviceInfo.getHost();

// "wprd10.hot.corp.google.com"
```

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

**Notes**

> Support for iOS was added in 0.22.0

---

### getIncremental()

The internal value used by the underlying source control to represent this build.

**Examples**

```js
const incremental = DeviceInfo.getIncremental();

// "4820017"
```

---

### getInstallReferrer()

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

**Notes**

> iOS: This method always return "02:00:00:00:00:00" as retrieving the MAC address is [disabled since iOS 7](https://developer.apple.com/library/archive/releasenotes/General/WhatsNewIniOS/Articles/iOS7.html#//apple_ref/doc/uid/TP40013162-SW34)

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

**iOS warning:**  The list with device names is maintained by the community and could lag new devices. It is recommended to use `getDeviceId()	` since it's more reliable and always up-to-date with new iOS devices. We do accept pull requests that add new iOS devices to the list with device names.

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

// Android: null return: no permission, empty string: unprogrammed or empty SIM1, e.g. "+15555215558": normal return value
```

**Android Permissions**

* [android.permission.READ_PHONE_STATE](https://developer.android.com/reference/android/Manifest.permission.html#READ_PHONE_STATE)

**Notes**

> This can return `undefined` in certain cases and should not be relied on. [SO entry on the subject](https://stackoverflow.com/questions/2480288/programmatically-obtain-the-phone-number-of-the-android-phone#answer-2480307).

---

### getPowerState()

Gets the power state of the device including the battery level, whether it is plugged in, and if the system is currently operating in low power mode.
Displays a warning on iOS if battery monitoring not enabled, or if attempted on an emulator (where monitoring is not possible)

**Examples**

```js
DeviceInfo.getPowerState().then(state => {
  // {
  //   batteryLevel: 0.759999,
  //   batteryState: 'unplugged',
  //   lowPowerMode: false,
  // }
});
```

---

### getProduct()

The name of the overall product.

**Examples**

```js
const product = DeviceInfo.getProduct();

// "walleye"
```

---

### getPreviewSdkInt()

The developer preview revision of a prerelease SDK.

**Examples**

```js
const previewSdkInt = DeviceInfo.getPreviewSdkInt();

// 0
```

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

### getSecurityPatch()

The user-visible security patch level.

**Examples**

```js
const securityPatch = DeviceInfo.getSecurityPatch();

// "2018-07-05"
```

---

### getSystemName()

Gets the device OS name.

**Examples**

```js
const systemName = DeviceInfo.getSystemName();

// iOS: "iOS" on newer iOS devices "iPhone OS" on older devices, including older iPad's.
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

### getBuildId()

Gets build number of the operating system.

**Examples**

```js
const osBuildId = DeviceInfo.getBuildId();

// iOS: "12A269"
// tvOS: not available
// Android: "13D15"
// Windows: not available
```

---

### getTags()

Comma-separated tags describing the build.

**Examples**

```js
const tags = DeviceInfo.getTags();

// "release-keys, unsigned, debug", 
```

---

### getType()

The type of build.

**Examples**

```js
const type = DeviceInfo.getType();

// "user", "eng"
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

> * iOS: This is [`IDFV`](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor) or a random string if IDFV is unavaliable. Once UID is generated it is stored in iOS Keychain and NSUserDefaults. So it would stay the same even if you delete the app or reset IDFV. You can *carefully* consider it a persistent, cross-install unique ID. It can be changed only in case someone manually override values in Keychain/NSUserDefaults or if Apple would change Keychain and NSUserDefaults implementations
> * android: Prior to Oreo, this id ([ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure.html#ANDROID_ID)) will always be the same once you set up your phone.

---

### getUserAgent()

Gets the device User Agent.

**Examples**

```js
const userAgent = DeviceInfo.getUserAgent();

// iOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143"
// tvOS: not available
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
// Android: "1.0"
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

### isAirPlaneMode()

Tells if the device is in AirPlaneMode.

**Examples**

```js
DeviceInfo.isAirPlaneMode().then(airPlaneModeOn => {
  // false
});
```

**Notes**

> * This only works if the remote debugger is disabled.

---

### isBatteryCharging()

Tells if the battery is currently charging.

**Examples**

```js
DeviceInfo.isBatteryCharging().then(isCharging => {
  // true or false
});
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

---

### isLandscape()

Tells if the device is currently in landscape mode.

**Examples**

```js
const isLandscape = DeviceInfo.isLandscape(); // true
```

---

### hasNotch()

Tells if the device has a notch.

**Examples**

```js
const hasNotch = DeviceInfo.hasNotch(); // true
```

---

### getDeviceType()

Returns the device's type as a string, which will be one of:

* `Handset`
* `Tablet`
* `Tv`
* `Unknown`

**Examples**

```js
const deviceType = DeviceInfo.getDeviceType(); // 'Handset'
```

---

### isAutoDateAndTime()

Tells if the automatic date & time setting is enabled on the phone.

**Examples**

```js
DeviceInfo.isAutoDateAndTime().then(isAutoDateAndTime => {
  // true or false
});
```

---

### isAutoTimeZone()

Tells if the automatic time zone setting is enabled on the phone.

**Examples**

```js
DeviceInfo.isAutoTimeZone().then(isAutoTimeZone => {
  // true or false
});
```

---

### supported32BitAbis()

An ordered list of 32 bit ABIs supported by this device.

**Examples**

```js
const supported32BitAbis = DeviceInfo.supported32BitAbis();

// ["armeabi-v7a", "armeabi"]
```

---

### supported64BitAbis()

An ordered list of 64 bit ABIs supported by this device.

**Examples**

```js
const supported64BitAbis = DeviceInfo.supported64BitAbis();

// ["arm64-v8a"]
```

---

### supportedABIs()

Returns a list of supported processor architecture version

**Examples**

```js
DeviceInfo.supportedABIs(); // [ "arm64 v8", "Intel x86-64h Haswell", "arm64-v8a", "armeabi-v7a", "armeabi" ]
```

---

### hasSystemFeature(feature)

Tells if the device has a specific system feature.

**Examples**

```js
DeviceInfo.hasSystemFeature('amazon.hardware.fire_tv').then(hasFeature => {
  // true or false
}); 
```

---

### getSystemAvailableFeatures()

Returns a list of available system features on Android.

**Examples**

```js
DeviceInfo.getSystemAvailableFeatures().then(features => {
  // ["android.software.backup", "android.hardware.screen.landscape", "android.hardware.wifi", ...]
}); 
```

### isLocationEnabled()

Tells if the device has location services turned off at the device-level (NOT related to app-specific permissions)

**Examples**

```js
DeviceInfo.isLocationEnabled().then(enabled => {
  // true or false
});
```

### getAvailableLocationProviders()

Returns an object of **platform-specfic** location providers/servcies, with `boolean` value whether or not they are currently available.

> NOTE: This function requires access to the Location permission on Android

#### Android Example

```js
DeviceInfo.getAvailableLocationProviders().then(providers => {
  // {
  //   gps: true
  //   network: true
  //   passive: true
  // }
});
```

#### iOS Example

```js
DeviceInfo.getAvailableLocationProviders().then(providers => {
  // {
  //   headingAvailable: false
  //   isRangingAvailable: false
  //   locationServicesEnabled: true
  //   significantLocationChangeMonitoringAvailable: true
  // }
});
```

## Events

Currently iOS-only.

### batteryLevelDidChange

Fired when the battery level changes; sent no more frequently than once per minute.

**Examples**

```js
import { NativeEventEmitter, NativeModules } from 'react-native'
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo)

deviceInfoEmitter.addListener('batteryLevelDidChange', level => {
  // 0.759999
});
```

---

### batteryLevelIsLow

Fired when the battery drops below 20%.

**Examples**

```js
import { NativeEventEmitter, NativeModules } from 'react-native'
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo)

deviceInfoEmitter.addListener('batteryLevelIsLow', level => {
  // 0.19
});
```

---

### powerStateDidChange

Fired when the battery state changes, for example when the device enters charging mode or is unplugged.

**Examples**

```js
import { NativeEventEmitter, NativeModules } from 'react-native'
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo)

deviceInfoEmitter.addListener('powerStateDidChange', { batteryState } => {
  // 'charging'
});
```

## Troubleshooting

When installing or using `react-native-device-info`, you may encounter the following problems:

<details>
  <summary>[android] - Unable to merge dex / Multiple dex files / Problems with `com.google.android.gms`</summary>

`react-native-device-info` uses `com.google.android.gms:play-services-gcm` to provide [getInstance()][#getinstance].
This can lead to conflicts when building the Android application.

If you're using a different version of `com.google.android.gms:play-services-gcm` in your app, you can define the
`googlePlayServicesVersion` gradle variable in your `build.gradle` file to tell `react-native-device-info` what version
it should require. See the example project included here for a sample.

If you're using a different library that conflicts with `com.google.android.gms:play-services-gcm`, and you are certain you know what you are doing such that you will avoid version conflicts, you can simply
ignore this dependency in your gradle file:

```groovy
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
  <summary>[ios] - [NetworkInfo] Descriptors query returned error: Error Domain=NSCocoaErrorDomain Code=4099
 “The connection to service named com.apple.commcenter.coretelephony.xpc was invalidated.”</summary>

This is a system level log that may be turned off by executing:
```xcrun simctl spawn booted log config --mode "level:off"  --subsystem com.apple.CoreTelephony```.
To undo the command, you can execute:
```xcrun simctl spawn booted log config --mode "level:info"  --subsystem com.apple.CoreTelephony```

</details>

<details>
  <summary>[ios] - Multiple versions of React when using CocoaPods
  "tries to require 'react-native' but there are several files providing this module"</summary>

#### You may need to adjust your Podfile like this if you use Cocoapods and have undefined symbols or duplicate React definitions

```ruby
target 'yourTargetName' do
  # See http://facebook.github.io/react-native/docs/integration-with-existing-apps.html#configuring-cocoapods-dependencies
  pod 'React', :path => '../node_modules/react-native', :subspecs => [
    'Core',
    'CxxBridge', # Include this for RN >= 0.47
    'DevSupport', # Include this to enable In-App Devmenu if RN >= 0.43
    'RCTText',
    'RCTNetwork',
    'RCTWebSocket', # Needed for debugging
    'RCTAnimation', # Needed for FlatList and animations running on native UI thread
    # Add any other subspecs you want to use in your project
  ]

  # Explicitly include Yoga if you are using RN >= 0.42.0
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

  # Third party deps podspec link - you may have multiple pods here, just an example
  pod 'RNDeviceInfo', path: '../node_modules/react-native-device-info'

end

# if you see errors about React duplicate definitions, this fixes it. The same works for yoga.
post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == "React"
      target.remove_from_project
    end
  end
end
```

</details>

<details>
  <summary>[tests] - Cannot run my test suite when using this library</summary>

`react-native-device-info` contains native code, and needs to be mocked. Jest Snapshot support may work though.

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
<details>
    <summary>[warnings] - I get too many warnings (battery state, etc)</summary>
    
Some of the APIs (like getBatteryState) will throw warnings in certain conditions like on tvOS or the iOS emulator. This won't be visible in production but even in development it may be irritating. It is useful to have the warnings because these devices return no state, and that can be surprising, leading to github support issues. The warnings is intended to educate you as a developer. If the warnings are troublesome you may try this in your code to suppress them:
    
```javascript
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Battery state']);
```
</details>

## Release Notes

See the [CHANGELOG.md](https://github.com/react-native-community/react-native-device-info/blob/master/CHANGELOG.md).

## Contributing

Please see the [`contributing guide`](/CONTRIBUTING.md).

## react-native-dom

As a courtesy to developers, this library was made compatible in v0.21.6 with [react-native-dom](https://github.com/vincentriemer/react-native-dom) and [react-native-web](https://github.com/necolas/react-native-web) by providing an empty polyfill in order to avoid breaking builds.

Only [getUserAgent()](#getuseragent) will return a correct value. All other API methods will return an "empty" value of its documented return type: `0` for numbers, `''` for strings, `false` for booleans.
