const { name, author } = require('./package.json');

/** @type {import('electron-builder').Configuration} */
module.exports = {
    extends: null,
    directories: {
        output: 'build',
    },
    files: [
        'dist/main/**/*',
        'dist/preload/**/*',
        'dist/renderer/**/*',
    ],
    appId: `com.mt224244.${name}`,
    copyright: `© 2022 ${author}`,
    win: {
        icon: 'dist/icon.ico',
        artifactName: '${productName}_win.${ext}',
        target: [
            'zip',
            'nsis',
            'portable',
        ],
    },
    nsis: {
        oneClick: false,
        artifactName: '${productName}_Installer.${ext}',
    },
    portable: {
        artifactName: '${productName}.${ext}',
    },
};
