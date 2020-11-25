#pragma once

#include "pch.h"
#include "NativeModules.h"
#include <regex>
#include <sstream>
#include <chrono>

using namespace winrt::Microsoft::ReactNative;
using namespace winrt::Windows::Foundation;

#ifdef RNW61
#define JSVALUEOBJECTPARAMETER
#else
#define JSVALUEOBJECTPARAMETER const &
#endif

namespace winrt::RNDeviceInfoCPP
{
  REACT_MODULE(RNDeviceInfoCPP, L"RNDeviceInfo");
  struct RNDeviceInfoCPP
  {
    const std::string Name = "RNDeviceInfo";

    REACT_CONSTANT_PROVIDER(constantsViaConstantsProvider);
    void constantsViaConstantsProvider(ReactConstantProvider& provider) noexcept
    {
      provider.Add(L"uniqueId", getUniqueIdSync());
      provider.Add(L"deviceId", getDeviceIdSync());
      provider.Add(L"bundleId", getBundleIdSync());
      provider.Add(L"systemVersion", getSystemVersionSync());
      provider.Add(L"appVersion", getAppVersionSync());
      provider.Add(L"buildNumber", getBuildNumberSync());
      provider.Add(L"isTablet", isTabletSync());
      provider.Add(L"appName", getAppNameSync());
      provider.Add(L"brand", getBrandSync());
      provider.Add(L"model", getModelSync());
    }

    bool isEmulatorHelper(std::string model)
    {
      return std::regex_match(model, std::regex(".*virtual.*", std::regex_constants::icase));
    }

    bool isTabletHelper(std::string os)
    {
      return !std::regex_match(os, std::regex(".*windowsphone.*", std::regex_constants::icase));
    }

    IAsyncOperation<bool> isPinOrFingerprint()
    {
      try
      {
        auto ucAvailability = co_await Windows::Security::Credentials::UI::UserConsentVerifier::CheckAvailabilityAsync();
        return ucAvailability == Windows::Security::Credentials::UI::UserConsentVerifierAvailability::Available;
      } catch (...)
      {
        return false;
      }
    }

    REACT_SYNC_METHOD(isPinOrFingerprintSetSync);
    bool isPinOrFingerprintSetSync() noexcept
    {
      return isPinOrFingerprint().get();
    }

    REACT_METHOD(isPinOrFingerprintSet);
    void isPinOrFingerprintSet(ReactPromise<bool> promise) noexcept
    {
      auto async_op = isPinOrFingerprint();
      async_op.Completed([promise](auto const& op, auto const&)
        {
          promise.Resolve(op.GetResults());
        });
    }


    REACT_SYNC_METHOD(getIpAddressSync);
    std::string getIpAddressSync() noexcept
    {
      auto icp = Windows::Networking::Connectivity::NetworkInformation::GetInternetConnectionProfile();
      if (!icp || !icp.NetworkAdapter())
      {
        return "unknown";
      } else
      {
        auto hostnames = Windows::Networking::Connectivity::NetworkInformation::GetHostNames();
        for (auto const& hostname : hostnames)
        {
          if (
            hostname.Type() == Windows::Networking::HostNameType::Ipv4 &&
            hostname.IPInformation() &&
            hostname.IPInformation().NetworkAdapter() &&
            hostname.IPInformation().NetworkAdapter().NetworkAdapterId() == icp.NetworkAdapter().NetworkAdapterId())
          {
            return winrt::to_string(hostname.CanonicalName());
          }
        }
        return "unknown";
      }
    }

    REACT_METHOD(getIpAddress);
    void getIpAddress(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getIpAddressSync());
    }


    IAsyncOperation<bool> isCameraPresentTask()
    {
      Windows::Devices::Enumeration::DeviceInformationCollection devices =
        co_await Windows::Devices::Enumeration::DeviceInformation::FindAllAsync(Windows::Devices::Enumeration::DeviceClass::VideoCapture);

      return devices.Size() > 0;
    }

