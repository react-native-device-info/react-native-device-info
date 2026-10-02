require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "RNDeviceInfo"
  s.version      = package['version']
  s.summary      = package['description']
  s.license      = package['license']

  s.authors      = package['author']
  s.homepage     = package['repository']['url']
  # Follow React Native's minimum iOS version when it is available (RN >= 0.69). React Native's
  # post_install raises the deployment target of pod targets but not of resource bundle targets,
  # so the privacy bundle would otherwise keep a deployment target newer Xcode versions reject.
  ios_deployment_target = defined?(min_ios_version_supported) ? min_ios_version_supported : "9.0"
  s.platforms     = { :ios => ios_deployment_target, :visionos => "1.0", :tvos => "10.0"}

  s.source       = { :git => "https://github.com/react-native-device-info/react-native-device-info.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"
  s.resource_bundles = {
    'RNDeviceInfoPrivacyInfo' => ['ios/PrivacyInfo.xcprivacy'],
  }

  s.dependency 'React-Core'
end
