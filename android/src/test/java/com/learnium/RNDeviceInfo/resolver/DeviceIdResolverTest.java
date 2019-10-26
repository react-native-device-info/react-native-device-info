package com.learnium.RNDeviceInfo.resolver;

import android.content.Context;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.lang.reflect.InvocationTargetException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.spy;

class DeviceIdResolverTest {

  @Mock
  Context context;

  private DeviceIdResolver deviceIdResolver;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.initMocks(this);
    deviceIdResolver = spy(new DeviceIdResolver(context));
  }

  /**
   * By default, if no library is setup to get a deviceId then return "unknown"
   */
  @Test
  void getInstanceIdSync() {
    assertEquals("unknown", deviceIdResolver.getInstanceIdSync());
  }

  /**
   * If FirebaseId library is available, then return it
   */
  @Test
  void getInstanceIdSyncFirebase() throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    doReturn("Firebase123").when(deviceIdResolver).getFirebaseInstanceId();
    assertEquals("Firebase123", deviceIdResolver.getInstanceIdSync());
  }

  /**
   * If GMS library available then return its generated id
   */
  @Test
  void getInstanceIdSyncGMS() throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
    doReturn("GMS123").when(deviceIdResolver).getGmsInstanceId();
    assertEquals("GMS123", deviceIdResolver.getInstanceIdSync());
  }

}