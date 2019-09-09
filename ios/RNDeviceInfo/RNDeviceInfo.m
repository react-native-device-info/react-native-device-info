//
//  RNDeviceInfo.m
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#include <ifaddrs.h>
#include <arpa/inet.h>
#import <mach/mach.h>
#import <mach-o/arch.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTUtils.h>
#import "RNDeviceInfo.h"
#import "DeviceUID.h"
#import <WebKit/WebKit.h>

#if !(TARGET_OS_TV)
#import <LocalAuthentication/LocalAuthentication.h>
#endif

typedef NS_ENUM(NSInteger, DeviceType) {
    DeviceTypeHandset,
    DeviceTypeTablet,
    DeviceTypeTv,
    DeviceTypeUnknown
};

#define DeviceTypeValues [NSArray arrayWithObjects: @"Handset", @"Tablet", @"Tv", @"Unknown", nil]

#if !(TARGET_OS_TV)
@import CoreTelephony;
@import Darwin.sys.sysctl;
#endif

@implementation RNDeviceInfo
{
    WKWebView *webView;
    bool hasListeners;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
   return NO;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"RNDeviceInfo_batteryLevelDidChange", @"RNDeviceInfo_batteryLevelIsLow", @"RNDeviceInfo_powerStateDidChange"];
}

- (id)init
{
    if ((self = [super init])) {
#if !TARGET_OS_TV
        _lowBatteryThreshold = 20;
        [[UIDevice currentDevice] setBatteryMonitoringEnabled:YES];

        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(batteryLevelDidChange:)
                                                     name:UIDeviceBatteryLevelDidChangeNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(powerStateDidChange:)
                                                     name:UIDeviceBatteryStateDidChangeNotification
                                                   object: nil];
#endif
    }

    return self;
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

- (DeviceType) getDeviceType
{
    switch ([[UIDevice currentDevice] userInterfaceIdiom]) {
        case UIUserInterfaceIdiomPhone: return DeviceTypeHandset;
        case UIUserInterfaceIdiomPad: return DeviceTypeTablet;
        case UIUserInterfaceIdiomTV: return DeviceTypeTv;
        default: return DeviceTypeUnknown;
    }
}

- (NSDictionary *) getStorageDictionary {
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [[NSFileManager defaultManager] attributesOfFileSystemForPath:[paths lastObject] error: nil];
}

- (NSString *) getSystemName {
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.systemName;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getSystemNameSync) {
    return self.getSystemName;
}
RCT_EXPORT_METHOD(getSystemName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getSystemName);
}

- (NSString *) getSystemVersion {
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.systemVersion;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getSystemVersionSync) {
    return self.getSystemVersion;
}
RCT_EXPORT_METHOD(getSystemVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getSystemVersion);
}

- (NSString *) getDeviceName {
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.name;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getDeviceNameSync) {
    return self.getDeviceName;
}
RCT_EXPORT_METHOD(getDeviceName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getDeviceName);
}

- (NSString *) getAppName {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getAppNameSync) {
    return self.getAppName;
}
RCT_EXPORT_METHOD(getAppName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getAppName);
}

- (NSString *) getBundleId {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBundleIdSync) {
    return self.getBundleId;
}
RCT_EXPORT_METHOD(getBundleId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getBundleId);
}

- (NSString *) getAppVersion {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getAppVersionSync) {
    return self.getAppVersion;
}
RCT_EXPORT_METHOD(getAppVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getAppVersion);
}

- (NSString *) getBuildNumber {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBuildNumberSync) {
    return self.getBuildNumber;
}
RCT_EXPORT_METHOD(getBuildNumber:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getBuildNumber);
}

- (NSString *) getCarrier {
#if (TARGET_OS_TV)
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
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getCarrierSync) {
    return self.getCarrier;
}
RCT_EXPORT_METHOD(getCarrier:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getCarrier);
}

- (NSString *) getBuildId {
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
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBuildIdSync) {
    return self.getBuildId;
}
RCT_EXPORT_METHOD(getBuildId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getBuildId);
}

