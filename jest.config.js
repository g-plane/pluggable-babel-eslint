module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/tests/config/fixture',
  ],
  testRegex: '(/tests/.*|(\\.|/)test)\\.js$'
}
