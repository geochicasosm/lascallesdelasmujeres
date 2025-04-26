/** @type {import('vite').UserConfig} */
export default {
    root: './src',
    build: {
        outDir: '../docs/',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: './src/index.html',
            }
        }
    },
}
