//
//  RNDeviceInfoImpl.m
//  RNDeviceInfo
//
//  Created by Rami Elwan on 23/12/2023.
//

#import "RNDeviceInfoImpl.h"
#import "DeviceUID.h"
#import <DeviceCheck/DeviceCheck.h>
#import <CoreLocation/CoreLocation.h>
#import <AVFoundation/AVFoundation.h>
#import <React/RCTUtils.h>
#import <React/RCTLog.h>
#import <mach-o/arch.h>
#import <mach/mach.h>
#include "ifaddrs.h"
#include "arpa/inet.h"
#import "EnvironmentUtil.h"
#import <sys/utsname.h>

#if !(TARGET_OS_TV)
#import <WebKit/WebKit.h>
#import <LocalAuthentication/LocalAuthentication.h>
#endif

#if !(TARGET_OS_TV)
@import CoreTelephony;
@import Darwin.sys.sysctl;
#endif

typedef NS_ENUM(NSInteger, DeviceType) {
    DeviceTypeHandset,
    DeviceTypeTablet,
    DeviceTypeTv,
    DeviceTypeDesktop,
    DeviceTypeUnknown
};

#define DeviceTypeValues [NSArray arrayWithObjects: @"Handset", @"Tablet", @"Tv", @"Desktop", @"unknown", nil]

@implementation RNDeviceInfoImpl

- (nonnull NSString *)getDeviceName {
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.name;
}

- (NSString *)getCarrier {
#if (TARGET_OS_TV || TARGET_OS_MACCATALYST)
    return @"unknown";
#else
    CTTelephonyNetworkInfo *netinfo = [[CTTelephonyNetworkInfo alloc] init];
    CTCarrier *carrier = [netinfo subscriberCellularProvider];
    if (carrier.carrierName != nil) {
        return carrier.carrierName;
    }
    return @"unknown";
#endif
}

- (nonnull NSString *)getBuildId {
#if TARGET_OS_TV
    return @"unknown";
#else
    size_t bufferSize = 64;
    NSMutableData *buffer = [[NSMutableData alloc] initWithLength:bufferSize];
    int status = sysctlbyname("kern.osversion", buffer.mutableBytes, &bufferSize, NULL, 0);
    if (status != 0) {
        return @"unknown";
    }
    NSString* buildId = [[NSString alloc] initWithCString:buffer.mutableBytes encoding:NSUTF8StringEncoding];
    return buildId;
#endif
}

- (NSString *)getUniqueId {
    return [DeviceUID uid];
}

- (NSString *)syncUniqueId {
    return [DeviceUID syncUid];
}

- (BOOL)isEmulator {
#if TARGET_IPHONE_SIMULATOR
    return YES;
#else
    return NO;
#endif
}

- (void)getDeviceToken:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    if (@available(iOS 11.0, *)) {
        if (TARGET_IPHONE_SIMULATOR) {
            reject(@"NOT AVAILABLE", @"Device check is only available for physical devices", nil);
            return;
        }

        DCDevice *device = DCDevice.currentDevice;

        if ([device isSupported]) {
            [DCDevice.currentDevice generateTokenWithCompletionHandler:^(NSData * _Nullable token, NSError * _Nullable error) {
                if (error) {
                    reject(@"ERROR GENERATING TOKEN", error.localizedDescription, error);
                    return;
                }

                resolve([token base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed]);
            }];
        } else {
            reject(@"NOT SUPPORTED", @"Device check is not supported by this device", nil);
            return;
        }
    } else {
        reject(@"NOT AVAILABLE", @"Device check is only available for iOS > 11", nil);
        return;
    }
}

- (float)getFontScale {
    // Font scales based on font sizes from https://developer.apple.com/ios/human-interface-guidelines/visual-design/typography/
    float fontScale = 1.0;
    UITraitCollection *traitCollection = [[UIScreen mainScreen] traitCollection];

    // Shared application is unavailable in an app extension.
    if (traitCollection) {
        __block NSString *contentSize = nil;
        RCTUnsafeExecuteOnMainQueueSync(^{
            if (@available(iOS 10.0, tvOS 10.0, macCatalyst 13.0, *)) {
                contentSize = traitCollection.preferredContentSizeCategory;
            } else {
                // if we can't get contentSize, we'll fall back to 1.0
            }
        });

        if ([contentSize isEqual: @"UICTContentSizeCategoryXS"]) fontScale = 0.82;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryS"]) fontScale = 0.88;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryM"]) fontScale = 0.95;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryL"]) fontScale = 1.0;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryXL"]) fontScale = 1.12;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryXXL"]) fontScale = 1.23;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryXXXL"]) fontScale = 1.35;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryAccessibilityM"]) fontScale = 1.64;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryAccessibilityL"]) fontScale = 1.95;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryAccessibilityXL"]) fontScale = 2.35;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryAccessibilityXXL"]) fontScale = 2.76;
        else if ([contentSize isEqual: @"UICTContentSizeCategoryAccessibilityXXXL"]) fontScale = 3.12;
    }

    return fontScale;
}