    REACT_SYNC_METHOD(isCameraPresentSync);
    bool isCameraPresentSync() noexcept
    {
      return isCameraPresentTask().get();
    }

    REACT_METHOD(isCameraPresent);
    void isCameraPresent(ReactPromise<bool> promise) noexcept
    {
      auto async_op = isCameraPresentTask();
      async_op.Completed([promise](auto const& op, auto const&)
        {
          promise.Resolve(op.GetResults());
        });
    }

    REACT_SYNC_METHOD(getBatteryLevelSync);
    double getBatteryLevelSync() noexcept
    {
      auto aggBattery = Windows::Devices::Power::Battery::AggregateBattery();
      auto report = aggBattery.GetReport();
      if (report.FullChargeCapacityInMilliwattHours() == nullptr ||
        report.RemainingCapacityInMilliwattHours() == nullptr)
      {
        return (double)-1;
      } else
      {
        auto max = report.FullChargeCapacityInMilliwattHours().GetDouble();
        auto value = report.RemainingCapacityInMilliwattHours().GetDouble();
        if (max <= 0)
        {
          return (double)-1;
        } else
        {
          return value / max;
        }
      }
    }

    REACT_METHOD(getBatteryLevel);
    void getBatteryLevel(ReactPromise<double> promise) noexcept
    {
      promise.Resolve(getBatteryLevelSync());
    }

    REACT_SYNC_METHOD(getAppVersionSync);
    std::string getAppVersionSync() noexcept
    {
      try
      {
        Windows::ApplicationModel::PackageVersion version = Windows::ApplicationModel::Package::Current().Id().Version();

        std::ostringstream ostream;
        ostream << version.Major << "." << version.Minor << "." << version.Build << "." << version.Revision;
        return ostream.str();
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getAppVersion);
    void getAppVersion(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getAppVersionSync());
    }

