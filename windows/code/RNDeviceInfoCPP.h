#pragma once

#include "pch.h"
#include "NativeModules.h"
#include <regex>
#include <sstream>
#include <chrono>
#include <future>

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

    ReactContext m_reactContext;
    REACT_INIT(Initialize)
    void Initialize(ReactContext const& reactContext) noexcept {
      m_reactContext = reactContext;
    }

    REACT_CONSTANT_PROVIDER(constantsViaConstantsProvider);
    void constantsViaConstantsProvider(ReactConstantProvider& provider) noexcept
    {
      provider.Add(L"uniqueId", getUniqueIdSync());
      provider.Add(L"deviceId", getDeviceIdSync());
      provider.Add(L"serialNumber", getSerialNumberSync());
      provider.Add(L"bundleId", getBundleIdSync());
      provider.Add(L"systemVersion", getSystemVersionSync());
      provider.Add(L"appVersion", getAppVersionSync());
      provider.Add(L"buildNumber", getBuildNumberSync());
      provider.Add(L"isTablet", isTabletSync());
      provider.Add(L"appName", getAppNameSync());
      provider.Add(L"brand", getBrandSync());
      provider.Add(L"model", getModelSync());
      provider.Add(L"deviceType", getDeviceTypeSync());
    }

    bool isEmulatorHelper(std::string model)
    {
      return std::regex_match(model, std::regex(".*virtual.*", std::regex_constants::icase));
    }

    // What is a tablet is a debateable topic in Windows, as some windows devices can dynamically switch back and forth.
    // Also, see isTabletMode() instead of isTablet or deviceType.
    // More refinement should be applied into this area as neccesary. 
    bool isTabletHelper()
    {
      // AnalyticsInfo doesn't always return the values one might expect.
      // DeviceForm potential but not inclusive results:
      // [Mobile, Tablet, Television, Car, Watch, VirtualReality, Desktop, Unknown]
      // DeviceFamily potential but not inclusive results:
      // [Windows.Desktop, Windows.Mobile, Windows.Xbox, Windows.Holographic, Windows.Team, Windows.IoT]
      auto deviceForm = winrt::Windows::System::Profile::AnalyticsInfo::DeviceForm();
      auto deviceFamily = winrt::Windows::System::Profile::AnalyticsInfo::VersionInfo().DeviceFamily();
      
      bool isTabletByAnalytics = deviceForm == L"Tablet" || deviceForm == L"Mobile" || deviceFamily == L"Windows.Mobile";
      
      if (isTabletByAnalytics)
      {
        return true;
      }
      return false;
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
	
    REACT_SYNC_METHOD(getDeviceTypeSync);
    std::string getDeviceTypeSync() noexcept
    {
      if (isTabletHelper()) {
        return "Tablet";
      }
      else if (winrt::Windows::System::Profile::AnalyticsInfo::VersionInfo().DeviceFamily() == L"Windows.Xbox")
      {
        return "GamingConsole";
      }
      else {
        return "Desktop";
      }
    }

    REACT_METHOD(getDeviceType);
    void getDeviceType(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getDeviceTypeSync());
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

    REACT_SYNC_METHOD(isKeyboardConnectedSync);
    bool isKeyboardConnectedSync() noexcept
    {
      auto keyboardCapabilities = winrt::Windows::Devices::Input::KeyboardCapabilities();
      return keyboardCapabilities.KeyboardPresent();
    }

    REACT_METHOD(isKeyboardConnected);
    void isKeyboardConnected(ReactPromise<bool> promise) noexcept
    {
      promise.Resolve(isKeyboardConnectedSync());
    }

    REACT_SYNC_METHOD(isMouseConnectedSync);
    bool isMouseConnectedSync() noexcept
    {
      auto mouseCapabilities = winrt::Windows::Devices::Input::MouseCapabilities();
      return mouseCapabilities.MousePresent();
    }

    REACT_METHOD(isMouseConnected);
    void isMouseConnected(ReactPromise<bool> promise) noexcept
    {
      promise.Resolve(isMouseConnectedSync());
    }

    REACT_METHOD(isTabletMode);
    void isTabletMode(ReactPromise<bool> promise) noexcept
    {
      // NOTE: Should eventually add IsXamlIsland() relevant code when it's exposed through RNW's public API.

      m_reactContext.UIDispatcher().Post([promise]() {
        auto view = winrt::Windows::UI::ViewManagement::UIViewSettings::GetForCurrentView();
        auto mode = view.UserInteractionMode();
        switch(mode)
        {
          case winrt::Windows::UI::ViewManagement::UserInteractionMode::Touch:
          {
            promise.Resolve(true);
            return;
          }
          case winrt::Windows::UI::ViewManagement::UserInteractionMode::Mouse:
          default:
          {
            promise.Resolve(false);
          }
        }
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

    REACT_SYNC_METHOD(getPowerStateSync);
    JSValue getPowerStateSync() noexcept
    {
      JSValueObject result = JSValueObject{};
      const std::string states[4] = { "not present", "discharging", "idle", "charging" };
      auto aggBattery = Windows::Devices::Power::Battery::AggregateBattery();
      auto report = aggBattery.GetReport();
      if (report.FullChargeCapacityInMilliwattHours() != nullptr &&
        report.RemainingCapacityInMilliwattHours() != nullptr)
      {
        auto max = report.FullChargeCapacityInMilliwattHours().GetDouble();
        auto value = report.RemainingCapacityInMilliwattHours().GetDouble();
        if (max <= 0)
        {
          result["batteryLevel"] = (double)-1;
        } else
        {
          result["batteryLevel"] = value / max;
        }
        result["batteryState"] = states[static_cast<int>(report.Status())];
        result["lowPowerMode"] = (Windows::System::Power::PowerManager::EnergySaverStatus() == Windows::System::Power::EnergySaverStatus::On);
      }

      return result;
    }

    REACT_METHOD(getPowerState);
    void getPowerState(ReactPromise<JSValue> promise) noexcept
    {
      promise.Resolve(getPowerStateSync());
    }

    REACT_SYNC_METHOD(isBatteryChargingSync);
    bool isBatteryChargingSync() noexcept
    {
      auto aggBattery = Windows::Devices::Power::Battery::AggregateBattery();
      auto report = aggBattery.GetReport();
      return report.Status() == Windows::System::Power::BatteryStatus::Charging;
    }

    REACT_METHOD(isBatteryCharging);
    void isBatteryCharging(ReactPromise<bool> promise) noexcept
    {
      promise.Resolve(isBatteryChargingSync());
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

    REACT_SYNC_METHOD(getInstallerPackageNameSync);
    std::string getInstallerPackageNameSync() noexcept
    {
      try
      {
        return winrt::to_string(Windows::ApplicationModel::Package::Current().Id().Name());
      } catch (...)
      {
        return "unknown";
      }
    }
    REACT_METHOD(getInstallerPackageName);
    void getInstallerPackageName(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getInstallerPackageNameSync());
    }

    REACT_SYNC_METHOD(getInstallReferrerSync);
    std::string getInstallReferrerSync() noexcept
    {
      try
      {
        Windows::Services::Store::StoreContext context = Windows::Services::Store::StoreContext::GetDefault();

        // Get campaign ID for users with a recognized Microsoft account.
        Windows::Services::Store::StoreProductResult result = context.GetStoreProductForCurrentAppAsync().get();
        if (result.Product() != nullptr)
        {
          for (auto sku : result.Product().Skus())
          {
            if (sku.IsInUserCollection())
            {
              return winrt::to_string(sku.CollectionData().CampaignId());
            }
          }
        }

        // Get campaing ID from the license data for users without a recognized Microsoft account.
        Windows::Services::Store::StoreAppLicense license = context.GetAppLicenseAsync().get();
        auto json = Windows::Data::Json::JsonObject::Parse(license.ExtendedJsonData());
        if (json.HasKey(L"customPolicyField1"))
        {
          return winrt::to_string(json.GetNamedString(L"customPolicyField1", L"unknown"));
        }

      } catch (...)
      {
      }
      return "unknown";
    }
    REACT_METHOD(getInstallReferrer);
    void getInstallReferrer(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getInstallReferrerSync());
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

    REACT_SYNC_METHOD(getUsedMemorySync);
    uint64_t getUsedMemorySync() noexcept
    {
      return Windows::System::MemoryManager::AppMemoryUsage();
    }

    REACT_METHOD(getUsedMemory);
    void getUsedMemory(ReactPromise<uint64_t> promise) noexcept
    {
      promise.Resolve(getUsedMemorySync());
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

    REACT_SYNC_METHOD(getBaseOsSync);
    std::string getBaseOsSync() noexcept
    {
      try
      {
        std::string deviceFamilyVersion = winrt::to_string(Windows::System::Profile::AnalyticsInfo::VersionInfo().DeviceFamilyVersion());
        uint64_t version2 = std::stoull(deviceFamilyVersion);
        uint64_t major = (version2 & 0xFFFF000000000000L) >> 48;
        uint64_t minor = (version2 & 0x0000FFFF00000000L) >> 32;
        uint64_t build = (version2 & 0x00000000FFFF0000L) >> 16;
        uint64_t revision = (version2 & 0x000000000000FFFFL);
        std::ostringstream ostream;
        ostream << major << "." << minor << "." << build << "." << revision;
        return ostream.str();
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getBaseOs);
    void getBaseOs(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getBaseOsSync());
    }

    REACT_SYNC_METHOD(getBuildIdSync);
    std::string getBuildIdSync() noexcept
    {
      try
      {
        std::string deviceFamilyVersion = winrt::to_string(Windows::System::Profile::AnalyticsInfo::VersionInfo().DeviceFamilyVersion());
        uint64_t version2 = std::stoull(deviceFamilyVersion);
        uint64_t build = (version2 & 0x00000000FFFF0000L) >> 16;
        std::ostringstream ostream;
        ostream << build;
        return ostream.str();
      } catch (...)
      {
        return "unknown";
      }
    }

    REACT_METHOD(getBuildId);
    void getBuildId(ReactPromise<std::string> promise) noexcept
    {
      promise.Resolve(getBuildIdSync());
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
        return  winrt::to_string(Windows::Security::ExchangeActiveSyncProvisioning::EasClientDeviceInformation().SystemSku());
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
    
    REACT_SYNC_METHOD(getSerialNumberSync);
    std::string getSerialNumberSync() noexcept
    {
        try
        {
            return winrt::to_string(Windows::System::Profile::SystemManufacturers::SmbiosInformation::SerialNumber().c_str());
        }
        catch (...)
        {
            return "unknown";
        }
    }

    REACT_METHOD(getSerialNumber);
    void getSerialNumber(ReactPromise<std::string> promise) noexcept
    {
        promise.Resolve(getSerialNumberSync());
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
        return isTabletHelper();
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

    REACT_SYNC_METHOD(getFontScaleSync);
    double getFontScaleSync() noexcept
    {
      Windows::UI::ViewManagement::UISettings uiSettings;
      return uiSettings.TextScaleFactor();
    }

    REACT_METHOD(getFontScale);
    void getFontScale(ReactPromise<double> promise) noexcept
    {
      promise.Resolve(getFontScaleSync());
    }

    IAsyncOperation<int64_t> getFreeDiskStorageTask()
    {
      try
      {
        auto localFolder = Windows::Storage::ApplicationData::Current().LocalFolder();
        auto props = co_await localFolder.Properties().RetrievePropertiesAsync({ L"System.FreeSpace" });
        return winrt::unbox_value<uint64_t>(props.Lookup(L"System.FreeSpace"));
      } catch (...)
      {
        co_return -1;
      }
    }

    REACT_SYNC_METHOD(getFreeDiskStorageSync);
    int64_t getFreeDiskStorageSync() noexcept
    {
      return getFreeDiskStorageTask().get();
    }

    REACT_METHOD(getFreeDiskStorage);
    void getFreeDiskStorage(ReactPromise<int64_t> promise) noexcept
    {
      auto async_op = getFreeDiskStorageTask();
      async_op.Completed([promise](auto const& op, auto const&)
        {
          promise.Resolve(op.GetResults());
        });
    }

    IAsyncOperation<int64_t> getTotalDiskCapacityTask()
    {
      try
      {
        auto localFolder = Windows::Storage::ApplicationData::Current().LocalFolder();
        auto props = co_await localFolder.Properties().RetrievePropertiesAsync({ L"System.Capacity" });
        return winrt::unbox_value<uint64_t>(props.Lookup(L"System.Capacity"));
      } catch (...)
      {
        co_return -1;
      }
    }

    REACT_SYNC_METHOD(getTotalDiskCapacitySync);
    int64_t getTotalDiskCapacitySync() noexcept
    {
      return getTotalDiskCapacityTask().get();
    }

    REACT_METHOD(getTotalDiskCapacity);
    void getTotalDiskCapacity(ReactPromise<int64_t> promise) noexcept
    {
      auto async_op = getTotalDiskCapacityTask();
      async_op.Completed([promise](auto const& op, auto const&)
        {
          promise.Resolve(op.GetResults());
        });
    }

  };

}
