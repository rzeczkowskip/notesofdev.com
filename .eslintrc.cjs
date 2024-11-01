const tsconfigPath = './tsconfig.json';

/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'eslint-config-prettier',
  ],
  parserOptions: {
    project: [tsconfigPath],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.ts'],
      },
    ],
    'import/prefer-default-export': 0,
    'no-console': 'error',
    'class-methods-use-this': 0,
  },
};
