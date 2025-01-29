#import <mach-o/dyld.h>
#import "JailbreakUtil.h"
#import <Foundation/Foundation.h>
#include <TargetConditionals.h>
@import UIKit;

NSMutableDictionary *jailbreakDetectReason;


@implementation JailbreakUtil 

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

+ (NSArray *)brokenLibrariesCheck
{
    return @[
            @"/.bootstrapped_electra",
            @"/.cydia_no_stash",
            @"/.installed_unc0ver",
            @"/Applications/Cydia.app",
            @"/Applications/FakeCarrier.app",
            @"/Applications/Icy.app",
            @"/Applications/IntelliScreen.app",
            @"/Applications/MxTube.app",
            @"/Applications/RockApp.app",
            @"/Applications/SBSettings.app",
            @"/Applications/Sileo.app",
            @"/Applications/Snoop-itConfig.app",
            @"/Applications/WinterBoard.app",
            @"/Applications/blackra1n.app",
            @"/Library/MobileSubstrate/CydiaSubstrate.dylib",
            @"/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist",
            @"/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
            @"/Library/MobileSubstrate/MobileSubstrate.dylib",
            @"/Library/PreferenceBundles/ABypassPrefs.bundle",
            @"/Library/PreferenceBundles/FlyJBPrefs.bundle",
            @"/Library/PreferenceBundles/LibertyPref.bundle",
            @"/Library/PreferenceBundles/ShadowPreferences.bundle",
            @"/System/Library/LaunchDaemons/com.ikey.bbot.plist",
            @"/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
            @"/bin/bash",
            @"/bin/sh",
            @"/etc/apt",
            @"/etc/apt/sources.list.d/electra.list",
            @"/etc/apt/sources.list.d/sileo.sources",
            @"/etc/apt/undecimus/undecimus.list",
            @"/etc/ssh/sshd_config",
            @"/jb/amfid_payload.dylib",
            @"/jb/jailbreakd.plist",
            @"/jb/libjailbreak.dylib",
            @"/jb/lzma",
            @"/jb/offsets.plist",
            @"/private/etc/apt",
            @"/private/etc/dpkg/origins/debian",
            @"/private/etc/ssh/sshd_config",
            @"/private/var/Users/",
            @"/private/var/cache/apt/",
            @"/private/var/lib/apt",
            @"/private/var/lib/cydia",
            @"/private/var/log/syslog",
            @"/private/var/mobile/Library/SBSettings/Themes",
            @"/private/var/stash",
            @"/private/var/tmp/cydia.log",
	    @"/var/tmp/cydia.log",
            @"/usr/bin/cycript",
            @"/usr/bin/sshd",
            @"/usr/lib/libcycript.dylib",
            @"/usr/lib/libhooker.dylib",
            @"/usr/lib/lbjailbreak.dylib",
            @"/usr/lib/libsubstitute.dylib",
            @"/usr/lib/substrate",
            @"/usr/lib/TweakInject",
            @"/usr/libexec/cydia",
            @"/usr/libexec/cydia/firmware.sh",
            @"/usr/libexec/sftp-server",
            @"/usr/libexec/ssh-keysign",
            @"/usr/local/bin/cycript",
            @"/usr/sbin/frida-server",
            @"/usr/sbin/sshd",
            @"/usr/share/jailbreak/injectme.plist",
            @"/var/binpack",
            @"/var/cache/apt",
            @"/var/checkra1n.dmg",
            @"/var/lib/apt",
            @"/var/lib/cydia",
            @"/var/lib/dpkg/info/mobilesubstrate.md5sums",
            @"/var/log/apt",
            @"/var/mobile/Library/Preferences/ABPattern",
            @"/usr/lib/ABDYLD.dylib",
            @"/usr/lib/ABSubLoader.dylib",
            ];
}

+ (NSArray *)schemesToCheck
{
    return @[
            @"activator://package/com.example.package",
            @"cydia://package/com.example.package",
            @"filza://package/com.example.package",
            @"sileo://package/com.example.package",
            @"undecimus://package/com.example.package",
            @"zbra://package/com.example.package"
            ];
}

+ (NSArray *)symlinksToCheck
{
    return @[
            @"/var/lib/undecimus/apt",
            @"/Applications",
            @"/Library/Ringtones",
            @"/Library/Wallpaper",
            @"/usr/arm-apple-darwin9",
            @"/usr/include",
            @"/usr/libexec",
            @"/usr/share"
            ];
}

+ (NSArray *)dylibsToCheck
{
    return @[
            @"...!@#",
            @"/.file",
            @"/usr/lib/Cephei.framework/Cephei",
            @"0Shadow.dylib",
            @"ABypass",
            @"Cephei",
            @"CustomWidgetIcons",
            @"CydiaSubstrate",
            @"Electra",
            @"FlyJB",
            @"FridaGadget",
            @"MobileSubstrate.dylib",
            @"PreferenceLoader",
            @"RocketBootstrap",
            @"SSLKillSwitch.dylib",
            @"SSLKillSwitch2.dylib",
            @"Substitute",
            @"SubstrateBootstrap",
            @"SubstrateInserter",
            @"SubstrateInserter.dylib",
            @"SubstrateLoader.dylib",
            @"TweakInject.dylib",
            @"WeeLoader",
            @"cyinject",
            @"libcycript",
            @"libhooker",
            @"libsparkapplist.dylib",
            @"zzzzLiberty.dylib",
            @"zzzzzzUnSub.dylib"
            ];
}

