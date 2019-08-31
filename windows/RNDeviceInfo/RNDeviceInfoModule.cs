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

        [ReactMethod]
        public async void isPinOrFingerprintSet(IPromise promise)
        {
            try
            {
                var ucvAvailability = await UserConsentVerifier.CheckAvailabilityAsync();
                promise.Resolve(ucvAvailability == UserConsentVerifierAvailability.Available);
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }

        [ReactMethod]
        public async void getIpAddress(IPromise promise)
        {
            var hostNameType = HostNameType.Ipv4;
            var icp = NetworkInformation.GetInternetConnectionProfile();

            if (icp?.NetworkAdapter == null)
            {
                promise.Reject(new InvalidOperationException("Network adapter not found."));
            }
            else
            {
                var hostname = NetworkInformation.GetHostNames()
                    .FirstOrDefault(
                        hn =>
                            hn.Type == hostNameType &&
                            hn.IPInformation?.NetworkAdapter != null &&
                            hn.IPInformation.NetworkAdapter.NetworkAdapterId == icp.NetworkAdapter.NetworkAdapterId);
                promise.Resolve(hostname?.CanonicalName);
            }
        }
		
        [ReactMethod]
        public async void getCameraPresence(IPromise promise)
        {
            var devices = await Windows.Devices.Enumeration.DeviceInformation.FindAllAsync(Windows.Devices.Enumeration.DeviceClass.VideoCapture);
            promise.Resolve(devices.Count > 0);
        }
		
        [ReactMethod]
        public async void getBatteryLevel(IPromise promise)
        {
            // Create aggregate battery object
            var aggBattery = Battery.AggregateBattery;

            // Get report
            var report = aggBattery.GetReport();

            if ((report.FullChargeCapacityInMilliwattHours == null) ||
                (report.RemainingCapacityInMilliwattHours == null))
            {
                promise.Reject(new InvalidOperationException("Could not fetch battery information."));
            }
            else
            {
                var max = Convert.ToDouble(report.FullChargeCapacityInMilliwattHours);
                var value = Convert.ToDouble(report.RemainingCapacityInMilliwattHours);
                promise.Resolve(value / max);
            }
        }

        [ReactMethod]
        public async void getCameraPresence(IPromise promise)
        {
            var devices = await Windows.Devices.Enumeration.DeviceInformation.FindAllAsync(Windows.Devices.Enumeration.DeviceClass.VideoCapture);
            promise.Resolve(devices.Count > 0);
        }
		
        [ReactMethod]
        public async void getAppVersion(IPromise promise) { promise.Resolve("not available"); }

        [ReactMethod]
        public async void getBuildVersion(IPromise promise) { promise.Resolve("not available"); }
		
        [ReactMethod]
        public async void getBuildNumber(IPromise promise) { promise.Resolve(0); }
		
        [ReactMethod]
        public async void getAppVersion(IPromise promise)
        {
            try
            {
                PackageVersion version = Package.Current.Id.Version; 
                promise.Resolve(string.Format("{0}.{1}.{2}.{3}", version.Major, version.Minor, version.Build, version.Revision));
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getBuildNumber(IPromise promise)
        {
            try
            {
                PackageVersion version = Package.Current.Id.Version; 
                promise.Resolve(version.Build.ToString());
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getBuildVersion(IPromise promise)
        {
            getBuildNumber(promise);
        }
		
        [ReactMethod]
        public async void getInstanceId(IPromise promise) { promise.Resolve("not available"); }
		
        [ReactMethod]
        public async void getSystemName(IPromise promise) { promise.Resolve("Windows"); }
		
        [ReactMethod]
        public async void getApiLevel(IPromise promise) { promise.Resolve("not available"); }
		
        [ReactMethod]
        public async void getBuildId(IPromise promise) { promise.Resolve("not available"); }
		
        [ReactMethod]
        public async void getUserAgent(IPromise promise) { promise.Resolve("not available"); }
		
        [ReactMethod]
        public async void getCarrier(IPromise promise) { promise.Resolve("not available"); }
		
        [ReactMethod]
        public async void getMaxMemory(IPromise promise) { promise.Resolve(MemoryManager.AppMemoryUsageLimit); }
		
        [ReactMethod]
        public async void getFirstInstallTime(IPromise promise) { promise.Resolve(Package.Current.InstalledDate.ToUnixTimeMilliseconds()); }
		
        [ReactMethod]
        public async void getAppName(IPromise promise) { promise.Resolve(Package.Current.DisplayName); }
		
        [ReactMethod]
        public async void getBundleId(IPromise promise) { promise.Resolve(Package.Current.Id.Name); }
		
        [ReactMethod]
        public async void getDeviceName(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                promise.Resolve(deviceInfo.FriendlyName);
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getSystemVersion(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                string deviceFamilyVersion = Windows.System.Profile.AnalyticsInfo.VersionInfo.DeviceFamilyVersion;
                ulong version2 = ulong.Parse(deviceFamilyVersion);
                ulong major = (version2 & 0xFFFF000000000000L) >> 48;
                ulong minor = (version2 & 0x0000FFFF00000000L) >> 32;
                osVersion = $"{major}.{minor}";
                promise.Resolve(osVersion);
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getModel(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                promise.Resolve(deviceInfo.SystemProductName);
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getBrand(IPromise promise)
        {
            getModel(promise);
        }
		
        [ReactMethod]
        public async void isEmulator(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                promise.Resolve(isEmulator(deviceInfo.SystemProductName));
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getUniqueId(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                promise.Resolve(deviceInfo.Id.toString());
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getDeviceId(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                promise.Resolve(deviceInfo.SystemHardwareVersion);
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void getSystemManufacturer(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                promise.Resolve(deviceInfo.SystemManufacturer);
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
		
        [ReactMethod]
        public async void isTablet(IPromise promise)
        {
            try
            {
                var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                promise.Resolve(isTablet(deviceInfo.OperatingSystem));
            }
            catch (Exception ex)
            {
                promise.Reject(ex);
            }
        }
    }
}
