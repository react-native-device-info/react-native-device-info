package com.learnium.RNDeviceInfo;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.media.AudioDeviceInfo;
import android.os.Build;

final class HeadphoneConnectionInfo {

  private HeadphoneConnectionInfo() {}

  @SuppressLint("InlinedApi")
  static boolean isBluetoothOutputDevice(int deviceType) {
    return deviceType == AudioDeviceInfo.TYPE_BLUETOOTH_A2DP
      || deviceType == AudioDeviceInfo.TYPE_BLUETOOTH_SCO;
  }

  @SuppressLint("InlinedApi")
  static boolean isWiredOutputDevice(int deviceType) {
    return deviceType == AudioDeviceInfo.TYPE_WIRED_HEADSET
      || deviceType == AudioDeviceInfo.TYPE_WIRED_HEADPHONES;
  }

  @TargetApi(Build.VERSION_CODES.M)
  static boolean containsHeadphoneOutputDevice(AudioDeviceInfo[] devices) {
    for (AudioDeviceInfo device : devices) {
      if (isBluetoothOutputDevice(device.getType()) || isWiredOutputDevice(device.getType())) {
        return true;
      }
    }
    return false;
  }
}
