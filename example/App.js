/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    NativeModules,
} from 'react-native';

// If you have a JS bridge file, import from there:
// import RNDeviceInfo from '../src/NativeRNDeviceInfo';
const { RNDeviceInfo } = NativeModules;

const App = () => {
    const [diskCapacity, setDiskCapacity] = useState('Loading...');
    const [uniqueId, setUniqueId] = useState('Loading...');
    //const [batteryLevel, setBatteryLevel] = useState('Loading...');
    const [deviceName, setDeviceName] = useState('Loading...');
    const [model, setModel] = useState('Loading...');
    const [brand, setBrand] = useState('Loading...');

    const fetchDiskCapacity = async () => {
        try {
            const result = await RNDeviceInfo.getTotalDiskCapacity();
            const gb = (result / (1024 ** 3)).toFixed(2);
            setDiskCapacity(`${gb} GB`);
            Alert.alert('Total Disk Capacity', `${gb} GB`);
        } catch (error) {
            setDiskCapacity('Error');
            Alert.alert('Error', 'Failed to get disk capacity');
        }
    };

    const fetchUniqueId = async () => {
        try {
            const id = await RNDeviceInfo.getUniqueId();
            setUniqueId(id);
            Alert.alert('Unique ID', id);
        } catch (error) {
            setUniqueId('Error');
            Alert.alert('Error', 'Failed to get unique ID');
        }
    };

    //const fetchBatteryLevel = async () => {
    //    try {
    //        const level = await RNDeviceInfo.getBatteryLevel();
    //        // level is a float between 0 and 1
    //        const percent = (level * 100).toFixed(0);
    //        setBatteryLevel(`${percent}%`);
    //        Alert.alert('Battery Level', `${percent}%`);
    //    } catch (error) {
    //        setBatteryLevel('Error');
    //        Alert.alert('Error', 'Failed to get battery level');
    //    }
    //};

    const fetchDeviceName = async () => {
        try {
            const name = await RNDeviceInfo.getDeviceName();
            setDeviceName(name);
            Alert.alert('Device Name', name);
        } catch (error) {
            setDeviceName('Error');
            Alert.alert('Error', 'Failed to get device name');
        }
    };
    const fetchModel = async () => {
        try {
            const modelName = await RNDeviceInfo.getModel();
            setModel(modelName);
            Alert.alert('Model', modelName);
        } catch (error) {
            setModel('Error');
            Alert.alert('Error', 'Failed to get model');
        }
    };
    const fetchBrand = async () => {
        try {
            const brandName = await RNDeviceInfo.getBrand();
            setBrand(brandName);
            Alert.alert('Brand', brandName);
        } catch (error) {
            setBrand('Error');
            Alert.alert('Error', 'Failed to get brand');
        }
    };

    useEffect(() => {
        fetchDiskCapacity();
        fetchUniqueId();
        //fetchBatteryLevel();
        fetchDeviceName();
        fetchModel();
        fetchBrand();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Device Info</Text>
            <Text style={styles.label}>Total Disk Capacity:</Text>
            <Text style={styles.value}>{diskCapacity}</Text>
            <Button title="Refresh Disk Capacity" onPress={fetchDiskCapacity} />
            <Text style={styles.label}>Unique ID:</Text>
            <Text style={styles.value}>{uniqueId}</Text>
            <Button title="Refresh Unique ID" onPress={fetchUniqueId} />
            {/*<Text style={styles.label}>Battery Level:</Text>*/}
            {/*<Text style={styles.value}>{batteryLevel}</Text>*/}
            {/*<Button title="Refresh Battery Level" onPress={fetchBatteryLevel} />*/}
            <Text style={styles.label}>Device Name:</Text>
            <Text style={styles.value}>{deviceName}</Text>
            <Button title="Refresh Device Name" onPress={fetchDeviceName} />
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.value}>{model}</Text>
            <Button title="Refresh Model" onPress={fetchModel} />
            <Text style={styles.label}>Brand:</Text>
            <Text style={styles.value}>{brand}</Text>
            <Button title="Refresh Brand" onPress={fetchBrand} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#555',
        marginTop: 20,
    },
    value: {
        fontSize: 20,
        marginVertical: 10,
        color: '#222',
    },
});

export default App;
