module.exports = {
  extends: ['standard', 'prettier', 'prettier-standard'],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  }
}
