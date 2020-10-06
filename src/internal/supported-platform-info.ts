import { Platform } from 'react-native';

import {
  PlatformArray,
  Getter,
  GetSupportedPlatformInfoAsyncParams,
  GetSupportedPlatformInfoSyncParams,
  GetSupportedPlatformInfoFunctionsParams,
} from './privateTypes';

type MemoType = { [key: string]: any };
// centralized memo object
const memo: MemoType = {};

// function that returns a function
function getSupportedFunction<T>(
  supportedPlatforms: PlatformArray,
  getter: Getter<T>,
  defaultGetter: Getter<T>
): Getter<T> {
  const entries = supportedPlatforms
    .filter((key) => Platform.OS == key)
    .map((key) => [key, getter]);
  const supportedMap = Object.fromEntries(entries);
  return Platform.select({
    ...supportedMap,
    default: defaultGetter,
  });
}

export function getSupportedPlatformInfoSync<T>({
  getter,
  supportedPlatforms,
  defaultValue,
  memoKey,
}: GetSupportedPlatformInfoSyncParams<T>): T {
  if (memoKey && memo[memoKey]) {
    return memo[memoKey];
  } else {
    const output = getSupportedFunction(supportedPlatforms, getter, () => defaultValue)();
    if (memoKey) {
      memo[memoKey] = output;
    }
    return output;
  }
}

export async function getSupportedPlatformInfoAsync<T>({
  getter,
  supportedPlatforms,
  defaultValue,
  memoKey,
}: GetSupportedPlatformInfoAsyncParams<T>): Promise<T> {
  if (memoKey && memo[memoKey]) {
    return memo[memoKey];
  } else {
    const output = await getSupportedFunction(supportedPlatforms, getter, () =>
      Promise.resolve(defaultValue)
    )();
    if (memoKey) {
      memo[memoKey] = output;
    }

    return output;
  }
}

export function getSupportedPlatformInfoFunctions<T>({
  syncGetter,
  ...asyncParams
}: GetSupportedPlatformInfoFunctionsParams<T>): [Getter<Promise<T>>, Getter<T>] {
  return [
    () => getSupportedPlatformInfoAsync(asyncParams),
    () => getSupportedPlatformInfoSync({ ...asyncParams, getter: syncGetter }),
  ];
}
