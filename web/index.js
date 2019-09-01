/**
 * react-native-web empty polyfill.
 */
module.exports = {
  getUserAgent: () => {
    return Promise.resolve(window.navigator.userAgent);
  },
};
