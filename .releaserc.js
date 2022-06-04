const { productName } = require('./package.json');

const newName = productName.replace(/\s/g, '_');

/** @type {import('semantic-release').Options} */
module.exports = {
    plugins: [
        'semantic-release-gitmoji',
        '@semantic-release/changelog',
        '@semantic-release/npm',
        ['@semantic-release/exec', {
            prepareCmd: 'yarn electron:build'
        }],
        ['@semantic-release/github', {
            assets: [
                {
                    path: `build/${productName}.exe`,
                    name: `${newName}_\${nextRelease.gitTag}.exe`
                },
                {
                    path: `build/${productName}_Installer.exe`,
                    name: `${newName}_\${nextRelease.gitTag}_Installer.exe`
                },
                {
                    path: `build/${productName}_win.zip`,
                    name: `${newName}_\${nextRelease.gitTag}_win.zip`
                }
            ]
        }],
        '@semantic-release/git'
    ],
    branches: 'release'
};
