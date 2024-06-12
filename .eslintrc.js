module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:storybook/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-uses-vars': 'error',
    'react/jsx-key': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
