module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'eslint-plugin-react-compiler'],
  ignorePatterns: ['**/*.css', '**/*.svg'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-compiler/react-compiler': 'error',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
  },
};
