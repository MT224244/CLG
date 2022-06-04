/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        require.resolve('../../.eslintrc'),
        'react-app',
    ],
    plugins: [
        'react',
    ],
};
