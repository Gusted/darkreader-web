// @ts-check
const {build} = require('esbuild');

/**
 * @param {boolean} release
 */
async function bundleJS(release) {
    await build({
        bundle: true,
        target: 'es2019',
        charset: 'utf8',
        format: 'iife',
        write: true,
        outfile: 'public/index.js',
        entryPoints: ['src/index.ts'],
        banner: '"use strict";',
        logLevel: 'info',
        color: true,
        sourcemap: release ? false : 'inline',
        minify: release,
    });
}

module.exports = {bundleJS};
