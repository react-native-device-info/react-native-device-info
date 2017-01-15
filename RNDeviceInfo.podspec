Pod::Spec.new do |s|
  s.name         = "RNDeviceInfo"
  s.version      = "0.9.3"
  s.summary      = "Device Information for react-native"

  s.homepage     = "https://github.com/mayday-dev/react-native-device-info"

  s.license      = "MIT"
  s.authors      = { "Filonov Andrey" => "filonov.andrew@gmail.com" }
  s.platform     = :ios, "7.0"

  s.source       = { :git => "https://github.com/mayday-dev/react-native-device-info.git" }

  s.source_files  = "RNDeviceInfo/*.{h,m}"

  s.dependency 'React'
end
