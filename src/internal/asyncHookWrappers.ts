import { useState, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import type { AsyncHookResult } from './types';

/**
 * simple hook wrapper for async functions for 'on-mount / componentDidMount' that only need to fired once
 * @param asyncGetter async function that 'gets' something
 * @param initialResult -1 | false | 'unknown'
 */
export function useOnMount<T>(asyncGetter: () => Promise<T>, initialResult: T): AsyncHookResult<T> {
  const [response, setResponse] = useState<AsyncHookResult<T>>({
    loading: true,
    result: initialResult,
  });

  useEffect(() => {
    // async function cuz react complains if useEffect's effect param is an async function
    const getAsync = async () => {
      const result = await asyncGetter();
      setResponse({ loading: false, result });
    };

    getAsync();
  }, [asyncGetter]);

  return response;
}

export const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

/**
 * simple hook wrapper for handling events
 * @param eventName
 * @param initialValueAsyncGetter
 * @param defaultValue
 */
export function useOnEvent<T>(
  eventName: string,
  initialValueAsyncGetter: () => Promise<T>,
  defaultValue: T
): AsyncHookResult<T> {
  const { loading, result: initialResult } = useOnMount(initialValueAsyncGetter, defaultValue);
  const [result, setResult] = useState<T>(defaultValue);

  // sets the result to what the intial value is on mount
  useEffect(() => {
    setResult(initialResult);
  }, [initialResult]);

  // - set up the event listener to set the result
  // - set up the clean up function to remove subscription on unmount
  useEffect(() => {
    const subscription = deviceInfoEmitter.addListener(eventName, setResult);
    return () => subscription.remove();
  }, [eventName]);

  // loading will only be true while getting the inital value. After that, it will always be false, but a new result may occur
  return { loading, result };
}
