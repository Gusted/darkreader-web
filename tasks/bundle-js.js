// @ts-check
const {build} = require('esbuild');

/**
 * @param {boolean} release Enable release specific flags.
 */
async function bundleJS(release) {
    await build({
        bundle: true,
        target: 'es2019',
        charset: 'utf8',
        format: 'esm',
        outdir: 'public',
        entryPoints: ['src/index.ts', 'src/proxy.ts', 'src/style.css'],
        splitting: true,
        banner: {js: '"use strict";'},
        logLevel: 'info',
        sourcemap: release ? false : 'inline',
        minify: release,
        define: process.env.VERCEL_ENV === 'development' ? {
            '__DEBUG__': 'true'
        } : {
            '__DEBUG__': 'false'
        },
    });
}

module.exports = {bundleJS};
