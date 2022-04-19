export default {
  testEnvironment: 'jsdom',
  verbose: true,
  testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/mocks/fileMocks.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
