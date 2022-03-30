// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: [
      'js',
      'json',
      'vue',
      'jsx'
    ],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.vue$': 'vue3-jest'
    }
  }