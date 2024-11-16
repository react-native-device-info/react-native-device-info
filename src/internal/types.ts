export type DeviceType = 'Handset' | 'Tablet' | 'Tv' | 'Desktop' | 'GamingConsole' | 'unknown';

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

export interface AsyncHookResult<T> {
  loading: boolean;
  result: T;
}

// Only relevant for iOS
export type AvailableCapacityType = 'total' | 'important' | 'opportunistic';
