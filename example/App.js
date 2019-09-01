/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, SafeAreaView} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  getUniqueId,
  getManufacturer,
  getBrand,
  getModel,
  getDeviceId,
} from 'react-native-device-info';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceinfo: {},
    };
  }

  async componentDidMount() {
    let deviceJSON = {};
    const ios = Platform.OS === 'ios';

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
        <Text style={styles.welcome}>react-native-device-info example - info:</Text>
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
