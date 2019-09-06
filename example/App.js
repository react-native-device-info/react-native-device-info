/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  getUniqueId,
  getUniqueIdSync,
  getManufacturer,
  getManufacturerSync,
  getBrand,
  getBrandSync,
  getModel,
  getModelSync,
  getDeviceId,
  getDeviceIdSync,
} from 'react-native-device-info';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceinfo: {},
      syncdeviceinfo: this.getSyncDeviceInfo(),
    };
  }

  getSyncDeviceInfo() {
    let deviceJSON = {};

    deviceJSON.uniqueId = getUniqueIdSync();
    deviceJSON.manufacturer = getManufacturerSync();
    deviceJSON.brand = getBrandSync();
    deviceJSON.model = getModelSync();
    deviceJSON.deviceId = getDeviceIdSync();
    deviceJSON.systemName = DeviceInfo.getSystemNameSync();
    deviceJSON.systemVersion = DeviceInfo.getSystemVersionSync();
    deviceJSON.buildId = DeviceInfo.getBuildIdSync();
    deviceJSON.bundleId = DeviceInfo.getBundleIdSync();
    deviceJSON.isCameraPresent = DeviceInfo.getCameraPresenceSync();
    deviceJSON.buildNumber = DeviceInfo.getBuildNumberSync();
    deviceJSON.version = DeviceInfo.getVersionSync();
    deviceJSON.readableVersion = DeviceInfo.getReadableVersionSync();
    deviceJSON.deviceName = DeviceInfo.getDeviceNameSync();
    deviceJSON.usedMemory = DeviceInfo.getUsedMemorySync();
    deviceJSON.instanceId = DeviceInfo.getInstanceIdSync();
    deviceJSON.installReferrer = DeviceInfo.getInstallReferrerSync();
    deviceJSON.isEmulator = DeviceInfo.isEmulatorSync();
    deviceJSON.isTablet = DeviceInfo.isTabletSync();
    deviceJSON.fontScale = DeviceInfo.getFontScaleSync();
    deviceJSON.hasNotch = DeviceInfo.hasNotchSync();
    deviceJSON.firstInstallTime = DeviceInfo.getFirstInstallTimeSync();
    deviceJSON.lastUpdateTime = DeviceInfo.getLastUpdateTimeSync();
    deviceJSON.serialNumber = DeviceInfo.getSerialNumberSync();
    deviceJSON.androidId = DeviceInfo.getAndroidIdSync();
    deviceJSON.IpAddress = DeviceInfo.getIpAddressSync();
    deviceJSON.MacAddress = DeviceInfo.getMacAddressSync(); // needs android.permission.ACCESS_WIFI_STATE
    deviceJSON.phoneNumber = DeviceInfo.getPhoneNumberSync(); // needs android.permission.READ_PHONE_STATE
    deviceJSON.ApiLevel = DeviceInfo.getApiLevelSync();
    deviceJSON.carrier = DeviceInfo.getCarrierSync();
    deviceJSON.totalMemory = DeviceInfo.getTotalMemorySync();
    deviceJSON.maxMemory = DeviceInfo.getMaxMemorySync();
    deviceJSON.totalDiskCapacity = DeviceInfo.getTotalDiskCapacitySync();
    deviceJSON.freeDiskStorage = DeviceInfo.getFreeDiskStorageSync();
    deviceJSON.batteryLevel = DeviceInfo.getBatteryLevelSync();
    deviceJSON.isLandscape = DeviceInfo.isLandscapeSync();
    deviceJSON.isAirplaneMode = DeviceInfo.isAirplaneModeSync();
    deviceJSON.isBatteryCharging = DeviceInfo.isBatteryChargingSync();
    deviceJSON.deviceType = DeviceInfo.getDeviceTypeSync();
    deviceJSON.isPinOrFingerprintSet = DeviceInfo.isPinOrFingerprintSetSync();
    deviceJSON.supportedAbis = DeviceInfo.supportedAbisSync();
    deviceJSON.hasSystemFeature = DeviceInfo.hasSystemFeatureSync('android.software.webview');
    deviceJSON.getSystemAvailableFeatures = DeviceInfo.getSystemAvailableFeaturesSync();
    deviceJSON.powerState = DeviceInfo.getPowerStateSync();
    deviceJSON.isLocationEnabled = DeviceInfo.isLocationEnabledSync();
    deviceJSON.getAvailableLocationProviders = DeviceInfo.getAvailableLocationProvidersSync();
    deviceJSON.bootloader = DeviceInfo.getBootloaderSync();
    deviceJSON.device = DeviceInfo.getDeviceSync();
    deviceJSON.display = DeviceInfo.getDisplaySync();
    deviceJSON.fingerprint = DeviceInfo.getFingerprintSync();
    deviceJSON.hardware = DeviceInfo.getHardwareSync();
    deviceJSON.host = DeviceInfo.getHostSync();
    deviceJSON.product = DeviceInfo.getProductSync();
    deviceJSON.tags = DeviceInfo.getTagsSync();
    deviceJSON.type = DeviceInfo.getTypeSync();
    deviceJSON.baseOS = DeviceInfo.getBaseOsSync();
    deviceJSON.previewSdkInt = DeviceInfo.getPreviewSdkIntSync();
    deviceJSON.securityPatch = DeviceInfo.getSecurityPatchSync();
    deviceJSON.codename = DeviceInfo.getCodenameSync();
    deviceJSON.incremental = DeviceInfo.getIncrementalSync();
    deviceJSON.supported32BitAbis = DeviceInfo.supported32BitAbisSync();
    deviceJSON.supported64BitAbis = DeviceInfo.supported64BitAbisSync();

    console.log('loaded info sync');
    return deviceJSON;
  }

  async componentDidMount() {
    let deviceJSON = {};

    try {
      deviceJSON.uniqueId = await getUniqueId();
      deviceJSON.manufacturer = await getManufacturer();
      deviceJSON.brand = await getBrand();
      deviceJSON.model = await getModel();
      deviceJSON.deviceId = await getDeviceId();
      deviceJSON.systemName = await DeviceInfo.getSystemName();
      deviceJSON.systemVersion = await DeviceInfo.getSystemVersion();
      deviceJSON.buildId = await DeviceInfo.getBuildId();
      deviceJSON.bundleId = await DeviceInfo.getBundleId();
      deviceJSON.isCameraPresent = await DeviceInfo.getCameraPresence();
      deviceJSON.buildNumber = await DeviceInfo.getBuildNumber();
      deviceJSON.version = await DeviceInfo.getVersion();
      deviceJSON.readableVersion = await DeviceInfo.getReadableVersion();
      deviceJSON.deviceName = await DeviceInfo.getDeviceName();
      deviceJSON.usedMemory = await DeviceInfo.getUsedMemory();
      deviceJSON.userAgent = await DeviceInfo.getUserAgent();
      deviceJSON.instanceId = await DeviceInfo.getInstanceId();
      deviceJSON.installReferrer = await DeviceInfo.getInstallReferrer();
      deviceJSON.isEmulator = await DeviceInfo.isEmulator();
      deviceJSON.isTablet = await DeviceInfo.isTablet();
      deviceJSON.fontScale = await DeviceInfo.getFontScale();
      deviceJSON.hasNotch = await DeviceInfo.hasNotch();
      deviceJSON.firstInstallTime = await DeviceInfo.getFirstInstallTime();
      deviceJSON.lastUpdateTime = await DeviceInfo.getLastUpdateTime();
      deviceJSON.serialNumber = await DeviceInfo.getSerialNumber();
      deviceJSON.androidId = await DeviceInfo.getAndroidId();
      deviceJSON.IpAddress = await DeviceInfo.getIpAddress();
      deviceJSON.MacAddress = await DeviceInfo.getMacAddress(); // needs android.permission.ACCESS_WIFI_STATE
      deviceJSON.phoneNumber = await DeviceInfo.getPhoneNumber(); // needs android.permission.READ_PHONE_STATE
      deviceJSON.ApiLevel = await DeviceInfo.getApiLevel();
      deviceJSON.carrier = await DeviceInfo.getCarrier();
      deviceJSON.totalMemory = await DeviceInfo.getTotalMemory();
      deviceJSON.maxMemory = await DeviceInfo.getMaxMemory();
      deviceJSON.totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
      deviceJSON.freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
      deviceJSON.batteryLevel = await DeviceInfo.getBatteryLevel();
      deviceJSON.isLandscape = await DeviceInfo.isLandscape();
      deviceJSON.isAirplaneMode = await DeviceInfo.isAirplaneMode();
      deviceJSON.isBatteryCharging = await DeviceInfo.isBatteryCharging();
      deviceJSON.deviceType = await DeviceInfo.getDeviceType();
      deviceJSON.isPinOrFingerprintSet = await DeviceInfo.isPinOrFingerprintSet();
      deviceJSON.supportedAbis = await DeviceInfo.supportedAbis();
      deviceJSON.hasSystemFeature = await DeviceInfo.hasSystemFeature('android.software.webview');
      deviceJSON.getSystemAvailableFeatures = await DeviceInfo.getSystemAvailableFeatures();
      deviceJSON.powerState = await DeviceInfo.getPowerState();
      deviceJSON.isLocationEnabled = await DeviceInfo.isLocationEnabled();
      deviceJSON.getAvailableLocationProviders = await DeviceInfo.getAvailableLocationProviders();
      deviceJSON.bootloader = await DeviceInfo.getBootloader();
      deviceJSON.device = await DeviceInfo.getDevice();
      deviceJSON.display = await DeviceInfo.getDisplay();
      deviceJSON.fingerprint = await DeviceInfo.getFingerprint();
      deviceJSON.hardware = await DeviceInfo.getHardware();
      deviceJSON.host = await DeviceInfo.getHost();
      deviceJSON.product = await DeviceInfo.getProduct();
      deviceJSON.tags = await DeviceInfo.getTags();
      deviceJSON.type = await DeviceInfo.getType();
      deviceJSON.baseOS = await DeviceInfo.getBaseOs();
      deviceJSON.previewSdkInt = await DeviceInfo.getPreviewSdkInt();
      deviceJSON.securityPatch = await DeviceInfo.getSecurityPatch();
      deviceJSON.codename = await DeviceInfo.getCodename();
      deviceJSON.incremental = await DeviceInfo.getIncremental();
      deviceJSON.supported32BitAbis = await DeviceInfo.supported32BitAbis();
      deviceJSON.supported64BitAbis = await DeviceInfo.supported64BitAbis();
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }
    console.log('loaded info');
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({deviceinfo: deviceJSON});
    this.forceUpdate();
    console.log(this.state.deviceinfo);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>react-native-device-info example - sync info:</Text>
        <ScrollView>
          <Text style={styles.instructions}>
            {JSON.stringify(this.state.syncdeviceinfo, null, '\t')}
          </Text>
        </ScrollView>
        <Text style={styles.welcome}>react-native-device-info example - async info:</Text>
        <ScrollView>
          <Text style={styles.instructions}>
            {JSON.stringify(this.state.deviceinfo, null, '\t')}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  },
});
