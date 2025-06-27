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
		

			// Final fallback
			return "MyApp";
		}
		
	

	std::string RNDeviceInfo::getBrand() noexcept {
		try {
			HKEY hKey;
			LONG result = RegOpenKeyExW(
				HKEY_LOCAL_MACHINE,
				L"HARDWARE\\DESCRIPTION\\System\\BIOS",
				0,
				KEY_READ | KEY_WOW64_64KEY,
				&hKey
			);

			if (result == ERROR_SUCCESS) {
				WCHAR brand[256] = {};
				DWORD brandSize = sizeof(brand);

				result = RegQueryValueExW(
					hKey,
					L"SystemManufacturer",
					nullptr,
					nullptr,
					reinterpret_cast<LPBYTE>(brand),
					&brandSize
				);

				RegCloseKey(hKey);

				if (result == ERROR_SUCCESS && wcslen(brand) > 0) {
					int len = WideCharToMultiByte(CP_UTF8, 0, brand, -1, nullptr, 0, nullptr, nullptr);
					if (len > 0) {
						std::string brandStr;
						brandStr.resize(len - 1);
						WideCharToMultiByte(CP_UTF8, 0, brand, -1, &brandStr[0], len, nullptr, nullptr);
						return brandStr;
					}
				}
			}
		}
		catch (...) {
			// Ignore and fall through to fallback
		}
		// Fallback: return a default string if unable to get the brand
		return "UnknownBrand";
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
		try {
			HKEY hKey;
			LONG result = RegOpenKeyExW(
				HKEY_LOCAL_MACHINE,
				L"HARDWARE\\DESCRIPTION\\System\\BIOS",
				0,
				KEY_READ | KEY_WOW64_64KEY,
				&hKey
			);

			if (result == ERROR_SUCCESS) {
				WCHAR model[256] = {};
				DWORD modelSize = sizeof(model);

				result = RegQueryValueExW(
					hKey,
					L"SystemProductName",
					nullptr,
					nullptr,
					reinterpret_cast<LPBYTE>(model),
					&modelSize
				);

				RegCloseKey(hKey);

				if (result == ERROR_SUCCESS && wcslen(model) > 0) {
					int len = WideCharToMultiByte(CP_UTF8, 0, model, -1, nullptr, 0, nullptr, nullptr);
					if (len > 0) {
						std::string modelStr;
						modelStr.resize(len - 1);
						WideCharToMultiByte(CP_UTF8, 0, model, -1, &modelStr[0], len, nullptr, nullptr);
						return modelStr;
					}
				}
			}
		}
		catch (...) {
			// Ignore and fall through to fallback
		}
		// Fallback: return a default string if unable to get the model
		return "UnknownModel";
	}

	std::string RNDeviceInfo::getReadableVersion() noexcept {
		return "1.0.0 (1)";
	}

	std::string RNDeviceInfo::getSystemName() noexcept {
		return "Windows";
	}

	std::string RNDeviceInfo::getSystemVersion() noexcept {
			return "10.0";
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
		try {
			SYSTEM_POWER_STATUS status = {};
			if (GetSystemPowerStatus(&status)) {
				// BatteryLifePercent is 0-100, 255 means unknown status
				if (status.BatteryLifePercent != 255) {
					double level = static_cast<double>(status.BatteryLifePercent) / 100.0;
					promise.Resolve(level);
					return;
				}
			}
		}
		catch (...) {
			// Ignore and fall through to fallback
		}
		// Fallback: return -1.0 to indicate unknown battery level
		promise.Resolve(-1.0);
	}

	void RNDeviceInfo::isCameraPresent(React::ReactPromise<bool>&& promise) noexcept {
		promise.Resolve(true);
	}

	void RNDeviceInfo::getDeviceName(React::ReactPromise<std::string>&& promise) noexcept {
		try {
			WCHAR nameBuffer[MAX_COMPUTERNAME_LENGTH + 1] = {};
			DWORD size = ARRAYSIZE(nameBuffer);

			// Use ComputerNamePhysicalDnsHostname for a more user-friendly name
			if (GetComputerNameExW(ComputerNamePhysicalDnsHostname, nameBuffer, &size)) {
				int len = WideCharToMultiByte(CP_UTF8, 0, nameBuffer, -1, nullptr, 0, nullptr, nullptr);
				if (len > 0) {
					std::string deviceName;
					deviceName.resize(len - 1);
					WideCharToMultiByte(CP_UTF8, 0, nameBuffer, -1, &deviceName[0], len, nullptr, nullptr);
					promise.Resolve(deviceName);
					return;
				}
			}
		}
		catch (...) {
			// Ignore and fall through to fallback
		}
		// Fallback: return a default string if unable to get the device name
		promise.Resolve("UnknownDevice");
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
		try {
			// Get the path of the current executable
			WCHAR exePath[MAX_PATH] = {};
			DWORD pathLength = GetModuleFileNameW(NULL, exePath, MAX_PATH);

			if (pathLength == 0 || pathLength == MAX_PATH) {
				// Fallback: use C:\
	            wcscpy_s(exePath, L"C:\\");
			}
			else {
				// Remove the filename to get the directory
				WCHAR* lastSlash = wcsrchr(exePath, L'\\');
				if (lastSlash) {
					*(lastSlash + 1) = L'\0';
				}
			}

			ULARGE_INTEGER totalNumberOfBytes = {};
			if (GetDiskFreeSpaceExW(exePath, nullptr, &totalNumberOfBytes, nullptr)) {
				promise.Resolve(static_cast<double>(totalNumberOfBytes.QuadPart));
				return;
			}
		}
		catch (...) {
			// Ignore and fall through to fallback
		}

		// Fallback: return 0 if unable to determine
		promise.Resolve(0.0);
	}

	void RNDeviceInfo::getTotalDiskCapacityOld(React::ReactPromise<double>&& promise) noexcept {
		promise.Resolve(static_cast<double>(32LL * 1024 * 1024 * 1024));
	}

	void RNDeviceInfo::getUniqueId(React::ReactPromise<std::string>&& promise) noexcept {
		try {
			HKEY hKey;
			LONG result = RegOpenKeyExW(
				HKEY_LOCAL_MACHINE,
				L"SOFTWARE\\Microsoft\\Cryptography",
				0,
				KEY_READ | KEY_WOW64_64KEY,
				&hKey
			);

			if (result == ERROR_SUCCESS) {
				WCHAR guid[256] = {};
				DWORD guidSize = sizeof(guid);

				result = RegQueryValueExW(
					hKey,
					L"MachineGuid",
					nullptr,
					nullptr,
					reinterpret_cast<LPBYTE>(guid),
					&guidSize
				);

				RegCloseKey(hKey);

				if (result == ERROR_SUCCESS && wcslen(guid) > 0) {
					// Convert wide string to UTF-8 std::string
					int len = WideCharToMultiByte(CP_UTF8, 0, guid, -1, nullptr, 0, nullptr, nullptr);
					if (len > 0) {
						std::string guidStr;
						guidStr.resize(len - 1);
						WideCharToMultiByte(CP_UTF8, 0, guid, -1, &guidStr[0], len, nullptr, nullptr);
						promise.Resolve(guidStr);
						return;
					}
				}
			}
		}
		catch (...) {
			// Ignore and fall through to fallback
		}

		// Fallback: return a default string if unable to get the GUID
		promise.Resolve("unknown-unique-id");
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