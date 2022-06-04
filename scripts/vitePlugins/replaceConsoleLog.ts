import type { Plugin } from 'vite';

const name = 'replace-console-log';
const VM_ID = `\0${name}`;

export const replaceConsoleLog = (): Plugin => ({
    name,
    resolveId(id) {
        if (id === VM_ID) return VM_ID;
    },
    load(id) {
        if (id === VM_ID) return 'console.log = console.debug;';
    },
    transform(code, id) {
        if (code.includes(VM_ID)) return;

        const entryFiles = [
            'main/src/background.ts',
            'preload/src/index.ts',
            'renderer/src/index.tsx',
            'vite/dist/client/env.mjs',
        ];
        if (entryFiles.some(x => id.includes(x))) {
            return {
                code: `import '${VM_ID}';\n${code}`,
                map: null,
            };
        }
    },
});
