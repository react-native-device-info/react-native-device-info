import { Platform } from 'react-native';
import { PlatformArray } from '../src/internal/privateTypes';
import {
  clearMemo,
  getSupportedPlatformInfoAsync,
  getSupportedPlatformInfoSync,
  getSupportedPlatformInfoFunctions,
} from '../src/internal/supported-platform-info';

describe('supported platform info', () => {
  describe('clearMemo', () => {
    it('should exist as a function', () => {
      expect(typeof clearMemo).toEqual('function');
    });
  });

  describe('getSupportedPlatformInfoSync', () => {
    const getterResponse = Math.random();
    const getter = jest.fn().mockReturnValue(getterResponse);
    const supportedPlatforms: PlatformArray = ['ios', 'android'];

    beforeEach(() => {
      getter.mockClear();
    });

    it('should exist as a function', () => {
      expect(typeof getSupportedPlatformInfoSync).toEqual('function');
    });

    it.each(supportedPlatforms)('should call getter param for platform, %s', (platform) => {
      Platform.OS = platform;
      const output = getSupportedPlatformInfoSync({
        getter,
        supportedPlatforms,
        defaultValue: -1,
      });
      expect(getter).toHaveBeenCalled();
      expect(output).toBe(getterResponse);
    });

    it('should return the default value and not call getter if OS is not in supported platforms', () => {
      Platform.OS = 'windows';
      const defaultValue = Math.random() * 10;
      const output = getSupportedPlatformInfoSync({
        getter,
        supportedPlatforms,
        defaultValue,
      });

      expect(output).toBe(defaultValue);
      expect(getter).not.toHaveBeenCalled();
    });

    it('should use memo if key is passed', () => {
      clearMemo();
      Platform.OS = 'ios';
      const defaultValue = Math.random() * 10;
      const memoKey = `getSupportedPlatformInfoSync`;
      const outputA = getSupportedPlatformInfoSync({
        getter,
        supportedPlatforms,
        defaultValue,
        memoKey,
      });

      expect(outputA).toBe(getterResponse);
      expect(getter).toHaveBeenCalled();
      getter.mockClear();

      const outputB = getSupportedPlatformInfoSync({
        getter,
        supportedPlatforms,
        defaultValue,
        memoKey,
      });

      expect(outputB).toBe(getterResponse);
      expect(getter).not.toHaveBeenCalled();
    });
  });

  describe('getSupportedPlatformInfoAsync', () => {
    const getterResponse = Math.random();
    const getter = jest.fn(() => Promise.resolve(getterResponse));
    const supportedPlatforms: PlatformArray = ['ios', 'android'];

    beforeEach(() => {
      getter.mockClear();
    });

    it('should exist as a function', () => {
      expect(typeof getSupportedPlatformInfoAsync).toBe('function');
    });

    it.each(supportedPlatforms)('should call getter param for platform, %s', async (platform) => {
      Platform.OS = platform;
      const output = await getSupportedPlatformInfoAsync({
        getter,
        supportedPlatforms,
        defaultValue: -1,
      });
      expect(getter).toHaveBeenCalled();
      expect(output).toBe(getterResponse);
    });

    it('should return the default value and not call getter if OS is not in supported platforms', async () => {
      Platform.OS = 'windows';
      const defaultValue = Math.random() * 10;
      const output = await getSupportedPlatformInfoAsync({
        getter,
        supportedPlatforms,
        defaultValue,
      });

      expect(output).toBe(defaultValue);
      expect(getter).not.toHaveBeenCalled();
    });

    it('should use memo if key is passed', async () => {
      clearMemo();
      Platform.OS = 'ios';
      const defaultValue = Math.random() * 10;
      const memoKey = `getSupportedPlatformInfoAsync`;
      const outputA = await getSupportedPlatformInfoAsync({
        getter,
        supportedPlatforms,
        defaultValue,
        memoKey,
      });

      expect(outputA).toBe(getterResponse);
      expect(getter).toHaveBeenCalled();
      getter.mockClear();

      const outputB = await getSupportedPlatformInfoAsync({
        getter,
        supportedPlatforms,
        defaultValue,
        memoKey,
      });

      expect(outputB).toBe(getterResponse);
      expect(getter).not.toHaveBeenCalled();
    });
  });

  describe('getSupportedPlatformInfoFunctions', () => {
    const defaultValue = -1;
    const supportedPlatforms: PlatformArray = ['ios', 'android'];
    const getterResponse = Math.random();
    const getter = jest.fn(() => Promise.resolve(getterResponse));
    const syncGetter = jest.fn().mockReturnValue(getterResponse);

    const generatedFns = getSupportedPlatformInfoFunctions({
      defaultValue,
      supportedPlatforms,
      getter,
      syncGetter,
    });

    beforeEach(() => {
      getter.mockClear();
      syncGetter.mockClear();
      clearMemo();
    });

    it('should exist as a function', () => {
      expect(typeof getSupportedPlatformInfoFunctions).toEqual('function');
    });

    it('should return back an array of functions', () => {
      expect(Array.isArray(generatedFns)).toEqual(true);
      expect(generatedFns.length).toEqual(2);
      generatedFns.forEach((fn) => {
        expect(typeof fn).toEqual('function');
      });
    });

    it('should have first getter be an async function that returns expected object', async () => {
      const resp = await generatedFns[0]();
      expect(getter).toBeCalled();
      expect(resp).toEqual(getterResponse);
    });

    it('should have second getter be a sync function that returns expected object', () => {
      const resp = generatedFns[1]();
      expect(syncGetter).toBeCalled();
      expect(resp).toEqual(getterResponse);
    });
  });
});
