#include "pch.h"
#include "ReactPackageProvider.h"
#if __has_include("ReactPackageProvider.g.cpp")
#  include "ReactPackageProvider.g.cpp"
#endif

#include "RNDeviceInfoCPP.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::RNDeviceInfoCPP::implementation {
  void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept {
    AddAttributedModules(packageBuilder);
  }
}