- (double)getTotalMemory {
    return [NSProcessInfo processInfo].physicalMemory;
}

- (NSDictionary *) getStorageDictionary {
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [[NSFileManager defaultManager] attributesOfFileSystemForPath:[paths lastObject] error: nil];
}

- (double)getTotalDiskCapacity {
    uint64_t totalSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];
    
    if (storage) {
        NSNumber * fileSystemSizeInBytes = [storage objectForKey:NSFileSystemSize];
        totalSpace = [fileSystemSizeInBytes unsignedLongValue];
    }
    
    return (double) totalSpace;
}

- (double)getFreeDiskStorage {
    uint64_t freeSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];
    
    if (storage) {
        NSNumber * freeFileSystemSizeInBytes = [storage objectForKey:NSFileSystemSize];
        freeSpace = [freeFileSystemSizeInBytes unsignedLongValue];
    }
    
    return (double) freeSpace;
}

- (NSArray *)getSupportedAbis {
    /* https://stackoverflow.com/questions/19859388/how-can-i-get-the-ios-device-cpu-architecture-in-runtime */
    const NXArchInfo *info = NXGetLocalArchInfo();
    NSString *typeOfCpu = [NSString stringWithUTF8String:info->description];
    return @[typeOfCpu];
}

- (NSString *)getIpAddress {
    NSString *address = @"0.0.0.0";
    struct ifaddrs *interfaces = NULL;
    struct ifaddrs *temp_addr = NULL;
    int success = 0;
    // retrieve the current interfaces - returns 0 on success
    success = getifaddrs(&interfaces);
    if (success == 0) {
        // Loop through linked list of interfaces
        temp_addr = interfaces;
        while(temp_addr != NULL) {
            sa_family_t addr_family = temp_addr->ifa_addr->sa_family;
            // Check for IPv4 or IPv6-only interfaces
            if(addr_family == AF_INET || addr_family == AF_INET6) {
                NSString* ifname = [NSString stringWithUTF8String:temp_addr->ifa_name];
                    if(
                        // Check if interface is en0 which is the wifi connection the iPhone
                        // and the ethernet connection on the Apple TV
                        [ifname isEqualToString:@"en0"] ||
                        // Check if interface is en1 which is the wifi connection on the Apple TV
                        [ifname isEqualToString:@"en1"]
                    ) {
                        const struct sockaddr_in *addr = (const struct sockaddr_in*)temp_addr->ifa_addr;
                        socklen_t addr_len = addr_family == AF_INET ? INET_ADDRSTRLEN : INET6_ADDRSTRLEN;
                        char addr_buffer[addr_len];
                        // We use inet_ntop because it also supports getting an address from
                        // interfaces that are IPv6-only
                        const char *netname = inet_ntop(addr_family, &addr->sin_addr, addr_buffer, addr_len);

                         // Get NSString from C String
                        address = [NSString stringWithUTF8String:netname];
                    }
            }
            temp_addr = temp_addr->ifa_next;
        }
    }
    // Free memory
    freeifaddrs(interfaces);
    return address;
}

- (BOOL)isPinOrFingerprintSet {
#if TARGET_OS_TV
    return NO;
#else
    LAContext *context = [[LAContext alloc] init];
    return [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error:nil];
#endif
}

- (float) getBatteryLevel {
#if TARGET_OS_TV
    return [@1 floatValue];
#else
    return [@([UIDevice currentDevice].batteryLevel) floatValue];
#endif
}

