//
//  RNDeviceInfo.m
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#include <ifaddrs.h>
#include <arpa/inet.h>
#import <mach-o/arch.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTUtils.h>
#import "RNDeviceInfo.h"
#import "DeviceUID.h"

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
    bool hasListeners;
}

@synthesize isEmulator;

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
   return YES;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"batteryLevelDidChange", @"batteryLevelIsLow", @"powerStateDidChange"];
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

- (NSString*) deviceId
{
    struct utsname systemInfo;

    uname(&systemInfo);

    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];

    if ([deviceId isEqualToString:@"i386"] || [deviceId isEqualToString:@"x86_64"] ) {
        deviceId = [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
        self.isEmulator = YES;
    } else {
        self.isEmulator = NO;
    }

    return deviceId;
}

- (NSString *) carrier
{
#if (TARGET_OS_TV)
    return nil;
#else
    CTTelephonyNetworkInfo *netinfo = [[CTTelephonyNetworkInfo alloc] init];
    CTCarrier *carrier = [netinfo subscriberCellularProvider];
    return carrier.carrierName;
#endif
}

- (NSString*) userAgent
{
#if TARGET_OS_TV
    return @"not available";
#else
    UIWebView* webView = [[UIWebView alloc] initWithFrame:CGRectZero];
    return [webView stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
#endif
}

- (NSString*) deviceLocale
{
    NSString *language = [[NSLocale preferredLanguages] firstObject];
    return language;
}

- (NSArray<NSString *> *) preferredLocales
{
    return [NSLocale preferredLanguages];
}

- (NSString*) deviceCountry 
{
  NSString *country = [[NSLocale currentLocale] objectForKey:NSLocaleCountryCode];
  return country;
}

- (NSString*) timezone
{
  NSTimeZone *currentTimeZone = [NSTimeZone localTimeZone];
  return currentTimeZone.name;
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

- (bool) isTablet
{
  return [self getDeviceType] == DeviceTypeTablet;
}

// Font scales based on font sizes from https://developer.apple.com/ios/human-interface-guidelines/visual-design/typography/
- (NSNumber*) fontScale
{
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

  return [NSNumber numberWithFloat: fontScale];
}

- (bool) is24Hour
{
    NSString *format = [NSDateFormatter dateFormatFromTemplate:@"j" options:0 locale:[NSLocale currentLocale]];
    return ([format rangeOfString:@"a"].location == NSNotFound);
}

- (unsigned long long) totalMemory {
  return [NSProcessInfo processInfo].physicalMemory;
}

- (NSDictionary *) getStorageDictionary {
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [[NSFileManager defaultManager] attributesOfFileSystemForPath:[paths lastObject] error: nil];
}

- (uint64_t) totalDiskCapacity {
    uint64_t totalSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];

    if (storage) {
        NSNumber *fileSystemSizeInBytes = [storage objectForKey: NSFileSystemSize];
        totalSpace = [fileSystemSizeInBytes unsignedLongLongValue];
    }
    return totalSpace;
}

- (uint64_t) freeDiskStorage {
    uint64_t freeSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];

    if (storage) {
        NSNumber *freeFileSystemSizeInBytes = [storage objectForKey: NSFileSystemFreeSize];
        freeSpace = [freeFileSystemSizeInBytes unsignedLongLongValue];
    }
    return freeSpace;
}

- (NSString *)getCPUType {
    /* https://stackoverflow.com/questions/19859388/how-can-i-get-the-ios-device-cpu-architecture-in-runtime */
    const NXArchInfo *info = NXGetLocalArchInfo();
    NSString *typeOfCpu = [NSString stringWithUTF8String:info->description];
    return typeOfCpu;
}


- (NSString *)getBuildId {
    #if TARGET_OS_TV
        return @"not available";
    #else
        size_t bufferSize = 64;
        NSMutableData *buffer = [[NSMutableData alloc] initWithLength:bufferSize];
        int status = sysctlbyname("kern.osversion", buffer.mutableBytes, &bufferSize, NULL, 0);
        if (status != 0) {
            return @"not available";
        }
        return [[NSString alloc] initWithCString:buffer.mutableBytes encoding:NSUTF8StringEncoding];
    #endif
}

- (NSDictionary *)constantsToExport
{
    UIDevice *currentDevice = [UIDevice currentDevice];
    NSString *uniqueId = [DeviceUID uid];
    return @{
             @"systemName": currentDevice.systemName,
             @"systemVersion": currentDevice.systemVersion,
             @"apiLevel": @"not available",
             @"brand": @"Apple",
             @"deviceId": self.deviceId ?: [NSNull null],
             @"deviceName": currentDevice.name,
             @"deviceLocale": self.deviceLocale ?: [NSNull null],
             @"preferredLocales": self.preferredLocales ?: [NSNull null],
             @"deviceCountry": self.deviceCountry ?: [NSNull null],
             @"uniqueId": uniqueId,
             @"appName": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"] ?: [NSNull null],
             @"bundleId": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"] ?: [NSNull null],
             @"appVersion": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: [NSNull null],
             @"buildNumber": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"] ?: [NSNull null],
             @"buildId": [self getBuildId],
             @"systemManufacturer": @"Apple",
             @"carrier": self.carrier ?: [NSNull null],
             @"userAgent": self.userAgent ?: [NSNull null],
             @"timezone": self.timezone ?: [NSNull null],
             @"isEmulator": @(self.isEmulator),
             @"isTablet": @(self.isTablet),
             @"is24Hour": @(self.is24Hour),
             @"fontScale": self.fontScale,
             @"totalMemory": @(self.totalMemory),
             @"totalDiskCapacity": @(self.totalDiskCapacity),
             @"freeDiskStorage": @(self.freeDiskStorage),
             @"deviceType": [DeviceTypeValues objectAtIndex: [self getDeviceType]],
             @"supportedABIs": @[[self getCPUType]],
             };
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

RCT_EXPORT_METHOD(isPinOrFingerprintSet:(RCTResponseSenderBlock)callback)
{
  #if TARGET_OS_TV
    BOOL isPinOrFingerprintSet = false;
  #else
    LAContext *context = [[LAContext alloc] init];
    BOOL isPinOrFingerprintSet = ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error:nil]);
  #endif
    callback(@[[NSNumber numberWithBool:isPinOrFingerprintSet]]);
}

- (void)batteryLevelDidChange:(NSNotification *)notification
{
    if (!hasListeners) {
        return;
    }

    float batteryLevel = [self.powerState[@"batteryLevel"] floatValue];
    [self sendEventWithName:@"batteryLevelDidChange" body:@(batteryLevel)];

    if (batteryLevel <= _lowBatteryThreshold) {
        [self sendEventWithName:@"batteryLevelIsLow" body:@(batteryLevel)];
    }
}

- (void)powerStateDidChange:(NSNotification *)notification
{
    if (!hasListeners) {
        return;
    }

    [self sendEventWithName:@"powerStateDidChange" body:self.powerState];
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
    return resolve(self.powerState);
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
