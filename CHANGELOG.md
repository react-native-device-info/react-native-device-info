# [8.4.0](https://github.com/react-native-device-info/react-native-device-info/compare/v8.3.3...v8.4.0) (2021-10-03)


### Features

* **windows:** add isTabletMode/isKeyboardConnected/isMouseConnected/DeviceType:GamingConsole  ([#1238](https://github.com/react-native-device-info/react-native-device-info/issues/1238)) ([e186394](https://github.com/react-native-device-info/react-native-device-info/commit/e186394d1b1afc6af74703e52c99192dccc9b9d9))

## [8.3.3](https://github.com/react-native-device-info/react-native-device-info/compare/v8.3.2...v8.3.3) (2021-09-16)


### Bug Fixes

* **hasNotch:** Missing device name for iPhone 13 ([#1309](https://github.com/react-native-device-info/react-native-device-info/issues/1309)) ([0bc979e](https://github.com/react-native-device-info/react-native-device-info/commit/0bc979e687ef9ddbbd29410a60980cf536ce6002)), closes [#1307](https://github.com/react-native-device-info/react-native-device-info/issues/1307)

## [8.3.2](https://github.com/react-native-device-info/react-native-device-info/compare/v8.3.1...v8.3.2) (2021-09-15)


### Bug Fixes

* **hasNotch:** Add iPhone 13 lineup to list of devices with notch ([#1307](https://github.com/react-native-device-info/react-native-device-info/issues/1307)) ([44193d5](https://github.com/react-native-device-info/react-native-device-info/commit/44193d5addaaa859e09447257a27549ddf8ff7ce))

## [8.3.1](https://github.com/react-native-device-info/react-native-device-info/compare/v8.3.0...v8.3.1) (2021-08-20)


### Bug Fixes

* addListener/removeListeners native stubs for react-native 0.65 copmatibility ([3917f33](https://github.com/react-native-device-info/react-native-device-info/commit/3917f339207a5a2b05e3922f7489a0568dfde666)), closes [#1288](https://github.com/react-native-device-info/react-native-device-info/issues/1288)

# [8.3.0](https://github.com/react-native-device-info/react-native-device-info/compare/v8.2.0...v8.3.0) (2021-08-13)


### Features

* **windows, device-id:** Added get device id for windows ([#1286](https://github.com/react-native-device-info/react-native-device-info/issues/1286)) ([dce34b7](https://github.com/react-native-device-info/react-native-device-info/commit/dce34b797631f2da3d1fe0fc44c5c112c8abedee))

# [8.2.0](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.7...v8.2.0) (2021-08-12)


### Features

* Added getSerialNumber for windows ([#1287](https://github.com/react-native-device-info/react-native-device-info/issues/1287)) ([5b44183](https://github.com/react-native-device-info/react-native-device-info/commit/5b44183272a5a7730ac06c1b278fe0782ab9d87b))

## [8.1.7](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.6...v8.1.7) (2021-08-05)


### Bug Fixes

* **windows:** react-native-device-info don't work with apps in RNW v0.64 ([#1279](https://github.com/react-native-device-info/react-native-device-info/issues/1279)) ([d1a5c4e](https://github.com/react-native-device-info/react-native-device-info/commit/d1a5c4ecd9be07169ea260ec959fe9499b0dbf66))

## [8.1.6](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.5...v8.1.6) (2021-08-05)


### Bug Fixes

* **hasNotch:** add Redmi Note 8 Pro to hasNotch list ([#1276](https://github.com/react-native-device-info/react-native-device-info/issues/1276)) ([06e2b6c](https://github.com/react-native-device-info/react-native-device-info/commit/06e2b6c6740b10ffa93918c50040f5f9faf9595e))

## [8.1.5](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.4...v8.1.5) (2021-07-30)


### Bug Fixes

* **iOS:** Adds iPad Air 4th gen name description ([#1273](https://github.com/react-native-device-info/react-native-device-info/issues/1273)) ([3c0d766](https://github.com/react-native-device-info/react-native-device-info/commit/3c0d7664c252753178ad5a75a8e395ffd3eacdec))

## [8.1.4](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.3...v8.1.4) (2021-07-21)


### Bug Fixes

* Updated getUsedMemory to pull from ActivityManager debug memory info ([ed99cd3](https://github.com/react-native-device-info/react-native-device-info/commit/ed99cd3e34e97b4766383724cdb336a189647200))

## [8.1.3](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.2...v8.1.3) (2021-05-05)


### Bug Fixes

* **web:** only call navigator methods if navigator is defined ([#1225](https://github.com/react-native-device-info/react-native-device-info/issues/1225)) ([35ffa26](https://github.com/react-native-device-info/react-native-device-info/commit/35ffa26f774e8e6512d070b9a899cc9271ed093f))

## [8.1.2](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.1...v8.1.2) (2021-04-18)


### Bug Fixes

* **notch:** remove `pixel 3a` from devicesWithNotch.ts ([#1221](https://github.com/react-native-device-info/react-native-device-info/issues/1221)) ([ee959d9](https://github.com/react-native-device-info/react-native-device-info/commit/ee959d98e157a691b871a00496c55f4c3605b0d8))

## [8.1.1](https://github.com/react-native-device-info/react-native-device-info/compare/v8.1.0...v8.1.1) (2021-04-18)


### Bug Fixes

* **android:** use mavenCentral vs jcenter before jcenter shutdown ([#1220](https://github.com/react-native-device-info/react-native-device-info/issues/1220)) ([bffcce2](https://github.com/react-native-device-info/react-native-device-info/commit/bffcce242ef62e924650788c87bf9b30d8a9181c))

# [8.1.0](https://github.com/react-native-device-info/react-native-device-info/compare/v8.0.8...v8.1.0) (2021-04-12)


### Features

* **ios:** add getInstallerPackageName support for iOS ([#1217](https://github.com/react-native-device-info/react-native-device-info/issues/1217)) ([9a844bf](https://github.com/react-native-device-info/react-native-device-info/commit/9a844bf0dfbe0351416a934890a4239886c2d451))

## [8.0.8](https://github.com/react-native-device-info/react-native-device-info/compare/v8.0.7...v8.0.8) (2021-03-31)


### Bug Fixes

* **ios:** update getIpAddress to support IPv6-only interfaces ([#1190](https://github.com/react-native-device-info/react-native-device-info/issues/1190)) ([c977f30](https://github.com/react-native-device-info/react-native-device-info/commit/c977f30072c57b73c5e69969d6b5937b0baff042))

## [8.0.7](https://github.com/react-native-device-info/react-native-device-info/compare/v8.0.6...v8.0.7) (2021-03-24)


### Bug Fixes

* get legacy serial number for old APIs ([#1056](https://github.com/react-native-device-info/react-native-device-info/issues/1056)) ([40aa45b](https://github.com/react-native-device-info/react-native-device-info/commit/40aa45b021addb329a6b6f652fd8e4ec9fc17a94))

<!-- markdownlint-disable MD024 MD034 MD033 -->

# CHANGELOG

## 8.0.6
- fix(ios, deviceType): support iOS-compiled app running on macOS (#1181, thanks @user-none!)
- fix(ios, isEmulator): correct emulator detection for arm64 simulator (#1180, thanks @Arkkeeper!)

## 8.0.5

- fix: remove husky from postinstall entirely

Apparently there is no way to conditionally run postinstall, and while
we really want husky for contributors here, we must not fail on install
of library consumers (and we don't want to install husky for everyone,
even though it's a great package)

## 8.0.4

- fix: prefix husky install with with npm or package install fails

Husky is just a pre-commit hook package we use for QA, quite unfortunate that as
we ported to the next major version in v8.0.3 I broke the install for everyone. Apologies! @mikehardy

## 8.0.3

- fix(types, PowerState): use Partial<PowerState> vs union with '{}' (#1175, thanks @vvscode!)

## 8.0.2

- fix(hasNotch): fix missing Pixel 4a model name in devicesWithNotch.ts (@zarvedan)

## 8.0.1

- BREAKING: Fix the exporting and importing of typings in ES6 build module (#1164, thanks @diego-antonelli!)

Note, if you use typescript, this requires a minimum version of typescript 3.8
This change was inadvertently released without realizing it was a breaking change, apologies.
It is close enough to the 8.0.0 release that it will stand here though, without bumping to 9.0.0

## 8.0.0

- BREAKING(ios, xcode): Xcode 12 required with #1137. Use 7.3.2 if you must use outdated Xcode (#1151)
- feat(android, hms/gms): add ability to run without play services (#1156, thanks @saghul!)

7.4.0 was inadvertently breaking. I hadn't realized any iOS developers failed to update Xcode to stable
after an Xcode release. For a variety of reasons, you should always keep Xcode up to date, nevertheless
dropping Xcode 11 support is breaking. Update your Xcode or use 7.3.2.

## 7.4.0

- feat(android, install referrer): add ability to run without install referrer (#1153, thanks @saghul!)
- BREAKING feat(ios, catalyst): added DeviceTypeDesktop to getDeviceType() (#1137, thanks @exotexot!)
- fix(android, install referrer): remove old install referrer api (#1150 @nicoburns!)
- chore(ci, example): add ios/android CI, lint CI, de-lint project (@mikehardy)

## 7.3.2

- fix: remove deprecated way of retrieving INSTALL_REFERRER on Android (#965) (@Minishlink)

### 7.3.1

- fix(android, test): drop mockito to 3.6.28 to fix android test build break (thanks @jamsch!)

### 7.3.0

- feat(android, build): add ability to specify firebase bill of materials for iid versioning (#1133, thanks @Dimon70007!)
- fix(notch): add Redmi 9 to hasNotch list (#1140, thanks @esgudnason!)
- test: Adding more tests and refactoring some getters (#1136, thanks @schie!)
- chore: dependency updates (@mikehardy)

### 7.2.1

- fix(test, mocks): extra comma syntax error in mock definition (#1134, thanks @DorianGrey!)

### 7.2.0

- feat(windows): implement additional methods (#1122, thanks @jaimecbernardo!)
- feat(windows): port C# Windows implementation to C++ (#1113, thanks @jaimecbernardo!)
- feat(test, mocks): adding rest of jest mocks (#1132, thanks @schie!)
- fix(ios, keychain): change keychain access control to non-deprecated value (#1131, thanks @dmitry-bluescape!)

### 7.1.0

- feat(hasHms): added `hasHms` to indicate if Android device supports Huawei Mobile Services. (#1129, thanks @craig95!)
- feat(hasGms): added `hasGms` to indicate if Android device supports Google Mobile Services. (#1129, thanks @craig95!)

This release includes a truly enormous amount of testing and internal refactoring work that has made the module much
easier to maintain, all courtesy of @schie in the form of a pile of PRs implementing the same. Thank you, Dustin Schie!

### 7.0.2

- fix(windows): remove use of Object.fromEntries (#1110, thanks @jaimecbernardo!)

### 7.0.1

- fix(hasNotch): fix missing Redmi 7 and Pixel 3a model name in devicesWithNotch.ts (#1107, thanks @tronin!)
- fix(hasNotch): fix missing Samsung A21s model in devicesWithNotch (#1106, thanks @djhr!)

### 7.0.0

- BREAKING CHANGE: Increase iOS minimum to iOS 10. Stay on 6.x if you need to support iOS 9
- fix(iOS): supporting `getFontScale` in App Extensions (#1097, thanks @schie!)
- feat(mocks): add default set of mocks (#1102, thanks @schie!)

The change to iOS10 minimum was required to fix getFontScale for App Extensions
react-native 0.63 already requires iOS 10 minimum, so this is in harmony with the ecosystem

### 6.2.0

- feat(hooks): add useIsHeadphonesConnected hook (#1084, thanks again @schie!)

### 6.1.0

- feat(hooks): add useManufacturer hook (#1083, thanks @schie!)
- fix(types): add returnType to getPowerState (#1082, thanks @ferdicus!)

### 6.0.4

- fix(android): fix swapped data/root values in getFreeDiskStorageSync (#1077, thanks @violetchow2611!)

### 6.0.3

- fix: Xcode 12 compatibility (thanks @radko93! #1075)

### 6.0.2

- fix(windows): Targetplatform change for cpp apps to use this module (#1072, thanks @tero-paananen!)

### 6.0.1

- Added the 2nd generation iPhone SE to the deviceNamesByCode list (#1068, thanks @steve-lorenz!)

## 6.0.0

- BREAKING CHANGE(android, storage): Replace`getTotalDiskCapacity` and `getFreeDiskStorage` implementations, original
  implementations are `getTotalDiskCapacityOld` and `getFreeDiskStorageOld`. New implementation adds `Root` and `Data` file systems.
  Old implementations are deprecated, they use deprecated Android APIs, and they will disappear in a future version.
  This _should_ be a positive change as the resulting calculation should match Android settings storage calculation,
  but the old API is there if you need it, and you can open an issue to discuss if necessary. (#1054, thanks @gabriel-franzoni-pier!)

- BREAKING CHANGE(windows, vNext): The windows support has been ported from C# (react-native-windows <= 0.59) to C++
  (react-native-windows >= 0.59). This drops support for react-native-windows lower than 0.59. The port
  was developed and tested against react-native-windows 0.62.5. (1059#, thanks @tero-paananen!). The getTotalMemory APIs
  were dropped in the process (it appears react-native-windows vNext does not support them)

## 5.6.5

- fix(hasNotch): add devices Blackview A30 (#1058, thanks @alexnaiman!)

## 5.6.4

- fix(android): fix missing Huawei P30 model name in devicesWithNotch.ts (@tronin)

## 5.6.3

- fix(ios): fix WkWebView crash from parallel getUserAgent calls (#1050, thanks @RojoHub!)

## 5.6.2

- fix(types): import LocationProviderInfo type, export result types (#1041, thanks @mikehardy)
- fix: power connection and power save events were not triggering correctly (#1042, thanks @mikehardy)
- fix(ios): correctly calculate ios low battery threshold (#1039, thanks @mikehardy)

## 5.6.1

- fix: react-native-web fix TypeError and battery (#1024) (thanks @jamesst20!)

I want to say I especially appreciate the help on the react-native-web implementation.
Anyone that wants to help this library work better for react-native-web is more than welcome!
I (@mikehardy, the currently active maintainer here) do not use react-native-web so I need
all the help I can get. Cheers!

## 5.6.0

- feat: Added syncUniqueId() for iOS devices (#922) (thanks @Bardiamist!)

## 5.5.8

- fix: iOS check HFP in addition to A2DP in isHeadphonesConnected (thanks @CaptainJeff!)

## 5.5.7

- fix: Android - build issues when building for electron (thanks @rcjmk10!)
- chore: `yarn upgrade --latest`

## 5.5.6

- fix: Android - safely handle PackageManager death in InstallReferrerClient (@mikehardy)
- chore: upgrade gradle + gradle-plugin
- chore: update all javascript dependencies
- chore: refresh-example to react-native 0.62.2
- chore: de-lint

## 5.5.5

- fix: getModel on iOS now returns generic device type (e.g. "iPhone") if the specific model is unrecognized (@TheAlmightyBob)

## 5.5.4

- fix: memoization of static boolean return values (@jmheik)
- fix: add mac catalyst compatibility to getCarrier (#973) (thanks @robertying!)
- fix: add wider exception handling in install referrer (thanks @jmunozDevsu!)

## 5.5.3

- fix: add Redmi Note 9 to hasNotch list (#959) (thanks @euharrison!)

## 5.5.2

- fix: avoid crash if missing InstallReferrer permission on Android (#955) (@mikehardy)

## 5.5.1

- fix: RNDeviceInfo_powerStateDidChange event argument type error (@mikehardy)

## 5.5.0

- feat: add getInstallerPackageName for android (#912) (thanks @codecog!)
- fix: switch to InstallReferrer API (#947) (thanks @skantus!)

## 5.4.4

- feat: add Huawei P Smart devices to notch list (#945) (thanks @sanborN!)

## 5.4.3

- fix: only reject once from DeviceCheck APIs (fixes Simulator crash) (@mikehardy)

## 5.4.2

- fix: remove yarn as a requirement (#943) (thanks @gie3d!)
- chore: update dependencies (@mikehardy)

## 5.4.1

- fix: Fix getDeviceToken crash on IOS simulator (#929) (thanks @Taym95!)

## 5.4.0

- feat + fix: tabbed example, improved types, efficient Platform usage (thanks @zoontek!)
- feat: Added getDeviceToken() using DeviceCheck API on iOS 11.0+ (thanks @AntoineDoubovetzky!)
- fix: hasNotch correctly matches Xiaomi Mi 9 (thanks @BogdanTaranenko!)
- docs: fix upgrade links in README TOC (thanks @Simek!)
- docs: fix type in README useIsEmulator example (thanks @zusinShinpei!)

## 5.3.1

- types: fix Flow types (thanks @grit96!)

## 5.3.0

- feat: Added web support for isCameraPresent, isLocationEnabled, isAirplaneMode, getBaseOs, getFreeDiskStorage, getMaxMemory, getTotalDiskCapacity, getTotalMemory, getUsedMemory and battery/charging-related APIs. (thanks @robertherber!)

## 5.2.0

- feat: isHeadphonesConnected() / isHeadphonesConnectedSync() (thanks @chakrihacker!)

## 5.1.0

This release allows you to use the firebase iid library for unique ids - it's the backwards-compatible but future direction of unique ids on Android, you should move to it by using firebaseIidVersion in your android/build.gradle file ext{} block to specify the library version

- feat: android native interoperability - determine isTablet from android native (thanks @andresesfm!)
- feat: android unique ID forward-ported to firebase, w/great backwards-compatibility (thanks @andresesfm and Andres Aguilar!)

## 5.0.1

- re-package of 5.0.0 without change except delete accidental inclusion of example/android/app/build

## 5.0.0

- BREAKING: (from 4.0.2-rc.1) getDeviceType is constant now - no need for getDeviceTypeSync
  This is a tiny breaking change, easy to adopt:
  1. getDeviceTypeSync --> getDeviceType
  1. `getDeviceType.then(type => {});` --> `let type = getDeviceType();`
- feat: Hooks! Add `useBatteryLevel()`, `useBatteryLevelIsLow()`, `usePowerState` methods (thanks @magrinj!)
- fix: iOS use CFBundleName if CFBundleDisplayName null (Fixes #846, thanks @rizwankce!)
- chore: add support for 2019 iPads models in 'model' mapping (thanks Edward Wong!)
- chore: add support for motorola one vision in hasNotch (thanks @euharrison!)
- docs(README): Fixed link in TOC (thanks @martinvol!)
- docs(README): Fixed example code hasNotch() - constant, no Promise (thanks @cereme!)
- docs(README): Fixed example code getDeviceId() - constant, no Promise (thanks @adambutler!)
- docs(README): Fixed getReadableVersion() sub-API references (thanks @djorkaeffalexandre!)
- chore: yarn upgrade --latest to update dependencies (@mikehardy)

## 4.0.2-rc.1

- BREAKING: getDeviceType converted to a constant (minor breaking change, but will release as 5.0.0 just in case)

## 4.0.1

- released from 4.0.1-rc.1 without change

## 4.0.1-rc.1

- docs(README): link to v3->v4 migraiton guide
- docs(CHANGELOG): entries for rest of 4.0.1-beta series

## 4.0.1-beta.8

- fix: iOS getBundleId incorrectly returning buildId vs bundleId
- fix: hasNotch correctly matches Nokia 6.1 Plus

## 4.0.1-beta.7

- fix: iOS isTablet was always returning false
- fix: hasSystemFeatureSync incorrectly returned Promise

## 4.0.1-beta.6

- fix: hasSystemFeatureSync incorrectly returning a Promise on iOS @mikehardy
- fix: isTablet on iOS always returning false @mikehardy

## 4.0.1-beta.5

- fix: iOS getModel always returned generics @mikehardy

## 4.0.1-beta.4

- BREAKING CHANGE: rename getCameraPresence to isCameraPresent to match other booleans (#810) @mikehardy

## 4.0.1-beta.3

- fix: support Wifi IP address on Apple TV (https://github.com/react-native-community/react-native-device-info/pull/825) @gcesarmza

## 4.0.1-beta.2

- fix: android use googlePlayServicesIidVersion if available (https://github.com/react-native-community/react-native-device-info/pull/804 / Fixes #802) @mikehardy

## 4.0.1-beta.1

- BREAKING CHANGE: DeviceType: Renamed `Unknown` to `unknown` for consistency across the project (@johan-dutoit)
- fix: typescript conversion mopup (@johan-dutoit)

## 4.0.0 (released / revoked on npm)

This was almost working but had some issues so was revoked on npmjs.com

- Conversion to typescript (https://github.com/react-native-community/react-native-device-info/pull/799) thanks @johan-dutoit!

## 3.1.4

- fix: chain getReadableVersion APIs to JS vs native, protects web from native calls (Fixes #796)

## 3.1.3

- chore: add support for 2019 iPhone models in 'hasNotch' mapping

## 3.1.2

- fix: fix iOS crash in getModel for unknown modules (https://github.com/react-native-community/react-native-device-info/pull/791) thanks @rbscott!

The above PR also included a refresh/update of the iOS model list and improved getModel caching - a thorough job

## 3.1.1

- fix: fix react-native-windows v2->v3 migration (https://github.com/react-native-community/react-native-device-info/pull/787) thanks @acoates-ms!

## 3.1.0

- feat: add power functionality in Android to match iOS (https://github.com/react-native-community/react-native-device-info/pull/775) thanks @Johan-dutoit!

## 3.0.0

- release: promoted release from 3.0.0-rc.5 without change

## 3.0.0-rc.5

- fix: various fixes similar to / prompted by #771 / #768 / #769
- fix: getSystemName() returns value on ios+android [#771](https://github.com/react-native-community/react-native-device-info/issues/771) thanks @cmpayc!
- fix: getUniqueId() only returned value 1st call [#768](https://github.com/react-native-community/react-native-device-info/issues/768) thanks @tamhv!
- fix: getModel() not working on iOS [#769](https://github.com/react-native-community/react-native-device-info/pull/769) Thanks @rnnyrk!

## 3.0.0-rc.4

- feat: memoize static return values for performance

## 3.0.0-rc.3

- fix: TypeScript getPowerState() return type was Object instaed of PowerState interface
- fix: TypeScript definition file was missing getPhoneNumberSync()

## 3.0.0-rc.2

- Added a sync version of each API call, in practice it is very difficult to consume async
  APIs during app bootstrap and device info is frequently fundamental to app startup behavior.
  This still preserves the change away from paying the entire cost of information retrieval at
  startup - now you will only pay for exactly what you need.

## 3.0.0-rc.1

- fix incorrect use of macos for API selection vs ios in rc.3, rendering ios builds mostly useless
- verified last of the v2->v3 discrepancies, this is a release candidate now

## 3.0.0-beta.3

- fix some real android device v2->v3 discrepancies
- BREAKING CHANGE: more capitalization changes for API calls to standardize (see below)
- BREAKING CHANGE: more return value changes to standardize return values (see below)
- feat: you no longer have to be careful with platform-specific APIs, all APIs will work, just
  returning standard "unknown" return values (see above breaking change, and example App.js usage)

## 3.0.0-beta.2

- fix all emulator/simulator v2->v3 discrepancies

## 3.0.0-beta.1

Each BREAKING CHANGE contains the required information to migrate. The example App.js shows sample usage.

- BREAKING CHANGE: Every API call returns a Promise now (and thus no more Android constructor with async boolean argument)
  - This was required to improve module load speed, handle dynamic values, and release the main queue for iOS
- BREAKING CHANGE: Every API call with acronyms ('getIP', 'getABI' etc follows pure camel-case now, e.g. 'getIp', 'getAbi')
  - This naming style is a consensus standard. Previously APIs here were half one way half the other. Now they are consistent
  - isAirPlaneMode -> isAirplaneMode
  - getIPAddress -> getIpAddress
  - getMACAddress -> getMACAddress
  - getAPILevel -> getApiLevel
  - getBaseOS -> getBaseOs
  - getInstanceID -> getInstanceId
  - getUniqueID -> getUniqueId
  - supportedABIs -> supportedAbis
- BREAKING CHANGE: all events prefixed with 'RNDeviceInfo\_' (https://github.com/react-native-community/react-native-device-info/issues/620)
  - This is required as event names are a global namespace and collisions are inevitable otherwise
  - powerStateDidChange -> RNDeviceInfo_powerStateDidChange
  - batteryLevelDidChange -> RNDeviceInfo_batteryLevelDidChange
  - batteryLevelIsLow -> RNDeviceInfo_batteryLevelIsLow
- BREAKING CHANGE: Android `getBuildNumber` returns string like iOS (https://github.com/react-native-community/react-native-device-info/pull/648)
- BREAKING CHANGE: remove is24Hour, getTimezone, isAutoTimeZone and isAutoDateAndTime, getDeviceLocale, getDeviceCountry, getPreferredLocales
  - This was the result of a survey. It removes API duplication in the react-native-community modules
  - Related PR: https://github.com/react-native-community/react-native-localize/pull/65
  - Use `yarn add https://github.com/mikehardy/react-native-localize.git#e062f0d2dc3171dc18fdb7b7139d347ad03933dc` to maintain isAutoTimeZone + isAutoDateAndTime until merged
- BREAKING CHANGE: iOS switch deprecated WebView for WebKit / getUserAgent returns Promise (https://github.com/react-native-community/react-native-device-info/pull/757)
  - The change from WebView to WebKit was required as the API is being removed from the iOS platform
- BREAKING CHANGE: if an API is platform-specific, all non-implementing platforms will return standard values of -1, false, or 'unknown' depending on return type
  - This was how most APIs behaved before but it was not 100% - some returned null or empty string before
  - getPhoneNumber sometimes returned null, now it will be 'unknown' if not known
- deprecated: IP-address-related methods deprecated - use @react-native-community/netinfo or react-native-network-info or react-native-carrier-info
- feat: all APIs are now restricted in Javascirpt to the platforms they have full implementations on so the web polyfill is up to date
- feat: 'getAndroidId' on Android returns android.provider.Settings.Secure.ANDROID_ID, read platform docs for usage
- feat: `getUsedMemory` (https://github.com/rebeccahughes/react-native-device-info/pull/356)
- feat: getDeviceName() without Bluetooth permission on Android (https://github.com/react-native-community/react-native-device-info/issues/735)
- feat: TurboModule support (https://github.com/react-native-community/react-native-device-info/pull/745) for these purposes (https://github.com/react-native-community/react-native-localize/pull/65)
- feat: allow for destructured ES6 imports (https://github.com/react-native-community/react-native-device-info/pull/727)
- feat: update gradle, add react-native devDependency and build.gradle reference to enhance module developer experience
- fix: remove unnecessary gradle depencies (https://github.com/react-native-community/react-native-device-info/pull/746)
- chore: de-linted all Java code, all Markdown

## 2.3.2

- fix: load module async by default with option to load sync (https://github.com/react-native-community/react-native-device-info/pull/741)

## 2.3.1

- fix: add Huawei P30 devices to isNothc list (https://github.com/react-native-community/react-native-device-info/pull/734)

## 2.3.0

- feat: AndroidX support (backwards/forwards compatible) (https://github.com/react-native-community/react-native-device-info/pull/733)
- fix: isTablet() Android using Google-recommended / robust style (https://github.com/react-native-community/react-native-device-info/pull/730)

## 2.2.2

- fix: re-fix crash PR #714, API level should be 24 (https://github.com/react-native-community/react-native-device-info/pull/715)

## 2.2.1

- fix: crash on android api level less than 23 (https://github.com/react-native-community/react-native-device-info/pull/714)

## 2.2.0

- feat: sync some methods from flutter (https://github.com/react-native-community/react-native-device-info/pull/711)

## 2.1.4

- fix: additional checking in simulation method (https://github.com/react-native-community/react-native-device-info/pull/710)
- docs(README): Add detail to ios getUniqueID() docs (https://github.com/react-native-community/react-native-device-info/pull/707)

## 2.1.3

- fix: add missing devices to devices with notch list (https://github.com/react-native-community/react-native-device-info/pull/702)

## 2.1.2

- build(Android): constrain play services dependency to pre-AndroidX 16.1.0 (https://github.com/react-native-community/react-native-device-info/pull/693)

## 2.1.1

- fix(Android): Avoid NullpointerException on install referer listener (https://github.com/react-native-community/react-native-device-info/pull/685)

## 2.1.0

- perf(Android): getConstants() optionally loaded in thread, speedup for most, init MainApplication with RNDeviceInfo(true) (https://github.com/react-native-community/react-native-device-info/pull/680)

## 2.0.4

- fix: Add Xiaomi Redmi Note 7 to devicesWithNotch list (https://github.com/react-native-community/react-native-device-info/pull/682)

## 2.0.3

- fix: adding conditions for tvOS location providers (https://github.com/react-native-community/react-native-device-info/pull/678)
- docs: refresh example app and fix it so it works with tvOS
- docs: alter API Chart in README.md - isAutoDateAndTime and isAutoTimeZone return Promise (https://github.com/react-native-community/react-native-device-info/pull/677)

## 2.0.2

- fix: checking for tvOS before attempting to get `isBatteryMonitoringEnabled` flag as tvOS doesn't support it (https://github.com/react-native-community/react-native-device-info/pull/673)
- types: make the typescript location / power returns specific (https://github.com/react-native-community/react-native-device-info/pull/669)
- chore: move ios device model dictionary from native to javascript (https://github.com/react-native-community/react-native-device-info/pull/670)

## 2.0.1

- fix: `getFreeDiskStorage()` to use `StatFs` methods that return `long` instead of `int` (which are now deprecated)
  (https://github.com/react-native-community/react-native-device-info/pull/672)

## 2.0.0

- breaking: no functional change from 1.8.0, but isLocationEnabled requires minCompileSdk 28

## 1.8.0 (unpublished: unintended breaking change)

- feat: Add `isLocationEnabled()`, `getAvailableLocationProviders()` methods (https://github.com/react-native-community/react-native-device-info/pull/664)

## 1.7.0

- feat: Add `getCameraPresence()` method (https://github.com/react-native-community/react-native-device-info/pull/474)

## 1.6.2

- fix: added v to tag name in podspec (https://github.com/react-native-community/react-native-device-info/pull/660)
- docs: Update README.md to have correct Podspec name (https://github.com/react-native-community/react-native-device-info/pull/656)

## 1.6.1

- fix: fix building issue on tvOS / headers on iOS (https://github.com/react-native-community/react-native-device-info/pull/652)
- chore: fix pointer types in iOS build (https://github.com/react-native-community/react-native-device-info/pull/649)

## 1.6.0

- feat: implement hasSystemFeature() method for Android devices (https://github.com/react-native-community/react-native-device-info/pull/646)

## 1.5.1

- chore: Update deviceinfo.js entry for xioami mi 8 lite (https://github.com/react-native-community/react-native-device-info/pull/644)

## 1.5.0

- feat: Add `getBuildId` method to gets build number of the operating system. (https://github.com/react-native-community/react-native-device-info/pull/640)

## 1.4.3

- chore: Add Xiaomi Mi A2 Lite to devices with notch (https://github.com/react-native-community/react-native-device-info/pull/634)
- feat: Throw error if native module is null w/steps to help fix (https://github.com/react-native-community/react-native-device-info/pull/630)

## 1.4.2

- fix: Use `RCTSharedApplication` so compile works for ios app extensions (https://github.com/react-native-community/react-native-device-info/pull/408)
- chore: Add 3rd generation iPad pro to device/model list (https://github.com/react-native-community/react-native-device-info/pull/618)
- feat: Support `getUserAgent()` on old androids (API level <= 16) (https://github.com/react-native-community/react-native-device-info/pull/545)
- chore: Add Huweai INE-LX1 to devices with notch (https://github.com/react-native-community/react-native-device-info/pull/624)

### iOS notice

This is existing policy but is worth mentioning: The list with device names (returned by `getModel()`) is maintained by the community and could lag new devices. It is recommended to use `getDeviceId()` since it's more reliable and always up-to-date with new iOS devices. We do accept pull requests that add new iOS devices to the list with device names

## 1.4.1

- fix: repair flow types from #436 - 'Object' vs 'object'

## 1.4.0

- feat: add battery monitoring and detailed power state getter (https://github.com/react-native-community/react-native-device-info/pull/436)

## 1.3.0

- feat: Add support for preferred languages function (https://github.com/react-native-community/react-native-device-info/pull/610)

## 1.2.0

- feat: Support 'dom' Platform.OS for react-native-dom (https://github.com/react-native-community/react-native-device-info/pull/406)
- feat: Add support for jest snapshot testing (https://github.com/react-native-community/react-native-device-info/pull/375)
- fix: Use API-specific permissions to get phone number (https://github.com/react-native-community/react-native-device-info/pull/269)
- fix: Add OnePlus A6010 to devicesWithNothc list (https://github.com/react-native-community/react-native-device-info/pull/604)
- fix: use reactContext vs getApplicationContext() (https://github.com/react-native-community/react-native-device-info/pull/382)
- fix: dynamic reference path on windows depending on environment (https://github.com/react-native-community/react-native-device-info/pull/608)

## 1.1.0

- Add `supportedABIs()` (https://github.com/react-native-community/react-native-device-info/pull/598)

## 1.0.1

- fix: Add Nokia 7.1 to devicesWithNotch list (https://github.com/react-native-community/react-native-device-info/pull/597)

## 1.0.0

- First major version, features (and bugs) copied from 0.29.1

## 0.29.1

- Fix lint errors (library dependences, ignore permissions) (https://github.com/react-native-community/react-native-device-info/pull/590)

> On March 12 2019, this repository was moved from https://github.com/rebeccahughes/react-native-device-info
> to https://github.com/react-native-community/react-native-device-info

## 0.29.0

- Add `isAutoDateAndTime()` and `isAutoTimeZone()` (https://github.com/react-native-community/react-native-device-info/pull/583)

## 0.28.1

- Add 'POCOPHONE F1' to list of notch devices (https://github.com/react-native-community/react-native-device-info/pull/584)

## 0.28.0

- Updated Android SDK to version 28 (https://github.com/react-native-community/react-native-device-info/pull/548)

## 0.27.1

- Enabled battery monitoring mode to get actual battery data (https://github.com/react-native-community/react-native-device-info/pull/404)

## 0.27.0

- Added `isBatteryCharging()` (https://github.com/react-native-community/react-native-device-info/pull/514)

## 0.26.5

- Use BigInteger to avoid overflow in Disk related functions (https://github.com/react-native-community/react-native-device-info/pull/587)

## 0.26.4

- Fix hasNotch() support for LG phones (https://github.com/react-native-community/react-native-device-info/pull/573)

## 0.26.3

- Fixed getDeviceType method (https://github.com/react-native-community/react-native-device-info/pull/571)

## 0.26.2

- Added Huawei P20 Lite to notch devices (https://github.com/react-native-community/react-native-device-info/pull/568)

## 0.26.1

- Added OnePlus 6T to notch devices (https://github.com/react-native-community/react-native-device-info/pull/563)

## 0.26.0

- Added `getDeviceType()` and used it in `isTablet()` (https://github.com/react-native-community/react-native-device-info/pull/560)

## 0.25.1

- Added Google Pixel 3XL to notch devices (https://github.com/react-native-community/react-native-device-info/pull/535)

## 0.25.0

- Added `isAirPlaneMode()` (https://github.com/react-native-community/react-native-device-info/pull/524)
- Compare `hasNotch()` devices with lowercase (https://github.com/react-native-community/react-native-device-info/pull/537)
- Added several devices to `hasNotch()` (#533, #549, #550)

## 0.24.3

- Support React Native Windows 0.57, minimal version is now 10.0.14393 for the target platform

## 0.24.2

- Update typescript definitions (https://github.com/react-native-community/react-native-device-info/pull/498)

## 0.24.1

- Update build.gradle to remove compile warning (https://github.com/react-native-community/react-native-device-info/pull/520)

## 0.24.0

- Added `isLandscape()` (https://github.com/react-native-community/react-native-device-info/pull/504)

## 0.23.0

- Add `hasNotch()` (https://github.com/react-native-community/react-native-device-info/pull/500)

## 0.22.6

- Support new models (XR, XS, XS Max) and iPad 6th Gen (https://github.com/react-native-community/react-native-device-info/pull/499)

## 0.22.5

- Fix typescript declaration export (https://github.com/react-native-community/react-native-device-info/pull/478)

## 0.22.4

- Shrank the npm package size (https://github.com/react-native-community/react-native-device-info/issues/477)

## 0.22.3

- Fixed `eslint-plugin-import` error (https://github.com/react-native-community/react-native-device-info/pull/466)

## 0.22.2

- Fixed Android build error introduced in 0.22.1 (https://github.com/react-native-community/react-native-device-info/pull/460)

## 0.22.1

- Fix deprecated code on Android in the following methods (https://github.com/react-native-community/react-native-device-info/pull/426)
- getDeviceCountry
- getDeviceLocale

## 0.22.0

- Add support for `getIpAddress` and `getMacAddress` on iOS (https://github.com/react-native-community/react-native-device-info/commit/41735bd0b2efe1f626afc066604f27073acb9d4c)

## 0.21.5

- Rolled back the Pod change made in 0.21.1

## 0.21.4

- Move back the podspec file to the root directory (https://github.com/react-native-community/react-native-device-info/pull/376)

## 0.21.3

- Moved the IOS code to an ios/ directory (https://github.com/react-native-community/react-native-device-info/pull/374)

## 0.21.2

- Fix getBatteryLevel() for tvOS (always return 1) (https://github.com/react-native-community/react-native-device-info/pull/363)

## 0.21.1

- Remove deprecated React pod dependency (https://github.com/react-native-community/react-native-device-info/pull/361)

## 0.21.0

- Add more gradle configuration properties `compileSdkVersion`, `buildToolsVersion`, `targetSdkVersion` (https://github.com/react-native-community/react-native-device-info/pull/343)

## 0.20.0

- Made the following methods compatible with UWP: (https://github.com/react-native-community/react-native-device-info/pull/345)
  - `getBatteryLevel()`
  - `getFirstIntallTime()`
  - `getIPAddress()`
  - `getMaxMemory()`
  - `isPinOrFingerprintSet()`

## 0.19.0

- Add `getInstallReferrer` (https://github.com/react-native-community/react-native-device-info/pull/344)

## 0.18.0

- Add `getBatteryLevel` (https://github.com/react-native-community/react-native-device-info/pull/359)

## 0.17.4

- Fix `getMACAddress` for Android > 6 (https://github.com/react-native-community/react-native-device-info/pull/349)

## 0.17.3

- Fix production build crash on Android introduced in #313

## 0.17.2

- Enhance `isTablet()` for android by checking display density (https://github.com/react-native-community/react-native-device-info/pull/313)
- Changed iOS target deployment from 9.0 to 8.0 for broader device support (https://github.com/react-native-community/react-native-device-info/issues/19)

## 0.17.1

- Fix bad import for web polyfill

## 0.17.0

- Add an empty polyfill for `react-native-web` users (https://github.com/react-native-community/react-native-device-info/pull/339)

## 0.16.0

- Add the `googlePlayServicesVersion` Gradle build config that allows you to set the Play Services version from the root-project (https://github.com/react-native-community/react-native-device-info/pull/333)

## 0.15.3

- Fix crash on iOS: prevent insertion of nil values in the dictionary (https://github.com/react-native-community/react-native-device-info/pull/328)

## 0.15.2

- Fix crash on `getFreeDiskStorage` and `getTotalDiskCapacity` from invalid filesystem path (https://github.com/react-native-community/react-native-device-info/issues/320)

## 0.15.1

- Fix Android compatibility for `getFreeDiskStorage` and `getTotalDiskCapacity` (https://github.com/react-native-community/react-native-device-info/pull/319)

## 0.15.0

- Add `getFontScale` (https://github.com/react-native-community/react-native-device-info/pull/278)
- Add `getFreeDiskStorage` and `getTotalDiskCapacity` (https://github.com/react-native-community/react-native-device-info/pull/302)
- Fix missing flow definition for `getApplicationName`

## 0.14.0

- Fix tvOS support (https://github.com/react-native-community/react-native-device-info/pull/283)
- Introduced `getApplicationName` to see the name of the app both on ios, android and win
  - https://github.com/react-native-community/react-native-device-info/pull/210
  - https://github.com/react-native-community/react-native-device-info/pull/295
- Added `getTotalMemory` and `getMaxMemory` (https://github.com/react-native-community/react-native-device-info/pull/289)
- Fix iOS undefined native module error (https://github.com/react-native-community/react-native-device-info/pull/276)
- Fix crash on `getUserAgent` when Webview is not installed (https://github.com/react-native-community/react-native-device-info/pull/273)

## 0.13.0

- Add `getCarrier` (https://github.com/react-native-community/react-native-device-info/pull/261)
- Disable `isPinOrFingerprintSet` for tvOS (https://github.com/react-native-community/react-native-device-info/pull/270)
- Add `is24Hour` (https://github.com/react-native-community/react-native-device-info/pull/265)
- Remove unused windows dependency (https://github.com/react-native-community/react-native-device-info/pull/263)
- Add missing typescript definitions (https://github.com/react-native-community/react-native-device-info/pull/254)
- Make play-services optional (https://github.com/react-native-community/react-native-device-info/pull/226)

## 0.12.1

- Critical fix on WIFI STATE (https://github.com/react-native-community/react-native-device-info/pull/249)

## 0.12.0

- Get real WebView UserAgent on Android (https://github.com/react-native-community/react-native-device-info/pull/207)
- Add DeviceUID.h to public headers (https://github.com/react-native-community/react-native-device-info/pull/217)
- Add `getPhoneNumber` (https://github.com/react-native-community/react-native-device-info/pull/174)
- Fix typescript definitions (https://github.com/react-native-community/react-native-device-info/pull/221)
- Add `getFirstInstallTime` and `getLastUpdateTime` (https://github.com/react-native-community/react-native-device-info/pull/222)
- Added version check and permission to work with Android API >= 16 (https://github.com/react-native-community/react-native-device-info/pull/225)
- Added device detection even when in an iOS emulator (https://github.com/react-native-community/react-native-device-info/pull/224)
- Add support for new iPhone, iPad, and Apple TV models (https://github.com/react-native-community/react-native-device-info/pull/230)
- Add android only `getAPILevel` method (https://github.com/react-native-community/react-native-device-info/pull/232)
- Add Android support for serial number, IP, and MAC address (https://github.com/react-native-community/react-native-device-info/pull/150)
- Add tvOS support (https://github.com/react-native-community/react-native-device-info/pull/235)
- Add flow types
- Fix getCurrentActivity() null crash in Android (https://github.com/react-native-community/react-native-device-info/pull/247)

[Diff](https://github.com/react-native-community/react-native-device-info/compare/1aafc6f0b20d7cd6f0939ea5370e9899e4914c93...master)

## 0.11.0

- Add support for RN > 0.47
- Update typescript definitions

[Diff](https://github.com/react-native-community/react-native-device-info/compare/5b869cdd5e16b65cbe4e85a565aa331bd7546b89...1aafc6f0b20d7cd6f0939ea5370e9899e4914c93)

## 0.10.2

- Add typescript definitions

[Diff](https://github.com/react-native-community/react-native-device-info/compare/f3967862711892615e7f51d49d0034ee134f3e3d...5b869cdd5e16b65cbe4e85a565aa331bd7546b89)

## 0.10.1

- Add `isPinOrFingerprintSet` method
- Add support for RN > 0.40

[Diff](https://github.com/react-native-community/react-native-device-info/compare/c843144ea872a79f4d53a53b32f72511fbfc8d8b...f3967862711892615e7f51d49d0034ee134f3e3d)

## 0.10.0

- Semver fix

[Diff](https://github.com/react-native-community/react-native-device-info/compare/e8bfe5ea8d5f5414f2f97f35a5d02b611cbe39e3...c843144ea872a79f4d53a53b32f72511fbfc8d8b)

## 0.9.8

[Diff](https://github.com/react-native-community/react-native-device-info/compare/668996c64e23f477fc8156cdc43a49198b4fdd20...e8bfe5ea8d5f5414f2f97f35a5d02b611cbe39e3)

## 0.9.7

Several bugfixes and detecting if device is a tablet

## 0.9.3

adds support for Brand information e.g. apple, htc, etc

## 0.9.1

adds support for the iPhone SE and new iPad Pro

## 0.9.0

adds support for device country and changes the iOS device name to match Apple branding

## 0.8.4

don't use destructuring

## 0.8.3

removes the default bluetooth permission

## 0.8.2

change deployment target to iOS 8

## 0.8.1

removes unnecessary peerDependencies

## 0.8.0

tweaks how device locale works on Android. If it's available it will use the toLanguageTag that is more inline with iOS. (See #14)

## 0.7.0

adds two new parameters, Device Locale and User Agent.

## 0.5.0

adds a new parameter; Device Id. On iOS this is the hardware string for the current device (e.g. "iPhone7,2"). On Android we use the BOARD field which is the name of the underlying board, e.g. "goldfish". The way that the module gets the device model on iOS has also changed to be based on the Device Id; now instead of getting a generic product family e.g. "iPhone", it will return the specific model e.g. "iPhone 6".