- (NSDictionary *)getPowerState {
#if RCT_DEV && (!TARGET_IPHONE_SIMULATOR) && !TARGET_OS_TV
    if ([UIDevice currentDevice].isBatteryMonitoringEnabled != true) {
        RCTLogWarn(@"Battery monitoring is not enabled. "
                   "You need to enable monitoring with `[UIDevice currentDevice].batteryMonitoringEnabled = TRUE`");
    }
#endif
#if RCT_DEV && TARGET_IPHONE_SIMULATOR && !TARGET_OS_TV
    if ([UIDevice currentDevice].batteryState == UIDeviceBatteryStateUnknown) {
        RCTLogWarn(@"Battery state `unknown` and monitoring disabled, this is normal for simulators and tvOS.");
    }
#endif
    float batteryLevel = self.getBatteryLevel;

    return @{
#if TARGET_OS_TV
             @"batteryLevel": @(batteryLevel),
             @"batteryState": @"full",
#else
             @"batteryLevel": @(batteryLevel),
             @"batteryState": [@[@"unknown", @"unplugged", @"charging", @"full"] objectAtIndex: [UIDevice currentDevice].batteryState],
             @"lowPowerMode": @([NSProcessInfo processInfo].isLowPowerModeEnabled),
#endif
             };
}

- (BOOL)isBatteryCharging {
    return [self.getPowerState[@"batteryState"] isEqualToString:@"charging"];
}

- (BOOL)isLocationEnabled {
    return [CLLocationManager locationServicesEnabled];
}

- (BOOL)isHeadphonesConnected {
    AVAudioSessionRouteDescription* route = [[AVAudioSession sharedInstance] currentRoute];
    for (AVAudioSessionPortDescription* desc in [route outputs]) {
        if ([[desc portType] isEqualToString:AVAudioSessionPortHeadphones]) {
            return YES;
        }
        if ([[desc portType] isEqualToString:AVAudioSessionPortBluetoothA2DP]) {
            return YES;
        }
        if ([[desc portType] isEqualToString:AVAudioSessionPortBluetoothHFP]) {
            return YES;
        }
    }
    return NO;
}

- (unsigned long)getUsedMemory {
    struct task_basic_info info;
    mach_msg_type_number_t size = sizeof(info);
    kern_return_t kerr = task_info(mach_task_self(),
                                   TASK_BASIC_INFO,
                                   (task_info_t)&info,
                                   &size);
    if (kerr != KERN_SUCCESS) {
      return -1;
    }

    return (unsigned long)info.resident_size;
}

- (void)getUserAgent:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
#if TARGET_OS_TV
    reject(@"not_available_error", @"not available on tvOS", nil);
#else
    __weak RNDeviceInfoImpl *weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        __strong RNDeviceInfoImpl *strongSelf = weakSelf;
        if (strongSelf) {
            // Save WKWebView (it might deallocate before we ask for user Agent)
            __block WKWebView *webView = [[WKWebView alloc] init];

            [webView evaluateJavaScript:@"window.navigator.userAgent;" completionHandler:^(id _Nullable result, NSError * _Nullable error) {
                if (error) {
                    reject(@"getUserAgentError", error.localizedDescription, error);
                }else{
                    resolve([NSString stringWithFormat:@"%@", result]);
                }
                // Destroy the WKWebView after task is complete
                webView = nil;
            }];
        }
    });
#endif
}

- (NSDictionary *)getAvailableLocationProviders {
#if !TARGET_OS_TV
    return @{
              @"locationServicesEnabled": [NSNumber numberWithBool: [CLLocationManager locationServicesEnabled]],
              @"significantLocationChangeMonitoringAvailable": [NSNumber numberWithBool: [CLLocationManager significantLocationChangeMonitoringAvailable]],
              @"headingAvailable": [NSNumber numberWithBool: [CLLocationManager headingAvailable]],
              @"isRangingAvailable": [NSNumber numberWithBool: [CLLocationManager isRangingAvailable]]
              };
#else
    return @{
              @"locationServicesEnabled": [NSNumber numberWithBool: [CLLocationManager locationServicesEnabled]]
              };
#endif
}

- (NSString *)getInstallerPackageName {
    return [EnvironmentValues objectAtIndex:[EnvironmentUtil currentAppEnvironment]];
}

- (NSNumber *)getBrightness {
#if !TARGET_OS_TV
    return @([UIScreen mainScreen].brightness);
#else
    return @(-1);
#endif
}

- (long long)getFirstInstallTime {
    NSURL* urlToDocumentsFolder = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    NSError *error;
    NSDate *installDate = [[[NSFileManager defaultManager] attributesOfItemAtPath:urlToDocumentsFolder.path error:&error] objectForKey:NSFileCreationDate];
    return [@(floor([installDate timeIntervalSince1970] * 1000)) longLongValue];
}

