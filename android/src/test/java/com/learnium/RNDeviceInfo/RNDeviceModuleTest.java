package com.learnium.RNDeviceInfo;

import android.view.inputmethod.InputMethodManager;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;

class RNDeviceModuleTest {

  private InputMethodManager inputMethodManager;

  @BeforeEach
  void setUp() {
    inputMethodManager = mock(InputMethodManager.class);
  }

  @Test
  void keyboardProbeFailsClosedWhenAndroidRejectsTheInputMethodList() {
    doThrow(new RuntimeException("framework return type mismatch"))
      .when(inputMethodManager)
      .getEnabledInputMethodList();

    assertFalse(RNDeviceModule.hasKeyboard(inputMethodManager, "memuime"));
  }
}
