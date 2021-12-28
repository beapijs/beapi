/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  testMatch: ['**/+(*.)+(test).+(ts|js)?(x)'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'clover'],
  roots: ['<rootDir>packages/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
}
