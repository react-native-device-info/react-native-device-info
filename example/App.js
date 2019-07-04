/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

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

      deviceJSON.uniqueID = DeviceInfo.getUniqueID();
      deviceJSON.manufacturer = DeviceInfo.getManufacturer();
      deviceJSON.brand = DeviceInfo.getBrand();
      deviceJSON.model = DeviceInfo.getModel();
      deviceJSON.deviceId = DeviceInfo.getDeviceId();
      deviceJSON.systemName = DeviceInfo.getSystemName();
      deviceJSON.systemVersion = DeviceInfo.getSystemVersion();
      deviceJSON.buildId = DeviceInfo.getBuildId();
      deviceJSON.bundleId = DeviceInfo.getBundleId();
      deviceJSON.isCameraPresent = ios ? -1 : await DeviceInfo.getCameraPresence();
      deviceJSON.buildNumber = DeviceInfo.getBuildNumber();
      deviceJSON.version = DeviceInfo.getVersion();
      deviceJSON.readableVersion = DeviceInfo.getReadableVersion();
      deviceJSON.deviceName = DeviceInfo.getDeviceName(); // needs android.permission.BLUETOOTH ?
      deviceJSON.userAgent = DeviceInfo.getUserAgent();
      deviceJSON.deviceLocale = DeviceInfo.getDeviceLocale();
      deviceJSON.preferredLocales = DeviceInfo.getPreferredLocales();
      deviceJSON.deviceCountry = DeviceInfo.getDeviceCountry();
      deviceJSON.timezone = DeviceInfo.getTimezone();
      deviceJSON.instanceID = ios ? '' : DeviceInfo.getInstanceID();
      deviceJSON.installReferrer = ios ? '' : DeviceInfo.getInstallReferrer();
      deviceJSON.isEmulator = DeviceInfo.isEmulator();
      deviceJSON.isTablet = DeviceInfo.isTablet();
      deviceJSON.fontScale = DeviceInfo.getFontScale();
      deviceJSON.hasNotch = DeviceInfo.hasNotch();
      deviceJSON.firstInstallTime = ios ? -1 : DeviceInfo.getFirstInstallTime();
      deviceJSON.lastUpdateTime = ios ? -1 : DeviceInfo.getLastUpdateTime();
      deviceJSON.serialNumber = ios ? -1 : DeviceInfo.getSerialNumber();
      deviceJSON.IPAddress = await DeviceInfo.getIPAddress();
      deviceJSON.MACAddress = await DeviceInfo.getMACAddress(); // needs android.permission.ACCESS_WIFI_STATE ?
      deviceJSON.phoneNumber = ios ? '' : DeviceInfo.getPhoneNumber(); // needs android.permission.READ_PHONE_STATE ?
      deviceJSON.APILevel = ios ? -1 : DeviceInfo.getAPILevel();
      deviceJSON.carrier = DeviceInfo.getCarrier();
      deviceJSON.totalMemory = DeviceInfo.getTotalMemory();
      deviceJSON.maxMemory = ios ? -1 : DeviceInfo.getMaxMemory();
      deviceJSON.totalDiskCapacity = DeviceInfo.getTotalDiskCapacity(); // FIXME needs a patch for integer overflow on Android
      deviceJSON.freeDiskStorage = DeviceInfo.getFreeDiskStorage(); // FIXME needs a patch for integer overflow on Android
      deviceJSON.batteryLevel = await DeviceInfo.getBatteryLevel();
      deviceJSON.isLandscape = DeviceInfo.isLandscape();
      deviceJSON.isAirplaneMode = ios ? false : await DeviceInfo.isAirPlaneMode();
      deviceJSON.isBatteryCharging = ios ? false : await DeviceInfo.isBatteryCharging();
      deviceJSON.deviceType = DeviceInfo.getDeviceType();
      deviceJSON.isPinOrFingerprintSet = 'unknown';
      deviceJSON.supportedABIs = DeviceInfo.supportedABIs();
      deviceJSON.hasSystemFeature = ios ? false : await DeviceInfo.hasSystemFeature('amazon.hardware.fire_tv');
      deviceJSON.getSystemAvailableFeatures = ios ? [] : await DeviceInfo.getSystemAvailableFeatures();
      deviceJSON.powerState = ios ? await DeviceInfo.getPowerState() : '';
      deviceJSON.isLocationEnabled = await DeviceInfo.isLocationEnabled();
      deviceJSON.getAvailableLocationProviders = await DeviceInfo.getAvailableLocationProviders();
      deviceJSON.bootloader = ios ? '' : DeviceInfo.getBootloader();
      deviceJSON.device = ios ? '' : DeviceInfo.getDevice();
      deviceJSON.display = ios ? '' : DeviceInfo.getDisplay();
      deviceJSON.fingerprint = ios ? '' : DeviceInfo.getFingerprint();
      deviceJSON.hardware = ios ? '' : DeviceInfo.getHardware();
      deviceJSON.host = ios ? '' : DeviceInfo.getHost();
      deviceJSON.product = ios ? '' : DeviceInfo.getProduct();
      deviceJSON.tags = ios ? '' : DeviceInfo.getTags();
      deviceJSON.type = ios ? '' : DeviceInfo.getType();
      deviceJSON.baseOS = ios ? '' : DeviceInfo.getBaseOS();
      deviceJSON.previewSdkInt = ios ? -1 : DeviceInfo.getPreviewSdkInt();
      deviceJSON.securityPatch = ios ? '' : DeviceInfo.getSecurityPatch();
      deviceJSON.codename = ios ? '' : DeviceInfo.getCodename();
      deviceJSON.incremental = ios ? '' : DeviceInfo.getIncremental();
      deviceJSON.supported32BitAbis = ios ? [] : DeviceInfo.supported32BitAbis();
      deviceJSON.supported64BitAbis = ios ? [] : DeviceInfo.supported64BitAbis();
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }

    DeviceInfo.isPinOrFingerprintSet()(this.keyguardCallback);

    console.log('loaded info');
    this.setState({ deviceinfo: deviceJSON });
    this.forceUpdate();
    console.log(this.state.deviceinfo);
  }

  keyguardCallback = (pinSet) => {
    console.log('callback called with value: ' + pinSet);
    let deviceJSON = this.state.deviceinfo;
    deviceJSON.isPinOrFingerprintSet = pinSet;
    this.setState({ deviceinfo: deviceJSON });
    this.forceUpdate();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>react-native-device-info example - info:</Text>
        <ScrollView>
          <Text style={styles.instructions}>{JSON.stringify(this.state.deviceinfo, null, '\t')}</Text>
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
