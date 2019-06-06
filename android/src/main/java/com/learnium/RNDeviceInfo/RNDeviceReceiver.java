package com.learnium.RNDeviceInfo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

public class RNDeviceReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
    String action = intent.getAction();
    if ("com.android.vending.INSTALL_REFERRER".equals(action)) {
      SharedPreferences sharedPref = context.getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
      SharedPreferences.Editor editor = sharedPref.edit();
      editor.putString("installReferrer", intent.getStringExtra("referrer"));
      editor.commit();
    }
  }
}
