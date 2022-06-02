# react-native-device-info Windows Implementation

## Minimum supported versions

- react-native-windows 0.63 or newer
- MSVC build tools v142 (included in Visual Studio 2019) or newer
- x86, x64, or arm64 are supported, arm (32-bit) is not supported

## Automatic install with autolinking

react-native-device-info supports autolinking. Just call: `npm i react-native-device-info --save`

## Module development

If you want to contribute to this module Windows implementation, first you must install the [Windows Development Dependencies](https://aka.ms/rnw-deps).

You must temporarily install the `react-native-windows` package. Versions of `react-native-windows` and `react-native` must match, e.g. if the module uses `react-native@0.62`, install `npm i react-native-windows@^0.62 --dev`.

Now, you will be able to open corresponding `RNDeviceInfoCPP...sln` file, e.g. `RNDeviceInfoCPP62.sln` for `react-native-windows@0.62`.
