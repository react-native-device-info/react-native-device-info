import { renderHook } from '@testing-library/react-hooks';
import { useOnMount, useOnEvent, deviceInfoEmitter } from '../src/internal/asyncHookWrappers';

describe('async-hook-wrappers', () => {
  let asyncGetter = jest.fn(() => Promise.resolve(true));
  let initialValue = false;
  beforeEach(() => {
    asyncGetter.mockClear();
    initialValue = Math.random() > 0.5;
  });

  describe('useOnMount', () => {
    it('should exist as a function', () => {
      expect(typeof useOnMount).toBe('function');
    });
    it('should return initial value before effect load', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useOnMount(asyncGetter, initialValue));
      expect(result.current).toEqual({ loading: true, result: initialValue });
      await waitForNextUpdate();
    });

    it('should return a new Value after async result obtained', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useOnMount(asyncGetter, initialValue));
      await waitForNextUpdate();

      expect(asyncGetter).toHaveBeenCalled();
      expect(result.current).toEqual({ loading: false, result: true });
    });
  });

  describe('useOnEvent', () => {
    const eventName = 'event-hook-event';
    beforeEach(() => {
      deviceInfoEmitter.removeAllListeners(eventName);
    });
    beforeAll((done) => {
      done();
    });
    it('should exist as a function', () => {
      expect(typeof useOnEvent).toBe('function');
    });

    it('should return a default value before effect load', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useOnEvent(eventName, asyncGetter, initialValue)
      );
      expect(result.current).toEqual({ loading: true, result: initialValue });
      await waitForNextUpdate();
    });

    it('should return a new Value after async result obtained', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useOnEvent(eventName, asyncGetter, initialValue)
      );
      await waitForNextUpdate();

      expect(asyncGetter).toHaveBeenCalled();
      expect(result.current).toEqual({ loading: false, result: true });
    });

    // TODO: add tests for NativeEventEmitter :/
  });
});
