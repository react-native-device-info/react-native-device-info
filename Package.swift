// swift-tools-version: 6.0

import Foundation
import PackageDescription

// React Native links this package under ios/build/generated/autolinking/libs/.
// The dependency paths below resolve from that location in the consuming app.
// Exclude unused root entries so SwiftPM does not discover resources in examples,
// dependencies, or repository metadata. This also works in an npm package.
let usedRootEntries: Set<String> = ["ios", "include", "Package.swift"]
let unusedRootEntries = try! FileManager.default.contentsOfDirectory(atPath: Context.packageDirectory)
    .filter { !usedRootEntries.contains($0) }
    .sorted()

let package = Package(
    name: "RNDeviceInfo",
    platforms: [.iOS("15.1")],
    products: [
        .library(name: "RNDeviceInfo", targets: ["RNDeviceInfo"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
    ],
    targets: [
        .target(
            name: "RNDeviceInfo",
            dependencies: [
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "ReactNativeHeaders", package: "ReactNative"),
                .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"),
                .product(name: "ReactAppHeaders", package: "React-GeneratedCode"),
            ],
            path: ".",
            exclude: ["ios/RNDeviceInfo.xcodeproj"] + unusedRootEntries,
            sources: ["ios/RNDeviceInfo"],
            resources: [.process("ios/PrivacyInfo.xcprivacy")],
            // Keep the public header namespace separate from the Xcode project.
            publicHeadersPath: "include",
            cSettings: [
                .define("RCT_NEW_ARCH_ENABLED", to: "1"),
                .headerSearchPath("ios/RNDeviceInfo"),
            ],
            cxxSettings: [
                .define("RCT_NEW_ARCH_ENABLED", to: "1"),
                .headerSearchPath("ios/RNDeviceInfo"),
                .define("DEBUG", .when(configuration: .debug)),
                .define("NDEBUG", .when(configuration: .release)),
            ],
            linkerSettings: [
                .linkedFramework("UIKit"),
                .linkedFramework("Foundation"),
                .linkedFramework("AVFoundation"),
                .linkedFramework("CoreLocation"),
                .linkedFramework("CoreTelephony"),
                .linkedFramework("DeviceCheck"),
                .linkedFramework("LocalAuthentication"),
                .linkedFramework("Security"),
                .linkedFramework("WebKit"),
            ]
        ),
    ],
    cxxLanguageStandard: .cxx20
)
