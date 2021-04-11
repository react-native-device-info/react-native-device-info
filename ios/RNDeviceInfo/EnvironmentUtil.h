//
//  EnvironmentUtil.h
//  RNDeviceInfo
//
//  Created by Dima Portenko on 10.04.2021.
//  Copyright © 2021 Learnium. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  App environment
 */
typedef NS_ENUM(NSInteger, MSACEnvironment) {

  /**
   *  App has been downloaded from the AppStore.
   */
  MSACEnvironmentAppStore = 0,

  /**
   *  App has been downloaded from TestFlight.
   */
  MSACEnvironmentTestFlight = 1,

  /**
   *  App has been installed by some other mechanism.
   *  This could be Ad-Hoc, Enterprise, etc.
   */
  MSACEnvironmentOther = 2
};

#define EnvironmentValues [NSArray arrayWithObjects: @"AppStore", @"TestFlight", @"Other", nil]

@interface EnvironmentUtil : NSObject

+ (MSACEnvironment)currentAppEnvironment;

@end
