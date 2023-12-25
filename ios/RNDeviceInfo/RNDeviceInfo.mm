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

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeRNDeviceInfoSpecJSI>(params);
}
#endif

- (NSDictionary *)constantsToExport {
    return @{
         @"deviceId": [[self moduleImpl] getDeviceId],
         @"bundleId": [[self moduleImpl] getBundleId],
         @"systemName": [[self moduleImpl] getSystemName],
         @"systemVersion": [[self moduleImpl] getSystemVersion],
         @"appVersion": [[self moduleImpl] getAppVersion],
         @"buildNumber": [[self moduleImpl] getBuildNumber],
         @"isTablet": @([[self moduleImpl] isTablet]),
         @"appName": [[self moduleImpl] getAppName],
         @"brand": @"Apple",
         @"model": [[self moduleImpl] getModel],
         @"deviceType": [[self moduleImpl] getDeviceTypeName],
         @"isDisplayZoomed": @([[self moduleImpl] isDisplayZoomed]),
     };
}

RCT_EXPORT_METHOD(getDeviceName:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] getDeviceName]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getDeviceNameSync) { 
    return [[self moduleImpl] getDeviceName];
}

RCT_EXPORT_METHOD(getCarrier:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) { 
    resolve([[self moduleImpl] getCarrier]);
}


RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getCarrierSync) { 
    return [[self moduleImpl] getCarrier];
}

RCT_EXPORT_METHOD(getUniqueId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] getUniqueId]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getUniqueIdSync) {
    return [[self moduleImpl] getUniqueId];
}

RCT_EXPORT_METHOD(syncUniqueId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] syncUniqueId]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isEmulatorSync) {
    return @([[self moduleImpl] isEmulator]);
}

RCT_EXPORT_METHOD(isEmulator:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] isEmulator]));
}

RCT_EXPORT_METHOD(getDeviceToken:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [[self moduleImpl] getDeviceToken:resolve reject:reject];
}

RCT_EXPORT_METHOD(getFontScale:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] getFontScale]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getFontScaleSync) {
    return @([[self moduleImpl] getFontScale]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getTotalMemorySync) {
    return @([[self moduleImpl] getTotalMemory]);
}

RCT_EXPORT_METHOD(getTotalMemory:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    return resolve(@([[self moduleImpl] getTotalMemory]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getTotalDiskCapacitySync) {
    return @([[self moduleImpl] getTotalDiskCapacity]);
}

RCT_EXPORT_METHOD(getTotalDiskCapacity:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] getTotalDiskCapacity]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getFreeDiskStorageSync) {
    return @([[self moduleImpl] getFreeDiskStorage]);
}

RCT_EXPORT_METHOD(getFreeDiskStorage:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] getFreeDiskStorage]));
}

RCT_EXPORT_METHOD(getBuildId:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) { 
    resolve([[self moduleImpl] getBuildId]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getBuildIdSync) {
    return [[self moduleImpl] getBuildId];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSArray<NSString *> *, getSupportedAbisSync) {
    return [[self moduleImpl] getSupportedAbis];
}

RCT_EXPORT_METHOD(getSupportedAbis:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] getSupportedAbis]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getIpAddressSync) {
    return [[self moduleImpl] getIpAddress];
}

RCT_EXPORT_METHOD(getIpAddress:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] getIpAddress]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isPinOrFingerprintSetSync) {
    return @([[self moduleImpl] isPinOrFingerprintSet]);
}

RCT_EXPORT_METHOD(isPinOrFingerprintSet:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] isPinOrFingerprintSet]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSDictionary *, getPowerStateSync) {
    return [[self moduleImpl] getPowerState];
}

RCT_EXPORT_METHOD(getPowerState:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) { 
    resolve([[self moduleImpl] getPowerState]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getBatteryLevelSync) {
    return @([[self moduleImpl] getBatteryLevel]);
}

RCT_EXPORT_METHOD(getBatteryLevel:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] getBatteryLevel]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isBatteryChargingSync) {
    return @([[self moduleImpl] isBatteryCharging]);
}

RCT_EXPORT_METHOD(isBatteryCharging:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] isBatteryCharging]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isLocationEnabledSync) {
    return @([[self moduleImpl] isLocationEnabled]);
}

RCT_EXPORT_METHOD(isLocationEnabled:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] isLocationEnabled]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isHeadphonesConnectedSync) {
    return @([[self moduleImpl] isHeadphonesConnected]);
}

RCT_EXPORT_METHOD(isHeadphonesConnected:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] isHeadphonesConnected]));
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getUsedMemorySync) {
    return @([[self moduleImpl] getUsedMemory]);
}

RCT_EXPORT_METHOD(getUsedMemory:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] getUsedMemory]));
}

RCT_EXPORT_METHOD(getUserAgent:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    [[self moduleImpl] getUserAgent:resolve reject:reject];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSDictionary *, getAvailableLocationProvidersSync) {
    return [[self moduleImpl] getAvailableLocationProviders];
}

RCT_EXPORT_METHOD(getAvailableLocationProviders:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] getAvailableLocationProviders]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString *, getInstallerPackageNameSync) {
    return [[self moduleImpl] getInstallerPackageName];
}

RCT_EXPORT_METHOD(getInstallerPackageName:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] getInstallerPackageName]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getBrightnessSync) {
    return [[self moduleImpl] getBrightness];
}

RCT_EXPORT_METHOD(getBrightness:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve([[self moduleImpl] getBrightness]);
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, getFirstInstallTimeSync) {
    return @([[self moduleImpl] getFirstInstallTime]);
}

RCT_EXPORT_METHOD(getFirstInstallTime:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
    resolve(@([[self moduleImpl] getFirstInstallTime]));
}

@end
