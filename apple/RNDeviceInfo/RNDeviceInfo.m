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
#import <DeviceCheck/DeviceCheck.h>
#import "EnvironmentUtil.h"

#if !(TARGET_OS_TV)
#import <WebKit/WebKit.h>
#import <LocalAuthentication/LocalAuthentication.h>
#endif

#if TARGET_OS_OSX
#import <IOKit/ps/IOPowerSources.h>
#import <IOKit/ps/IOPSKeys.h>
#import <IOBluetooth/IOBluetooth.h>
#endif
typedef NS_ENUM(NSInteger, DeviceType) {
    DeviceTypeHandset,
    DeviceTypeTablet,
    DeviceTypeTv,
    DeviceTypeDesktop,
    DeviceTypeMac,
    DeviceTypeUnknown
};

#define DeviceTypeValues [NSArray arrayWithObjects: @"Handset", @"Tablet", @"Tv", @"Desktop", @"Mac", @"unknown", nil]

#if !(TARGET_OS_TV)
@import CoreTelephony;
@import Darwin.sys.sysctl;
#endif

@implementation RNDeviceInfo
{
    bool hasListeners;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup
{
   return NO;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"RNDeviceInfo_batteryLevelDidChange", @"RNDeviceInfo_batteryLevelIsLow", @"RNDeviceInfo_powerStateDidChange", @"RNDeviceInfo_headphoneConnectionDidChange", @"RNDeviceInfo_brightnessDidChange"];
}

- (NSDictionary *)constantsToExport {
    return @{
         @"deviceId": [self getDeviceId],
         @"bundleId": [self getBundleId],
         @"systemName": [self getSystemName],
         @"systemVersion": [self getSystemVersion],
         @"appVersion": [self getAppVersion],
         @"buildNumber": [self getBuildNumber],
         @"isTablet": @([self isTablet]),
         @"appName": [self getAppName],
         @"brand": @"Apple",
         @"model": [self getModel],
         @"deviceType": [self getDeviceTypeName],
         @"isDisplayZoomed": @([self isDisplayZoomed]),
     };
}

- (id)init
{
    if ((self = [super init])) {
#if (!TARGET_OS_TV && !TARGET_OS_OSX)
        _lowBatteryThreshold = 0.20;
        [[UIDevice currentDevice] setBatteryMonitoringEnabled:YES];

        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(batteryLevelDidChange:)
                                                     name:UIDeviceBatteryLevelDidChangeNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(powerStateDidChange:)
                                                     name:UIDeviceBatteryStateDidChangeNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(powerStateDidChange:)
                                                     name:NSProcessInfoPowerStateDidChangeNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(headphoneConnectionDidChange:)
                                                     name:AVAudioSessionRouteChangeNotification
                                                   object: [AVAudioSession sharedInstance]];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(brightnessDidChange:)
                                                     name:UIScreenBrightnessDidChangeNotification
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
#if (!TARGET_OS_OSX)
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
#endif
    return DeviceTypeMac;
}

- (NSDictionary *) getStorageDictionary {
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    return [[NSFileManager defaultManager] attributesOfFileSystemForPath:[paths lastObject] error: nil];
}

- (NSString *) getSystemName {
#if TARGET_OS_OSX
    NSProcessInfo *processInfo = [NSProcessInfo processInfo];
    return processInfo.operatingSystemVersionString;
#endif
#if (!TARGET_OS_OSX)
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.systemName;
#endif
}

- (NSString *) getSystemVersion {
#if TARGET_OS_OSX
    NSProcessInfo *processInfo = [NSProcessInfo processInfo];
    return processInfo.operatingSystemVersionString;
#endif
#if (!TARGET_OS_OSX)
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.systemVersion;
#endif
}

- (NSString *) getDeviceName {
#if TARGET_OS_OSX
    return [[NSHost currentHost] localizedName];
#else
    UIDevice *currentDevice = [UIDevice currentDevice];
    return currentDevice.name;
#endif
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getDeviceNameSync) {
    return self.getDeviceName;
}

RCT_EXPORT_METHOD(getDeviceName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getDeviceName);
}

- (BOOL) isDisplayZoomed {
#if (!TARGET_OS_OSX)
    return [UIScreen mainScreen].scale != [UIScreen mainScreen].nativeScale;
#else
    return false;
#endif
}

