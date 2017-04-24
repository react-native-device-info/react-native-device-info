//
//  RNDeviceInfo.h
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <sys/utsname.h>

#if __has_include("RCTBridgeModule.h")
    #import "RCTBridgeModule.h"
#else
    #import <React/RCTBridgeModule.h>
#endif

@interface RNDeviceInfo : NSObject <RCTBridgeModule>

@end
