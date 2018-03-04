package com.learnium.RNDeviceInfo;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class RNDeviceReceiver extends BroadcastReceiver {
  private static String installReferrer = "";

  public static String getInstallReferrer() {
    return installReferrer;
  }

  @Override
  public void onReceive(Context context, Intent intent) {
    String action = intent.getAction();
    if (action.equals("com.android.vending.INSTALL_REFERRER")) {
      installReferrer = intent.getStringExtra("referrer");
    }
  }
}