- (NSString *) getUniqueId {
    return [DeviceUID uid];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getUniqueIdSync) {
    return self.getUniqueId;
}
RCT_EXPORT_METHOD(getUniqueId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getUniqueId);
}

- (NSString *) getDeviceId {
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    if ([deviceId isEqualToString:@"i386"] || [deviceId isEqualToString:@"x86_64"] ) {
        deviceId = [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
    }
    return deviceId;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getDeviceIdSync) {
    return self.getDeviceId;
}
RCT_EXPORT_METHOD(getDeviceId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getDeviceId);
}

- (BOOL) isEmulator {
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    
    if ([deviceId isEqualToString:@"i386"] || [deviceId isEqualToString:@"x86_64"] ) {
        return YES;
    } else {
        return NO;
    }
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isEmulatorSync) {
    return @(self.isEmulator);
}
RCT_EXPORT_METHOD(isEmulator:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isEmulator));
}

- (BOOL) isTablet {
    if ([self getDeviceType] == DeviceTypeTablet) {
        return YES;
    } else {
        return NO;
    }
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isTabletSync) {
    return @(self.isTablet);
}
RCT_EXPORT_METHOD(isTablet:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isTablet));
}

- (float) getFontScale {
    // Font scales based on font sizes from https://developer.apple.com/ios/human-interface-guidelines/visual-design/typography/
    float fontScale = 1.0;
    UIApplication *application = RCTSharedApplication();
    
    // Shared application is unavailable in an app extension.
    if (application) {
        NSString *contentSize = application.preferredContentSizeCategory;
        
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
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getFontScaleSync) {
    return @(self.getFontScale);
}
RCT_EXPORT_METHOD(getFontScale:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getFontScale));
}

- (double) getTotalMemory {
    return [NSProcessInfo processInfo].physicalMemory;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getTotalMemorySync) {
    return @(self.getTotalMemory);
}
RCT_EXPORT_METHOD(getTotalMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getTotalMemory));
}

- (double) getTotalDiskCapacity {
    uint64_t totalSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];
    
    if (storage) {
        NSNumber *fileSystemSizeInBytes = [storage objectForKey: NSFileSystemSize];
        totalSpace = [fileSystemSizeInBytes unsignedLongLongValue];
    }
    return (double) totalSpace;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getTotalDiskCapacitySync) {
    return @(self.getTotalDiskCapacity);
}
RCT_EXPORT_METHOD(getTotalDiskCapacity:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getTotalDiskCapacity));
}

- (double) getFreeDiskStorage {
    uint64_t freeSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];
    
    if (storage) {
        NSNumber *freeFileSystemSizeInBytes = [storage objectForKey: NSFileSystemFreeSize];
        freeSpace = [freeFileSystemSizeInBytes unsignedLongLongValue];
    }
    return (double) freeSpace;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getFreeDiskStorageSync) {
    return @(self.getFreeDiskStorage);
}
RCT_EXPORT_METHOD(getFreeDiskStorage:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getFreeDiskStorage));
}

- (NSString *) getDeviceTypeName {
    return [DeviceTypeValues objectAtIndex: [self getDeviceType]];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getDeviceTypeSync) {
    return self.getDeviceTypeName;
}
RCT_EXPORT_METHOD(getDeviceType:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getDeviceTypeName);
}

- (NSArray *) getSupportedAbis {
    /* https://stackoverflow.com/questions/19859388/how-can-i-get-the-ios-device-cpu-architecture-in-runtime */
    const NXArchInfo *info = NXGetLocalArchInfo();
    NSString *typeOfCpu = [NSString stringWithUTF8String:info->description];
    return @[typeOfCpu];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getSupportedAbisSync) {
    return self.getSupportedAbis;
}
RCT_EXPORT_METHOD(getSupportedAbis:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getSupportedAbis);
}

- (NSString *) getIpAddress {
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
            if(temp_addr->ifa_addr->sa_family == AF_INET) {
                // Check if interface is en0 which is the wifi connection on the iPhone
                if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
                    // Get NSString from C String
                    address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];

                }

            }
            temp_addr = temp_addr->ifa_next;
        }
    }
    // Free memory
    freeifaddrs(interfaces);
    return address;
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getIpAddressSync) {
    return self.getIpAddress;
}
RCT_EXPORT_METHOD(getIpAddress:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getIpAddress);
}

