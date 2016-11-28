using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Text.RegularExpressions;
using Windows.ApplicationModel;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using WinRTXamlToolkit.Controls;

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

        public override IReadOnlyDictionary<string, object> Constants
        {

            get
            {
                Dictionary<string, object> constants = new Dictionary<string, object>();

                constants["appVersion"] = "not available";
                constants["buildVersion"] = "not available";
                constants["buildNumber"] = 0;

                Package package = Package.Current;
                PackageId packageId = package.Id;
                PackageVersion version = packageId.Version;
                String packageName = package.DisplayName;

                try
                {
                    constants["appVersion"] = string.Format("{0}.{1}.{2}.{3}", version.Major, version.Minor, version.Build, version.Revision);
                    constants["buildNumber"] = version.Build.ToString();
                    constants["buildVersion"] = version.Build.ToString();
                }
                catch
                {
                }

                String deviceName = "not available";
                String manufacturer = "not available";
                String device_id = "not available";
                String model = "not available";
                String hardwareVersion = "not available";
                String osVersion = "not available";
                String os = "not available";

                CultureInfo culture = CultureInfo.CurrentCulture;

                try
                {
                    var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                    deviceName = deviceInfo.FriendlyName;
                    manufacturer = deviceInfo.SystemManufacturer;
                    device_id = deviceInfo.Id.ToString();
                    model = deviceInfo.SystemProductName;
                    hardwareVersion = deviceInfo.SystemHardwareVersion;
                    os = deviceInfo.OperatingSystem;
                    

                    string deviceFamilyVersion = Windows.System.Profile.AnalyticsInfo.VersionInfo.DeviceFamilyVersion;
                    ulong version2 = ulong.Parse(deviceFamilyVersion);
                    ulong major = (version2 & 0xFFFF000000000000L) >> 48;
                    ulong minor = (version2 & 0x0000FFFF00000000L) >> 32;
                    osVersion = $"{major}.{minor}";
                }
                catch
                {
                }

                constants["instanceId"] = "not available";
                constants["deviceName"] = deviceName;
                constants["systemName"] = "Windows";
                constants["systemVersion"] = osVersion;
                constants["model"] = model;
                constants["brand"] = model;
                constants["deviceId"] = hardwareVersion;
                constants["deviceLocale"] = culture.Name;
                constants["deviceCountry"] = culture.EnglishName;
                constants["uniqueId"] = device_id;
                constants["systemManufacturer"] = manufacturer;
                constants["bundleId"] = packageName;
                constants["userAgent"] = "not available";
                constants["timezone"] = TimeZoneInfo.Local.Id;
                constants["isEmulator"] = IsEmulator(model);
                constants["isTablet"] = IsTablet(os);

                return constants;
            }
        }
    }
}
