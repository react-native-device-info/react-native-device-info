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

RCT_EXPORT_METHOD(getSystemName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    UIDevice *currentDevice = [UIDevice currentDevice];
    resolve(currentDevice.systemName);
}

RCT_EXPORT_METHOD(getSystemVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    UIDevice *currentDevice = [UIDevice currentDevice];
    resolve(currentDevice.systemVersion);
}

RCT_EXPORT_METHOD(getDeviceName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    UIDevice *currentDevice = [UIDevice currentDevice];
    resolve(currentDevice.name);
}

RCT_EXPORT_METHOD(getAppName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString* bundleText = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
    resolve(bundleText);
}

RCT_EXPORT_METHOD(getBundleId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString* bundleText = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"];
    resolve(bundleText);
}

RCT_EXPORT_METHOD(getAppVersion:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString* bundleText = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
    resolve(bundleText);
}

RCT_EXPORT_METHOD(getBuildNumber:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString* bundleText = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
    resolve(bundleText);
}

RCT_EXPORT_METHOD(getCarrier:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
#if (TARGET_OS_TV)
    resolve(nil;
#else
    CTTelephonyNetworkInfo *netinfo = [[CTTelephonyNetworkInfo alloc] init];
    CTCarrier *carrier = [netinfo subscriberCellularProvider];
    resolve(carrier.carrierName);
#endif
}

RCT_EXPORT_METHOD(getBuildId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
#if TARGET_OS_TV
    resolve(@"not available");
#else
    size_t bufferSize = 64;
    NSMutableData *buffer = [[NSMutableData alloc] initWithLength:bufferSize];
    int status = sysctlbyname("kern.osversion", buffer.mutableBytes, &bufferSize, NULL, 0);
    if (status != 0) {
        resolve(@"not available");
    }
    NSString* buildId = [[NSString alloc] initWithCString:buffer.mutableBytes encoding:NSUTF8StringEncoding];
    resolve(buildId);
#endif
}

RCT_EXPORT_METHOD(getUniqueId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString* uid = [DeviceUID uid];
    resolve(uid);
}

RCT_EXPORT_METHOD(getApiLevel:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@"not available");
}

RCT_EXPORT_METHOD(getSystemManufacturer:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@"Apple");
}

RCT_EXPORT_METHOD(getBrand:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@"Apple");
}

RCT_EXPORT_METHOD(getDeviceId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    if ([deviceId isEqualToString:@"i386"] || [deviceId isEqualToString:@"x86_64"] ) {
        deviceId = [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
    }
    resolve(deviceId);
}

RCT_EXPORT_METHOD(isEmulator:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    
    if ([deviceId isEqualToString:@"i386"] || [deviceId isEqualToString:@"x86_64"] ) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

RCT_EXPORT_METHOD(isTablet:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self getDeviceType] == DeviceTypeTablet));
}

RCT_EXPORT_METHOD(getFontScale:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
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
    
    resolve(@(fontScale));
}

RCT_EXPORT_METHOD(getTotalMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    double memory = [NSProcessInfo processInfo].physicalMemory;
    resolve(@(memory));
}

RCT_EXPORT_METHOD(getTotalDiskCapacity:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    uint64_t totalSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];
    
    if (storage) {
        NSNumber *fileSystemSizeInBytes = [storage objectForKey: NSFileSystemSize];
        totalSpace = [fileSystemSizeInBytes unsignedLongLongValue];
    }
    resolve(@((double) totalSpace));
}

RCT_EXPORT_METHOD(getFreeDiskStorage:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    uint64_t freeSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];
    
    if (storage) {
        NSNumber *freeFileSystemSizeInBytes = [storage objectForKey: NSFileSystemFreeSize];
        freeSpace = [freeFileSystemSizeInBytes unsignedLongLongValue];
    }
    resolve(@((double) freeSpace));
}

RCT_EXPORT_METHOD(getDeviceType:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve([DeviceTypeValues objectAtIndex: [self getDeviceType]]);
}

RCT_EXPORT_METHOD(getSupportedAbis:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    /* https://stackoverflow.com/questions/19859388/how-can-i-get-the-ios-device-cpu-architecture-in-runtime */
    const NXArchInfo *info = NXGetLocalArchInfo();
    NSString *typeOfCpu = [NSString stringWithUTF8String:info->description];
    resolve(typeOfCpu);
}

RCT_EXPORT_METHOD(getMacAddress:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *address = @"02:00:00:00:00:00";
    resolve(address);
}

RCT_EXPORT_METHOD(getIpAddress:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
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
    resolve(address);
}

RCT_EXPORT_METHOD(isPinOrFingerprintSet:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
#if TARGET_OS_TV
    resolve(@NO);
#else
    LAContext *context = [[LAContext alloc] init];
    resolve(@([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error:nil]));
#endif
}

- (void)batteryLevelDidChange:(NSNotification *)notification
{
    if (!hasListeners) {
        return;
    }

    float batteryLevel = [self.powerState[@"batteryLevel"] floatValue];
    [self sendEventWithName:@"RNDeviceInfo_batteryLevelDidChange" body:@(batteryLevel)];

    if (batteryLevel <= _lowBatteryThreshold) {
        [self sendEventWithName:@"RNDeviceInfo_batteryLevelIsLow" body:@(batteryLevel)];
    }
}

- (void)powerStateDidChange:(NSNotification *)notification
{
    if (!hasListeners) {
        return;
    }

    [self sendEventWithName:@"RNDeviceInfo_powerStateDidChange" body:self.powerState];
}

- (NSDictionary *)powerState
{
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

RCT_EXPORT_METHOD(getBatteryLevel:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@([self.powerState[@"batteryLevel"] floatValue]));
}

RCT_EXPORT_METHOD(getPowerState:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(self.powerState);
}

RCT_EXPORT_METHOD(isBatteryCharging:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    BOOL isCharging = [self.powerState[@"batteryState"] isEqualToString:@"charging"];
    resolve(@(isCharging));
}

RCT_EXPORT_METHOD(isLocationEnabled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    BOOL locationServicesEnabled = [CLLocationManager locationServicesEnabled];
    resolve(@(locationServicesEnabled));
}

RCT_EXPORT_METHOD(getUsedMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    struct task_basic_info info;
    mach_msg_type_number_t size = sizeof(info);
    kern_return_t kerr = task_info(mach_task_self(),
                                   TASK_BASIC_INFO,
                                   (task_info_t)&info,
                                   &size);
    if (kerr != KERN_SUCCESS) {
      reject(@"fetch_error", @"task_info failed", nil);
      return;
    }

    resolve(@((unsigned long)info.resident_size));
}

RCT_EXPORT_METHOD(getUserAgent:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
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

RCT_EXPORT_METHOD(getAvailableLocationProviders:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
#if !TARGET_OS_TV
    resolve(@{
              @"locationServicesEnabled": [NSNumber numberWithBool: [CLLocationManager locationServicesEnabled]],
              @"significantLocationChangeMonitoringAvailable": [NSNumber numberWithBool: [CLLocationManager significantLocationChangeMonitoringAvailable]],
              @"headingAvailable": [NSNumber numberWithBool: [CLLocationManager headingAvailable]],
              @"isRangingAvailable": [NSNumber numberWithBool: [CLLocationManager isRangingAvailable]]
              });
#else
    resolve(@{
              @"locationServicesEnabled": [NSNumber numberWithBool: [CLLocationManager locationServicesEnabled]]
              });
#endif
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
