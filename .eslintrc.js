module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'off', // Nuxt 3 tem funções globais
  },
  ignorePatterns: ['.nuxt', '.output', 'node_modules', 'dist'],
  globals: {
    defineEventHandler: 'readonly',
    useRuntimeConfig: 'readonly',
    readBody: 'readonly',
    $fetch: 'readonly',
  },
};
