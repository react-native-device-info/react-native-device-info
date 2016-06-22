using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using System.Globalization;
using Windows.ApplicationModel;

namespace ReactNative.Modules.RNDeviceInfo
{
    public class RNDeviceModule : ReactContextNativeModuleBase
    {
        ReactContext reactContext = null;
        public RNDeviceModule(ReactContext reactContext)
            : base(reactContext)
        {
            this.reactContext = reactContext;
        }

        public override string Name
        {
            get
            {
                return "RNDeviceInfo";
            }
        }

        public override IReadOnlyDictionary<string, object> Constants
        {
            get
            {
                Dictionary<string, object> constants = new Dictionary<string, object>();

                constants.Add("appVersion", "not available");
                constants.Add("buildVersion", "not available");
                constants.Add("buildNumber", 0);

                Package package = Package.Current;
                PackageId packageId = package.Id;
                PackageVersion version = packageId.Version;
                String packageName = package.DisplayName;

                try
                {
                    constants["appVersion"] = string.Format("{0}.{1}.{2}.{3}", version.Major, version.Minor, version.Build, version.Revision);
                    constants["buildNumber"] = version.Build.ToString();
                } catch {
                }

                String deviceName = "Unknown";
                String manufacturer = "Uknown";
                String device_id = "Unknown";
                String model = "Unknown";
                String firmware_version = "Unknown";

                CultureInfo culture = CultureInfo.CurrentCulture;

                try {
                    var deviceInfo = new Windows.Security.ExchangeActiveSyncProvisioning.EasClientDeviceInformation();
                    deviceName = deviceInfo.FriendlyName;
                    manufacturer = deviceInfo.SystemManufacturer;
                    device_id = deviceInfo.Id.ToString();
                    firmware_version = deviceInfo.SystemFirmwareVersion.ToString();
                    model = deviceInfo.SystemProductName;
                } catch {
                }

                constants["deviceName"] = deviceName;
                constants["systemName"] = "UWP";
                constants["systemVersion"] = firmware_version;
                constants["model"] = model;
                constants["deviceId"] = model;
                constants["deviceLocale"] = culture.Name;
                constants["deviceCountry"] = culture.EnglishName;
                constants["uniqueId"] = device_id;
                constants["systemManufacturer"] = manufacturer;
                constants["bundleId"] = packageName;
                constants["userAgent"] = "unknown";

                return constants;
            }
        }
    }
}