- (NSString *)getDeviceId {
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    #if TARGET_IPHONE_SIMULATOR
        deviceId = [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
    #endif
    return deviceId;
}

- (NSString *)getBundleId {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"];
}

- (NSString *)getSystemName {
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.systemName;
}

- (NSString *)getSystemVersion {
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.systemVersion;
}

- (NSString *)getAppVersion {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
}

- (NSString *)getBuildNumber {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
}

- (BOOL)isTablet {
    if ([self getDeviceType] == DeviceTypeTablet) {
        return YES;
    } else {
        return NO;
    }
}

- (NSString *)getAppName {
    NSString *displayName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
    NSString *bundleName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleName"];
    return displayName ? displayName : bundleName;
}

- (NSString *)getModel {
    NSString* deviceId = [self getDeviceId];
    NSDictionary* deviceNamesByCode = [self getDeviceNamesByCode];
    NSString* deviceName =[deviceNamesByCode valueForKey:deviceId];

    // Return the real device name if we have it
    if (deviceName) {
        return deviceName;
    }

    // If we don't have the real device name, try a generic
    if ([deviceId hasPrefix:@"iPod"]) {
        return @"iPod Touch";
    } else if ([deviceId hasPrefix:@"iPad"]) {
        return @"iPad";
    } else if ([deviceId hasPrefix:@"iPhone"]) {
        return @"iPhone";
    } else if ([deviceId hasPrefix:@"AppleTV"]) {
        return @"Apple TV";
    }

    // If we could not even get a generic, it's unknown
    return @"unknown";
}

- (NSString *) getDeviceTypeName {
    return [DeviceTypeValues objectAtIndex: [self getDeviceType]];
}

- (BOOL) isDisplayZoomed {
    return [UIScreen mainScreen].scale != [UIScreen mainScreen].nativeScale;
}

// stub method to satisfy Turbo Module spec
- (BOOL)isLowRamDevice {
    return true;
}

- (DeviceType) getDeviceType
{
    switch ([[UIDevice currentDevice] userInterfaceIdiom]) {
        case UIUserInterfaceIdiomPhone: return DeviceTypeHandset;
        case UIUserInterfaceIdiomPad:
            if (TARGET_OS_MACCATALYST) {
                return DeviceTypeDesktop;
            }
            if (@available(iOS 14.0, *)) {
                if ([NSProcessInfo processInfo].isiOSAppOnMac) {
                    return DeviceTypeDesktop;
                }
            }
            return DeviceTypeTablet;
        case UIUserInterfaceIdiomTV: return DeviceTypeTv;
        case UIUserInterfaceIdiomMac: return DeviceTypeDesktop;
        default: return DeviceTypeUnknown;
    }
}

- (NSDictionary *) getDeviceNamesByCode {
    return @{
        @"iPod1,1": @"iPod Touch", // (Original)
        @"iPod2,1": @"iPod Touch", // (Second Generation)
        @"iPod3,1": @"iPod Touch", // (Third Generation)
        @"iPod4,1": @"iPod Touch", // (Fourth Generation)
        @"iPod5,1": @"iPod Touch", // (Fifth Generation)
        @"iPod7,1": @"iPod Touch", // (Sixth Generation)
        @"iPod9,1": @"iPod Touch", // (Seventh Generation)
        @"iPhone1,1": @"iPhone", // (Original)
        @"iPhone1,2": @"iPhone 3G", // (3G)
        @"iPhone2,1": @"iPhone 3GS", // (3GS)
        @"iPad1,1": @"iPad", // (Original)
        @"iPad2,1": @"iPad 2", //
        @"iPad2,2": @"iPad 2", //
        @"iPad2,3": @"iPad 2", //
        @"iPad2,4": @"iPad 2", //
        @"iPad3,1": @"iPad", // (3rd Generation)
        @"iPad3,2": @"iPad", // (3rd Generation)
        @"iPad3,3": @"iPad", // (3rd Generation)
        @"iPhone3,1": @"iPhone 4", // (GSM)
        @"iPhone3,2": @"iPhone 4", // iPhone 4
        @"iPhone3,3": @"iPhone 4", // (CDMA/Verizon/Sprint)
        @"iPhone4,1": @"iPhone 4S", //
        @"iPhone5,1": @"iPhone 5", // (model A1428, AT&T/Canada)
        @"iPhone5,2": @"iPhone 5", // (model A1429, everything else)
        @"iPad3,4": @"iPad", // (4th Generation)
        @"iPad3,5": @"iPad", // (4th Generation)
        @"iPad3,6": @"iPad", // (4th Generation)
        @"iPad2,5": @"iPad Mini", // (Original)
        @"iPad2,6": @"iPad Mini", // (Original)
        @"iPad2,7": @"iPad Mini", // (Original)
        @"iPhone5,3": @"iPhone 5c", // (model A1456, A1532 | GSM)
        @"iPhone5,4": @"iPhone 5c", // (model A1507, A1516, A1526 (China), A1529 | Global)
        @"iPhone6,1": @"iPhone 5s", // (model A1433, A1533 | GSM)
        @"iPhone6,2": @"iPhone 5s", // (model A1457, A1518, A1528 (China), A1530 | Global)
        @"iPhone7,1": @"iPhone 6 Plus", //
        @"iPhone7,2": @"iPhone 6", //
        @"iPhone8,1": @"iPhone 6s", //
        @"iPhone8,2": @"iPhone 6s Plus", //
        @"iPhone8,4": @"iPhone SE", //
        @"iPhone9,1": @"iPhone 7", // (model A1660 | CDMA)
        @"iPhone9,3": @"iPhone 7", // (model A1778 | Global)
        @"iPhone9,2": @"iPhone 7 Plus", // (model A1661 | CDMA)
        @"iPhone9,4": @"iPhone 7 Plus", // (model A1784 | Global)
        @"iPhone10,3": @"iPhone X", // (model A1865, A1902)
        @"iPhone10,6": @"iPhone X", // (model A1901)
        @"iPhone10,1": @"iPhone 8", // (model A1863, A1906, A1907)
        @"iPhone10,4": @"iPhone 8", // (model A1905)
        @"iPhone10,2": @"iPhone 8 Plus", // (model A1864, A1898, A1899)
        @"iPhone10,5": @"iPhone 8 Plus", // (model A1897)
        @"iPhone11,2": @"iPhone XS", // (model A2097, A2098)
        @"iPhone11,4": @"iPhone XS Max", // (model A1921, A2103)
        @"iPhone11,6": @"iPhone XS Max", // (model A2104)
        @"iPhone11,8": @"iPhone XR", // (model A1882, A1719, A2105)
        @"iPhone12,1": @"iPhone 11",
        @"iPhone12,3": @"iPhone 11 Pro",
        @"iPhone12,5": @"iPhone 11 Pro Max",
        @"iPhone12,8": @"iPhone SE", // (2nd Generation iPhone SE),
        @"iPhone13,1": @"iPhone 12 mini",
        @"iPhone13,2": @"iPhone 12",
        @"iPhone13,3": @"iPhone 12 Pro",
        @"iPhone13,4": @"iPhone 12 Pro Max",
        @"iPhone14,4": @"iPhone 13 mini",
        @"iPhone14,5": @"iPhone 13",
        @"iPhone14,2": @"iPhone 13 Pro",
        @"iPhone14,3": @"iPhone 13 Pro Max",
        @"iPhone14,6": @"iPhone SE", // (3nd Generation iPhone SE),
        @"iPhone14,7": @"iPhone 14",
        @"iPhone14,8": @"iPhone 14 Plus",
        @"iPhone15,2": @"iPhone 14 Pro",
        @"iPhone15,3": @"iPhone 14 Pro Max",
        @"iPhone15,4": @"iPhone 15",
        @"iPhone15,5": @"iPhone 15 Plus",
        @"iPhone16,1": @"iPhone 15 Pro",
        @"iPhone16,2": @"iPhone 15 Pro Max",
        @"iPad4,1": @"iPad Air", // 5th Generation iPad (iPad Air) - Wifi
        @"iPad4,2": @"iPad Air", // 5th Generation iPad (iPad Air) - Cellular
        @"iPad4,3": @"iPad Air", // 5th Generation iPad (iPad Air)
        @"iPad4,4": @"iPad Mini 2", // (2nd Generation iPad Mini - Wifi)
        @"iPad4,5": @"iPad Mini 2", // (2nd Generation iPad Mini - Cellular)
        @"iPad4,6": @"iPad Mini 2", // (2nd Generation iPad Mini)
        @"iPad4,7": @"iPad Mini 3", // (3rd Generation iPad Mini)
        @"iPad4,8": @"iPad Mini 3", // (3rd Generation iPad Mini)
        @"iPad4,9": @"iPad Mini 3", // (3rd Generation iPad Mini)
        @"iPad5,1": @"iPad Mini 4", // (4th Generation iPad Mini)
        @"iPad5,2": @"iPad Mini 4", // (4th Generation iPad Mini)
        @"iPad5,3": @"iPad Air 2", // 6th Generation iPad (iPad Air 2)
        @"iPad5,4": @"iPad Air 2", // 6th Generation iPad (iPad Air 2)
        @"iPad6,3": @"iPad Pro 9.7-inch", // iPad Pro 9.7-inch
        @"iPad6,4": @"iPad Pro 9.7-inch", // iPad Pro 9.7-inch
        @"iPad6,7": @"iPad Pro 12.9-inch", // iPad Pro 12.9-inch
        @"iPad6,8": @"iPad Pro 12.9-inch", // iPad Pro 12.9-inch
        @"iPad6,11": @"iPad (5th generation)", // Apple iPad 9.7 inch (5th generation) - WiFi
        @"iPad6,12": @"iPad (5th generation)", // Apple iPad 9.7 inch (5th generation) - WiFi + cellular
        @"iPad7,1": @"iPad Pro 12.9-inch", // 2nd Generation iPad Pro 12.5-inch - Wifi
        @"iPad7,2": @"iPad Pro 12.9-inch", // 2nd Generation iPad Pro 12.5-inch - Cellular
        @"iPad7,3": @"iPad Pro 10.5-inch", // iPad Pro 10.5-inch - Wifi
        @"iPad7,4": @"iPad Pro 10.5-inch", // iPad Pro 10.5-inch - Cellular
        @"iPad7,5": @"iPad (6th generation)", // iPad (6th generation) - Wifi
        @"iPad7,6": @"iPad (6th generation)", // iPad (6th generation) - Cellular
        @"iPad7,11": @"iPad (7th generation)", // iPad 10.2 inch (7th generation) - Wifi
        @"iPad7,12": @"iPad (7th generation)", // iPad 10.2 inch (7th generation) - Wifi + cellular
        @"iPad8,1": @"iPad Pro 11-inch (3rd generation)", // iPad Pro 11 inch (3rd generation) - Wifi
        @"iPad8,2": @"iPad Pro 11-inch (3rd generation)", // iPad Pro 11 inch (3rd generation) - 1TB - Wifi
        @"iPad8,3": @"iPad Pro 11-inch (3rd generation)", // iPad Pro 11 inch (3rd generation) - Wifi + cellular
        @"iPad8,4": @"iPad Pro 11-inch (3rd generation)", // iPad Pro 11 inch (3rd generation) - 1TB - Wifi + cellular
        @"iPad8,5": @"iPad Pro 12.9-inch (3rd generation)", // iPad Pro 12.9 inch (3rd generation) - Wifi
        @"iPad8,6": @"iPad Pro 12.9-inch (3rd generation)", // iPad Pro 12.9 inch (3rd generation) - 1TB - Wifi
        @"iPad8,7": @"iPad Pro 12.9-inch (3rd generation)", // iPad Pro 12.9 inch (3rd generation) - Wifi + cellular
        @"iPad8,8": @"iPad Pro 12.9-inch (3rd generation)", // iPad Pro 12.9 inch (3rd generation) - 1TB - Wifi + cellular
        @"iPad11,1": @"iPad Mini 5", // (5th Generation iPad Mini)
        @"iPad11,2": @"iPad Mini 5", // (5th Generation iPad Mini)
        @"iPad11,3": @"iPad Air (3rd generation)",
        @"iPad11,4": @"iPad Air (3rd generation)",
        @"iPad13,1": @"iPad Air (4th generation)",
        @"iPad13,2": @"iPad Air (4th generation)",
        @"AppleTV2,1": @"Apple TV", // Apple TV (2nd Generation)
        @"AppleTV3,1": @"Apple TV", // Apple TV (3rd Generation)
        @"AppleTV3,2": @"Apple TV", // Apple TV (3rd Generation - Rev A)
        @"AppleTV5,3": @"Apple TV", // Apple TV (4th Generation)
        @"AppleTV6,2": @"Apple TV 4K" // Apple TV 4K
    };
}

@end
