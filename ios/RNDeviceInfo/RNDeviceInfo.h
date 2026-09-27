//
//  RNDeviceInfo.h
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <sys/utsname.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTLog.h>

@interface RNDeviceInfo : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic) float lowBatteryThreshold;
@property (nonatomic, strong) id hingeInteraction API_AVAILABLE(ios(27.1));
@property (nonatomic, strong) NSDictionary *lastHingeInfo;

@end
