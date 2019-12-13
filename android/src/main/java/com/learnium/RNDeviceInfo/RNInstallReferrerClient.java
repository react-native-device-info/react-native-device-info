package com.learnium.RNDeviceInfo;

import android.content.SharedPreferences;
import android.content.Context;
import android.os.RemoteException;

import com.android.installreferrer.api.InstallReferrerClient;
import com.android.installreferrer.api.InstallReferrerStateListener;
import com.android.installreferrer.api.ReferrerDetails;

import static com.android.installreferrer.api.InstallReferrerClient.InstallReferrerResponse;

public class RNInstallReferrerClient implements InstallReferrerStateListener {

  private SharedPreferences sharedPreferences;
  private InstallReferrerClient referrerClient;

  RNInstallReferrerClient(Context context) {
    referrerClient = InstallReferrerClient.newBuilder(context).build();
    sharedPreferences = context.getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
  }

  private String getInstallReferrer() {
    try {
      return referrerClient
        .getInstallReferrer()
        .getInstallReferrer();
    } catch (RemoteException e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public void onInstallReferrerSetupFinished(int responseCode) {
    switch (responseCode) {
      case InstallReferrerResponse.OK:
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("installReferrer", getInstallReferrer());
        editor.apply();
        break;
      case InstallReferrerResponse.FEATURE_NOT_SUPPORTED:
        break;
      case InstallReferrerResponse.SERVICE_UNAVAILABLE:
        break;
    }
  }

  @Override
  public void onInstallReferrerServiceDisconnected() {

  }
}
