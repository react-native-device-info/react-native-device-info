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

namespace RNDeviceInfo
{
    [ReactModule("RNDeviceInfo")]
    class RNDeviceInfoModule
    {
        // TODO: how return constants?
        /*
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
        } */

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

        [ReactMethod]
        public bool isPinOrFingerprintSetSync()
        {
            // TODO: Is this synchronous method?
            return isPinOrFingerprint().Result;
        }

        [ReactMethod]
        public async void isPinOrFingerprintSet(IReactPromise<bool> result)
        {
            var ret = await isPinOrFingerprint();
            result.Resolve(ret);
        }

    }
}
