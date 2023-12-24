//
//  RNDeviceInfoImpl.h
//  RNDeviceInfo
//
//  Created by Rami Elwan on 23/12/2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNDeviceInfoImpl : NSObject
- (NSString *)getDeviceName;
- (NSString *)getCarrier;
- (NSString *)getBuildId;
- (NSString *)getUniqueId;
- (NSString *)syncUniqueId;
- (BOOL)isEmulator;
- (void)getDeviceToken:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (float)getFontScale;
- (double)getTotalMemory;
- (double)getTotalDiskCapacity;
- (double)getFreeDiskStorage;
- (NSArray *)getSupportedAbis;
- (NSString *)getIpAddress;
- (BOOL)isPinOrFingerprintSet;
- (NSDictionary *)getPowerState;
- (float)getBatteryLevel;
- (BOOL)isBatteryCharging;
- (BOOL)isLocationEnabled;
- (BOOL)isHeadphonesConnected;
- (unsigned long) getUsedMemory;
- (void)getUserAgent:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject;
- (NSDictionary *)getAvailableLocationProviders;
- (NSString *)getInstallerPackageName;
- (NSNumber *)getBrightness;
- (long long)getFirstInstallTime;
@end

NS_ASSUME_NONNULL_END
