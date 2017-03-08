//
//  StatusBarInfo.m
//  RNDeviceInfo
//
//  Created by superloop001 on 17/1/23.
//  Copyright © 2017年 Learnium. All rights reserved.
//

#import "StatusBarInfo.h"

@implementation StatusBarInfo

+ (NSString *)mobileService{
    NSArray *subviews = [StatusBarInfo getStatusBarSubViews];
    NSString *serviceString = @"";
    
    if(subviews == nil){
        return serviceString;
    }
    
    for (id view in subviews) {
        if ([view isKindOfClass:NSClassFromString(@"UIStatusBarServiceItemView")]) {
            serviceString = [view valueForKeyPath:@"serviceString"];
            break;
        }
    }
    
    return serviceString;
}

+ (NSString *)currentBatteryPercent{
    NSArray *subviews = [StatusBarInfo getStatusBarSubViews];
    NSString *percentString = @"";
    
    if(subviews == nil){
        return percentString;
    }
    
    for (id view in subviews) {
        if ([view isKindOfClass:NSClassFromString(@"UIStatusBarBatteryPercentItemView")]) {
            percentString = [view valueForKeyPath:@"percentString"];
            break;
        }
    }
    
    return percentString;
}
+ (NSNumber *)currentNetworkType{
    NSArray *subviews = [StatusBarInfo getStatusBarSubViews];
    NSNumber *type = 0;
    
    if(subviews == nil){
        return type;
    }
    
    for (id view in subviews) {
        if ([view isKindOfClass:NSClassFromString(@"UIStatusBarDataNetworkItemView")]) {
            int value = [[view valueForKeyPath:@"dataNetworkType"] integerValue];
            type = [NSNumber numberWithInt:value];
            break;
        }
    }
    
    return type;
}

+ (NSArray *)getStatusBarSubViews{
    NSArray *subviews = [[[[UIApplication sharedApplication] valueForKeyPath:@"statusBar"] valueForKeyPath:@"foregroundView"] subviews];
    
    return subviews;
}

@end
