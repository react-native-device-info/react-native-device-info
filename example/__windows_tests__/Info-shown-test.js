import { driver, By2 } from 'selenium-appium'

const setup = require('../jest-windows/driver.setup');
jest.setTimeout(60000);

beforeAll(() => {
  return driver.startWithCapabilities(setup.capabilites);
});

afterAll(() => {
  return driver.quit();
});

describe('Test Info shown', () => {

  test('Has Windows Name on Constant tab', async () => {
    await By2.nativeAccessibilityId('constant button').click();
    await(driver.sleep(1000));
    let tab_contents = await By2.nativeAccessibilityId('constant tab contents');
    let text = await tab_contents.getText();
    expect(text).toContain('"systemName": "Windows"');
  });

  test('Sync tab values are shown', async () => {
    await By2.nativeAccessibilityId('sync button').click();
    await(driver.sleep(1000));
    let tab_contents = await By2.nativeAccessibilityId('sync tab contents');
    let text = await tab_contents.getText();
    expect(text).toContain('"supported64BitAbis":');
  });

  test('Async tab values are shown', async () => {
    await By2.nativeAccessibilityId('async button').click();
    await(driver.sleep(1000));
    let tab_contents = await By2.nativeAccessibilityId('async tab contents');
    let text = await tab_contents.getText();
    expect(text).toContain('"deviceToken":');
  });

  test('Hooks tab values are shown', async () => {
    await By2.nativeAccessibilityId('hooks button').click();
    await(driver.sleep(1000));
    let tab_contents = await By2.nativeAccessibilityId('hooks tab contents');
    let text = await tab_contents.getText();
    expect(text).toContain('"isHeadphonesConnected":');
  });

})