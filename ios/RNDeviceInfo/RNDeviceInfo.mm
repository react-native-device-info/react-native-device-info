//
//  RNDeviceInfo.m
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#import "RNDeviceInfo.h"
#import "RNDeviceInfoImpl.h"

@interface RNDeviceInfo ()
@property RNDeviceInfoImpl *moduleImpl;
@end

@implementation RNDeviceInfo

- (instancetype)init {
    self = [super init];
    if (self) {
        self.moduleImpl = [RNDeviceInfoImpl new];
    }
    return self;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params { 
    return std::make_shared<facebook::react::NativeRNDeviceInfoSpecJSI>(params);
}

- (void)getDeviceName:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject { 
    resolve([[self moduleImpl] getDeviceName]);
}

- (NSString *)getDeviceNameSync { 
    return [[self moduleImpl] getDeviceName];
}

- (void)getCarrier:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject { 
    resolve([[self moduleImpl] getCarrier]);
}


- (NSString *)getCarrierSync { 
    return [[self moduleImpl] getCarrier];
}

- (void)getUniqueId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve([[self moduleImpl] getUniqueId]);
}

- (NSString *)getUniqueIdSync {
    return [[self moduleImpl] getUniqueId];
}

- (void)syncUniqueId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve([[self moduleImpl] syncUniqueId]);
}

- (NSNumber *)isEmulatorSync {
    return @([[self moduleImpl] isEmulator]);
}

- (void)isEmulator:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] isEmulator]));
}

- (void)getDeviceToken:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    [[self moduleImpl] getDeviceToken:resolve reject:reject];
}

- (void)getFontScale:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] getFontScale]));
}

- (NSNumber *)getFontScaleSync {
    return @([[self moduleImpl] getFontScale]);
}

- (NSNumber *)getTotalMemorySync {
    return @([[self moduleImpl] getTotalMemory]);
}

- (void)getTotalMemory:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    return resolve(@([[self moduleImpl] getTotalMemory]));
}

- (NSNumber *)getTotalDiskCapacitySync {
    return @([[self moduleImpl] getTotalDiskCapacity]);
}

- (void)getTotalDiskCapacity:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] getTotalDiskCapacity]));
}

- (NSNumber *)getFreeDiskStorageSync {
    return @([[self moduleImpl] getFreeDiskStorage]);
}

- (void)getFreeDiskStorage:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] getFreeDiskStorage]));
}

- (void)getBuildId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject { 
    resolve([[self moduleImpl] getBuildId]);
}

- (NSString *)getBuildIdSync {
    return [[self moduleImpl] getBuildId];
}

- (NSArray<NSString *> *)getSupportedAbisSync {
    return [[self moduleImpl] getSupportedAbis];
}

- (void)getSupportedAbis:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve([[self moduleImpl] getSupportedAbis]);
}

- (NSString *)getIpAddressSync {
    return [[self moduleImpl] getIpAddress];
}

- (void)getIpAddress:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve([[self moduleImpl] getIpAddress]);
}

- (NSNumber *)isPinOrFingerprintSetSync {
    return @([[self moduleImpl] isPinOrFingerprintSet]);
}

- (void)isPinOrFingerprintSet:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] isPinOrFingerprintSet]));
}

- (NSDictionary *)getPowerStateSync {
    return [[self moduleImpl] getPowerState];
}

- (void)getPowerState:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject { 
    resolve([[self moduleImpl] getPowerState]);
}

- (NSNumber *)getBatteryLevelSync {
    return @([[self moduleImpl] getBatteryLevel]);
}

- (void)getBatteryLevel:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] getBatteryLevel]));
}

- (NSNumber *)isBatteryChargingSync {
    return @([[self moduleImpl] isBatteryCharging]);
}

- (void)isBatteryCharging:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] isBatteryCharging]));
}

- (NSNumber *)isLocationEnabledSync {
    return @([[self moduleImpl] isLocationEnabled]);
}

- (void)isLocationEnabled:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] isLocationEnabled]));
}

- (NSNumber *)isHeadphonesConnectedSync {
    return @([[self moduleImpl] isHeadphonesConnected]);
}

- (void)isHeadphonesConnected:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] isHeadphonesConnected]));
}

- (NSNumber *)getUsedMemorySync {
    return @([[self moduleImpl] getUsedMemory]);
}

- (void)getUsedMemory:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] getUsedMemory]));
}

- (void)getUserAgent:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    [[self moduleImpl] getUserAgent:resolve reject:reject];
}

- (NSDictionary *)getAvailableLocationProvidersSync {
    return [[self moduleImpl] getAvailableLocationProviders];
}

- (void)getAvailableLocationProviders:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve([[self moduleImpl] getAvailableLocationProviders]);
}

- (NSString *)getInstallerPackageNameSync {
    return [[self moduleImpl] getInstallerPackageName];
}

- (void)getInstallerPackageName:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve([[self moduleImpl] getInstallerPackageName]);
}

- (NSNumber *)getBrightnessSync {
    return [[self moduleImpl] getBrightness];
}

- (void)getBrightness:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve([[self moduleImpl] getBrightness]);
}

- (NSNumber *)getFirstInstallTimeSync {
    return @([[self moduleImpl] getFirstInstallTime]);
}

- (void)getFirstInstallTime:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    resolve(@([[self moduleImpl] getFirstInstallTime]));
}

@end
