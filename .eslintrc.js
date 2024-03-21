module.exports = {

  plugins: ['react'],

  env: {
    node : true,

    browser: true,

    es2021: true,

  },

  extends: [

    'eslint:recommended',

  ],

  parserOptions: {

    ecmaVersion: 12,

    sourceType: 'module',

  },

  rules: {

    'no-unused-vars': 'warn',

    'no-undef': 'warn',
    'semi': ['error', 'always'],

    'no-console': 'warn',

  },

};