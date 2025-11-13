/**
 * High-level classification of the device hardware.
 */
export type DeviceType = 'Handset' | 'Tablet' | 'Tv' | 'Desktop' | 'GamingConsole' | 'unknown';

/**
 * Possible power states reported by the native layer.
 */
export type BatteryState = 'unknown' | 'unplugged' | 'charging' | 'full';

/**
 * Snapshot of the device's current power conditions.
 */
export interface PowerState {
  batteryLevel: number;
  batteryState: BatteryState;
  lowPowerMode: boolean;
  [key: string]: any;
}

/**
 * Map describing which location providers are currently enabled.
 */
export interface LocationProviderInfo {
  [key: string]: boolean;
}

/**
 * Shared shape returned by asynchronous hooks in this module.
 */
export interface AsyncHookResult<T> {
  loading: boolean;
  result: T;
}

/**
 * Disk capacity buckets used by iOS when querying storage information.
 */
export type AvailableCapacityType = 'total' | 'important' | 'opportunistic';

/**
 * Google Play Services App Set ID payload describing identifier and scope.
 */
export interface AppSetIdInfo {
  id: string;
  scope: number;
}

/**
 * Allowed scope values returned with the App Set ID (1: app, 2: developer).
 */
export type AppSetIdScope = 1 | 2;
