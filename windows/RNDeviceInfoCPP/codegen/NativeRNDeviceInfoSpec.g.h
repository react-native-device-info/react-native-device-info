
/*
 * This file is auto-generated from a NativeModule spec file in js.
 *
 * This is a C++ Spec class that should be used with MakeTurboModuleProvider to register native modules
 * in a way that also verifies at compile time that the native module matches the interface required
 * by the TurboModule JS spec.
 */
#pragma once
// clang-format off


#include <NativeModules.h>
#include <tuple>

namespace RNDeviceInfoCodegen {

struct RNDeviceInfoSpec : winrt::Microsoft::ReactNative::TurboModuleSpec {
  static constexpr auto methods = std::tuple{
      SyncMethod<std::string() noexcept>{0, L"getApplicationName"},
      Method<void(Promise<std::string>) noexcept>{1, L"getBaseOs"},
      Method<void(Promise<std::string>) noexcept>{2, L"getBuildId"},
      Method<void(Promise<double>) noexcept>{3, L"getBatteryLevel"},
      SyncMethod<std::string() noexcept>{4, L"getBrand"},
      SyncMethod<std::string() noexcept>{5, L"getBuildNumber"},
      SyncMethod<std::string() noexcept>{6, L"getBundleId"},
      Method<void(Promise<bool>) noexcept>{7, L"isCameraPresent"},
      SyncMethod<std::string() noexcept>{8, L"getDeviceId"},
      Method<void(Promise<std::string>) noexcept>{9, L"getDeviceName"},
      Method<void(Promise<double>) noexcept>{10, L"getFirstInstallTime"},
      Method<void(Promise<double>) noexcept>{11, L"getFontScale"},
      Method<void(Promise<double>) noexcept>{12, L"getFreeDiskStorage"},
      Method<void(Promise<double>) noexcept>{13, L"getFreeDiskStorageOld"},
      Method<void(Promise<std::string>) noexcept>{14, L"getHost"},
      Method<void(Promise<std::vector<std::string>>) noexcept>{15, L"getHostNames"},
      Method<void(Promise<std::string>) noexcept>{16, L"getIpAddress"},
      Method<void(Promise<std::string>) noexcept>{17, L"getInstallerPackageName"},
      Method<void(Promise<std::string>) noexcept>{18, L"getInstallReferrer"},
      Method<void(Promise<std::string>) noexcept>{19, L"getManufacturer"},
      Method<void(Promise<double>) noexcept>{20, L"getMaxMemory"},
      SyncMethod<std::string() noexcept>{21, L"getModel"},
      SyncMethod<std::string() noexcept>{22, L"getReadableVersion"},
      Method<void(Promise<std::string>) noexcept>{23, L"getSerialNumber"},
      SyncMethod<std::string() noexcept>{24, L"getSystemName"},
      SyncMethod<std::string() noexcept>{25, L"getSystemVersion"},
      Method<void(Promise<double>) noexcept>{26, L"getTotalDiskCapacity"},
      Method<void(Promise<double>) noexcept>{27, L"getTotalDiskCapacityOld"},
      Method<void(Promise<std::string>) noexcept>{28, L"getUniqueId"},
      Method<void(Promise<double>) noexcept>{29, L"getUsedMemory"},
      SyncMethod<std::string() noexcept>{30, L"getVersion"},
      SyncMethod<bool() noexcept>{31, L"hasNotch"},
      SyncMethod<bool() noexcept>{32, L"hasDynamicIsland"},
      Method<void(Promise<bool>) noexcept>{33, L"isBatteryCharging"},
      Method<void(Promise<bool>) noexcept>{34, L"isEmulator"},
      Method<void(Promise<bool>) noexcept>{35, L"isKeyboardConnected"},
      Method<void(Promise<bool>) noexcept>{36, L"isLandscape"},
      Method<void(Promise<bool>) noexcept>{37, L"isMouseConnected"},
      Method<void(Promise<bool>) noexcept>{38, L"isPinOrFingerprintSet"},
      SyncMethod<bool() noexcept>{39, L"isTablet"},
      Method<void(Promise<bool>) noexcept>{40, L"isTabletMode"},
      Method<void(Promise<std::vector<std::string>>) noexcept>{41, L"supportedAbis"},
  };

