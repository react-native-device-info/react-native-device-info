/* eslint-disable prettier/prettier */
/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const fs = require('fs');
const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const rnwPath = fs.realpathSync(
    path.resolve(require.resolve('react-native-windows/package.json'), '..'),
);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = {
    resolver: {
        extraNodeModules: {
            // Fixed: Point to the actual react-native-device-info location
            'react-native-device-info': path.resolve(__dirname, '../'),
        },
        blockList: exclusionList([
            // This stops "react-native run-windows" from causing the metro server to crash if its already running
            new RegExp(
                `${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`,
            ),
            // This prevents "react-native run-windows" from hitting: EBUSY: resource busy or locked, open msbuild.ProjectImports.zip or other files produced by msbuild
            new RegExp(`${rnwPath}/build/.*`),
            new RegExp(`${rnwPath}/target/.*`),
            /.*\.ProjectImports\.zip/,
        ]),
    },
    watchFolders: [
        // This allows us to use the local version of react-native-windows
        rnwPath,
        // This allows us to use the local version of react-native-device-info
        path.resolve(__dirname, '../'),
    ],
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);