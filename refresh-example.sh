#!/bin/bash
set -e

echo "You should run this from directory where you have cloned the react-native-device-info repo"
echo "You should only do this when your git working set is completely clean (e.g., git reset --hard)"
echo "You must run \`npm install react-native-cli -g\` prior to running this script"
echo "You must have already run \`npm install\` in the repository so \`npx react-native\` will work"
echo "This scaffolding refresh has been tested on macOS, if you use it on linux, it might not work"

# Copy the important files out temporarily
if [ -d TEMP ]; then
  echo "TEMP directory already exists - we use that to store files while refreshing."
  exit 1
else
  echo "Saving files to TEMP while refreshing scaffolding..."
  mkdir -p TEMP/android
  mkdir -p TEMP/ios
  cp example/README.md TEMP/
  cp example/android/local.properties TEMP/android/ || true
  cp example/App.js TEMP/
fi

# Purge the old sample
\rm -fr example

# Make the new example
npx react-native init example
pushd example
yarn add github:react-native-community/react-native-device-info

# react-native 0.60 does auto-linking! comment out manual link
#npx react-native link react-native-device-info

# react-native 0.60 is cocoapods mainly now, so run pod install after installing react-native-device-info
cd ios && pod install && cd ..

# Patch the build.gradle directly to slice in our android play version
# react-native 0.60 is AndroidX! Set up a bunch of AndroidX version
sed -i -e 's/ext {$/ext {        firebaseIidVersion = "19.0.1"/' android/build.gradle
sed -i -e 's/ext {$/ext {        minSdkVersion = 16/' android/build.gradle
sed -i -e 's/ext {$/ext {        supportLibVersion = "1.0.2"/' android/build.gradle
sed -i -e 's/ext {$/ext {        mediaCompatVersion = "1.0.1"/' android/build.gradle
sed -i -e 's/ext {$/ext {        supportV4Version = "1.0.1"/' android/build.gradle
rm -f android/build.gradle??

# Patch the app/build.gradle to enable the JS bundle in debug - this is important
# For testing because iOS9 and Android API<18 can't do port-forwarding so they can't
# see a local dev bundle server, they have to have the bundle packaged and in the app
sed -i -e $'s/^project.ext.react = \[/project.ext.react = \[\\\n    bundleInDebug: true,/' android/app/build.gradle
rm -f android/app/build.gradle??

# Patch the AndroidManifest directly to add our permissions
sed -i -e 's/INTERNET" \/>/INTERNET" \/><uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" \/><uses-permission android:name="android.permission.ACCESS_WIFI_STATE" \/><uses-permission android:name="android.permission.READ_PHONE_STATE" \/>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??

# Patch the AppDelegate for iOS battery level
sed -i -e $'s/  return YES;/#if !TARGET_OS_TV\\\n  \[UIDevice currentDevice\].batteryMonitoringEnabled = true;\\\n#endif\\\n  return YES;/' ios/example/AppDelegate.m
rm -f ios/example/AppDelegate.m??

# Copy the important files back in
popd
echo "Copying device-info example files into refreshed example..."
cp -frv TEMP/* example/

# Clean up after ourselves
\rm -fr TEMP
