using ReactNative.Bridge;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.Devices.Power;
using Windows.System;
using Windows.Security.Credentials.UI;
using Windows.Networking;
using Windows.Networking.Connectivity;
using System.Linq;
using Newtonsoft.Json.Linq;

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

        public override JObject ModuleConstants
        {
            get
            {
                return new JObject
                {
                    { "uniqueId", getUniqueIdSync() },
                    { "deviceId", getDeviceIdSync() },
                    { "bundleId", getBundleIdSync() },
                    { "systemVersion", getSystemVersionSync() },
                    { "appVersion", getAppVersionSync() },
                    { "buildNumber", getBuildNumberSync() },
                    { "isTablet", isTabletSync() },
                    { "appName", getAppNameSync() },
                    { "brand", getBrandSync() },
                    { "model", getModelSync() },
                };
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

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public bool isPinOrFingerprintSetSync()
        {
            return isPinOrFingerprint().Result;
        }
        [ReactMethod]
        public async void isPinOrFingerprintSet(IPromise promise)
        {
            var result = await isPinOrFingerprint();
            promise.Resolve(result);
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
        public void getIpAddress(IPromise promise)
        {
            promise.Resolve(getIpAddressSync());
        }

        private async Task<bool> isCameraPresentTask()
        {
            var devices = await Windows.Devices.Enumeration.DeviceInformation.FindAllAsync(Windows.Devices.Enumeration.DeviceClass.VideoCapture);
            return devices.Count > 0;
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public bool isCameraPresentSync()
        {
            return isCameraPresentTask().Result;
        }

        [ReactMethod]
        public async void isCameraPresent(IPromise promise)
        {
            promise.Resolve(await isCameraPresentTask());
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
        public void getBatteryLevel(IPromise promise)
        {
            promise.Resolve(getBatteryLevelSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
        public void getAppVersion(IPromise promise)
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
            catch (Exception)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public void getBuildNumber(IPromise promise)
        {
            promise.Resolve(getBuildNumberSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getBuildVersionSync()
        {
            return getBuildNumberSync();
        }

        [ReactMethod]
        public void getBuildVersion(IPromise promise)
        {
            getBuildNumber(promise);
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public long getMaxMemorySync() { return (long)MemoryManager.AppMemoryUsageLimit; }
        [ReactMethod]
        public void getMaxMemory(IPromise promise) { promise.Resolve(getMaxMemorySync()); }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public long getFirstInstallTimeSync() { return Package.Current.InstalledDate.ToUnixTimeMilliseconds(); }
        [ReactMethod]
        public void getFirstInstallTime(IPromise promise) { promise.Resolve(getFirstInstallTimeSync()); }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getAppNameSync() { return Package.Current.DisplayName; }
        [ReactMethod]
        public void getAppName(IPromise promise) { promise.Resolve(getAppNameSync()); }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getBundleIdSync() { return Package.Current.Id.Name; }
        [ReactMethod]
        public void getBundleId(IPromise promise) { promise.Resolve(getBundleIdSync()); }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
        public void getDeviceName(IPromise promise)
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
            catch (Exception)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public void getSystemVersion(IPromise promise)
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
            catch (Exception)
            {
                return "unknown";
            }
        }
        [ReactMethod]
        public void getModel(IPromise promise)
        {
            promise.Resolve(getModelSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public string getBrandSync()
        {
            return getModelSync();
        }
        [ReactMethod]
        public void getBrand(IPromise promise)
        {
            promise.Resolve(getBrandSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
        public void isEmulator(IPromise promise)
        {
            promise.Resolve(isEmulatorSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
        public void getUniqueId(IPromise promise)
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
            catch (Exception)
            {
                return "";
            }
        }
        [ReactMethod]
        public void getDeviceId(IPromise promise)
        {
            promise.Resolve(getDeviceIdSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
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
        public void getSystemManufacturer(IPromise promise)
        {
            promise.Resolve(getSystemManufacturerSync());
        }

        [ReactMethod(IsBlockingSynchronousMethod = true)]
        public bool isTabletSync()
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                return !deviceInfo.OperatingSystem.Equals("WINDOWS");
            }
            catch (Exception)
            {
                return false;
            }
        }
        [ReactMethod]
        public void isTablet(IPromise promise)
        {
            promise.Resolve(isTabletSync());
        }
    }
}