  template <class TModule>
  static constexpr void ValidateModule() noexcept {
    constexpr auto methodCheckResults = CheckMethods<TModule, RNDeviceInfoSpec>();

    REACT_SHOW_METHOD_SPEC_ERRORS(
          0,
          "getApplicationName",
          "    REACT_SYNC_METHOD(getApplicationName) std::string getApplicationName() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getApplicationName) static std::string getApplicationName() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          1,
          "getBaseOs",
          "    REACT_METHOD(getBaseOs) void getBaseOs(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getBaseOs) static void getBaseOs(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          2,
          "getBuildId",
          "    REACT_METHOD(getBuildId) void getBuildId(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getBuildId) static void getBuildId(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          3,
          "getBatteryLevel",
          "    REACT_METHOD(getBatteryLevel) void getBatteryLevel(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getBatteryLevel) static void getBatteryLevel(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          4,
          "getBrand",
          "    REACT_SYNC_METHOD(getBrand) std::string getBrand() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getBrand) static std::string getBrand() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          5,
          "getBuildNumber",
          "    REACT_SYNC_METHOD(getBuildNumber) std::string getBuildNumber() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getBuildNumber) static std::string getBuildNumber() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          6,
          "getBundleId",
          "    REACT_SYNC_METHOD(getBundleId) std::string getBundleId() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getBundleId) static std::string getBundleId() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          7,
          "isCameraPresent",
          "    REACT_METHOD(isCameraPresent) void isCameraPresent(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isCameraPresent) static void isCameraPresent(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          8,
          "getDeviceId",
          "    REACT_SYNC_METHOD(getDeviceId) std::string getDeviceId() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getDeviceId) static std::string getDeviceId() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          9,
          "getDeviceName",
          "    REACT_METHOD(getDeviceName) void getDeviceName(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getDeviceName) static void getDeviceName(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          10,
          "getFirstInstallTime",
          "    REACT_METHOD(getFirstInstallTime) void getFirstInstallTime(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getFirstInstallTime) static void getFirstInstallTime(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          11,
          "getFontScale",
          "    REACT_METHOD(getFontScale) void getFontScale(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getFontScale) static void getFontScale(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          12,
          "getFreeDiskStorage",
          "    REACT_METHOD(getFreeDiskStorage) void getFreeDiskStorage(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getFreeDiskStorage) static void getFreeDiskStorage(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          13,
          "getFreeDiskStorageOld",
          "    REACT_METHOD(getFreeDiskStorageOld) void getFreeDiskStorageOld(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getFreeDiskStorageOld) static void getFreeDiskStorageOld(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          14,
          "getHost",
          "    REACT_METHOD(getHost) void getHost(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getHost) static void getHost(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          15,
          "getHostNames",
          "    REACT_METHOD(getHostNames) void getHostNames(::React::ReactPromise<std::vector<std::string>> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getHostNames) static void getHostNames(::React::ReactPromise<std::vector<std::string>> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          16,
          "getIpAddress",
          "    REACT_METHOD(getIpAddress) void getIpAddress(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getIpAddress) static void getIpAddress(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          17,
          "getInstallerPackageName",
          "    REACT_METHOD(getInstallerPackageName) void getInstallerPackageName(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getInstallerPackageName) static void getInstallerPackageName(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          18,
          "getInstallReferrer",
          "    REACT_METHOD(getInstallReferrer) void getInstallReferrer(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getInstallReferrer) static void getInstallReferrer(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          19,
          "getManufacturer",
          "    REACT_METHOD(getManufacturer) void getManufacturer(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getManufacturer) static void getManufacturer(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          20,
          "getMaxMemory",
          "    REACT_METHOD(getMaxMemory) void getMaxMemory(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getMaxMemory) static void getMaxMemory(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          21,
          "getModel",
          "    REACT_SYNC_METHOD(getModel) std::string getModel() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getModel) static std::string getModel() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          22,
          "getReadableVersion",
          "    REACT_SYNC_METHOD(getReadableVersion) std::string getReadableVersion() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getReadableVersion) static std::string getReadableVersion() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          23,
          "getSerialNumber",
          "    REACT_METHOD(getSerialNumber) void getSerialNumber(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getSerialNumber) static void getSerialNumber(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          24,
          "getSystemName",
          "    REACT_SYNC_METHOD(getSystemName) std::string getSystemName() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getSystemName) static std::string getSystemName() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          25,
          "getSystemVersion",
          "    REACT_SYNC_METHOD(getSystemVersion) std::string getSystemVersion() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getSystemVersion) static std::string getSystemVersion() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          26,
          "getTotalDiskCapacity",
          "    REACT_METHOD(getTotalDiskCapacity) void getTotalDiskCapacity(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getTotalDiskCapacity) static void getTotalDiskCapacity(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          27,
          "getTotalDiskCapacityOld",
          "    REACT_METHOD(getTotalDiskCapacityOld) void getTotalDiskCapacityOld(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getTotalDiskCapacityOld) static void getTotalDiskCapacityOld(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          28,
          "getUniqueId",
          "    REACT_METHOD(getUniqueId) void getUniqueId(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getUniqueId) static void getUniqueId(::React::ReactPromise<std::string> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          29,
          "getUsedMemory",
          "    REACT_METHOD(getUsedMemory) void getUsedMemory(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(getUsedMemory) static void getUsedMemory(::React::ReactPromise<double> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          30,
          "getVersion",
          "    REACT_SYNC_METHOD(getVersion) std::string getVersion() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(getVersion) static std::string getVersion() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          31,
          "hasNotch",
          "    REACT_SYNC_METHOD(hasNotch) bool hasNotch() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(hasNotch) static bool hasNotch() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          32,
          "hasDynamicIsland",
          "    REACT_SYNC_METHOD(hasDynamicIsland) bool hasDynamicIsland() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(hasDynamicIsland) static bool hasDynamicIsland() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          33,
          "isBatteryCharging",
          "    REACT_METHOD(isBatteryCharging) void isBatteryCharging(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isBatteryCharging) static void isBatteryCharging(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          34,
          "isEmulator",
          "    REACT_METHOD(isEmulator) void isEmulator(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isEmulator) static void isEmulator(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          35,
          "isKeyboardConnected",
          "    REACT_METHOD(isKeyboardConnected) void isKeyboardConnected(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isKeyboardConnected) static void isKeyboardConnected(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          36,
          "isLandscape",
          "    REACT_METHOD(isLandscape) void isLandscape(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isLandscape) static void isLandscape(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          37,
          "isMouseConnected",
          "    REACT_METHOD(isMouseConnected) void isMouseConnected(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isMouseConnected) static void isMouseConnected(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          38,
          "isPinOrFingerprintSet",
          "    REACT_METHOD(isPinOrFingerprintSet) void isPinOrFingerprintSet(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isPinOrFingerprintSet) static void isPinOrFingerprintSet(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          39,
          "isTablet",
          "    REACT_SYNC_METHOD(isTablet) bool isTablet() noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(isTablet) static bool isTablet() noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          40,
          "isTabletMode",
          "    REACT_METHOD(isTabletMode) void isTabletMode(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(isTabletMode) static void isTabletMode(::React::ReactPromise<bool> &&result) noexcept { /* implementation */ }\n");
    REACT_SHOW_METHOD_SPEC_ERRORS(
          41,
          "supportedAbis",
          "    REACT_METHOD(supportedAbis) void supportedAbis(::React::ReactPromise<std::vector<std::string>> &&result) noexcept { /* implementation */ }\n"
          "    REACT_METHOD(supportedAbis) static void supportedAbis(::React::ReactPromise<std::vector<std::string>> &&result) noexcept { /* implementation */ }\n");
  }
};

} // namespace RNDeviceInfoCodegen
