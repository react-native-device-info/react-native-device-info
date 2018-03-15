Pod::Spec.new do |s|
  s.name         = "RNDeviceInfo"
  s.version      = "0.21.0"
  s.summary      = "Device Information for react-native"

  s.homepage     = "https://github.com/rebeccahughes/react-native-device-info"

  s.license      = "MIT"
  s.authors      = { "Rebecca Hughes" => "rebecca@learnium.net" }
  s.ios.deployment_target = '8.0'
  s.tvos.deployment_target = '10.0'

  s.source       = { :git => "https://github.com/rebeccahughes/react-native-device-info.git" }

  s.source_files  = "RNDeviceInfo/*.{h,m}"

  s.dependency 'React'
end
