//
//  RNDeviceInfo.m
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#import "RNDeviceInfo.h"

@interface RNDeviceInfo()

@end

@implementation RNDeviceInfo
{
    
}

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSDictionary *)constantsToExport
{
    UIDevice *currentDevice = [UIDevice currentDevice];
    
    NSUUID *identifierForVendor = [currentDevice identifierForVendor];
    NSString *deviceId = [identifierForVendor UUIDString];
    
    return @{
             @"systemName": currentDevice.systemName,
             @"systemVersion": currentDevice.systemVersion,
             @"model": currentDevice.model,
             @"deviceId": deviceId,
             };
}

@end