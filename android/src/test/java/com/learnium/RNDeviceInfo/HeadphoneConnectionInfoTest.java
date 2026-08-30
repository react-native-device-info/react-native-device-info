package com.learnium.RNDeviceInfo;

import android.media.AudioDeviceInfo;

import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class HeadphoneConnectionInfoTest {

  @Test
  public void identifiesBluetoothHeadphoneOutputs() {
    assertTrue(HeadphoneConnectionInfo.isBluetoothOutputDevice(AudioDeviceInfo.TYPE_BLUETOOTH_A2DP));
    assertTrue(HeadphoneConnectionInfo.isBluetoothOutputDevice(AudioDeviceInfo.TYPE_BLUETOOTH_SCO));
    assertFalse(HeadphoneConnectionInfo.isBluetoothOutputDevice(AudioDeviceInfo.TYPE_BUILTIN_SPEAKER));
  }

  @Test
  public void identifiesWiredHeadphoneOutputs() {
    assertTrue(HeadphoneConnectionInfo.isWiredOutputDevice(AudioDeviceInfo.TYPE_WIRED_HEADSET));
    assertTrue(HeadphoneConnectionInfo.isWiredOutputDevice(AudioDeviceInfo.TYPE_WIRED_HEADPHONES));
    assertFalse(HeadphoneConnectionInfo.isWiredOutputDevice(AudioDeviceInfo.TYPE_BUILTIN_SPEAKER));
  }
}
