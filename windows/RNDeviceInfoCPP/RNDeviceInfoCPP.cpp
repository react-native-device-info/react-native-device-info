#include "pch.h"
#include "RNDeviceInfoCPP.h"
#include <windows.h>
#include <sstream>

// Link the version library for GetFileVersionInfo functions
#pragma comment(lib, "version.lib")

namespace winrt::RNDeviceInfo {

	void RNDeviceInfo::Initialize(React::ReactContext const& reactContext) noexcept {
		m_context = reactContext;
	}

	// === Synchronous Methods ===
	std::string RNDeviceInfo::getApplicationName() noexcept {
		try {
			// Get the path of the current executable
			WCHAR exePath[MAX_PATH] = {};
			DWORD pathLength = GetModuleFileNameW(NULL, exePath, MAX_PATH);

			if (pathLength == 0 || pathLength == MAX_PATH) {
				return "MyApp"; // Fallback
			}

			// Get the size of version info
			DWORD handle = 0;
			DWORD versionInfoSize = GetFileVersionInfoSizeW(exePath, &handle);

			if (versionInfoSize == 0) {
				// Try to get just the filename without path as fallback
				std::wstring pathStr(exePath);
				size_t lastSlash = pathStr.find_last_of(L"\\/");
				if (lastSlash != std::wstring::npos) {
					std::wstring filename = pathStr.substr(lastSlash + 1);
					// Remove .exe extension if present
					size_t dotPos = filename.find_last_of(L'.');
					if (dotPos != std::wstring::npos) {
						filename = filename.substr(0, dotPos);
					}

					// Convert to narrow string
					int len = WideCharToMultiByte(CP_UTF8, 0, filename.c_str(), -1, NULL, 0, NULL, NULL);
					if (len > 0) {
						std::string result;
						result.resize(len - 1);
						WideCharToMultiByte(CP_UTF8, 0, filename.c_str(), -1, &result[0], len, NULL, NULL);
						return result.empty() ? "MyApp" : result;
					}
				}
				return "MyApp";
			}

			// Allocate buffer for version info
			std::vector<BYTE> versionInfo(versionInfoSize);

			if (!GetFileVersionInfoW(exePath, handle, versionInfoSize, versionInfo.data())) {
				return "MyApp";
			}

			// Query for ProductName first, then FileDescription as fallback
			LPVOID buffer = nullptr;
			UINT bufferSize = 0;

			// Try ProductName first
			if (VerQueryValueW(versionInfo.data(), L"\\StringFileInfo\\040904b0\\ProductName", &buffer, &bufferSize)) {
				if (buffer && bufferSize > 0) {
					LPCWSTR productName = static_cast<LPCWSTR>(buffer);

					// Convert to narrow string
					int len = WideCharToMultiByte(CP_UTF8, 0, productName, -1, NULL, 0, NULL, NULL);
					if (len > 0) {
						std::string result;
						result.resize(len - 1);
						WideCharToMultiByte(CP_UTF8, 0, productName, -1, &result[0], len, NULL, NULL);
						if (!result.empty()) {
							return result;
						}
					}
				}
			}

			// Try FileDescription as fallback
			if (VerQueryValueW(versionInfo.data(), L"\\StringFileInfo\\040904b0\\FileDescription", &buffer, &bufferSize)) {
				if (buffer && bufferSize > 0) {
					LPCWSTR fileDescription = static_cast<LPCWSTR>(buffer);

					// Convert to narrow string
					int len = WideCharToMultiByte(CP_UTF8, 0, fileDescription, -1, NULL, 0, NULL, NULL);
					if (len > 0) {
						std::string result;
						result.resize(len - 1);
						WideCharToMultiByte(CP_UTF8, 0, fileDescription, -1, &result[0], len, NULL, NULL);
						if (!result.empty()) {
							return result;
						}
					}
				}
			}

			// Final fallback
			return "MyApp";
		}
		catch (...) {
			return "MyApp";
		}
	}

	std::string RNDeviceInfo::getBrand() noexcept {
		return "GenericBrand";
	}

	std::string RNDeviceInfo::getBuildNumber() noexcept {
		return "1";
	}

	std::string RNDeviceInfo::getBundleId() noexcept {
		return "com.example.app";
	}

	std::string RNDeviceInfo::getDeviceId() noexcept {
		return "Device123";
	}

	std::string RNDeviceInfo::getModel() noexcept {
		return "GenericModel";
	}

	std::string RNDeviceInfo::getReadableVersion() noexcept {
		return "1.0.0 (1)";
	}

	std::string RNDeviceInfo::getSystemName() noexcept {
		return "Windows";
	}

