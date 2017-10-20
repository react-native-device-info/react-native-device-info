//
//  RNDeviceInfo.m
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#import "RNDeviceInfo.h"
#import "DeviceUID.h"
#import <LocalAuthentication/LocalAuthentication.h>

@interface RNDeviceInfo()
@property (nonatomic) bool isEmulator;
@end

@implementation RNDeviceInfo

@synthesize isEmulator;

RCT_EXPORT_MODULE()
    
+ (BOOL)requiresMainQueueSetup
{
   return YES;
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

- (NSString*) deviceName
{
    static NSDictionary* deviceNamesByCode = nil;

    if (!deviceNamesByCode) {
        
        deviceNamesByCode = @{@"iPod1,1"   :@"iPod Touch",      // (Original)
                              @"iPod2,1"   :@"iPod Touch",      // (Second Generation)
                              @"iPod3,1"   :@"iPod Touch",      // (Third Generation)
                              @"iPod4,1"   :@"iPod Touch",      // (Fourth Generation)
                              @"iPod5,1"   :@"iPod Touch",      // (Fifth Generation)
                              @"iPod7,1"   :@"iPod Touch",      // (Sixth Generation)
                              @"iPhone1,1" :@"iPhone",          // (Original)
                              @"iPhone1,2" :@"iPhone 3G",       // (3G)
                              @"iPhone2,1" :@"iPhone 3GS",      // (3GS)
                              @"iPad1,1"   :@"iPad",            // (Original)
                              @"iPad2,1"   :@"iPad 2",          //
                              @"iPad2,2"   :@"iPad 2",          //
                              @"iPad2,3"   :@"iPad 2",          //
                              @"iPad2,4"   :@"iPad 2",          //
                              @"iPad3,1"   :@"iPad",            // (3rd Generation)
                              @"iPad3,2"   :@"iPad",            // (3rd Generation)
                              @"iPad3,3"   :@"iPad",            // (3rd Generation)
                              @"iPhone3,1" :@"iPhone 4",        // (GSM)
                              @"iPhone3,2" :@"iPhone 4",        // iPhone 4
                              @"iPhone3,3" :@"iPhone 4",        // (CDMA/Verizon/Sprint)
                              @"iPhone4,1" :@"iPhone 4S",       //
                              @"iPhone5,1" :@"iPhone 5",        // (model A1428, AT&T/Canada)
                              @"iPhone5,2" :@"iPhone 5",        // (model A1429, everything else)
                              @"iPad3,4"   :@"iPad",            // (4th Generation)
                              @"iPad3,5"   :@"iPad",            // (4th Generation)
                              @"iPad3,6"   :@"iPad",            // (4th Generation)
                              @"iPad2,5"   :@"iPad Mini",       // (Original)
                              @"iPad2,6"   :@"iPad Mini",       // (Original)
                              @"iPad2,7"   :@"iPad Mini",       // (Original)
                              @"iPhone5,3" :@"iPhone 5c",       // (model A1456, A1532 | GSM)
                              @"iPhone5,4" :@"iPhone 5c",       // (model A1507, A1516, A1526 (China), A1529 | Global)
                              @"iPhone6,1" :@"iPhone 5s",       // (model A1433, A1533 | GSM)
                              @"iPhone6,2" :@"iPhone 5s",       // (model A1457, A1518, A1528 (China), A1530 | Global)
                              @"iPhone7,1" :@"iPhone 6 Plus",   //
                              @"iPhone7,2" :@"iPhone 6",        //
                              @"iPhone8,1" :@"iPhone 6s",       //
                              @"iPhone8,2" :@"iPhone 6s Plus",  //
                              @"iPhone8,4" :@"iPhone SE",       //
                              @"iPhone9,1" :@"iPhone 7",        // (model A1660 | CDMA)
                              @"iPhone9,3" :@"iPhone 7",        // (model A1778 | Global)
                              @"iPhone9,2" :@"iPhone 7 Plus",   // (model A1661 | CDMA)
                              @"iPhone9,4" :@"iPhone 7 Plus",   // (model A1784 | Global)
                              @"iPhone10,3":@"iPhone X",        // (model A1865, A1902)
                              @"iPhone10,6":@"iPhone X",        // (model A1901)
                              @"iPhone10,1":@"iPhone 8",        // (model A1863, A1906, A1907)
                              @"iPhone10,4":@"iPhone 8",        // (model A1905)
                              @"iPhone10,2":@"iPhone 8 Plus",   // (model A1864, A1898, A1899)
                              @"iPhone10,5":@"iPhone 8 Plus",   // (model A1897)
                              @"iPad4,1"   :@"iPad Air",        // 5th Generation iPad (iPad Air) - Wifi
                              @"iPad4,2"   :@"iPad Air",        // 5th Generation iPad (iPad Air) - Cellular
                              @"iPad4,3"   :@"iPad Air",        // 5th Generation iPad (iPad Air)
                              @"iPad4,4"   :@"iPad Mini 2",     // (2nd Generation iPad Mini - Wifi)
                              @"iPad4,5"   :@"iPad Mini 2",     // (2nd Generation iPad Mini - Cellular)
                              @"iPad4,6"   :@"iPad Mini 2",     // (2nd Generation iPad Mini)
                              @"iPad4,7"   :@"iPad Mini 3",     // (3rd Generation iPad Mini)
                              @"iPad4,8"   :@"iPad Mini 3",     // (3rd Generation iPad Mini)
                              @"iPad4,9"   :@"iPad Mini 3",     // (3rd Generation iPad Mini)
                              @"iPad5,1"   :@"iPad Mini 4",     // (4th Generation iPad Mini)
                              @"iPad5,2"   :@"iPad Mini 4",     // (4th Generation iPad Mini)
                              @"iPad5,3"   :@"iPad Air 2",      // 6th Generation iPad (iPad Air 2)
                              @"iPad5,4"   :@"iPad Air 2",      // 6th Generation iPad (iPad Air 2)
                              @"iPad6,3"   :@"iPad Pro 9.7-inch",// iPad Pro 9.7-inch
                              @"iPad6,4"   :@"iPad Pro 9.7-inch",// iPad Pro 9.7-inch
                              @"iPad6,7"   :@"iPad Pro 12.9-inch",// iPad Pro 12.9-inch
                              @"iPad6,8"   :@"iPad Pro 12.9-inch",// iPad Pro 12.9-inch
                              @"iPad7,1"   :@"iPad Pro 12.9-inch",// 2nd Generation iPad Pro 12.5-inch - Wifi
                              @"iPad7,2"   :@"iPad Pro 12.9-inch",// 2nd Generation iPad Pro 12.5-inch - Cellular
                              @"iPad7,3"   :@"iPad Pro 10.5-inch",// iPad Pro 12.5-inch - Wifi
                              @"iPad7,4"   :@"iPad Pro 10.5-inch",// iPad Pro 12.5-inch - Cellular
                              @"AppleTV2,1":@"Apple TV",        // Apple TV (2nd Generation)
                              @"AppleTV3,1":@"Apple TV",        // Apple TV (3rd Generation)
                              @"AppleTV3,2":@"Apple TV",        // Apple TV (3rd Generation - Rev A)
                              @"AppleTV5,3":@"Apple TV",        // Apple TV (4th Generation)
                              @"AppleTV6,2":@"Apple TV 4K",     // Apple TV 4K
                              };
    }

    NSString* deviceName = [deviceNamesByCode objectForKey:self.deviceId];

    if (!deviceName) {
        // Not found on database. At least guess main device type from string contents:

        if ([self.deviceId rangeOfString:@"iPod"].location != NSNotFound) {
            deviceName = @"iPod Touch";
        }
        else if([self.deviceId rangeOfString:@"iPad"].location != NSNotFound) {
            deviceName = @"iPad";
        }
        else if([self.deviceId rangeOfString:@"iPhone"].location != NSNotFound){
            deviceName = @"iPhone";
        }
        else if([self.deviceId rangeOfString:@"AppleTV"].location != NSNotFound){
            deviceName = @"Apple TV";
        }
    }

    return deviceName;
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
    NSString *language = [[NSLocale preferredLanguages] objectAtIndex:0];
    return language;
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

- (bool) isTablet
{
  return [[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad;
}

- (NSDictionary *)constantsToExport
{
    UIDevice *currentDevice = [UIDevice currentDevice];

    NSString *uniqueId = [DeviceUID uid];

    return @{
             @"systemName": currentDevice.systemName,
             @"systemVersion": currentDevice.systemVersion,
             @"apiLevel": @"not available",
             @"model": self.deviceName,
             @"brand": @"Apple",
             @"deviceId": self.deviceId,
             @"deviceName": currentDevice.name,
             @"deviceLocale": self.deviceLocale,
             @"deviceCountry": self.deviceCountry ?: [NSNull null],
             @"uniqueId": uniqueId,
             @"bundleId": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleIdentifier"],
             @"appVersion": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"] ?: [NSNull null],
             @"buildNumber": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleVersion"],
             @"systemManufacturer": @"Apple",
             @"userAgent": self.userAgent,
             @"timezone": self.timezone,
             @"isEmulator": @(self.isEmulator),
             @"isTablet": @(self.isTablet),
             };
}

RCT_EXPORT_METHOD(isPinOrFingerprintSet:(RCTResponseSenderBlock)callback)
{
    LAContext *context = [[LAContext alloc] init];
    BOOL isPinOrFingerprintSet = ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthentication error:nil]);
    callback(@[[NSNumber numberWithBool:isPinOrFingerprintSet]]);
}

@end
