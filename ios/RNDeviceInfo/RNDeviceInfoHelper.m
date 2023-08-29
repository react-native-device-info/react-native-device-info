#import "RNDeviceInfoHelper.h"

#if !(TARGET_OS_TV)
@import CoreTelephony;
@import Darwin.sys.sysctl;
#endif

@implementation RNDeviceInfoHelper

+ (NSString *)getCarrier {
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

+ (NSString *)getBuildId {
#if TARGET_OS_TV
    return @"unknown";
#else
    size_t bufferSize = 64;
    NSMutableData *buffer = [[NSMutableData alloc] initWithLength:bufferSize];
    int status = sysctlbyname("kern.osversion", buffer.mutableBytes, &bufferSize, NULL, 0);
    if (status != 0) {
        return @"unknown";
    }
    NSString* buildId = [[NSString alloc] initWithCString:(const char *)buffer.mutableBytes encoding:NSUTF8StringEncoding];
    return buildId;
#endif
}

@end
