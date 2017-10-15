## Release Notes

### Upcoming

### 0.12.0

- Get real WebView UserAgent on Android (https://github.com/rebeccahughes/react-native-device-info/pull/207)
- Add DeviceUID.h to public headers (https://github.com/rebeccahughes/react-native-device-info/pull/217)
- Add `getPhoneNumber` (https://github.com/rebeccahughes/react-native-device-info/pull/174)
- Fix typescript definitions (https://github.com/rebeccahughes/react-native-device-info/pull/221)
- Add `getFirstInstallTime` and `getLastInstallTime` (https://github.com/rebeccahughes/react-native-device-info/pull/222)
- Added version check and permission to work with Android API >= 16 (https://github.com/rebeccahughes/react-native-device-info/pull/225)
- Added device detection even when in an iOS emulator (https://github.com/rebeccahughes/react-native-device-info/pull/224)
- Add support for new iPhone, iPad, and Apple TV models (https://github.com/rebeccahughes/react-native-device-info/pull/230)
- Add android only `getAPILevel` method (https://github.com/rebeccahughes/react-native-device-info/pull/232)
- Add Android support for serial number, IP, and MAC address (https://github.com/rebeccahughes/react-native-device-info/pull/150)
- Add tvOS support (https://github.com/rebeccahughes/react-native-device-info/pull/235)
- Add flow types
- Fix getCurrentActivity() null crash in Android (https://github.com/rebeccahughes/react-native-device-info/pull/247)

[Diff](https://github.com/rebeccahughes/react-native-device-info/compare/1aafc6f0b20d7cd6f0939ea5370e9899e4914c93...master)

### 0.11.0

- Add support for RN > 0.47
- Update typescript definitions

[Diff](https://github.com/rebeccahughes/react-native-device-info/compare/5b869cdd5e16b65cbe4e85a565aa331bd7546b89...1aafc6f0b20d7cd6f0939ea5370e9899e4914c93)

### 0.10.2

- Add typescript definitions

[Diff](https://github.com/rebeccahughes/react-native-device-info/compare/f3967862711892615e7f51d49d0034ee134f3e3d...5b869cdd5e16b65cbe4e85a565aa331bd7546b89)

### 0.10.1

- Add `isPinOrFingerprintSet` method
- Add support for RN > 0.40

[Diff](https://github.com/rebeccahughes/react-native-device-info/compare/c843144ea872a79f4d53a53b32f72511fbfc8d8b...f3967862711892615e7f51d49d0034ee134f3e3d)

### 0.10.0

- Semver fix

[Diff](https://github.com/rebeccahughes/react-native-device-info/compare/e8bfe5ea8d5f5414f2f97f35a5d02b611cbe39e3...c843144ea872a79f4d53a53b32f72511fbfc8d8b)

### 0.9.8

[Diff](https://github.com/rebeccahughes/react-native-device-info/compare/668996c64e23f477fc8156cdc43a49198b4fdd20...e8bfe5ea8d5f5414f2f97f35a5d02b611cbe39e3)

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
