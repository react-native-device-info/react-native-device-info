#pragma once
#include "ReactPackageProvider.g.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::RNDeviceInfoCPP::implementation {
  struct ReactPackageProvider : ReactPackageProviderT<ReactPackageProvider> {
    ReactPackageProvider() = default;
    void CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept;
  };
}

namespace winrt::RNDeviceInfoCPP::factory_implementation {
  struct ReactPackageProvider : ReactPackageProviderT<ReactPackageProvider, implementation::ReactPackageProvider> {};
}

