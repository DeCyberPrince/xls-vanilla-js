const env = require('./.env')
module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-unused-vars': env.prod ? 'warn' : 'off'
  }
}