- (NSString *) getAppName {
    NSString *displayName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
    NSString *bundleName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleName"];
    return displayName ? displayName : bundleName;
}

- (NSString *) getBundleId {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"];
}

- (NSString *) getBaseOs {
#if (TARGET_OS_OSX)
    return @"macOS";
#else
    return @"unknown";
#endif
}

- (NSString *) getAppVersion {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
}

- (NSString *) getBuildNumber {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"];
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
        @"AppleTV6,2": @"Apple TV 4K", // Apple TV 4K
        @"MacBookAir2,1": @"MacBook Air (Mid 2009)", // MacBook Air (Mid 2009)
        @"MacBookAir3,1": @"MacBook Air (11-inch, Late 2010)", // MacBook Air (11-inch, Late 2010)
        @"MacBookAir3,2": @"MacBook Air (13-inch, Late 2010)", // MacBook Air (13-inch, Late 2010)
        @"MacBookAir4,1": @"MacBook Air (11-inch, Mid 2011)", // MacBook Air (11-inch, Mid 2011)
        @"MacBookAir4,2": @"MacBook Air (13-inch, Mid 2011)", // MacBook Air (13-inch, Mid 2011)
        @"MacBookAir5,1": @"MacBook Air (11-inch, Mid 2012)", // MacBook Air (11-inch, Mid 2012)
        @"MacBookAir5,2": @"MacBook Air (13-inch, Mid 2012)", // MacBook Air (13-inch, Mid 2012)
        // @"MacBookAir6,1": @"MacBook Air (11-inch, Mid 2013)", // MacBook Air (11-inch, Mid 2013) NOTE: Cannot be separated by model identifier, ned to use part number also
        // @"MacBookAir6,2": @"MacBook Air (13-inch, Mid 2013)", // MacBook Air (13-inch, Mid 2013) NOTE: Cannot be separated by model identifier, ned to use part number also
        @"MacBookAir6,1": @"MacBook Air (11-inch, Early 2014)", // MacBook Air (11-inch, Early 2014)
        @"MacBookAir6,2": @"MacBook Air (13-inch, Early 2014)", // MacBook Air (13-inch, Early 2014)
        @"MacBookAir7,1": @"MacBook Air (11-inch, Early 2015)", // MacBook Air (11-inch, Early 2015)
        @"MacBookAir7,2": @"MacBook Air (13-inch, Early 2015 / 2017)", // MacBook Air (13-inch, Early 2015) or MacBook Air (13-inch, 2017)
        @"MacBookAir8,1": @"MacBook Air (Retina, 13-inch, 2018)", // MacBook Air (Retina, 13-inch, 2018)
        @"MacBookAir8,2": @"MacBook Air (Retina, 13-inch, 2019)", // MacBook Air (Retina, 13-inch, 2019)
        @"MacBookAir9,1": @"MacBook Air (Retina, 13-inch, 2020)", // MacBook Air (Retina, 13-inch, 2020)
        @"MacBookAir10,1": @"MacBook Air (M1, 2020)", // MacBook Air (M1, 2020)
        @"MacBookPro4,1": @"MacBook Pro (Early 2008)", // MacBook Pro (15-inch, Early 2008) or MacBook Pro (17-inch, Early 2008)
        @"MacBookPro5,1": @"MacBook Pro (15-inch, Late 2008)", // MacBook Pro (15-inch, Late 2008)
        @" MacBookPro5,2": @"MacBook Pro (17-inch Early 2009 / Mid 2009)", // MacBook Pro (17-inch, Mid 2009) or MacBook Pro (17-inch, Early 2009)
        @"MacBookPro5,3": @"MacBook Pro (15-inch, Mid 2009)", // MacBook Pro (15-inch, Mid 2009) or MacBook Pro (15-inch, 2.53GHz, Mid 2009)
        @"MacBookPro5,5": @"MacBook Pro (13-inch, Mid 2009)", // MacBook Pro (13-inch, Mid 2009)
        @"MacBookPro6,1": @"MacBook Pro (17-inch, Mid 2010)", // MacBook Pro (17-inch, Mid 2010)
        @"MacBookPro6,2": @"MacBook Pro (15-inch, Mid 2010)", // MacBook Pro (15-inch, Mid 2010)
        @"MacBookPro7,1": @"MacBook Pro (13-inch, Mid 2010)", // MacBook Pro (13-inch, Mid 2010)
        @"MacBookPro8,1": @"MacBook Pro (13-inch, Early 2011 / Late 2011)", // MacBook Pro (13-inch, Early 2011) or MacBook Pro (13-inch, Late 2011)
        @"MacBookPro8,2": @"MacBook Pro (15-inch, Early 2011 / Late 2011)", // MacBook Pro (15-inch, Early 2011) or MacBook Pro (15-inch, Late 2011)
        @"MacBookPro8,3": @"MacBook Pro (17-inch, Early 2011 / Late 2011)", // MacBook Pro (17-inch, Early 2011) or MacBook Pro (17-inch, Late 2011)
        @"MacBookPro9,1": @"MacBook Pro (15-inch, Mid 2012)", // MacBook Pro (15-inch, Mid 2012)
        @"MacBookPro9,2": @"MacBook Pro (13-inch, Mid 2012)", // MacBook Pro (13-inch, Mid 2012)
        @"MacBookPro10,1": @"MacBook Pro (Retina, 15-inch, Mid 2012 / Early 2013)", // MacBook Pro (Retina, 15-inch, Mid 2012) or MacBook Pro (Retina, 15-inch, Early 2013)
        @"MacBookPro10,2": @"MacBook Pro (Retina, 13-inch, Late 2012 / Early 2013)", // MacBook Pro (Retina, 13-inch, Late 2012) or MacBook Pro (Retina, 13-inch, Early 2013)
        @"MacBookPro11,1": @"MacBook Pro (Retina, 13-inch, Late 2013 / Mid 2014)", // MacBook Pro (Retina, 13-inch, Late 2013) or MacBook Pro (Retina, 13-inch, Mid 2014)
        @"MacBookPro11,2": @"MacBook Pro (Retina, 15-inch, Late 2013 / Mid 2014)", // MacBook Pro (Retina, 15-inch, Late 2013) or MacBook Pro (Retina, 15-inch, Mid 2014)
        @"MacBookPro11,3": @"MacBook Pro (Retina, 15-inch, Late 2013 / Mid 2014)", // MacBook Pro (Retina, 15-inch, Late 2014) or MacBook Pro (Retina, 15-inch, Mid 2014)
        @"MacBookPro11,4": @"MacBook Pro (Retina, 15-inch, Mid 2015)", // MacBook Pro (Retina, 15-inch, Mid 2015)
        @"MacBookPro11,5": @"MacBook Pro (Retina, 15-inch, Mid 2015)", // MacBook Pro (Retina, 15-inch, Mid 2015)
        @"MacBookPro12,1": @"MacBook Pro (Retina, 13-inch, Early 2015)", // MacBook Pro (Retina, 13-inch, Early 2015)
        @"MacBookPro13,1": @"MacBook Pro (13-inch, 2016, Two Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2016, Two Thunderbolt 3 ports)
        @"MacBookPro13,2": @"MacBook Pro (13-inch, 2016, Four Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2016, Four Thunderbolt 3 ports)
        @"MacBookPro13,3": @"MacBook Pro (15-inch, 2016)", // MacBook Pro (15-inch, 2016)
        @"MacBookPro14,1": @"MacBook Pro (13-inch, 2017, Two Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2017, Two Thunderbolt 3 ports)
        @"MacBookPro14,2": @"MacBook Pro (13-inch, 2017, Four Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2017, Four Thunderbolt 3 ports)
        @"MacBookPro14,3": @"MacBook Pro (15-inch, 2017)", // MacBook Pro (15-inch, 2017)
        @"MacBookPro15,1": @"MacBook Pro (15-inch, 2018 / 2019)", // MacBook Pro (15-inch, 2018) or MacBook Pro (15-inch, 2019)
        @"MacBookPro15,2": @"MacBook Pro (13-inch, 2018 / 2019, Four Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2018, Four Thunderbolt 3 ports) or MacBook Pro (13-inch, 2019, Four Thunderbolt 3 ports)
        @"MacBookPro15,3": @"MacBook Pro (15-inch, 2019)", // MacBook Pro (15-inch, 2019)
        @"MacBookPro15,4": @"MacBook Pro (13-inch, 2019, Two Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2019, Two Thunderbolt 3 ports)
        @"MacBookPro16,1": @"MacBook Pro (16-inch, 2019)", // MacBook Pro (16-inch, 2019)
        @"MacBookPro16,2": @"MacBook Pro (13-inch, 2020, Four Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2020, Four Thunderbolt 3 ports)
        @"MacBookPro16,3": @"MacBook Pro (13-inch, 2020, Two Thunderbolt 3 ports)", // MacBook Pro (13-inch, 2020, Two Thunderbolt 3 ports)
        @"MacBookPro16,4": @"MacBook Pro (16-inch, 2019)", // MacBook Pro (16-inch, 2019)
        @"MacBookPro17,1": @"MacBook Pro (13-inch, M1, 2020)", // MacBook Pro (13-inch, M1, 2020)
        @"MacBookPro18,1": @"MacBook Pro (16-inch, 2021)", //MacBook Pro (16-inch, 2021)
        @"MacBookPro18,2": @"MacBook Pro (16-inch, 2021)", //MacBook Pro (16-inch, 2021)
        @"MacBookPro18,3": @"MacBook Pro (14-inch, 2021)", // MacBook Pro (14-inch, 2021)
        @"MacBookPro18,4": @"MacBook Pro (14-inch, 2021)", // MacBook Pro (14-inch, 2021)
        @"MacBook5,2": @"MacBook (13-inch, Early 2009 / Mid 2009)", // MacBook (13-inch, Early 2009) or MacBook (13-inch, Mid 2009)
        @"MacBook6,1": @"MacBook (13-inch, Late 2009)", // MacBook (13-inch, Late 2009)
        @"MacBook7,1": @"MacBook (13-inch, Mid 2010)", // MacBook (13-inch, Mid 2010)
        @"MacBook8,1": @"MacBook (Retina, 12-inch, Early 2015)", // MacBook (Retina, 12-inch, Early 2015)
        @"MacBook9,1": @"MacBook (Retina, 12-inch, Early 2016)", // MacBook (Retina, 12-inch, Early 2016)
        @"MacBook10,1": @"MacBook (Retina, 12-inch, 2017)", // MacBook (Retina, 12-inch, 2017)
        @"iMacPro1,1": @"iMac Pro", // iMac Pro
        @"iMac9,1": @"iMac (Early 2009)", // iMac (20-inch/24-inch, Early 2009)
        @"iMac10,1": @"iMac (Late 2009)", // iMac (21.5-inch/27-inch, Late 2009)
        @"iMac11,2": @"iMac (21.5-inch, Mid 2010)", // iMac (21.5-inch, Mid 2010)
        @"iMac11,3": @"iMac (27-inch, Mid 2010)", // iMac (27-inch, Mid 2010)
        @"iMac12,1": @"iMac (21.5-inch, Mid 2011)", // iMac (21.5-inch, Mid 2011)
        @"iMac12,2": @"iMac (27-inch, Mid 2011)", // iMac (27-inch, Mid 2011)
        @"iMac13,1": @"iMac (21.5-inch, Late 2012)", // iMac (21.5-inch, Late 2012)
        @"iMac13,2": @"iMac (27-inch, Late 2012)", // iMac (27-inch, Late 2012)
        @"iMac14,1": @"iMac (21.5-inch, Late 2013)", // iMac (21.5-inch, Late 2013)
        @"iMac14,2": @"iMac (27-inch, Late 2013)", // iMac (27-inch, Late 2013)
        @"iMac14,4": @"iMac (21.5-inch, Mid 2014)", // iMac (21.5-inch, Mid 2014)
        @"iMac15,1": @"iMac (Retina 5K, 27-inch, Late 2014 / Mid 2015)", // iMac (Retina 5K, 27-inch, Late 2014 / Mid 2015)
        @"iMac16,1": @"iMac (21.5-inch, Late 2015)", // iMac (21.5-inch, Late 2015)
        @"iMac16,2": @"iMac (Retina 4K, 21.5-inch, Late 2015)", // iMac (Retina 4K, 21.5-inch, Late 2015)
        @"iMac17,1": @"iMac (Retina 5K, 27-inch, Late 2015)", // iMac (Retina 5K, 27-inch, Late 2015)
        @"iMac18,1": @"iMac (21.5-inch, 2017)", // iMac (21.5-inch, 2017)
        @"iMac18,2": @"iMac (Retina 4K, 21.5-inch, 2017)", // iMac (Retina 4K, 21.5-inch, 2017)
        @"iMac18,3": @"iMac (Retina 5K, 27-inch, 2017)", // iMac (Retina 5K, 27-inch, 2017)
        @"iMac19,1": @"iMac (Retina 5K, 27-inch, 2019)", // iMac (Retina 5K, 27-inch, 2019)
        @"iMac19,2": @"iMac (Retina 4K, 21.5-inch, 2019)", // iMac (Retina 4K, 21.5-inch, 2019)
        @"iMac20,1": @"iMac (Retina 5K, 27-inch, 2020)", // iMac (Retina 5K, 27-inch, 2020)
        @"iMac20,2": @"iMac (Retina 5K, 27-inch, 2020)", // iMac (Retina 5K, 27-inch, 2020)
        @"iMac21,1": @"iMac (24-inch, M1, 2021)", // iMac (24-inch, M1, 2021)
        @"iMac21,2": @"iMac (24-inch, M1, 2021)", // iMac (24-inch, M1, 2021)
        @"Macmini3,1": @"Mac mini (Early/Late 2009)", // Mac mini (Early/Late 2009)
        @"Macmini4,1": @"Mac mini (Mid 2010)", // Mac mini (Mid 2010)
        @"Macmini5,1": @"Mac mini (Mid 2011)", // Mac mini (Mid 2011)
        @"Macmini5,2": @"Mac mini (Mid 2011)", // Mac mini (Mid 2011)
        @"Macmini6,1": @"Mac mini (Late 2012)", // Mac mini (Late 2012)
        @"Macmini6,2": @"Mac mini (Late 2012)", // Mac mini (Late 2012)
        @"Macmini7,1": @"Mac mini (Late 2014)", // Mac mini (Late 2014)
        @"Macmini8,1": @"Mac mini (2018)", // Mac mini (2018)
        @"MacPro4,1": @"Mac Pro (Early 2009)", // Mac Pro (Early 2009)
        @"MacPro5,1": @"Mac Pro (Mid 2010/2012)", // Mac Pro [Server] (Mid 2010/2012)
        @"MacPro6,1": @"Mac Pro (Late 2013)", // Mac Pro (Late 2013)
        @"MacPro7,1": @"Mac Pro (2019)", // Mac Pro (2019) Mac Pro (Rack, 2019)
        @"Mac14,2": @"MacBook Air (M2, 2022)", // MacBook Air (M2, 2022)
        @"Mac14,7": @"MacBook Pro (13-inch, M2, 2022)", // MacBook Pro (13-inch, M2, 2022)
    };
}

