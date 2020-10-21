#pragma once

#include "App.xaml.g.h"

namespace winrt::example::implementation
{
    struct App : AppT<App>
    {
        App() noexcept;
    };
} // namespace winrt::example::implementation


