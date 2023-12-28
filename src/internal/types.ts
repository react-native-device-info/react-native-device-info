import { DeviceType, BatteryState, PowerState, LocationProviderInfo } from './NativeRNDeviceInfo';

export { DeviceType, BatteryState, PowerState, LocationProviderInfo };

export interface AsyncHookResult<T> {
  loading: boolean;
  result: T;
}
