#pragma once

#include "pch.h"
#include "resource.h"

#if __has_include("codegen/NativeRNDeviceInfoDataTypes.g.h")
#include "codegen/NativeRNDeviceInfoDataTypes.g.h"
#endif
#include "codegen/NativeRNDeviceInfoSpec.g.h"

#include "NativeModules.h"

namespace winrt::RNDeviceInfo {

	REACT_MODULE(RNDeviceInfo)
		struct RNDeviceInfo {
		using ModuleSpec = RNDeviceInfoCodegen::RNDeviceInfoSpec;

		REACT_INIT(Initialize)
			void Initialize(React::ReactContext const& reactContext) noexcept;

		// === Synchronous Methods ===
		REACT_SYNC_METHOD(getApplicationName)
			std::string getApplicationName() noexcept;

		REACT_SYNC_METHOD(getBrand)
			std::string getBrand() noexcept;

		REACT_SYNC_METHOD(getBuildNumber)
			std::string getBuildNumber() noexcept;

		REACT_SYNC_METHOD(getBundleId)
			std::string getBundleId() noexcept;

		REACT_SYNC_METHOD(getDeviceId)
			std::string getDeviceId() noexcept;

		REACT_SYNC_METHOD(getModel)
			std::string getModel() noexcept;

		REACT_SYNC_METHOD(getReadableVersion)
			std::string getReadableVersion() noexcept;

		REACT_SYNC_METHOD(getSystemName)
			std::string getSystemName() noexcept;

		REACT_SYNC_METHOD(getSystemVersion)
			std::string getSystemVersion() noexcept;

		REACT_SYNC_METHOD(getVersion)
			std::string getVersion() noexcept;

		REACT_SYNC_METHOD(hasNotch)
			bool hasNotch() noexcept;

		REACT_SYNC_METHOD(hasDynamicIsland)
			bool hasDynamicIsland() noexcept;

		REACT_SYNC_METHOD(isTablet)
			bool isTablet() noexcept;

		// === Async Methods ===
		REACT_METHOD(getBaseOs)
			void getBaseOs(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getBuildId)
			void getBuildId(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getBatteryLevel)
			void getBatteryLevel(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(isCameraPresent)
			void isCameraPresent(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(getDeviceName)
			void getDeviceName(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getFirstInstallTime)
			void getFirstInstallTime(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(getFontScale)
			void getFontScale(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(getFreeDiskStorage)
			void getFreeDiskStorage(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(getFreeDiskStorageOld)
			void getFreeDiskStorageOld(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(getHost)
			void getHost(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getHostNames)
			void getHostNames(React::ReactPromise<std::vector<std::string>>&& promise) noexcept;

		REACT_METHOD(getIpAddress)
			void getIpAddress(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getInstallerPackageName)
			void getInstallerPackageName(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getInstallReferrer)
			void getInstallReferrer(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getManufacturer)
			void getManufacturer(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getMaxMemory)
			void getMaxMemory(React::ReactPromise<double>&& promise) noexcept;

		// FIXED: Changed from React::JSValue to void as per spec
		/*REACT_METHOD(getPowerState)
			void getPowerState(React::ReactPromise<void>&& promise) noexcept;*/

		REACT_METHOD(getSerialNumber)
			void getSerialNumber(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getTotalDiskCapacity)
			void getTotalDiskCapacity(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(getTotalDiskCapacityOld)
			void getTotalDiskCapacityOld(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(getUniqueId)
			void getUniqueId(React::ReactPromise<std::string>&& promise) noexcept;

		REACT_METHOD(getUsedMemory)
			void getUsedMemory(React::ReactPromise<double>&& promise) noexcept;

		REACT_METHOD(isBatteryCharging)
			void isBatteryCharging(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(isEmulator)
			void isEmulator(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(isKeyboardConnected)
			void isKeyboardConnected(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(isLandscape)
			void isLandscape(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(isMouseConnected)
			void isMouseConnected(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(isPinOrFingerprintSet)
			void isPinOrFingerprintSet(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(isTabletMode)
			void isTabletMode(React::ReactPromise<bool>&& promise) noexcept;

		REACT_METHOD(supportedAbis)
			void supportedAbis(React::ReactPromise<std::vector<std::string>>&& promise) noexcept;

		private:
			React::ReactContext m_context;
	};

} // namespace winrt::RNDeviceInfo