+ (BOOL)checkPaths
{
    NSMutableArray *findedPaths = [NSMutableArray array];
    BOOL existsPath = NO;

    for (NSString *path in [self brokenLibrariesCheck]) {
        if ([[NSFileManager defaultManager] fileExistsAtPath:path]){
            if(!existsPath){
                existsPath = YES;
            }
            [findedPaths addObject:path];
        }
    }

    if(existsPath){
        [jailbreakDetectReason setObject:findedPaths forKey:@"existedPaths"];
    }

    return existsPath;
}

+ (BOOL)checkSchemes
{
    NSMutableArray *installedSchemes = [NSMutableArray array];
    BOOL canOpenScheme = NO;

    for (NSString *scheme in [self schemesToCheck]) {
        if([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:scheme]]){
            if(!canOpenScheme){
                canOpenScheme = YES;
            }
            [installedSchemes addObject:scheme];
        }
    }

    if(canOpenScheme){
        [jailbreakDetectReason setObject:installedSchemes forKey:@"existedSchemes"];
    }

    return canOpenScheme;
}

+ (BOOL)checkDylibs
{
    NSMutableArray *installedDylibs = [NSMutableArray array];
    NSString *imagePath;

    BOOL isDyldImageExists = NO;

    for (int i=0; i < _dyld_image_count(); i++) {
        imagePath = [NSString stringWithUTF8String:_dyld_get_image_name(i)];

        for (NSString *dylibPath in [self dylibsToCheck]) {
            if([imagePath localizedCaseInsensitiveContainsString:dylibPath]) {
                if(!isDyldImageExists){
                    isDyldImageExists = YES;
                }
                [installedDylibs addObject:dylibPath];
            }
        }
    }

    if(isDyldImageExists){
        [jailbreakDetectReason setObject:installedDylibs forKey:@"existedDylibs"];
    }

    return isDyldImageExists;
}

+ (BOOL)canViolateSandbox{
    static NSString * const JMJailbreakTextFile = @"/private/jailbreak.txt";
    NSError *error;
    BOOL grantsToWrite = NO;
    NSString *stringToBeWritten = @"This is an anti-spoofing test.";
    [stringToBeWritten writeToFile:JMJailbreakTextFile atomically:YES   encoding:NSUTF8StringEncoding error:&error];
    if(!error){
        grantsToWrite = YES;
    }
    [[NSFileManager defaultManager] removeItemAtPath:JMJailbreakTextFile error:nil];

    if(grantsToWrite){
        [jailbreakDetectReason setObject:[NSNumber numberWithBool:grantsToWrite] forKey:@"sandboxViolated"];
    }
    return grantsToWrite;
}

+ (BOOL)canFork
{
    BOOL forked = NO;
    int pid = fork();
    if(!pid) {
        exit(1);
    }
    if(pid >= 0) {
        forked = YES;
    }

    if(forked){
        [jailbreakDetectReason setObject:[NSNumber numberWithBool:forked] forKey:@"forked"];
    }

    return forked;
}

+ (BOOL)checkSymlinks
{
    NSMutableArray *installedSymLinks = [NSMutableArray array];
    BOOL isSymlinkExists = NO;

    for (NSString *symlink in [self symlinksToCheck]) {
        NSString* result = [[NSFileManager defaultManager] destinationOfSymbolicLinkAtPath:symlink error:nil];
        if([result length] > 0) {
            if(isSymlinkExists){
                isSymlinkExists = YES;
            }
            [installedSymLinks addObject:symlink];
        }
    }

    if(isSymlinkExists){
        [jailbreakDetectReason setObject:installedSymLinks forKey:@"existedSymlinks"];
    }

    return isSymlinkExists;
}

+ (BOOL)isJailBroken {
    #if TARGET_OS_SIMULATOR
      return NO;
    #endif
    BOOL isiOSAppOnMac = false;

    #if defined(__IPHONE_14_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 140000
        if (@available(iOS 14.0, *)) {
            // Early iOS 14 betas do not include isiOSAppOnMac
            isiOSAppOnMac = (
                [[NSProcessInfo processInfo] respondsToSelector:@selector(isiOSAppOnMac)] &&
                [NSProcessInfo processInfo].isiOSAppOnMac
            );
        }
    #endif // defined(__IPHONE_14_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 140000

    if (isiOSAppOnMac) {
        return false;
    }
    jailbreakDetectReason = [NSMutableDictionary dictionary];
    return [self checkPaths] || [self checkSchemes] || [self canViolateSandbox] || [self canFork] || [self checkSymlinks] || [self checkDylibs];
}

+ (NSMutableDictionary *)jailBrokeReason {
   return [@"%@", jailbreakDetectReason];
}

@end
