//
//  StatusBarInfo.h
//  RNDeviceInfo
//
//  Created by superloop001 on 17/1/23.
//  Copyright © 2017年 Learnium. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@interface StatusBarInfo : NSObject

/**
 *
 *
 *  @return SIM卡所属的运营商
 */
+(NSString *)mobileService;

/**
 *
 *
 *  @return 当前电池电量百分比
 */
+(NSString *)currentBatteryPercent;

/**
 *
 *
 *  @return 当前网络类型
 */
+(NSNumber *)currentNetworkType;

@end