- (NSString *) getModel {
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
    } else if ([deviceId hasPrefix:@"MacBookAir"]) {
        return @"MacBook Air";
    } else if ([deviceId hasPrefix:@"MacBookPro"]) {
        return @"MacBook Pro";
    } else if ([deviceId hasPrefix:@"MacBook"]) {
        return @"Mac Book";
    } else if ([deviceId hasPrefix:@"iMacPro"]) {
        return @"iMac Pro";
    } else if ([deviceId hasPrefix:@"iMac"]) {
        return @"iMac";
    } else if ([deviceId hasPrefix:@"Macmini"]) {
        return @"Macmini";
    } else if ([deviceId hasPrefix:@"MacPro"]) {
        return @"MacPro";
    } else if ([deviceId hasPrefix:@"Mac"]) {
        return @"Mac";
    }
    
    // If we could not even get a generic, it's unknown
    return @"unknown";
}

- (NSString *) getCarrier {
#if (TARGET_OS_TV || TARGET_OS_MACCATALYST || TARGET_OS_OSX)
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

RCT_EXPORT_METHOD(getBuildId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getBuildId);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBuildIdSync) {
    return self.getBuildId;
}

- (NSString *) uniqueId {
    return @"Testing unique id";
//    return [DeviceUID uid];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getUniqueIdSync) {
    return self.uniqueId;
}

