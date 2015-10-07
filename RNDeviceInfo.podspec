Pod::Spec.new do |s|
  s.name         = "RNDeviceInfo"
  s.version      = "0.4.0"
  s.summary      = "Device Information for react-native"

  s.homepage     = "https://github.com/rebeccahughes/react-native-device-info"

  s.license      = "MIT"
  s.platform     = :ios, "7.0"

  s.source       = { :git => "https://github.com/rebeccahughes/react-native-device-info", :head }

  s.source_files  = "RNDeviceInfo/*.{h,m}"

end
