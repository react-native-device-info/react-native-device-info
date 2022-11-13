//
//  RNDeviceInfo.h
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#if !(TARGET_OS_OSX)
#import <UIKit/UIKit.h>
#endif
#if TARGET_OS_OSX
#import <AppKit/AppKit.h>
#endif
#import <AVFoundation/AVFoundation.h>
#import <sys/utsname.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTLog.h>

@interface RNDeviceInfo : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic) float lowBatteryThreshold;

@end
