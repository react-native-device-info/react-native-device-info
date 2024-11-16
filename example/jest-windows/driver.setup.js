import { windowsAppDriverCapabilities } from 'selenium-appium'

switch (platform) {
  case "windows":
    const webViewWindowsAppId = 'RNDeviceInfoExample_dyx31pess4x64!App';
    module.exports = {
      capabilites: windowsAppDriverCapabilities(webViewWindowsAppId)
    }
    break;
  default:
    module.exports = {}
}
