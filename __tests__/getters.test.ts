import { Platform } from 'react-native';
import { getInstanceId, getInstanceIdSync } from '../src';
import { clearMemo } from '../src/internal/supported-platform-info';
let mockNativeModule = jest.requireMock('../src/internal/nativeInterface').default;

describe('string getters', () => {
  describe('getInstanceId*', () => {
    beforeEach(() => {
      Platform.OS = 'android';
    });

    beforeEach(() => {
      mockNativeModule.getInstanceIdSync.mockClear();
      mockNativeModule.getInstanceId.mockClear();
    });

    it('should have an async version', () => {
      expect(typeof getInstanceId).toBe('function');
    });

    it('should have a sync version', () => {
      expect(typeof getInstanceIdSync).toBe('function');
    });

    it('should call RNDeviceInfo.getInstanceId', async () => {
      clearMemo();
      const resp = await getInstanceId();
      expect(resp).toEqual('unknown');
      expect(mockNativeModule.getInstanceId).toHaveBeenCalled();
    });

    it('should call RNDeviceInfo.getInstanceIdSync', () => {
      clearMemo();
      const resp = getInstanceIdSync();
      expect(resp).toEqual('unknown');
      expect(mockNativeModule.getInstanceIdSync).toHaveBeenCalled();
    });

    it('should not call RNDeviceInfo.getInstanceIdSync on unsupported OS', () => {
      clearMemo();
      Platform.OS = 'ios';
      const resp = getInstanceIdSync();
      expect(resp).toEqual('unknown');
      expect(mockNativeModule.getInstanceIdSync).not.toHaveBeenCalled();
    });

    it('should not call RNDeviceInfo.getInstanceId on unsupported OS', async () => {
      clearMemo();
      Platform.OS = 'ios';
      const resp = await getInstanceId();
      expect(resp).toEqual('unknown');
      expect(mockNativeModule.getInstanceId).not.toHaveBeenCalled();
    });

    it('should use memoized value if there exists one', async () => {
      const resp = await getInstanceId();
      const resp2 = getInstanceIdSync();
      expect(resp).toBe(resp2);
      expect(mockNativeModule.getInstanceIdSync).not.toHaveBeenCalled();
    });
  });
});