RCT_EXPORT_METHOD(getUniqueId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.uniqueId);
}

RCT_EXPORT_METHOD(syncUniqueId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([DeviceUID syncUid]);
}

- (NSString *) getDeviceId {
#if TARGET_IPHONE_SIMULATOR
     return [NSString stringWithFormat:@"%s", getenv("SIMULATOR_MODEL_IDENTIFIER")];
#elif !TARGET_OS_OSX
    struct utsname systemInfo;
    uname(&systemInfo);
    NSString* deviceId = [NSString stringWithCString:systemInfo.machine
                                            encoding:NSUTF8StringEncoding];
    return deviceId;
#else
    NSString *deviceId = @"unknown";
    size_t len = 0;
    sysctlbyname("hw.model", NULL, &len, NULL, 0);
    if (len) {
        char *model = malloc(len*sizeof(char));
        sysctlbyname("hw.model", model, &len, NULL, 0);
        deviceId = [NSString stringWithUTF8String:model];
        free(model);
    }
    
    return deviceId;
#endif
}


- (BOOL) isEmulator {
    #if TARGET_IPHONE_SIMULATOR
        return YES;
    #else
        return NO;
    #endif
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

RCT_EXPORT_METHOD(getDeviceToken:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if (@available(iOS 11.0, macOS 10.15, *)) {
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

- (float) getFontScale {
#if !TARGET_OS_OSX
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
#endif
    return -1.0;

}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBaseOsSync) {
    return self.getBaseOs;
}

RCT_EXPORT_METHOD(getBaseOs:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getBaseOs);
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
#if TARGET_OS_OSX
    NSError *error;
    NSDictionary* fileAttributes = [[NSFileManager defaultManager] attributesOfFileSystemForPath:@"/" error:&error];
    if (error) {
        return -1;
    }
    
    uint64_t totalSpace = 0;
    totalSpace = [[fileAttributes objectForKey:NSFileSystemSize] longLongValue];
    return (double) totalSpace;
#else
    uint64_t totalSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];

    if (storage) {
        NSNumber *fileSystemSizeInBytes = [storage objectForKey: NSFileSystemSize];
        totalSpace = [fileSystemSizeInBytes unsignedLongLongValue];
    }
    return (double) totalSpace;
#endif
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getTotalDiskCapacitySync) {
    return @(self.getTotalDiskCapacity);
}

