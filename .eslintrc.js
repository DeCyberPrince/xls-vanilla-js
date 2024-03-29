module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'standard'],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['warn', 'never'],
    'no-new': 'off',
  },
}
