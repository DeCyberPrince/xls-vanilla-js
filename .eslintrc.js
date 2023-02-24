module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'standard'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': ['warn', 'never'],
  }
}
