# Install packages

```
yarn install
cd example
yarn install
```

# Copy react-native-device-info module from parent folder to example folder

```
cd ..
mkdir -p example/node_modules/react-native-device-info
dev-sync
cp package.json example/node_modules/react-native-device-info
```

# Open example solution by Visual studio

example-vnext.sln

```
cd example
react-native start
```
