## Release Notes

### Next

### 2.3.2
* fix: load module async by default with option to load sync (https://github.com/react-native-community/react-native-device-info/pull/741)

### 2.3.1
* fix: add Huawei P30 devices to isNothc list (https://github.com/react-native-community/react-native-device-info/pull/734)

### 2.3.0
* feat: AndroidX support (backwards/forwards compatible) (https://github.com/react-native-community/react-native-device-info/pull/733)
* fix: isTablet() Android using Google-recommended / robust style (https://github.com/react-native-community/react-native-device-info/pull/730)

### 2.2.2
* fix: re-fix crash PR #714, API level should be 24 (https://github.com/react-native-community/react-native-device-info/pull/715)

### 2.2.1
* fix: crash on android api level less than 23 (https://github.com/react-native-community/react-native-device-info/pull/714)

### 2.2.0
* feat: sync some methods from flutter (https://github.com/react-native-community/react-native-device-info/pull/711)

### 2.1.4
* fix: additional checking in simulation method (https://github.com/react-native-community/react-native-device-info/pull/710)
* docs(README): Add detail to ios getUniqueID() docs (https://github.com/react-native-community/react-native-device-info/pull/707)

### 2.1.3
* fix: add missing devices to devices with notch list (https://github.com/react-native-community/react-native-device-info/pull/702)

### 2.1.2
* build(Android): constrain play services dependency to pre-AndroidX 16.1.0 (https://github.com/react-native-community/react-native-device-info/pull/693)

### 2.1.1
* fix(Android): Avoid NullpointerException on install referer listener (https://github.com/react-native-community/react-native-device-info/pull/685)

### 2.1.0
* perf(Android): getConstants() optionally loaded in thread, speedup for most, init MainApplication with RNDeviceInfo(true) (https://github.com/react-native-community/react-native-device-info/pull/680)

### 2.0.4
* fix: Add Xiaomi Redmi Note 7 to devicesWithNotch list (https://github.com/react-native-community/react-native-device-info/pull/682)

### 2.0.3
* fix: adding conditions for tvOS location providers (https://github.com/react-native-community/react-native-device-info/pull/678)
* docs: refresh example app and fix it so it works with tvOS
* docs: alter API Chart in README.md - isAutoDateAndTime and isAutoTimeZone return Promise (https://github.com/react-native-community/react-native-device-info/pull/677)


### 2.0.2
* fix: checking for tvOS before attempting to get `isBatteryMonitoringEnabled` flag as tvOS doesn't support it (https://github.com/react-native-community/react-native-device-info/pull/673)
* types: make the typescript location / power returns specific (https://github.com/react-native-community/react-native-device-info/pull/669)
* chore: move ios device model dictionary from native to javascript (https://github.com/react-native-community/react-native-device-info/pull/670)

### 2.0.1
* fix: `getFreeDiskStorage()` to use `StatFs` methods that return `long` instead of `int` (which are now deprecated)
       (https://github.com/react-native-community/react-native-device-info/pull/672)

### 2.0.0
* breaking: no functional change from 1.8.0, but isLocationEnabled requires minCompileSdk 28

### 1.8.0 (unpublished: unintended breaking change)
* feat: Add `isLocationEnabled()`, `getAvailableLocationProviders()` methods (https://github.com/react-native-community/react-native-device-info/pull/664)

### 1.7.0
 * feat: Add `getCameraPresence()` method (https://github.com/react-native-community/react-native-device-info/pull/474)

### 1.6.2
 * fix: added v to tag name in podspec (https://github.com/react-native-community/react-native-device-info/pull/660)
 * docs: Update README.md to have correct Podspec name (https://github.com/react-native-community/react-native-device-info/pull/656)

### 1.6.1
 * fix: fix building issue on tvOS / headers on iOS (https://github.com/react-native-community/react-native-device-info/pull/652)
 * chore: fix pointer types in iOS build (https://github.com/react-native-community/react-native-device-info/pull/649)

### 1.6.0
 * feat: implement hasSystemFeature() method for Android devices (https://github.com/react-native-community/react-native-device-info/pull/646)

### 1.5.1
 * chore: Update deviceinfo.js entry for xioami mi 8 lite (https://github.com/react-native-community/react-native-device-info/pull/644)

### 1.5.0
 * feat: Add `getBuildId` method to gets build number of the operating system. (https://github.com/react-native-community/react-native-device-info/pull/640)

### 1.4.3
 * chore: Add Xiaomi Mi A2 Lite to devices with notch (https://github.com/react-native-community/react-native-device-info/pull/634)
 * feat: Throw error if native module is null w/steps to help fix (https://github.com/react-native-community/react-native-device-info/pull/630)

### 1.4.2:
 * fix: Use `RCTSharedApplication` so compile works for ios app extensions (https://github.com/react-native-community/react-native-device-info/pull/408)
 * chore: Add 3rd generation iPad pro to device/model list (https://github.com/react-native-community/react-native-device-info/pull/618)
 * feat: Support `getUserAgent()` on old androids (API level <= 16) (https://github.com/react-native-community/react-native-device-info/pull/545)
 * chore: Add Huweai INE-LX1 to devices with notch (https://github.com/react-native-community/react-native-device-info/pull/624)
 
**iOS notice:**  This is existing policy but is worth mentioning: The list with device names (returned by `getModel()`) is maintained by the community and could lag new devices. It is recommended to use `getDeviceId()	` since it's more reliable and always up-to-date with new iOS devices. We do accept pull requests that add new iOS devices to the list with device names.

### 1.4.1
 * fix: repair flow types from #436 - 'Object' vs 'object'

### 1.4.0
 * feat: add battery monitoring and detailed power state getter (https://github.com/react-native-community/react-native-device-info/pull/436)

### 1.3.0
 * feat: Add support for preferred languages function (https://github.com/react-native-community/react-native-device-info/pull/610)

### 1.2.0
 * feat: Support 'dom' Platform.OS for react-native-dom (https://github.com/react-native-community/react-native-device-info/pull/406)
 * feat: Add support for jest snapshot testing (https://github.com/react-native-community/react-native-device-info/pull/375)
 * fix: Use API-specific permissions to get phone number (https://github.com/react-native-community/react-native-device-info/pull/269)
 * fix: Add OnePlus A6010 to devicesWithNothc list (https://github.com/react-native-community/react-native-device-info/pull/604)
 * fix: use reactContext vs getApplicationContext() (https://github.com/react-native-community/react-native-device-info/pull/382)
 * fix: dynamic reference path on windows depending on environment (https://github.com/react-native-community/react-native-device-info/pull/608)

### 1.1.0
 * Add `supportedABIs()` (https://github.com/react-native-community/react-native-device-info/pull/598)

### 1.0.1
 * fix: Add Nokia 7.1 to devicesWithNotch list (https://github.com/react-native-community/react-native-device-info/pull/597)

### 1.0.0
 * First major version, features (and bugs) copied from 0.29.1

### 0.29.1
 * Fix lint errors (library dependences, ignore permissions) (https://github.com/react-native-community/react-native-device-info/pull/590)

> On March 12 2019, this repository was moved from https://github.com/rebeccahughes/react-native-device-info
> to https://github.com/react-native-community/react-native-device-info

### 0.29.0
 * Add `isAutoDateAndTime()` and `isAutoTimeZone()` (https://github.com/react-native-community/react-native-device-info/pull/583)

### 0.28.1
 * Add 'POCOPHONE F1' to list of notch devices (https://github.com/react-native-community/react-native-device-info/pull/584)

### 0.28.0
 * Updated Android SDK to version 28 (https://github.com/react-native-community/react-native-device-info/pull/548)

### 0.27.1
 * Enabled battery monitoring mode to get actual battery data (https://github.com/react-native-community/react-native-device-info/pull/404)

### 0.27.0
 * Added `isBatteryCharging()` (https://github.com/react-native-community/react-native-device-info/pull/514)

### 0.26.5
 * Use BigInteger to avoid overflow in Disk related functions (https://github.com/react-native-community/react-native-device-info/pull/587)

### 0.26.4
 * Fix hasNotch() support for LG phones (https://github.com/react-native-community/react-native-device-info/pull/573)

### 0.26.3
 * Fixed getDeviceType method (https://github.com/react-native-community/react-native-device-info/pull/571)

### 0.26.2
 * Added Huawei P20 Lite to notch devices (https://github.com/react-native-community/react-native-device-info/pull/568)

### 0.26.1
 * Added OnePlus 6T to notch devices (https://github.com/react-native-community/react-native-device-info/pull/563)

### 0.26.0
 * Added `getDeviceType()` and used it in `isTablet()` (https://github.com/react-native-community/react-native-device-info/pull/560)

### 0.25.1
 * Added Google Pixel 3XL to notch devices (https://github.com/react-native-community/react-native-device-info/pull/535)

### 0.25.0
 * Added `isAirPlaneMode()` (https://github.com/react-native-community/react-native-device-info/pull/524)
 * Compare `hasNotch()` devices with lowercase (https://github.com/react-native-community/react-native-device-info/pull/537)
 * Added several devices to `hasNotch()` (#533, #549, #550)

### 0.24.3
 * Support React Native Windows 0.57, minimal version is now 10.0.14393 for the target platform

### 0.24.2
 * Update typescript definitions (https://github.com/react-native-community/react-native-device-info/pull/498)

### 0.24.1
 * Update build.gradle to remove compile warning (https://github.com/react-native-community/react-native-device-info/pull/520)

### 0.24.0
 * Added `isLandscape()` (https://github.com/react-native-community/react-native-device-info/pull/504)

### 0.23.0
 * Add `hasNotch()` (https://github.com/react-native-community/react-native-device-info/pull/500)

### 0.22.6
 * Support new models (XR, XS, XS Max) and iPad 6th Gen (https://github.com/react-native-community/react-native-device-info/pull/499)

### 0.22.5
 * Fix typescript declaration export (https://github.com/react-native-community/react-native-device-info/pull/478)

### 0.22.4
 * Shrank the npm package size (https://github.com/react-native-community/react-native-device-info/issues/477)

### 0.22.3
 * Fixed `eslint-plugin-import` error (https://github.com/react-native-community/react-native-device-info/pull/466)

### 0.22.2
 * Fixed Android build error introduced in 0.22.1 (https://github.com/react-native-community/react-native-device-info/pull/460)

### 0.22.1

 * Fix deprecated code on Android in the following methods (https://github.com/react-native-community/react-native-device-info/pull/426)
 * getDeviceCountry
 * getDeviceLocale

### 0.22.0

* Add support for `getIpAddress` and `getMacAddress` on iOS (https://github.com/react-native-community/react-native-device-info/commit/41735bd0b2efe1f626afc066604f27073acb9d4c)

### 0.21.5

* Rolled back the Pod change made in 0.21.1

### 0.21.4

* Move back the podspec file to the root directory (https://github.com/react-native-community/react-native-device-info/pull/376)

### 0.21.3

* Moved the IOS code to an ios/ directory (https://github.com/react-native-community/react-native-device-info/pull/374)

### 0.21.2

* Fix getBatteryLevel() for tvOS (always return 1) (https://github.com/react-native-community/react-native-device-info/pull/363)

### 0.21.1

* Remove deprecated React pod dependency (https://github.com/react-native-community/react-native-device-info/pull/361)

### 0.21.0

* Add more gradle configuration properties `compileSdkVersion`, `buildToolsVersion`, `targetSdkVersion` (https://github.com/react-native-community/react-native-device-info/pull/343)

### 0.20.0

* Made the following methods compatible with UWP: (https://github.com/react-native-community/react-native-device-info/pull/345)
  * `getBatteryLevel()`
  * `getFirstIntallTime()`
  * `getIPAddress()`
  * `getMaxMemory()`
  * `isPinOrFingerprintSet()`

### 0.19.0

* Add `getInstallReferrer` (https://github.com/react-native-community/react-native-device-info/pull/344)

### 0.18.0

* Add `getBatteryLevel` (https://github.com/react-native-community/react-native-device-info/pull/359)

### 0.17.4

* Fix `getMACAddress` for Android > 6 (https://github.com/react-native-community/react-native-device-info/pull/349)

### 0.17.3

* Fix production build crash on Android introduced in #313

### 0.17.2

* Enhance `isTablet()` for android by checking display density (https://github.com/react-native-community/react-native-device-info/pull/313)
* Changed iOS target deployment from 9.0 to 8.0 for broader device support (https://github.com/react-native-community/react-native-device-info/issues/19)

### 0.17.1

* Fix bad import for web polyfill

### 0.17.0

* Add an empty polyfill for `react-native-web` users (https://github.com/react-native-community/react-native-device-info/pull/339)

### 0.16.0

* Add the `googlePlayServicesVersion` Gradle build config that allows you to set the Play Services version from the root-project (https://github.com/react-native-community/react-native-device-info/pull/333)

### 0.15.3

* Fix crash on iOS: prevent insertion of nil values in the dictionary (https://github.com/react-native-community/react-native-device-info/pull/328)

### 0.15.2

* Fix crash on `getFreeDiskStorage` and `getTotalDiskCapacity` from invalid filesystem path (https://github.com/react-native-community/react-native-device-info/issues/320)

### 0.15.1

* Fix Android compatibility for `getFreeDiskStorage` and `getTotalDiskCapacity` (https://github.com/react-native-community/react-native-device-info/pull/319)

### 0.15.0

* Add `getFontScale` (https://github.com/react-native-community/react-native-device-info/pull/278)
* Add `getFreeDiskStorage` and `getTotalDiskCapacity` (https://github.com/react-native-community/react-native-device-info/pull/302)
* Fix missing flow definition for `getApplicationName`

### 0.14.0

* Fix tvOS support (https://github.com/react-native-community/react-native-device-info/pull/283)
* Introduced `getApplicationName` to see the name of the app both on ios, android and win
  * https://github.com/react-native-community/react-native-device-info/pull/210
  * https://github.com/react-native-community/react-native-device-info/pull/295
* Added `getTotalMemory` and `getMaxMemory` (https://github.com/react-native-community/react-native-device-info/pull/289)
* Fix iOS undefined native module error (https://github.com/react-native-community/react-native-device-info/pull/276)
* Fix crash on `getUserAgent` when Webview is not installed (https://github.com/react-native-community/react-native-device-info/pull/273)

### 0.13.0

* Add `getCarrier` (https://github.com/react-native-community/react-native-device-info/pull/261)
* Disable `isPinOrFingerprintSet` for tvOS (https://github.com/react-native-community/react-native-device-info/pull/270)
* Add `is24Hour` (https://github.com/react-native-community/react-native-device-info/pull/265)
* Remove unused windows dependency (https://github.com/react-native-community/react-native-device-info/pull/263)
* Add missing typescript definitions (https://github.com/react-native-community/react-native-device-info/pull/254)
* Make play-services optional (https://github.com/react-native-community/react-native-device-info/pull/226)

### 0.12.1

* Critical fix on WIFI STATE (https://github.com/react-native-community/react-native-device-info/pull/249)

### 0.12.0

* Get real WebView UserAgent on Android (https://github.com/react-native-community/react-native-device-info/pull/207)
* Add DeviceUID.h to public headers (https://github.com/react-native-community/react-native-device-info/pull/217)
* Add `getPhoneNumber` (https://github.com/react-native-community/react-native-device-info/pull/174)
* Fix typescript definitions (https://github.com/react-native-community/react-native-device-info/pull/221)
* Add `getFirstInstallTime` and `getLastUpdateTime` (https://github.com/react-native-community/react-native-device-info/pull/222)
* Added version check and permission to work with Android API >= 16 (https://github.com/react-native-community/react-native-device-info/pull/225)
* Added device detection even when in an iOS emulator (https://github.com/react-native-community/react-native-device-info/pull/224)
* Add support for new iPhone, iPad, and Apple TV models (https://github.com/react-native-community/react-native-device-info/pull/230)
* Add android only `getAPILevel` method (https://github.com/react-native-community/react-native-device-info/pull/232)
* Add Android support for serial number, IP, and MAC address (https://github.com/react-native-community/react-native-device-info/pull/150)
* Add tvOS support (https://github.com/react-native-community/react-native-device-info/pull/235)
* Add flow types
* Fix getCurrentActivity() null crash in Android (https://github.com/react-native-community/react-native-device-info/pull/247)

[Diff](https://github.com/react-native-community/react-native-device-info/compare/1aafc6f0b20d7cd6f0939ea5370e9899e4914c93...master)

### 0.11.0

* Add support for RN > 0.47
* Update typescript definitions

[Diff](https://github.com/react-native-community/react-native-device-info/compare/5b869cdd5e16b65cbe4e85a565aa331bd7546b89...1aafc6f0b20d7cd6f0939ea5370e9899e4914c93)

### 0.10.2

* Add typescript definitions

[Diff](https://github.com/react-native-community/react-native-device-info/compare/f3967862711892615e7f51d49d0034ee134f3e3d...5b869cdd5e16b65cbe4e85a565aa331bd7546b89)

### 0.10.1

* Add `isPinOrFingerprintSet` method
* Add support for RN > 0.40

[Diff](https://github.com/react-native-community/react-native-device-info/compare/c843144ea872a79f4d53a53b32f72511fbfc8d8b...f3967862711892615e7f51d49d0034ee134f3e3d)

### 0.10.0

* Semver fix

[Diff](https://github.com/react-native-community/react-native-device-info/compare/e8bfe5ea8d5f5414f2f97f35a5d02b611cbe39e3...c843144ea872a79f4d53a53b32f72511fbfc8d8b)

### 0.9.8

[Diff](https://github.com/react-native-community/react-native-device-info/compare/668996c64e23f477fc8156cdc43a49198b4fdd20...e8bfe5ea8d5f5414f2f97f35a5d02b611cbe39e3)

### 0.9.7

Several bugfixes and detecting if device is a tablet

### 0.9.3

adds support for Brand information e.g. apple, htc, etc

### 0.9.1

adds support for the iPhone SE and new iPad Pro

### 0.9.0

adds support for device country and changes the iOS device name to match Apple branding

### 0.8.4

don't use destructuring

### 0.8.3

removes the default bluetooth permission

### 0.8.2

change deployment target to iOS 8

### 0.8.1

removes unnecessary peerDependencies

### 0.8.0

tweaks how device locale works on Android. If it's available it will use the toLanguageTag that is more inline with iOS. (See #14)

### 0.7.0

adds two new parameters, Device Locale and User Agent.

### 0.5.0

adds a new parameter; Device Id. On iOS this is the hardware string for the current device (e.g. "iPhone7,2"). On Android we use the BOARD field which is the name of the underlying board, e.g. "goldfish". The way that the module gets the device model on iOS has also changed to be based on the Device Id; now instead of getting a generic product family e.g. "iPhone", it will return the specific model e.g. "iPhone 6".
