/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    plugins: [
        '@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'semi': ['error', 'always'],
        'no-extra-semi': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'no-template-curly-in-string': 'off',
        '@typescript-eslint/no-explicit-any': ['warn'],
    },
};
