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
    sharedPreferences = context.getSharedPreferences("react-native-device-info", Context.MODE_PRIVATE);
    referrerClient = InstallReferrerClient.newBuilder(context).build();
    referrerClient.startConnection(this);
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

  referrerClient.startConnection(new InstallReferrerStateListener() {
    @Override
    public void onInstallReferrerSetupFinished(int responseCode) {
      switch (responseCode) {
        case InstallReferrerResponse.OK:
          // Connection established
          SharedPreferences.Editor editor = sharedPreferences.edit();
          editor.putString("installReferrer", getInstallReferrer());
          editor.apply();
          break;
        case InstallReferrerResponse.FEATURE_NOT_SUPPORTED:
          // API not available on the current Play Store app
          break;
        case InstallReferrerResponse.SERVICE_UNAVAILABLE:
          // Connection could not be established
          break;
      }
    }

    @Override
    public void onInstallReferrerServiceDisconnected() {
      // Try to restart the connection on the next request to
      // Google Play by calling the startConnection() method.
    }
  });
}