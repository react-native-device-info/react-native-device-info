//
//  RNDeviceInfo.h
//  Learnium
//
//  Created by Rebecca Hughes on 03/08/2015.
//  Copyright © 2015 Learnium Limited. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNDeviceInfoSpec.h"
#endif

@interface RNDeviceInfo : NSObject<RCTBridgeModule>
@end

#ifdef RCT_NEW_ARCH_ENABLED
@interface RNDeviceInfo () : <NativeRNDeviceInfoSpec>
@end
#endif
