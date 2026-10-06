require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "RNDeviceInfo"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['repository']['url']
  s.platforms     = { :ios => "9.0", :visionos => "1.0", :tvos => "10.0"}

  s.source       = { :git => "https://github.com/react-native-device-info/react-native-device-info.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"
  s.resource_bundles = {
    'RNDeviceInfoPrivacyInfo' => ['ios/PrivacyInfo.xcprivacy'],
  }

  # IDFA / App Tracking Transparency support for getAdvertisingId() is OPT-IN.
  # By default no AdSupport symbols are linked, so apps that don't need the
  # advertising identifier keep a clean binary with no App Store IDFA review
  # implications. To enable it, set this at the top of your ios/Podfile
  # (before use_native_modules!) and run pod install:
  #   $RNDeviceInfoEnableIDFA = true
  if defined?($RNDeviceInfoEnableIDFA) && $RNDeviceInfoEnableIDFA
    s.weak_frameworks = 'AdSupport', 'AppTrackingTransparency'
    s.pod_target_xcconfig = { 'GCC_PREPROCESSOR_DEFINITIONS' => '$(inherited) RNDI_IDFA=1' }
  end

  s.dependency 'React-Core'
end