	std::string RNDeviceInfo::getSystemVersion() noexcept {
		try {
			// Simple and reliable approach using registry
			HKEY hKey;
			LONG result = RegOpenKeyExW(HKEY_LOCAL_MACHINE,
				L"SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion",
				0, KEY_READ, &hKey);

			if (result == ERROR_SUCCESS) {
				// Get the CurrentVersion (like "10.0")
				WCHAR version[256] = {};
				DWORD valueSize = sizeof(version);

				result = RegQueryValueExW(hKey, L"CurrentVersion", NULL, NULL,
					reinterpret_cast<LPBYTE>(version), &valueSize);

				if (result == ERROR_SUCCESS) {
					// Convert wide string to narrow string
					std::string versionStr;
					int len = WideCharToMultiByte(CP_UTF8, 0, version, -1, NULL, 0, NULL, NULL);
					if (len > 0) {
						versionStr.resize(len - 1);
						WideCharToMultiByte(CP_UTF8, 0, version, -1, &versionStr[0], len, NULL, NULL);
					}

					// Optionally get build number too
					WCHAR buildNumber[256] = {};
					valueSize = sizeof(buildNumber);
					LONG buildResult = RegQueryValueExW(hKey, L"CurrentBuildNumber", NULL, NULL,
						reinterpret_cast<LPBYTE>(buildNumber), &valueSize);

					if (buildResult == ERROR_SUCCESS && wcslen(buildNumber) > 0) {
						// Convert build number and append
						int buildLen = WideCharToMultiByte(CP_UTF8, 0, buildNumber, -1, NULL, 0, NULL, NULL);
						if (buildLen > 0) {
							std::string buildStr;
							buildStr.resize(buildLen - 1);
							WideCharToMultiByte(CP_UTF8, 0, buildNumber, -1, &buildStr[0], buildLen, NULL, NULL);
							versionStr += "." + buildStr;
						}
					}

					RegCloseKey(hKey);
					return versionStr.empty() ? "10.0" : versionStr;
				}
				RegCloseKey(hKey);
			}

			// Fallback to simple default
			return "10.0";
		}
		catch (...) {
			// Return safe default if anything goes wrong
			return "10.0";
		}
	}

	std::string RNDeviceInfo::getVersion() noexcept {
		return "1.0.0";
	}

	bool RNDeviceInfo::hasNotch() noexcept {
		return false;
	}

	bool RNDeviceInfo::hasDynamicIsland() noexcept {
		return false;
	}

	bool RNDeviceInfo::isTablet() noexcept {
		return false;
	}

	// === Async Methods ===
	void RNDeviceInfo::getBaseOs(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("Windows");
	}

	void RNDeviceInfo::getBuildId(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("Build1234");
	}

	void RNDeviceInfo::getBatteryLevel(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(0.75);
	}

	void RNDeviceInfo::isCameraPresent(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(true);
	}

	void RNDeviceInfo::getDeviceName(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("MyDevice");
	}

	void RNDeviceInfo::getFirstInstallTime(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(1650000000000.0);
	}

	void RNDeviceInfo::getFontScale(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(1.0);
	}

	void RNDeviceInfo::getFreeDiskStorage(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(static_cast<double>(1024LL * 1024 * 1024));
	}

	void RNDeviceInfo::getFreeDiskStorageOld(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(static_cast<double>(1024LL * 1024 * 512));
	}

	void RNDeviceInfo::getHost(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("localhost");
	}

	void RNDeviceInfo::getHostNames(React::ReactPromise<std::vector<std::string>>&& promise) noexcept {
		std::vector<std::string> hostNames = { "localhost", "127.0.0.1" };
		promise.Resolve(hostNames);
	}

	void RNDeviceInfo::getIpAddress(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("192.168.1.2");
	}

	void RNDeviceInfo::getInstallerPackageName(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("WindowsStore");
	}

	void RNDeviceInfo::getInstallReferrer(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("referrer");
	}

	void RNDeviceInfo::getManufacturer(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("GenericManufacturer");
	}

	void RNDeviceInfo::getMaxMemory(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(static_cast<double>(4LL * 1024 * 1024 * 1024));
	}

	//void RNDeviceInfo::getPowerState(React::ReactPromise<void>&& promise) noexcept {
	//	// Since the spec expects Promise<void>, we just resolve without a value
	//	promise.Resolve();
	//}

	void RNDeviceInfo::getSerialNumber(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("SN123456789");
	}

	void RNDeviceInfo::getTotalDiskCapacity(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(static_cast<double>(64LL * 1024 * 1024 * 1024));
	}

	void RNDeviceInfo::getTotalDiskCapacityOld(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(static_cast<double>(32LL * 1024 * 1024 * 1024));
	}

	void RNDeviceInfo::getUniqueId(React::ReactPromise<std::string>&& promise) noexcept {
		promise.Resolve("unique-device-id");
	}

	void RNDeviceInfo::getUsedMemory(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(static_cast<double>(2LL * 1024 * 1024 * 1024));
	}

	void RNDeviceInfo::isBatteryCharging(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(true);
	}

	void RNDeviceInfo::isEmulator(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(false);
	}

	void RNDeviceInfo::isKeyboardConnected(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(true);
	}

	void RNDeviceInfo::isLandscape(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(true);
	}

	void RNDeviceInfo::isMouseConnected(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(true);
	}

	void RNDeviceInfo::isPinOrFingerprintSet(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(false);
	}

	void RNDeviceInfo::isTabletMode(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(false);
	}

	void RNDeviceInfo::supportedAbis(React::ReactPromise<std::vector<std::string>>&& promise) noexcept {
		std::vector<std::string> abis = { "x64", "arm64" };
		promise.Resolve(abis);
	}

} // namespace winrt::RNDeviceInfo