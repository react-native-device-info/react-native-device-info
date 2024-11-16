package com.learnium.RNDeviceInfo;

public enum DeviceType {
    HANDSET ("Handset"),
    TABLET ("Tablet"),
    TV ("Tv"),
    UNKNOWN ("unknown");

    private final String value;

    DeviceType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