    REACT_SYNC_METHOD(getBuildNumberSync);
    std::string getBuildNumberSync() noexcept
    {
      try
      {
        return std::to_string(Windows::ApplicationModel::Package::Current().Id().Version().Build);
      } catch (...)
      {
        return "unknown";
      }
    }
    REACT_METHOD(getBuildNumber);
    void getBuildNumber(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getBuildNumberSync());
    }

    REACT_SYNC_METHOD(getBuildVersionSync);
    std::string getBuildVersionSync() noexcept
    {
      return getBuildNumberSync();
    }

    REACT_METHOD(getBuildVersion);
    void getBuildVersion(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getBuildVersionSync());
    }

    REACT_SYNC_METHOD(getMaxMemorySync);
    uint64_t getMaxMemorySync() noexcept
    {
      return Windows::System::MemoryManager::AppMemoryUsageLimit();
    }

    REACT_METHOD(getMaxMemory);
    void getMaxMemory(ReactPromise<uint64_t> promise) noexcept
    {
      promise.Resolve(getMaxMemorySync());
    }

    REACT_SYNC_METHOD(getFirstInstallTimeSync);
    int64_t getFirstInstallTimeSync() noexcept
    {
      auto installTime = Windows::ApplicationModel::Package::Current().InstalledDate().time_since_epoch();
      return std::chrono::duration_cast<std::chrono::milliseconds>(installTime).count();
    }

    REACT_METHOD(getFirstInstallTime);
    void getFirstInstallTime(ReactPromise<int64_t> promise) noexcept
    {
      promise.Resolve(getFirstInstallTimeSync());
    }

    REACT_SYNC_METHOD(getAppNameSync);
    std::string getAppNameSync() noexcept
    {
      return winrt::to_string(Windows::ApplicationModel::Package::Current().DisplayName());
    }

    REACT_METHOD(getAppName);
    void getAppName(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getAppNameSync());
    }

    REACT_SYNC_METHOD(getBundleIdSync);
    std::string getBundleIdSync() noexcept
    {
      return winrt::to_string(Windows::ApplicationModel::Package::Current().Id().Name());
    }

    REACT_METHOD(getBundleId);
    void getBundleId(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getBundleIdSync());
    }

    REACT_SYNC_METHOD(getDeviceNameSync);
    std::string getDeviceNameSync() noexcept
    {
      try
      {
        return winrt::to_string(Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation().FriendlyName());
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getDeviceName);
    void getDeviceName(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getDeviceNameSync());
    }

    REACT_SYNC_METHOD(getSystemVersionSync);
    std::string getSystemVersionSync() noexcept
    {
      try
      {
        std::string deviceFamilyVersion = winrt::to_string(Windows::System::Profile::AnalyticsInfo::VersionInfo().DeviceFamilyVersion());
        uint64_t version2 = std::stoull(deviceFamilyVersion);
        uint64_t major = (version2 & 0xFFFF000000000000L) >> 48;
        uint64_t minor = (version2 & 0x0000FFFF00000000L) >> 32;
        std::ostringstream ostream;
        ostream << major << "." << minor;
        return ostream.str();
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getSystemVersion);
    void getSystemVersion(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getSystemVersionSync());
    }

    REACT_SYNC_METHOD(getModelSync);
    std::string getModelSync() noexcept
    {
      try
      {
        return winrt::to_string(Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation().SystemProductName());
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getModel);
    void getModel(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getModelSync());
    }

    REACT_SYNC_METHOD(getBrandSync);
    std::string getBrandSync() noexcept
    {
      return getModelSync();
    }

    REACT_METHOD(getBrand);
    void getBrand(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getBrandSync());
    }

    REACT_SYNC_METHOD(isEmulatorSync);
    bool isEmulatorSync() noexcept
    {
      try
      {
        auto deviceInfo = Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation();
        return winrt::to_string(deviceInfo.SystemProductName()) == "Virtual";
      } catch (...)
      {
        return false;
      }
    }

    REACT_METHOD(isEmulator);
    void isEmulator(ReactPromise<bool> promise) noexcept
    {
      promise.Resolve(isEmulatorSync());
    }

    REACT_SYNC_METHOD(getUniqueIdSync);
    std::string getUniqueIdSync() noexcept
    {
      try
      {
        return winrt::to_string(winrt::to_hstring(Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation().Id()));
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getUniqueId);
    void getUniqueId(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getUniqueIdSync());
    }

    REACT_SYNC_METHOD(getDeviceIdSync);
    std::string getDeviceIdSync() noexcept
    {
      try
      {
        return winrt::to_string(Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation().SystemHardwareVersion());
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getDeviceId);
    void getDeviceId(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getDeviceIdSync());
    }

    REACT_SYNC_METHOD(getSystemManufacturerSync);
    std::string getSystemManufacturerSync() noexcept
    {
      try
      {
        return winrt::to_string(Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation().SystemManufacturer());
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getSystemManufacturer);
    void getSystemManufacturer(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getSystemManufacturerSync());
    }

    REACT_SYNC_METHOD(isTabletSync);
    bool isTabletSync() noexcept
    {
      try
      {
        return isTabletHelper(winrt::to_string(Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation().OperatingSystem()));
      } catch (...)
      {
        return false;
      }
    }

    REACT_METHOD(isTablet);
    void isTablet(ReactPromise<bool> promise) noexcept
    {
      promise.Resolve(isTabletSync());
    }

    REACT_SYNC_METHOD(getTotalMemorySync);
    int64_t getTotalMemorySync() noexcept
    {
      // Device memory is not available through winrt APIs.
      return -1;
    }

    REACT_METHOD(getTotalMemory);
    void getTotalMemory(ReactPromise<int64_t> promise) noexcept
    {
      promise.Resolve(getTotalMemorySync());
    }

  };

}
