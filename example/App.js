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
  getUniqueID,
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
      deviceJSON.uniqueID = await getUniqueID();
      deviceJSON.manufacturer = await getManufacturer();
      deviceJSON.brand = await getBrand();
      deviceJSON.model = await getModel();
      deviceJSON.deviceId = await getDeviceId();
      deviceJSON.systemName = await DeviceInfo.getSystemName();
      deviceJSON.systemVersion = await DeviceInfo.getSystemVersion();
      deviceJSON.buildId = await DeviceInfo.getBuildId();
      deviceJSON.bundleId = await DeviceInfo.getBundleId();
      deviceJSON.isCameraPresent = ios ? -1 : await DeviceInfo.getCameraPresence();
      deviceJSON.buildNumber = await DeviceInfo.getBuildNumber();
      deviceJSON.version = await DeviceInfo.getVersion();
      deviceJSON.readableVersion = await DeviceInfo.getReadableVersion();
      deviceJSON.deviceName = await DeviceInfo.getDeviceName();
      deviceJSON.usedMemory = await DeviceInfo.getUsedMemory();
      deviceJSON.userAgent = await DeviceInfo.getUserAgent();
      deviceJSON.instanceID = ios ? '' : await DeviceInfo.getInstanceID();
      deviceJSON.installReferrer = ios ? '' : await DeviceInfo.getInstallReferrer();
      deviceJSON.isEmulator = await DeviceInfo.isEmulator();
      deviceJSON.isTablet = await DeviceInfo.isTablet();
      deviceJSON.fontScale = await DeviceInfo.getFontScale();
      deviceJSON.hasNotch = await DeviceInfo.hasNotch();
      deviceJSON.firstInstallTime = ios ? -1 : await DeviceInfo.getFirstInstallTime();
      deviceJSON.lastUpdateTime = ios ? -1 : await DeviceInfo.getLastUpdateTime();
      deviceJSON.serialNumber = ios ? -1 : await DeviceInfo.getSerialNumber();
      deviceJSON.IPAddress = await DeviceInfo.getIPAddress();
      deviceJSON.MACAddress = await DeviceInfo.getMACAddress(); // needs android.permission.ACCESS_WIFI_STATE ?
      deviceJSON.phoneNumber = ios ? '' : await DeviceInfo.getPhoneNumber(); // needs android.permission.READ_PHONE_STATE ?
      deviceJSON.APILevel = ios ? -1 : await DeviceInfo.getAPILevel();
      deviceJSON.carrier = await DeviceInfo.getCarrier();
      deviceJSON.totalMemory = await DeviceInfo.getTotalMemory();
      deviceJSON.maxMemory = ios ? -1 : await DeviceInfo.getMaxMemory();
      deviceJSON.totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity(); // FIXME needs a patch for integer overflow on Android
      deviceJSON.freeDiskStorage = await DeviceInfo.getFreeDiskStorage(); // FIXME needs a patch for integer overflow on Android
      deviceJSON.batteryLevel = await DeviceInfo.getBatteryLevel();
      deviceJSON.isLandscape = await DeviceInfo.isLandscape();
      deviceJSON.isAirplaneMode = ios ? false : await DeviceInfo.isAirPlaneMode();
      deviceJSON.isBatteryCharging = ios ? false : await DeviceInfo.isBatteryCharging();
      deviceJSON.deviceType = await DeviceInfo.getDeviceType();
      deviceJSON.isPinOrFingerprintSet = await DeviceInfo.isPinOrFingerprintSet();
      deviceJSON.supportedAbis = await DeviceInfo.supportedAbis();
      deviceJSON.hasSystemFeature = ios
        ? false
        : await DeviceInfo.hasSystemFeature('amazon.hardware.fire_tv');
      deviceJSON.getSystemAvailableFeatures = ios
        ? []
        : await DeviceInfo.getSystemAvailableFeatures();
      deviceJSON.powerState = ios ? await DeviceInfo.getPowerState() : '';
      deviceJSON.isLocationEnabled = await DeviceInfo.isLocationEnabled();
      deviceJSON.getAvailableLocationProviders = await DeviceInfo.getAvailableLocationProviders();
      deviceJSON.bootloader = ios ? '' : await DeviceInfo.getBootloader();
      deviceJSON.device = ios ? '' : await DeviceInfo.getDevice();
      deviceJSON.display = ios ? '' : await DeviceInfo.getDisplay();
      deviceJSON.fingerprint = ios ? '' : await DeviceInfo.getFingerprint();
      deviceJSON.hardware = ios ? '' : await DeviceInfo.getHardware();
      deviceJSON.host = ios ? '' : await DeviceInfo.getHost();
      deviceJSON.product = ios ? '' : await DeviceInfo.getProduct();
      deviceJSON.tags = ios ? '' : await DeviceInfo.getTags();
      deviceJSON.type = ios ? '' : await DeviceInfo.getType();
      deviceJSON.baseOS = ios ? '' : await DeviceInfo.getBaseOS();
      deviceJSON.previewSdkInt = ios ? -1 : await DeviceInfo.getPreviewSdkInt();
      deviceJSON.securityPatch = ios ? '' : await DeviceInfo.getSecurityPatch();
      deviceJSON.codename = ios ? '' : await DeviceInfo.getCodename();
      deviceJSON.incremental = ios ? '' : await DeviceInfo.getIncremental();
      deviceJSON.supported32BitAbis = ios ? [] : await DeviceInfo.supported32BitAbis();
      deviceJSON.supported64BitAbis = ios ? [] : await DeviceInfo.supported64BitAbis();
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
