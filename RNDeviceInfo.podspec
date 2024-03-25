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

  s.dependency 'React-Core'
end
