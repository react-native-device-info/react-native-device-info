export enum DeviceType {
    DESKTOP = 'Desktop',
    HANDSET = 'Handset',
    TABLET = 'Tablet',
    TV = 'Tv',
    GAMINGCONSOLE = 'GamingConsole',
    UNKNOWN=  'unknown'
}

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
