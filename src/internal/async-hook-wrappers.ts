import { useState, useEffect } from 'react';

import { AsyncHookResult } from './types';

/**
 * simple hook wrapper for async functions for 'on-mount / componentDidMount' that only need to fired once
 * @param asyncGetter async function that 'gets' something
 * @param initialResult  -1 | false | 'unknown'
 */
export function useOnMount<T>(
  asyncGetter: () => Promise<T>,
  initialResult: -1 | false | 'unknown' = 'unknown'
): AsyncHookResult<T> {
  const [response, setResponse] = useState({
    loading: true,
    result: initialResult,
  } as AsyncHookResult<T>);

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
