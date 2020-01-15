import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  getBaseOs,
  getFreeDiskStorage,
  getMaxMemory,
  getPowerState,
  getTotalDiskCapacity,
  getTotalMemory,
  getUsedMemory,
  getUserAgent,
  isAirplaneMode,
  isBatteryChargingSync,
  isCameraPresent,
  isEmulator,
  getVersion,
  isLandscapeSync,
  getBuildNumber,
  getApplicationName,
  isLocationEnabled,
} from 'react-native-device-info';
import { DataTable, Surface, Title } from 'react-native-paper';

const styles = StyleSheet.create({
  surface: { margin: 20, maxWidth: 800 },
  title: { padding: 30, textAlign: 'center' },
});

const useAllSpecs = () => {
  const [freeDisk, setFreeDisk] = useState(null),
    [powerState, setPowerState] = useState(null),
    [totalMemory, setTotalMemory] = useState(null),
    [usedMemory, setUsedMemory] = useState(null),
    [baseOs, setBaseOs] = useState(null),
    [totalDisk, setTotalDisk] = useState(null),
    [locationEnabled, setIsLocationEnabled] = useState(null),
    [cameraPresent, setIsCameraPresent] = useState(null),
    [maxMemory, setMaxMemory] = useState(null),
    [airplaneMode, setAirplaneMode] = useState(null),
    [userAgent, setUserAgent] = useState(null);

  useEffect(() => {
    getFreeDiskStorage().then(setFreeDisk);
    getPowerState().then(setPowerState);
    getTotalMemory().then(setTotalMemory);
    getUsedMemory().then(setUsedMemory);
    getBaseOs().then(setBaseOs);
    getTotalDiskCapacity().then(setTotalDisk);
    getUserAgent().then(setUserAgent);
    isCameraPresent().then(setIsCameraPresent);
    isLocationEnabled().then(setIsLocationEnabled);
    getMaxMemory().then(setMaxMemory);
    isAirplaneMode().then(setAirplaneMode);
  }, []);

  return {
    freeDisk,
    powerState,
    totalMemory,
    usedMemory,
    baseOs,
    totalDisk,
    userAgent,
    cameraPresent,
    locationEnabled,
    maxMemory,
    airplaneMode,
  };
};

const BooleanRow = ({ description, value }: { description: string; value: boolean }) => (
  <DataTable.Row>
    <DataTable.Cell>{description}</DataTable.Cell>
    <DataTable.Cell>{value ? '✅' : '⛔️'}</DataTable.Cell>
  </DataTable.Row>
);

const StringRow = ({ description, value }: { description: string; value: string }) => (
  <DataTable.Row>
    <DataTable.Cell>{description}</DataTable.Cell>
    <DataTable.Cell>{value}</DataTable.Cell>
  </DataTable.Row>
);

const Formatter = new Intl.NumberFormat();

export default function App() {
  const {
    freeDisk,
    powerState,
    baseOs,
    cameraPresent,
    locationEnabled,
    totalDisk,
    usedMemory,
    totalMemory,
    userAgent,
    maxMemory,
    airplaneMode,
  } = useAllSpecs();

  return (
    <>
      <Title style={styles.title}>react-native-device-info</Title>
      <Surface style={styles.surface}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Function</DataTable.Title>
            <DataTable.Title>Output</DataTable.Title>
          </DataTable.Header>
          <StringRow description="getApplicationName" value={getApplicationName()} />
          <StringRow description="getVersion" value={getVersion()} />
          <StringRow description="getBuildNumber" value={getBuildNumber()} />
          <BooleanRow description="isCameraPresent" value={cameraPresent} />
          <BooleanRow description="isLocationEnabled" value={locationEnabled} />
          <BooleanRow description="isLandscape" value={isLandscapeSync()} />
          <BooleanRow description="isEmulator" value={isEmulator()} />

          <BooleanRow description="isAirplaneMode" value={airplaneMode} />
          <StringRow
            description="getUsedMemory / getMaxMemory"
            value={Formatter.format(usedMemory) + ' / ' + Formatter.format(maxMemory)}
          />
          <StringRow description="getTotalMemory" value={Formatter.format(totalMemory)} />
          <StringRow
            description="getFreeDiskStorage / getTotalDiskCapacity"
            value={Formatter.format(freeDisk) + ' / ' + Formatter.format(totalDisk)}
          />
          <StringRow description="getUserAgent" value={userAgent} />
          <StringRow description="getBaseOs" value={baseOs} />
          <StringRow
            description="getPowerState().batteryLevel || getBatteryLevel"
            value={
              powerState && powerState.batteryLevel
                ? Math.round(1000 * powerState.batteryLevel) / 10 + '%'
                : ''
            }
          />
          <BooleanRow
            description="getPowerState().charging || isBatteryCharging"
            value={isBatteryChargingSync()}
          />
          <StringRow
            description="getPowerState().batteryState"
            value={powerState && powerState.batteryState}
          />
          <BooleanRow
            description="getPowerState().lowPowerMode"
            value={powerState && powerState.lowPowerMode}
          />
          <StringRow
            description="getPowerState().chargingTime"
            value={powerState && powerState.chargingTime}
          />
          <StringRow
            description="getPowerState().dischargingTime"
            value={powerState && powerState.dischargingTime}
          />
        </DataTable>
      </Surface>
    </>
  );
}
