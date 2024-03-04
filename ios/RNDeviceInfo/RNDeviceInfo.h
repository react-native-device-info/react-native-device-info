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
#ifdef RCT_NEW_ARCH_ENABLED
#import <RNDeviceInfoSpec/RNDeviceInfoSpec.h>
#endif

@interface RNDeviceInfo : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic) float lowBatteryThreshold;

@end

#ifdef RCT_NEW_ARCH_ENABLED
@interface RNDeviceInfo (RCTEventEmitter) <NativeRNDeviceInfoIOSSpec>

@end
#endif


