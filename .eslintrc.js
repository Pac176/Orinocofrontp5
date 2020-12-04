module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: [
    'vue'
  ],
  rules: {
    "semi": ["error", "always"],
    "no-unused-expressions": "warn",
    "no-undef": "warn",
    "no-unused-expressions": "warn",
    "no-unused-vars":"warn"
  }
}
