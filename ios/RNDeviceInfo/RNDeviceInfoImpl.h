//
//  RNDeviceInfoImpl.h
//  RNDeviceInfo
//
//  Created by Rami Elwan on 23/12/2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@protocol RNDeviceInfoDelegate
- (void) sendEventWithName:(NSString *)eventName body:(id)body;
@end

@interface RNDeviceInfoImpl : NSObject
@property (nonatomic, weak, nullable) id<RNDeviceInfoDelegate> delegate;

- (NSArray<NSString *> *)supportedEvents;
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
- (NSString *)getDeviceId;
- (NSString *)getBundleId;
- (NSString *)getSystemName;
- (NSString *)getSystemVersion;
- (NSString *)getAppVersion;
- (NSString *)getBuildNumber;
- (BOOL)isTablet;
- (NSString *)getAppName;
- (NSString *)getModel;
- (NSString *)getDeviceTypeName;
- (BOOL)isDisplayZoomed;
- (BOOL)isLowRamDevice;
@end

NS_ASSUME_NONNULL_END
