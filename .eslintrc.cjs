module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: './'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js']
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts', '.js']
      },
      typescript: {
        project: ['tsconfig.json']
      }
    }
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript'
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  rules: {}
};
