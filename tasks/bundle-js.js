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
        write: true,
        outdir: 'public',
        entryPoints: ['src/index.ts', 'src/proxy.ts'],
        splitting: true,
        banner: {js: '"use strict";'},
        logLevel: 'info',
        color: true,
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
