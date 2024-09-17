#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface JailbreakUtil : NSObject <RCTBridgeModule>
+ (BOOL *)isJailBroken;
+ (NSMutableDictionary *)jailBrokeReason;
@end
