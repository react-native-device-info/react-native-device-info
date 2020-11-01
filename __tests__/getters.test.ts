import { Platform } from 'react-native';
import * as RNDeviceInfo from '../src';
import { clearMemo } from '../src/internal/supported-platform-info';
let mockNativeModule = jest.requireMock('../src/internal/nativeInterface').default;

function makeTable(name: string) {
  return [
    name, // name
    (RNDeviceInfo as any)[name], // asyncGetter
    (RNDeviceInfo as any)[`${name}Sync`], // syncGetter
    mockNativeModule[name], // asyncNativeGetter
    mockNativeModule[`${name}Sync`], // syncNativeGetter
  ];
}
const memoizedStringGetters = [
  'getInstanceId',
  'getSerialNumber',
  'getAndroidId',
  'getBuildId',
  'getInstallerPackageName',
  'getDeviceName',
  'getBootloader',
  'getDevice',
  'getDisplay',
  'getFingerprint',
  'getHardware',
  'getHost',
  'getProduct',
  'getTags',
  'getType',
  'getBaseOs',
  'getSecurityPatch',
  'getCodename',
  'getIncremental',
  'getInstallReferrer',
].map(makeTable);

describe('string getters', () => {
  describe.each(memoizedStringGetters)(
    '%s*',
    (_name, asyncGetter, syncGetter, asyncNativeGetter, syncNativeGetter) => {
      beforeEach(() => {
        clearMemo();
        Platform.OS = 'android';
        asyncNativeGetter.mockClear();
        syncNativeGetter.mockClear();
      });

      it('should have an async version', () => {
        expect(typeof asyncGetter).toBe('function');
      });

      it('should have a sync version', () => {
        expect(typeof syncGetter).toBe('function');
      });

      it('should call native async module function', async () => {
        const resp = await asyncGetter();
        expect(resp).toEqual('unknown');
        expect(asyncNativeGetter).toHaveBeenCalled();
      });

      it('should call native sync module function', () => {
        const resp = syncGetter();
        expect(resp).toEqual('unknown');
        expect(syncNativeGetter).toHaveBeenCalled();
      });

      it('should not call native sync module function on unsupported OS', () => {
        Platform.OS = 'GLaDOS' as any; // setting OS to something that won't match anything
        const resp = syncGetter();
        expect(resp).toEqual('unknown');
        expect(syncNativeGetter).not.toHaveBeenCalled();
      });

      it('should not call native async module function on unsupported OS', async () => {
        Platform.OS = 'GLaDOS' as any; // setting OS to something that won't match anything
        const resp = await asyncGetter();
        expect(resp).toEqual('unknown');
        expect(asyncNativeGetter).not.toHaveBeenCalled();
      });

      it('should use memoized value if there exists one', async () => {
        const resp = await asyncGetter();
        const resp2 = syncGetter();
        expect(resp).toBe(resp2);
        expect(asyncNativeGetter).toHaveBeenCalled();
        expect(syncNativeGetter).not.toHaveBeenCalled();
      });
    }
  );
});

const memoizedNumberGetters = [
  'getApiLevel',
  'getPreviewSdkInt',
  'getFirstInstallTime',
  'getLastUpdateTime',
  'getTotalMemory',
  'getMaxMemory',
].map(makeTable);

describe('number getters', () => {
  describe.each(memoizedNumberGetters)(
    '%s*',
    (_name, asyncGetter, syncGetter, asyncNativeGetter, syncNativeGetter) => {
      beforeEach(() => {
        clearMemo();
        Platform.OS = 'android';
        asyncNativeGetter.mockClear();
        syncNativeGetter.mockClear();
      });

      it('should have an async version', () => {
        expect(typeof asyncGetter).toBe('function');
      });

      it('should have a sync version', () => {
        expect(typeof syncGetter).toBe('function');
      });

      it('should call native async module function', async () => {
        const resp = await asyncGetter();
        expect(resp).toEqual(-1);
        expect(asyncNativeGetter).toHaveBeenCalled();
      });

      it('should call native sync module function', () => {
        const resp = syncGetter();
        expect(resp).toEqual(-1);
        expect(syncNativeGetter).toHaveBeenCalled();
      });

      it('should not call native sync module function on unsupported OS', () => {
        Platform.OS = 'GLaDOS' as any; // setting OS to something that won't match anything
        const resp = syncGetter();
        expect(resp).toEqual(-1);
        expect(syncNativeGetter).not.toHaveBeenCalled();
      });

      it('should not call native async module function on unsupported OS', async () => {
        Platform.OS = 'GLaDOS' as any; // setting OS to something that won't match anything
        const resp = await asyncGetter();
        expect(resp).toEqual(-1);
        expect(asyncNativeGetter).not.toHaveBeenCalled();
      });

      it('should use memoized value if there exists one', async () => {
        const resp = await asyncGetter();
        const resp2 = syncGetter();
        expect(resp).toBe(resp2);
        expect(asyncNativeGetter).toHaveBeenCalled();
        expect(syncNativeGetter).not.toHaveBeenCalled();
      });
    }
  );
});
