/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const { pathsToModuleNameMapper } = require("ts-jest");

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  // globals: {
  //   'ts-jest': {
  //     tsconfig: {
  //       rootDir: '../src',
  //     },
  //   },
  // },
  roots: ['../src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Modules are meant for code which is repeating in each test file
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['../node_modules', '../src'],
  // moduleNameMapper: {
  //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/mocks/filesMock.js',
  // },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        rootDir: '../src/',
        // Compile each file separately. It's lose type-checking ability and some features such as const enum
        // At the current config it helps to avoid of errors with importing css modules
        isolatedModules: true,
        diagnostics: { ignoreCodes: [151001] },
      },
    ],
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform', // To work with CSS like modules
  },
  testMatch: ['**/?(*.)(spec|test).[jt]s?(x)'], // Finds test files named like abc.test|spec.ts?tsx|js|jsx in roots:[] prop.
  testEnvironment: 'jsdom', // To avoid of js DOM errors
  // roots: ['<rootDir>'],
  // modulePaths: [compilerOptions.baseUrl],
  // preset: 'ts-jest',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../src/',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mocks/filesMock.js',
    'locale-provider': 'identity-obj-proxy',
    '\\.(css|less)$': 'identity-obj-proxy',
    'react-markdown':
      '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
  }),
};
