#!/bin/bash
set -e

echo "You should run this from directory where you have cloned the react-native-device-info repo"
echo "You should only do this when your git working set is completely clean (e.g., git reset --hard)"
echo "You must run \`npm install react-native-cli -g\` prior to running this script"
echo "You must have already run \`yarn\` in the repository so \`npx react-native\` will work"
echo "This scaffolding refresh has been tested on macOS, if you use it on linux, it might not work"

# Copy the important files out temporarily
if [ -d TEMP ]; then
  echo "TEMP directory already exists - we use that to store files while refreshing."
  # exit 1
else
  echo "Saving files to TEMP while refreshing scaffolding..."
  mkdir -p TEMP/android
  mkdir -p TEMP/ios/example
  mkdir -p TEMP/ios/example.xcodeproj
  mkdir -p TEMP/windows/example
  mkdir -p TEMP/patches
  cp example/README.md TEMP/
  cp example/android/local.properties TEMP/android/ || true
  cp example/windows/example/example_TemporaryKey.pfx TEMP/windows/example/
  cp -r example/ios/example-app-extension TEMP/ios/
  cp example/ios/example/ActionExtension.h TEMP/ios/example/
  cp example/ios/example/ActionExtension.m TEMP/ios/example/
  cp example/ios/example.xcodeproj/project.pbxproj TEMP/ios/example.xcodeproj/
  cp example/App.js TEMP/
  cp example/jest.setup.js TEMP/
  cp example/jest.setup.js TEMP/
  cp example/jest.windows.config.js TEMP/
  cp -R example/__tests__ TEMP/
  cp -R example/__windows_tests__ TEMP/
  cp -R example/jest-windows TEMP/
  cp -r example/patches TEMP/
fi

# Purge the old sample
\rm -fr example

# Make the new example
npm_config_yes=true npx react-native init example --skip-install
pushd example
rm -f _ruby-version Gemfile*
yarn
npm_config_yes=true npx react-native-windows-init --overwrite

yarn add github:react-native-device-info/react-native-device-info

# Windows CI requires versions just a bit behind current in order to work #1155
yarn add \
  appium@1.18.3 \
  selenium-appium@0.0.15 \
  selenium-webdriver@4.0.0-alpha.7 --dev


# Add our app extension back to the template Podfile
sed -i -e $'s/^  target \'exampleTests\' do/  target \'example-app-extension\' do\\\n    inherit! :complete\\\n  end\\\n\\\n  target \'exampleTests\' do/' ios/Podfile
rm -f ios/Podfile??

# React-native builds on iOS are very noisy with warnings in other packages that drown our warnings out. Reduce warnings to just our packages.
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n\\\n    # quiet non-module warnings - only interested in our module warnings\\\n    installer.pods_project.targets.each do |target|\\\n      if !target.name.include? "react-native-device-info"\\\n        target.build_configurations.each do |config|\\\n          config.build_settings["GCC_WARN_INHIBIT_ALL_WARNINGS"] = "YES"\\\n        end\\\n      end\\\n    end/' ios/Podfile
rm -f ios/Podfile??

# We need to fix a compile problem with "sharedApplication" usage in iOS extensions
# https://stackoverflow.com/questions/52503400/sharedapplication-is-unavailable-not-available-on-ios-app-extension-use-v
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n    \\\n    installer.pods_project.targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        # Fix sharedApplication is unavailable: not available on iOS App Extension - Use view controller based solutions where appropriate instead\\\n        # https:\/\/stackoverflow.com\/questions\/52503400\/sharedapplication-is-unavailable-not-available-on-ios-app-extension-use-v\\\n        config.build_settings["APPLICATION_EXTENSION_API_ONLY"] = "NO"\\\n      end\\\n    end/' ios/Podfile
rm -f ios/Podfile??

