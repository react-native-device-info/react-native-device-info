## Release Notes

### 0.9.7

Several bugfixes and detecting if device is a tablet

### 0.9.3 

adds support for Brand information e.g. apple, htc, etc

### 0.9.1

adds support for the iPhone SE and new iPad Pro

### 0.9.0

adds support for device country and changes the iOS device name to match Apple branding

### 0.8.4

don't use destructuring

### 0.8.3

removes the default bluetooth permission

### 0.8.2

change deployment target to iOS 8

### 0.8.1

removes unnecessary peerDependencies

### 0.8.0

tweaks how device locale works on Android. If it's available it will use the toLanguageTag that is more inline with iOS. (See #14)

### 0.7.0

adds two new parameters, Device Locale and User Agent.

### 0.5.0

adds a new parameter; Device Id. On iOS this is the hardware string for the current device (e.g. "iPhone7,2"). On Android we use the BOARD field which is the name of the underlying board, e.g. "goldfish". The way that the module gets the device model on iOS has also changed to be based on the Device Id; now instead of getting a generic product family e.g. "iPhone", it will return the specific model e.g. "iPhone 6".
