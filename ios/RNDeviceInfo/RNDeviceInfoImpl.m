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

#if !(TARGET_OS_TV)
#import <WebKit/WebKit.h>
#import <LocalAuthentication/LocalAuthentication.h>
#endif

#if !(TARGET_OS_TV)
@import CoreTelephony;
@import Darwin.sys.sysctl;
#endif

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

@end
