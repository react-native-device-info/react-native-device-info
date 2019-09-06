using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.Devices.Power;
using Windows.System;
using Windows.Security.Credentials.UI;
using Windows.Networking;
using Windows.Networking.Connectivity;
using System.Linq;

namespace RNDeviceInfo
{
    public class RNDeviceInfoModule : ReactContextNativeModuleBase
    {
        public RNDeviceInfoModule(ReactContext reactContext)
            : base(reactContext)
        {
        }

        public override string Name
        {
            get
            {
                return "RNDeviceInfo";
            }
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

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public bool isPinOrFingerprintSetSync()
        {
            try
            {
                var ucvAvailability = await UserConsentVerifier.CheckAvailabilityAsync();
                return ucvAvailability == UserConsentVerifierAvailability.Available;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [ReactMethod]
        public async void isPinOrFingerprintSet(IPromise promise)
        {
            promise.Resolve(isPinOrFingerprintSetSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
        public async void getIpAddress(IPromise promise)
        {
            promise.Resolve(getIpAddressSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]        
        public bool getCameraPresenceSync()
        {
            var devices = await Windows.Devices.Enumeration.DeviceInformation.FindAllAsync(Windows.Devices.Enumeration.DeviceClass.VideoCapture);
            return devices.Count > 0;
        }
        [ReactMethod]
        public async void getCameraPresence()
        {
            promise.Resolve(getCameraPresenceSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
        public async void getBatteryLevel(IPromise promise)
        {
            promise.Resolve(getBatteryLevelSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getAppVersionSync()
        {
            try
            {
                PackageVersion version = Package.Current.Id.Version; 
                return string.Format("{0}.{1}.{2}.{3}", version.Major, version.Minor, version.Build, version.Revision));
            }
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void getAppVersion(IPromise promise)
        {
            promise.Resolve(getAppVersionSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getBuildNumberSync()
        {
            try
            {
                return Package.Current.Id.Version.Build.ToString();
            }
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void getBuildNumber(IPromise promise)
        {
            promise.Resolve(getBuildNumberSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getBuildVersionSync()
        {
            return getBuildNumberSync();
        }

        [ReactMethod]
        public async void getBuildVersion(IPromise promise)
        {
            getBuildNumber(promise);
        }
				
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public long getMaxMemorySync() { return MemoryManager.AppMemoryUsageLimit; }
        [ReactMethod]
        public async void getMaxMemory(IPromise promise) { promise.Resolve(getMaxMemorySync()); }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public long getFirstInstallTimeSync() { return Package.Current.InstalledDate.ToUnixTimeMilliseconds(); }
        [ReactMethod]
        public async void getFirstInstallTime(IPromise promise) { promise.Resolve(getFirstInstallTimeSync()); }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getAppNameSync() { return Package.Current.DisplayName; }
        [ReactMethod]
        public async void getAppName(IPromise promise) { promise.Resolve(getAppNameSync()); }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getBundleIdSync() { return Package.Current.Id.Name; }
        [ReactMethod]
        public async void getBundleId(IPromise promise) { promise.Resolve(getBundleIdSync()); }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getDeviceNameSync()
        {
            try
            {
                return new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation().FriendlyName;
            }
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void getDeviceName(IPromise promise)
        {
            promise.Resolve(getDeviceNameSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void getSystemVersion(IPromise promise)
        {
            promise.Resolve(getSystemVersionSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getModelSync()
        {
            try
            {
                return new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation().SystemProductName;
            }
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void getModel(IPromise promise)
        {
            promise.Resolve(getModelSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getBrandSync()
        {
            return getModelSync();
        }
        [ReactMethod]
        public async void getBrand(IPromise promise)
        {
            promise.Resolve(getBrandSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public bool isEmulatorSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return isEmulator(deviceInfo.SystemProductName);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        [ReactMethod]
        public async void isEmulator(IPromise promise)
        {
            promise.Resolve(isEmulatorSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getUniqueIdSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return deviceInfo.Id.toString();
            }
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void getUniqueId(IPromise promise)
        {
            promise.Resolve(getUniqueIdSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getDeviceIdSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return deviceInfo.SystemHardwareVersion;
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
        [ReactMethod]
        public async void getDeviceId(IPromise promise)
        {
            return promise.Resolve(getDeviceIdSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getSystemManufacturerSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return deviceInfo.SystemManufacturer;
            }
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void getSystemManufacturer(IPromise promise)
        {
            promise.Resolve(getSystemManufacturerSync());
        }
		
        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public bool isTabletSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return isTablet(deviceInfo.OperatingSystem);
            }
            catch (Exception ex)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public async void isTablet(IPromise promise)
        {
            promise.Resolve(isTabletSync());
        }
    }
}