- (BOOL) isPinOrFingerprintSet {
#if TARGET_OS_TV
    return NO;
#else
    LAContext *context = [[LAContext alloc] init];
    return [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error:nil];
#endif
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isPinOrFingerprintSetSync) {
    return @(self.isPinOrFingerprintSet);
}
RCT_EXPORT_METHOD(isPinOrFingerprintSet:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isPinOrFingerprintSet));
}

- (void) batteryLevelDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }

    float batteryLevel = [self.powerState[@"batteryLevel"] floatValue];
    [self sendEventWithName:@"RNDeviceInfo_batteryLevelDidChange" body:@(batteryLevel)];

    if (batteryLevel <= _lowBatteryThreshold) {
        [self sendEventWithName:@"RNDeviceInfo_batteryLevelIsLow" body:@(batteryLevel)];
    }
}

- (void)powerStateDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }
    [self sendEventWithName:@"RNDeviceInfo_powerStateDidChange" body:self.powerState];
}

- (NSDictionary *) powerState {
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

    return @{
#if TARGET_OS_TV
             @"batteryLevel": @1,
             @"batteryState": @"full",
#else
             @"batteryLevel": @([UIDevice currentDevice].batteryLevel),
             @"batteryState": [@[@"unknown", @"unplugged", @"charging", @"full"] objectAtIndex: [UIDevice currentDevice].batteryState],
             @"lowPowerMode": @([NSProcessInfo processInfo].isLowPowerModeEnabled),
#endif
             };
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPowerStateSync) {
    return self.powerState;
}
RCT_EXPORT_METHOD(getPowerState:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.powerState);
}

- (float) getBatteryLevel {
    return [self.powerState[@"batteryLevel"] floatValue];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBatteryLevelSync) {
    return @(self.getBatteryLevel);
}
RCT_EXPORT_METHOD(getBatteryLevel:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getBatteryLevel));
}

- (BOOL) isBatteryCharging {
    return [self.powerState[@"batteryState"] isEqualToString:@"charging"];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isBatteryChargingSync) {
    return @(self.isBatteryCharging);
}
RCT_EXPORT_METHOD(isBatteryCharging:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isBatteryCharging));
}

- (BOOL) isLocationEnabled {
    return [CLLocationManager locationServicesEnabled];
}
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isLocationEnabledSync) {
    return @(self.isLocationEnabled);
}
RCT_EXPORT_METHOD(isLocationEnabled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isLocationEnabled));
}

- (unsigned long) getUsedMemory {
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
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getUsedMemorySync) {
    return @(self.getUsedMemory);
}
RCT_EXPORT_METHOD(getUsedMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    unsigned long usedMemory = self.getUsedMemory;
    if (usedMemory == -1) {
        reject(@"fetch_error", @"task_info failed", nil);
    } else {
        resolve(@(usedMemory));
    }
}

RCT_EXPORT_METHOD(getUserAgent:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
#if TARGET_OS_TV
    reject(@"not available");
#else
    __weak RNDeviceInfo *weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        __strong RNDeviceInfo *strongSelf = weakSelf;
        if (strongSelf) {
            // Save WKWebView (it might deallocate before we ask for user Agent)
            strongSelf->webView = [[WKWebView alloc] init];
            
            [strongSelf->webView evaluateJavaScript:@"window.navigator.userAgent;" completionHandler:^(id _Nullable result, NSError * _Nullable error) {
                if (error) {
                    reject(@"getUserAgentError", error.localizedDescription, error);
                    return;
                }
                resolve([NSString stringWithFormat:@"%@", result]);
                // Destroy the WKWebView after task is complete
                strongSelf->webView = nil;
            }];
        }
    });
#endif
}

- (NSDictionary *) getAvailableLocationProviders {
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
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getAvailableLocationProvidersSync) {
    return self.getAvailableLocationProviders;
}
RCT_EXPORT_METHOD(getAvailableLocationProviders:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getAvailableLocationProviders);
}


- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
