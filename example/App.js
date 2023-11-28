/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component, useCallback, memo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  getManufacturer,
  getManufacturerSync,
  syncUniqueId,
  getUniqueId,
  getUniqueIdSync,
  useBatteryLevel,
  useBatteryLevelIsLow,
  usePowerState,
  useFirstInstallTime,
  useDeviceName,
  useManufacturer,
  useHasSystemFeature,
  useIsEmulator,
  useIsHeadphonesConnected,
  useBrightness,
} from 'react-native-device-info';

const FunctionalComponent = () => {
  const batteryLevel = useBatteryLevel();
  const batteryLevelIsLow = useBatteryLevelIsLow();
  const powerState = usePowerState();
  const firstInstallTime = useFirstInstallTime();
  const deviceName = useDeviceName();
  const manufacturer = useManufacturer();
  const hasSystemFeature = useHasSystemFeature('amazon.hardware.fire_tv');
  const isEmulator = useIsEmulator();
  const isHeadphonesConnected = useIsHeadphonesConnected();
  const brightness = useBrightness();
  const deviceJSON = {
    batteryLevel,
    batteryLevelIsLow,
    powerState,
    firstInstallTime,
    deviceName,
    manufacturer,
    hasSystemFeature,
    isEmulator,
    isHeadphonesConnected,
    brightness,
  };

  return (
    <ScrollView>
      <Text style={styles.instructions} testID="hooks tab contents">
        {JSON.stringify(deviceJSON, null, '  ')}
      </Text>
    </ScrollView>
  );
};

