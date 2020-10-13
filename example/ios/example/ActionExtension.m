//
//  ActionExtension.m
//  example
//
//  Created by Dustin Schie on 10/13/20.
//
#import "ActionExtension.h"
#import "ActionViewController.h"

@implementation ActionExtension
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(done) {
  [actionViewController done];
}
@end
