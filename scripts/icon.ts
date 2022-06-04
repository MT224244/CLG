import icongen from 'icon-gen';

icongen('packages/renderer/public/icon.png', 'dist', {
    report: true,
    ico: {
        name: 'icon',
    },
});
