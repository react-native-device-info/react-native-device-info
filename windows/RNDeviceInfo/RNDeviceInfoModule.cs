using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using Windows.Security.Credentials.UI;

using Microsoft.ReactNative.Managed;
using Microsoft.ReactNative;
using Windows.Networking;
using Windows.Networking.Connectivity;
using Windows.Devices.Power;
using Windows.ApplicationModel;
using Windows.System;

namespace RNDeviceInfo
{
    [ReactModule("RNDeviceInfo")]
    class RNDeviceInfoModule
    {

        [ReactConstantProvider]
        public void ConstantsViaConstantsProvider(ReactConstantProvider provider)
        {
            provider.Add("uniqueId", getUniqueIdSync());
            provider.Add("deviceId", getDeviceIdSync());
            provider.Add("bundleId", getBundleIdSync());
            provider.Add("systemVersion", getSystemVersionSync());
            provider.Add("appVersion", getAppVersionSync());
            provider.Add("buildNumber", getBuildNumberSync());
            provider.Add("isTablet", isTabletSync());
            provider.Add("appName", getAppNameSync());
            provider.Add("brand", getBrandSync());
            provider.Add("model", getModelSync());
        }

        private bool IsEmulator(string model)
        {
            Regex rgx = new Regex("(?i:virtual)");
            return rgx.IsMatch(model);
        }

        private bool IsTablet(string os)
        {
            Regex rgx = new Regex("(?i:windowsphone)");
            return !rgx.IsMatch(os);
        }

        private async Task<bool> isPinOrFingerprint()
        {
            try
            {
                var ucvAvailability = await UserConsentVerifier.CheckAvailabilityAsync();
                return ucvAvailability == UserConsentVerifierAvailability.Available;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [ReactSyncMethod]
        public bool isPinOrFingerprintSetSync()
        {
            return isPinOrFingerprint().Result;
        }

        [ReactMethod]
        public async void isPinOrFingerprintSet(IReactPromise<bool> promise)
        {
            var ret = await isPinOrFingerprint();
            promise.Resolve(ret);
        }

        [ReactSyncMethod]
        public string getIpAddressSync()
        {
            var hostNameType = HostNameType.Ipv4;
            var icp = NetworkInformation.GetInternetConnectionProfile();

            if (icp?.NetworkAdapter == null)
            {
                return "unknown";
            }
            else
            {
                var hostname = NetworkInformation.GetHostNames()
                    .FirstOrDefault(
                        hn =>
                            hn.Type == hostNameType &&
                            hn.IPInformation?.NetworkAdapter != null &&
                            hn.IPInformation.NetworkAdapter.NetworkAdapterId == icp.NetworkAdapter.NetworkAdapterId);
                return hostname?.CanonicalName;
            }
        }

        [ReactMethod]
        public void getIpAddress(IReactPromise<string> promise)
        {
            promise.Resolve(getIpAddressSync());
        }

        private async Task<bool> isCameraPresentTask()
        {
            var devices = await Windows.Devices.Enumeration.DeviceInformation.FindAllAsync(Windows.Devices.Enumeration.DeviceClass.VideoCapture);
            return devices.Count > 0;
        }

        [ReactSyncMethod]
        public bool isCameraPresentSync()
        {
            return isCameraPresentTask().Result;
        }

        [ReactMethod]
        public async void isCameraPresent(IReactPromise<bool> promise)
        {
            promise.Resolve(await isCameraPresentTask());
        }

        [ReactSyncMethod]
        public double getBatteryLevelSync()
        {
            // Create aggregate battery object
            var aggBattery = Battery.AggregateBattery;

            // Get report
            var report = aggBattery.GetReport();

            if ((report.FullChargeCapacityInMilliwattHours == null) ||
                (report.RemainingCapacityInMilliwattHours == null))
            {
                return -1;
            }
            else
            {
                var max = Convert.ToDouble(report.FullChargeCapacityInMilliwattHours);
                var value = Convert.ToDouble(report.RemainingCapacityInMilliwattHours);
                return value / max;
            }
        }

        [ReactMethod]
        public void getBatteryLevel(IReactPromise<double> promise)
        {
            promise.Resolve(getBatteryLevelSync());
        }

        [ReactSyncMethod]
        public string getAppVersionSync()
        {
            try
            {
                PackageVersion version = Package.Current.Id.Version;
                return string.Format("{0}.{1}.{2}.{3}", version.Major, version.Minor, version.Build, version.Revision);
            }
            catch (Exception)
            {
                return "unknown";
            }
        }

        [ReactMethod]
        public void getAppVersion(ReactPromise<string> promise)
        {
            promise.Resolve(getAppVersionSync());
        }

        [ReactSyncMethod]
        public string getBuildNumberSync()
        {
            try
            {
                return Package.Current.Id.Version.Build.ToString();
            }
            catch (Exception)
            {
                return "unknown";
            }
        }

        [ReactMethod]
        public void getBuildNumber(ReactPromise<string> promise)
        {
            promise.Resolve(getBuildNumberSync());
        }

        [ReactSyncMethod]
        public string getBuildVersionSync()
        {
            return getBuildNumberSync();
        }

        [ReactMethod]
        public void getBuildVersion(ReactPromise<string> promise)
        {
            getBuildNumber(promise);
        }

        [ReactSyncMethod]
        public long getMaxMemorySync() 
        { 
            return (long) MemoryManager.AppMemoryUsageLimit; 
        }

        [ReactMethod]
        public void getMaxMemory(ReactPromise<long> promise) 
        { 
            promise.Resolve(getMaxMemorySync()); 
        }

        [ReactSyncMethod]
        public long getFirstInstallTimeSync() 
        { 
            return Package.Current.InstalledDate.ToUnixTimeMilliseconds(); 
        }

        [ReactMethod]
        public void getFirstInstallTime(ReactPromise<long> promise) 
        { 
            promise.Resolve(getFirstInstallTimeSync()); 
        }

        [ReactSyncMethod]
        public string getAppNameSync() 
        { 
            return Package.Current.DisplayName; 
        }

        [ReactMethod]
        public void getAppName(ReactPromise<string> promise)
        { 
            promise.Resolve(getAppNameSync());
        }

        [ReactSyncMethod]
        public string getBundleIdSync() 
        { 
            return Package.Current.Id.Name; 
        }

        [ReactMethod]
        public void getBundleId(ReactPromise<string> promise) 
        { 
            promise.Resolve(getBundleIdSync()); 
        }

        [ReactSyncMethod]
        public string getDeviceNameSync()
        {
            try
            {
                return new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation().FriendlyName;
            }
            catch (Exception)
            {
                return "unknown";
            }
        }

        [ReactMethod]
        public void getDeviceName(ReactPromise<string> promise)
        {
            promise.Resolve(getDeviceNameSync());
        }

        [ReactSyncMethod]
        public string getSystemVersionSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                string deviceFamilyVersion = Windows.System.Profile.AnalyticsInfo.VersionInfo.DeviceFamilyVersion;
                ulong version2 = ulong.Parse(deviceFamilyVersion);
                ulong major = (version2 & 0xFFFF000000000000L) >> 48;
                ulong minor = (version2 & 0x0000FFFF00000000L) >> 32;
                return $"{major}.{minor}";
            }
            catch (Exception)
            {
                return "unknown";
            }
        }

