module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  modulePathIgnorePatterns: [
    '.yarn',
    '.npm',
    'ios/',
    'node_modules/',
    'android/',
    '<rootDir>/lib/',
  ],
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
    '<rootDir>/example/',
  ],
};
