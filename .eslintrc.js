module.exports = {
  root: true,
  extends: 'airbnb-typescript/base',
  plugins: ['import', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  'rules': {
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error', { 'allow': ['private-constructors'] }],
  },
};