RCT_EXPORT_METHOD(getTotalDiskCapacity:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getTotalDiskCapacity));
}

- (double) getFreeDiskStorage {
#if !TARGET_OS_OSX
    uint64_t freeSpace = 0;
    NSDictionary *storage = [self getStorageDictionary];
    
    if (storage) {
        NSNumber *freeFileSystemSizeInBytes = [storage objectForKey: NSFileSystemFreeSize];
        freeSpace = [freeFileSystemSizeInBytes unsignedLongLongValue];
    }
    return (double) freeSpace;
#else
    NSError *error;
    NSDictionary* fileAttributes = [[NSFileManager defaultManager] attributesOfFileSystemForPath:@"/" error:&error];
    if (error) {
        return -1;
    }
    
    unsigned long long freeSpace = [[fileAttributes objectForKey:NSFileSystemFreeSize] longLongValue];
    return freeSpace;
#endif
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

- (NSArray *) getSupportedAbis {
    /* https://stackoverflow.com/questions/19859388/how-can-i-get-the-ios-device-cpu-architecture-in-runtime */
    const NXArchInfo *info = NXGetLocalArchInfo();
    NSString *typeOfCpu = [NSString stringWithUTF8String:info->description];
#if TARGET_OS_OSX
    if([typeOfCpu rangeOfString:@"arm64"].location == NSNotFound){
        return @[typeOfCpu];
    } else {
        return @[typeOfCpu, @"x86"];
    }
#endif
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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getIpAddressSync) {
    return self.getIpAddress;
}

RCT_EXPORT_METHOD(getIpAddress:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getIpAddress);
}