# This is just a speed optimization, very optional, but asks xcodebuild to use clang and clang++ without the fully-qualified path
# That means that you can then make a symlink in your path with clang or clang++ and have it use a different binary
# In that way you can install ccache or buildcache and get much faster compiles...
sed -i -e $'s/react_native_post_install(installer)/react_native_post_install(installer)\\\n    \\\n    installer.pods_project.targets.each do |target|\\\n      target.build_configurations.each do |config|\\\n        config.build_settings["CC"] = "clang"\\\n        config.build_settings["LD"] = "clang"\\\n        config.build_settings["CXX"] = "clang++"\\\n        config.build_settings["LDPLUSPLUS"] = "clang++"\\\n      end\\\n    end/' ios/Podfile
rm -f ios/Podfile??

# Patch the build.gradle directly to slice in our android play version
sed -i -e 's/ext {$/ext {        supportLibVersion = "1.7.0/' android/build.gradle
sed -i -e 's/ext {$/ext {        mediaCompatVersion = "1.4.3"/' android/build.gradle
sed -i -e 's/ext {$/ext {        supportV4Version = "1.0.1"/' android/build.gradle
rm -f android/build.gradle??

# Patch the AndroidManifest directly to add our permissions
sed -i -e 's/INTERNET" \/>/INTERNET" \/><uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" \/><uses-permission android:name="android.permission.ACCESS_WIFI_STATE" \/><uses-permission android:name="android.permission.READ_PHONE_STATE" \/>/' android/app/src/main/AndroidManifest.xml
rm -f android/app/src/main/AndroidManifest.xml??

# Patch the AppDelegate for iOS battery level
sed -i -e $'s/  return YES;/#if !TARGET_OS_TV\\\n  \[UIDevice currentDevice\].batteryMonitoringEnabled = true;\\\n#endif\\\n  return YES;/' ios/example/AppDelegate.m
rm -f ios/example/AppDelegate.m??

# Patch Windows App.cpp to disable Web Debugger (can't run sync with Web Debugger on Windows)
sed -i -e 's/InstanceSettings()\.UseWebDebugger(true);/InstanceSettings()\.UseWebDebugger(false); \/\/ Set to false to get synchronous module methods calls to work./' windows/example/App.cpp
rm -f windows/example/App.cpp??

# Patch Windows Identities to have the user friendly name expected by the tests
sed -i -e 's/Name=\"[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*\"/Name=\"RNDeviceInfoExample\"/' windows/example/Package.appxmanifest
sed -i -e 's/Publisher=\"CN=[a-zA-Z0-9]*\"/Publisher=\"CN=tepaa\"/' windows/example/Package.appxmanifest
sed -i -e 's/PhoneProductId=\"[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*-[a-zA-Z0-9]*\"/PhoneProductId=\"0192fe56-e7af-4f97-bfab-0b34c143d446\"/' windows/example/Package.appxmanifest
sed -i -e 's/<PublisherDisplayName>[a-zA-Z0-9]*<\/PublisherDisplayName>/<PublisherDisplayName>tepaa<\/PublisherDisplayName>/' windows/example/Package.appxmanifest
rm -f windows/example/Package.appxmanifest??

# Add additional scripts to package.json
npm_config_yes=true npx json -I -f package.json -e "this.scripts.appium='appium'; this.scripts['test:windows']='yarn jest --config=./jest.windows.config.js'; this.scripts.windows='react-native run-windows'; this.jest.setupFiles=['./jest.setup.js'];"

# Force resolution of appium-windows-driver 1.13.0, since the latest versions seem to have compatibility issues with selenium-appium.
npm_config_yes=true npx json -I -f package.json -e "this.resolutions={'appium/appium-windows-driver':'1.13.0'};"
yarn

# Copy the important files back in
popd
echo "Copying device-info example files into refreshed example..."
cp -frv TEMP/* example/

# Add patch-package to make sure any necessary patches are installed
pushd example
yarn add patch-package --dev
npm_config_yes=true npx json -I -f package.json -e "this.scripts.prepare='patch-package'"


# run pod install after installing react-native-device-info
cd ios && rm -f Podfile.lock && pod install && cd ..

# Clean up after ourselves
popd
\rm -fr TEMP
