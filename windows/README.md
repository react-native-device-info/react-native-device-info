# react-native-device-info Windows Implementation

## Module Installation
You can either use autolinking on react-native-windows 0.63 and later or manually link the module on earlier realeases.

### Automatic install with autolinking on RNW >= 0.63
react-native-device-info supports autolinking. Just call: `npm i react-native-device-info --save`

### Manual installation on RNW >= 0.62
1. `npm install react-native-device-info --save`
2. Open your solution in Visual Studio 2019 (eg. `windows\yourapp.sln`)
3. Right-click Solution icon in Solution Explorer > Add > Existing Project...
4. Add `node_modules\react-native-device-info\windows\RNDeviceInfoCPP\RNDeviceInfoCPP.vcxproj`
5. Right-click main application project > Add > Reference...
6. Select `RNDeviceInfoCPP` in Solution Projects
7. In app `pch.h` add `#include "winrt/RNDeviceInfoCPP.h"`
8. In `App.cpp` add `PackageProviders().Append(winrt::RNDeviceInfoCPP::ReactPackageProvider());` before `InitializeComponent();`

### Manual installation on RNW 0.61
Do the same steps as for 0.62, but use `node_modules\RNDeviceInfoCPP\windows\RNDeviceInfoCPP61\RNDeviceInfoCPP.vcxproj` in step 4.

## Module development

If you want to contribute to this module Windows implementation, first you must install the [Windows Development Dependencies](https://aka.ms/rnw-deps).

You must temporarily install the `react-native-windows` package. Versions of `react-native-windows` and `react-native` must match, e.g. if the module uses `react-native@0.62`, install `npm i react-native-windows@^0.62 --dev`.

Now, you will be able to open corresponding `RNDeviceInfoCPP...sln` file, e.g. `RNDeviceInfoCPP62.sln` for `react-native-windows@0.62`.
