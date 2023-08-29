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
#ifdef RCT_NEW_ARCH_ENABLED
#import <rndeviceinfomodule/rndeviceinfomodule.h>
#else
#import <React/RCTBridgeModule.h>
#endif
#import <React/RCTEventEmitter.h>
#import <React/RCTLog.h>

@interface RNDeviceInfo : RCTEventEmitter
#ifdef RCT_NEW_ARCH_ENABLED
                                   <NativeDeviceInfoModuleSpec>
#else
                                   <RCTBridgeModule>
#endif

@property (nonatomic) float lowBatteryThreshold;

@end