const ActionExtensionHeader = memo(({isActionExtension}) => {
  const onDonePress = useCallback(() => {
    NativeModules.ActionExtension.done();
  }, []);
  return isActionExtension ? (
    <View style={{minHeight: 50, flexDirection: 'row', margin: 10}}>
      <TouchableOpacity onPress={onDonePress}>
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 20,
            minWidth: 80,
            minHeight: 40,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Done</Text>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View />
  );
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'constant',
      constantdeviceinfo: this.getConstantDeviceInfo(),
      asyncdeviceinfo: {},
      syncdeviceinfo: this.getSyncDeviceInfo(),
    };
  }

  getConstantDeviceInfo() {
    let deviceJSON = {};

    deviceJSON.deviceId = DeviceInfo.getDeviceId();
    deviceJSON.bundleId = DeviceInfo.getBundleId();
    deviceJSON.systemName = DeviceInfo.getSystemName();
    deviceJSON.systemVersion = DeviceInfo.getSystemVersion();
    deviceJSON.version = DeviceInfo.getVersion();
    deviceJSON.readableVersion = DeviceInfo.getReadableVersion();
    deviceJSON.buildNumber = DeviceInfo.getBuildNumber();
    deviceJSON.isTablet = DeviceInfo.isTablet();
    deviceJSON.isLowRamDevice = DeviceInfo.isLowRamDevice();
    deviceJSON.isDisplayZoomed = DeviceInfo.isDisplayZoomed();
    deviceJSON.appName = DeviceInfo.getApplicationName();
    deviceJSON.brand = DeviceInfo.getBrand();
    deviceJSON.model = DeviceInfo.getModel();
    deviceJSON.deviceType = DeviceInfo.getDeviceType();

    return deviceJSON;
  }

  getSyncDeviceInfo() {
    let deviceJSON = {};

    deviceJSON.uniqueId = getUniqueIdSync();
    deviceJSON.manufacturer = getManufacturerSync();
    deviceJSON.buildId = DeviceInfo.getBuildIdSync();
    deviceJSON.isCameraPresent = DeviceInfo.isCameraPresentSync();
    deviceJSON.deviceName = DeviceInfo.getDeviceNameSync();
    deviceJSON.usedMemory = DeviceInfo.getUsedMemorySync();
    deviceJSON.instanceId = DeviceInfo.getInstanceIdSync();
    deviceJSON.installReferrer = DeviceInfo.getInstallReferrerSync();
    deviceJSON.installerPackageName = DeviceInfo.getInstallerPackageNameSync();
    deviceJSON.isEmulator = DeviceInfo.isEmulatorSync();
    deviceJSON.fontScale = DeviceInfo.getFontScaleSync();
    deviceJSON.hasNotch = DeviceInfo.hasNotch();
    deviceJSON.hasDynamicIsland = DeviceInfo.hasDynamicIsland();
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
    deviceJSON.totalDiskCapacityOld = DeviceInfo.getTotalDiskCapacityOldSync();
    deviceJSON.freeDiskStorage = DeviceInfo.getFreeDiskStorageSync();
    deviceJSON.freeDiskStorageOld = DeviceInfo.getFreeDiskStorageOldSync();
    deviceJSON.batteryLevel = DeviceInfo.getBatteryLevelSync();
    deviceJSON.isLandscape = DeviceInfo.isLandscapeSync();
    deviceJSON.isAirplaneMode = DeviceInfo.isAirplaneModeSync();
    deviceJSON.isBatteryCharging = DeviceInfo.isBatteryChargingSync();
    deviceJSON.isPinOrFingerprintSet = DeviceInfo.isPinOrFingerprintSetSync();
    deviceJSON.supportedAbis = DeviceInfo.supportedAbisSync();
    deviceJSON.hasSystemFeature = DeviceInfo.hasSystemFeatureSync(
      'android.software.webview',
    );
    deviceJSON.getSystemAvailableFeatures = DeviceInfo.getSystemAvailableFeaturesSync();
    deviceJSON.powerState = DeviceInfo.getPowerStateSync();
    deviceJSON.isLocationEnabled = DeviceInfo.isLocationEnabledSync();
    deviceJSON.headphones = DeviceInfo.isHeadphonesConnectedSync();
    deviceJSON.getAvailableLocationProviders = DeviceInfo.getAvailableLocationProvidersSync();
    deviceJSON.bootloader = DeviceInfo.getBootloaderSync();
    deviceJSON.device = DeviceInfo.getDeviceSync();
    deviceJSON.display = DeviceInfo.getDisplaySync();
    deviceJSON.fingerprint = DeviceInfo.getFingerprintSync();
    deviceJSON.hardware = DeviceInfo.getHardwareSync();
    deviceJSON.host = DeviceInfo.getHostSync();
    deviceJSON.hostNames = DeviceInfo.getHostNamesSync();
    deviceJSON.product = DeviceInfo.getProductSync();
    deviceJSON.tags = DeviceInfo.getTagsSync();
    deviceJSON.type = DeviceInfo.getTypeSync();
    deviceJSON.baseOS = DeviceInfo.getBaseOsSync();
    deviceJSON.previewSdkInt = DeviceInfo.getPreviewSdkIntSync();
    deviceJSON.securityPatch = DeviceInfo.getSecurityPatchSync();
    deviceJSON.codename = DeviceInfo.getCodenameSync();
    deviceJSON.incremental = DeviceInfo.getIncrementalSync();
    deviceJSON.brightness = DeviceInfo.getBrightnessSync();
    deviceJSON.supported32BitAbis = DeviceInfo.supported32BitAbisSync();
    deviceJSON.supported64BitAbis = DeviceInfo.supported64BitAbisSync();
    deviceJSON.hasGms = DeviceInfo.hasGmsSync();
    deviceJSON.hasHms = DeviceInfo.hasHmsSync();
    deviceJSON.isMouseConnected = DeviceInfo.isMouseConnectedSync();
    deviceJSON.isKeyboardConnected = DeviceInfo.isKeyboardConnectedSync();
    deviceJSON.getSupportedMediaTypeListSync = DeviceInfo.getSupportedMediaTypeListSync();

    return deviceJSON;
  }

  async componentDidMount() {
    let deviceJSON = {};

    try {
      deviceJSON.uniqueId = await getUniqueId();
      deviceJSON.syncUniqueId = await syncUniqueId();
      deviceJSON.manufacturer = await getManufacturer();
      deviceJSON.buildId = await DeviceInfo.getBuildId();
      deviceJSON.isCameraPresent = await DeviceInfo.isCameraPresent();
      deviceJSON.deviceName = await DeviceInfo.getDeviceName();
      deviceJSON.usedMemory = await DeviceInfo.getUsedMemory();
      deviceJSON.userAgent = await DeviceInfo.getUserAgent();
      deviceJSON.instanceId = await DeviceInfo.getInstanceId();
      deviceJSON.installReferrer = await DeviceInfo.getInstallReferrer();
      deviceJSON.installerPackageName = await DeviceInfo.getInstallerPackageName();
      deviceJSON.isEmulator = await DeviceInfo.isEmulator();
      deviceJSON.fontScale = await DeviceInfo.getFontScale();
      deviceJSON.hasNotch = await DeviceInfo.hasNotch();
      deviceJSON.hasDynamicIsland = await DeviceInfo.hasDynamicIsland();
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
      deviceJSON.totalDiskCapacityOld = await DeviceInfo.getTotalDiskCapacityOld();
      deviceJSON.freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
      deviceJSON.freeDiskStorageOld = await DeviceInfo.getFreeDiskStorageOld();
      deviceJSON.batteryLevel = await DeviceInfo.getBatteryLevel();
      deviceJSON.isLandscape = await DeviceInfo.isLandscape();
      deviceJSON.isAirplaneMode = await DeviceInfo.isAirplaneMode();
      deviceJSON.isBatteryCharging = await DeviceInfo.isBatteryCharging();
      deviceJSON.isPinOrFingerprintSet = await DeviceInfo.isPinOrFingerprintSet();
      deviceJSON.supportedAbis = await DeviceInfo.supportedAbis();
      deviceJSON.hasSystemFeature = await DeviceInfo.hasSystemFeature(
        'android.software.webview',
      );
      deviceJSON.getSystemAvailableFeatures = await DeviceInfo.getSystemAvailableFeatures();
      deviceJSON.powerState = await DeviceInfo.getPowerState();
      deviceJSON.isLocationEnabled = await DeviceInfo.isLocationEnabled();
      deviceJSON.headphones = await DeviceInfo.isHeadphonesConnected();
      deviceJSON.getAvailableLocationProviders = await DeviceInfo.getAvailableLocationProviders();
      deviceJSON.bootloader = await DeviceInfo.getBootloader();
      deviceJSON.device = await DeviceInfo.getDevice();
      deviceJSON.display = await DeviceInfo.getDisplay();
      deviceJSON.fingerprint = await DeviceInfo.getFingerprint();
      deviceJSON.hardware = await DeviceInfo.getHardware();
      deviceJSON.host = await DeviceInfo.getHost();
      deviceJSON.hostNames = await DeviceInfo.getHostNames();
      deviceJSON.product = await DeviceInfo.getProduct();
      deviceJSON.tags = await DeviceInfo.getTags();
      deviceJSON.type = await DeviceInfo.getType();
      deviceJSON.baseOS = await DeviceInfo.getBaseOs();
      deviceJSON.previewSdkInt = await DeviceInfo.getPreviewSdkInt();
      deviceJSON.securityPatch = await DeviceInfo.getSecurityPatch();
      deviceJSON.codename = await DeviceInfo.getCodename();
      deviceJSON.incremental = await DeviceInfo.getIncremental();
      deviceJSON.brightness = await DeviceInfo.getBrightness();
      deviceJSON.supported32BitAbis = await DeviceInfo.supported32BitAbis();
      deviceJSON.supported64BitAbis = await DeviceInfo.supported64BitAbis();
      deviceJSON.hasGms = await DeviceInfo.hasGms();
      deviceJSON.hasHms = await DeviceInfo.hasHms();
      deviceJSON.synchronizedUniqueId = await DeviceInfo.syncUniqueId();
      deviceJSON.isMouseConnected = await DeviceInfo.isMouseConnected();
      deviceJSON.isKeyboardConnected = await DeviceInfo.isKeyboardConnected();
      deviceJSON.isTabletMode = await DeviceInfo.isTabletMode();
      deviceJSON.getSupportedMediaTypeList = await DeviceInfo.getSupportedMediaTypeList();
      try {
        deviceJSON.deviceToken = await DeviceInfo.getDeviceToken();
      } catch (e) {
        console.log(
          'Trouble getting device token, likely a simulator or not iOS11+',
        );
      }
    } catch (e) {
      console.log('Trouble getting device info ', e);
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({asyncdeviceinfo: deviceJSON});
    this.forceUpdate();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ActionExtensionHeader
          isActionExtension={this.props.isActionExtension}
        />
        {this.state.activeTab === 'constant' ? (
          <>
            <Text style={styles.welcome}>
              react-native-device-info example - constant info:
            </Text>
            <ScrollView>
              <Text style={styles.instructions} testID="constant tab contents">
                {JSON.stringify(this.state.constantdeviceinfo, null, '  ')}
              </Text>
            </ScrollView>
          </>
        ) : this.state.activeTab === 'sync' ? (
          <>
            <Text style={styles.welcome}>
              react-native-device-info example - sync info:
            </Text>
            <ScrollView>
              <Text style={styles.instructions} testID="sync tab contents">
                {JSON.stringify(this.state.syncdeviceinfo, null, '  ')}
              </Text>
            </ScrollView>
          </>
        ) : this.state.activeTab === 'async' ? (
          <>
            <Text style={styles.welcome}>
              react-native-device-info example - async info:
            </Text>
            <ScrollView>
              <Text style={styles.instructions} testID="async tab contents">
                {JSON.stringify(this.state.asyncdeviceinfo, null, '  ')}
              </Text>
            </ScrollView>
          </>
        ) : this.state.activeTab === 'hooks' ? (
          <>
            <Text style={styles.welcome}>
              react-native-device-info example - hooks:
            </Text>
            <FunctionalComponent />
          </>
        ) : null}

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tab}
            testID="constant button"
            onPress={() => this.setState({activeTab: 'constant'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'constant' && styles.boldText,
              ]}>
              Constant
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            testID="sync button"
            onPress={() => this.setState({activeTab: 'sync'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'sync' && styles.boldText,
              ]}>
              Sync
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            testID="async button"
            onPress={() => this.setState({activeTab: 'async'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'async' && styles.boldText,
              ]}>
              Async
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            testID="hooks button"
            onPress={() => this.setState({activeTab: 'hooks'})}>
            <Text
              style={[
                styles.tabText,
                this.state.activeTab === 'hooks' && styles.boldText,
              ]}>
              Hooks
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    margin: 5,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopColor: '#333333',
    borderTopWidth: 1,
  },
  tab: {
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: '#333333',
  },
  boldText: {
    fontWeight: '700',
  },
});
