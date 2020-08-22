export type DeviceType = 'Handset' | 'Tablet' | 'Tv' | 'unknown';

export type BatteryState = 'unknown' | 'unplugged' | 'charging' | 'full';

export interface PowerState {
  batteryLevel: number;
  batteryState: BatteryState;
  lowPowerMode: boolean;
  [key: string]: any;
}

export interface LocationProviderInfo {
  [key: string]: boolean;
}

export interface ScreenDimensions {
  pt: {
    width: number;
    height: number;
  };
  px: {
    width: number;
    height: number;
  };
  mm: {
    width: number;
    height: number;
  };
}

export interface AsyncHookResult<T> {
  loading: boolean;
  result: T;
}
