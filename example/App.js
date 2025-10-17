/* eslint-disable prettier/prettier */
// App.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,                // Take full height
        justifyContent: 'center', // Center vertically
        alignItems: 'center',     // Center horizontally
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default App;