- (BOOL) isPinOrFingerprintSet {
#if TARGET_OS_TV
    return NO;
#endif
    LAContext *context = [[LAContext alloc] init];
#if TARGET_OS_OSX
    return [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:nil];
#else
    return [context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error: nil];
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

    float batteryLevel = self.getBatteryLevel;
    [self sendEventWithName:@"RNDeviceInfo_batteryLevelDidChange" body:@(batteryLevel)];

    if (batteryLevel <= _lowBatteryThreshold) {
        [self sendEventWithName:@"RNDeviceInfo_batteryLevelIsLow" body:@(batteryLevel)];
    }
}

- (void) powerStateDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }
    [self sendEventWithName:@"RNDeviceInfo_powerStateDidChange" body:self.powerState];
}

- (void) headphoneConnectionDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }
    BOOL isConnected = [self isHeadphonesConnected];
    [self sendEventWithName:@"RNDeviceInfo_headphoneConnectionDidChange" body:[NSNumber numberWithBool:isConnected]];
}

- (void) brightnessDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }
    [self sendEventWithName:@"RNDeviceInfo_brightnessDidChange" body:self.getBrightness];
}

- (NSDictionary *) powerState {
#if RCT_DEV && (!TARGET_IPHONE_SIMULATOR) && !TARGET_OS_TV && !TARGET_OS_OSX
    if ([UIDevice currentDevice].isBatteryMonitoringEnabled != true) {
        RCTLogWarn(@"Battery monitoring is not enabled. "
                   "You need to enable monitoring with `[UIDevice currentDevice].batteryMonitoringEnabled = TRUE`");
    }
#endif
#if RCT_DEV && TARGET_IPHONE_SIMULATOR && !TARGET_OS_TV && !TARGET_OS_OSX
    if ([UIDevice currentDevice].batteryState == UIDeviceBatteryStateUnknown) {
        RCTLogWarn(@"Battery state `unknown` and monitoring disabled, this is normal for simulators and tvOS.");
    }
#endif
    float batteryLevel = self.getBatteryLevel;

    return @{
#if TARGET_OS_TV
             @"batteryLevel": @(batteryLevel),
             @"batteryState": @"full",
#elif !TARGET_OS_OSX
             @"batteryLevel": @(batteryLevel),
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

#if TARGET_OS_OSX
- (id)IOKitPowerSourceKey:(id)key {
    id result = nil;
    
    CFTypeRef info = IOPSCopyPowerSourcesInfo();
    CFArrayRef list = IOPSCopyPowerSourcesList(info);
    
    for(int i = 0; i < CFArrayGetCount(list); i++) {
        CFDictionaryRef description = IOPSGetPowerSourceDescription(info, CFArrayGetValueAtIndex(list, i));
        if(description != NULL) {
            result = (__bridge id)CFDictionaryGetValue(description, (__bridge void *)key);
            if(result)
                break;
        }
    }
    
    CFRelease(list);
    CFRelease(info);
    
    return result;
}
#endif


- (float) getBatteryLevel {
#if TARGET_OS_OSX
    if (@available(macOS 10.2, *)) {
        float batteryLevel = [[self IOKitPowerSourceKey:@kIOPSCurrentCapacityKey] floatValue];
        return batteryLevel;
    }
    return [@1 floatValue];
#elif TARGET_OS_TV
    return [@1 floatValue];
#else
    return [@([UIDevice currentDevice].batteryLevel) floatValue];
#endif
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

- (BOOL) isHeadphonesConnected {
#if (!TARGET_OS_OSX)
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
#else
    BOOL isHeadphonesConnected = false;

    AudioDeviceID defaultDevice = 0;
    UInt32 defaultSize = sizeof(AudioDeviceID);

    const AudioObjectPropertyAddress defaultAddr = {
        kAudioHardwarePropertyDefaultOutputDevice,
        kAudioObjectPropertyScopeGlobal,
        kAudioObjectPropertyElementMaster
    };

    AudioObjectGetPropertyData(kAudioObjectSystemObject, &defaultAddr, 0, NULL, &defaultSize, &defaultDevice);

    AudioObjectPropertyAddress sourceAddr;
    sourceAddr.mSelector = kAudioDevicePropertyDataSource;
    sourceAddr.mScope = kAudioDevicePropertyScopeOutput;
    sourceAddr.mElement = kAudioObjectPropertyElementMaster;

    UInt32 dataSourceId = 0;
    UInt32 dataSourceIdSize = sizeof(UInt32);
    AudioObjectGetPropertyData(defaultDevice, &sourceAddr, 0, NULL, &dataSourceIdSize, &dataSourceId);
    isHeadphonesConnected = dataSourceId == 'hdpn';
    //Todo: Bluetooth devices
    
    return isHeadphonesConnected;
#endif
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isHeadphonesConnectedSync) {
    return @(self.isHeadphonesConnected);
}

RCT_EXPORT_METHOD(isHeadphonesConnected:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isHeadphonesConnected));
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

RCT_EXPORT_METHOD(getUsedMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    unsigned long usedMemory = self.getUsedMemory;
    if (usedMemory == -1) {
        reject(@"fetch_error", @"task_info failed", nil);
    } else {
        resolve(@(usedMemory));
    }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getUsedMemorySync) {
    return @(self.getUsedMemory);
}

RCT_EXPORT_METHOD(getUserAgent:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
#if TARGET_OS_TV
    reject(@"not_available_error", @"not available on tvOS", nil);
#else
    __weak RNDeviceInfo *weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        __strong RNDeviceInfo *strongSelf = weakSelf;
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

- (NSDictionary *) getAvailableLocationProviders {
    NSNumber *locationServicesEnabled = [NSNumber numberWithBool: [CLLocationManager locationServicesEnabled]];
#if (TARGET_OS_IOS)
    return @{
              @"locationServicesEnabled": locationServicesEnabled,
              @"significantLocationChangeMonitoringAvailable": [NSNumber numberWithBool: [CLLocationManager significantLocationChangeMonitoringAvailable]],
              @"headingAvailable": [NSNumber numberWithBool: [CLLocationManager headingAvailable]],
              @"isRangingAvailable": [NSNumber numberWithBool: [CLLocationManager isRangingAvailable]]
              };
#elif (TARGET_OS_OSX)
    if (@available(macOS 10.15, *)) {
        return @{
            @"locationServicesEnabled": locationServicesEnabled,
            @"significantLocationChangeMonitoringAvailable": [NSNumber numberWithBool: [CLLocationManager significantLocationChangeMonitoringAvailable]],
            @"headingAvailable": [NSNumber numberWithBool: [CLLocationManager headingAvailable]],
            @"isRangingAvailable": [NSNumber numberWithBool: [CLLocationManager isRangingAvailable]]
        };
    } else {
        return @{
            @"locationServicesEnabled": locationServicesEnabled,
            @"significantLocationChangeMonitoringAvailable": [NSNumber numberWithBool: [CLLocationManager significantLocationChangeMonitoringAvailable]],
            @"headingAvailable": [NSNumber numberWithBool: [CLLocationManager headingAvailable]],
        };
    }
#else
    return @{
        @"locationServicesEnabled":locationServicesEnabled
    };
#endif
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getAvailableLocationProvidersSync) {
    return self.getAvailableLocationProviders;
}

RCT_EXPORT_METHOD(getAvailableLocationProviders:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getAvailableLocationProviders);
}

#pragma mark - Installer Package Name -

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getInstallerPackageNameSync) {
    return [EnvironmentValues objectAtIndex:[EnvironmentUtil currentAppEnvironment]];
}

RCT_EXPORT_METHOD(getInstallerPackageName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([EnvironmentValues objectAtIndex:[EnvironmentUtil currentAppEnvironment]]);
}

- (NSNumber *) getBrightness {
#if !TARGET_OS_TV && !TARGET_OS_OSX
    return @([UIScreen mainScreen].brightness);
#else
    return @(-1);
#endif
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBrightnessSync) {
    return self.getBrightness;
}

RCT_EXPORT_METHOD(getBrightness:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.getBrightness);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getFirstInstallTimeSync) {
    return @(self.getFirstInstallTime);
}

RCT_EXPORT_METHOD(getFirstInstallTime:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getFirstInstallTime));
}

- (long long) getFirstInstallTime {
    NSURL* urlToDocumentsFolder = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
    NSError *error;
    NSDate *installDate = [[[NSFileManager defaultManager] attributesOfItemAtPath:urlToDocumentsFolder.path error:&error] objectForKey:NSFileCreationDate];
    return [@(floor([installDate timeIntervalSince1970] * 1000)) longLongValue];
}


RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isCameraPresentSync) {
    return @(self.isCameraPresent);
}

RCT_EXPORT_METHOD(isCameraPresent:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isCameraPresent));
}

- (BOOL) isCameraPresent {
    AVCaptureDevice *device = [AVCaptureDevice defaultDeviceWithMediaType:AVMediaTypeVideo];
    
    return device != nil;
}

#pragma mark - dealloc -

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

@end
