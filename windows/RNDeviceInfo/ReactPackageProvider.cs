using Microsoft.ReactNative;
using Microsoft.ReactNative.Managed;

namespace RNDeviceInfo
{
    public sealed class ReactPackageProvider : IReactPackageProvider
    {
        public void CreatePackage(IReactPackageBuilder packageBuilder)
        {
            packageBuilder.AddAttributedModules();
        }
    }
}