        [ReactMethod]
        public void getSystemVersion(ReactPromise<string> promise)
        {
            promise.Resolve(getSystemVersionSync());
        }

        [ReactSyncMethod]
        public string getModelSync()
        {
            try
            {
                return new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation().SystemProductName;
            }
            catch (Exception)
            {
                return "unknown";
            }
        }

        [ReactMethod]
        public void getModel(ReactPromise<string> promise)
        {
            promise.Resolve(getModelSync());
        }

        [ReactSyncMethod]
        public string getBrandSync()
        {
            return getModelSync();
        }

        [ReactMethod]
        public void getBrand(ReactPromise<string> promise)
        {
            promise.Resolve(getBrandSync());
        }

        [ReactSyncMethod]
        public bool isEmulatorSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return deviceInfo.SystemProductName.Equals("Virtual");
            }
            catch (Exception)
            {
                return false;
            }
        }

        [ReactMethod]
        public void isEmulator(ReactPromise<bool> promise)
        {
            promise.Resolve(isEmulatorSync());
        }

        [ReactSyncMethod]
        public string getUniqueIdSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return deviceInfo.Id.ToString();
            }
            catch (Exception)
            {
                return "unknown";
            }
        }

        [ReactMethod]
        public void getUniqueId(ReactPromise<string> promise)
        {
            promise.Resolve(getUniqueIdSync());
        }

        [ReactSyncMethod]
        public string getDeviceIdSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return deviceInfo.SystemHardwareVersion;
            }
            catch (Exception)
            {
                return "";
            }
        }

        [ReactMethod]
        public void getDeviceId(ReactPromise<string> promise)
        {
            promise.Resolve(getDeviceIdSync());
        }

        [ReactSyncMethod]
        public string getSystemManufacturerSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return deviceInfo.SystemManufacturer;
            }
            catch (Exception)
            {
                return "unknown";
            }
        }

        [ReactMethod]
        public void getSystemManufacturer(ReactPromise<string> promise)
        {
            promise.Resolve(getSystemManufacturerSync());
        }

        [ReactSyncMethod]
        public bool isTabletSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return this.IsTablet(deviceInfo.OperatingSystem);
            }
            catch (Exception)
            {
                return false;
            }
        }
        [ReactMethod]
        public void isTablet(ReactPromise<bool> promise)
        {
            promise.Resolve(isTabletSync());
        }

        [ReactMethod]
        public void getTotalMemory(ReactPromise<long> promise)
        {
            promise.Resolve(-1);
        }

        [ReactSyncMethod]
        public long getTotalMemorySync()
        {
            return -1;
        }

    }
}
