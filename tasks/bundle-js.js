// @ts-check
const {build} = require('esbuild');

/**
 * @param {boolean} release Enable release specific flags.
 */
async function bundleJS(release) {
    [
        {
            input: 'src/index.ts',
            dest: 'public/index.js'
        },
        {
            input: 'src/proxy.ts',
            dest: 'public/proxy.js',
        }
    ].forEach((entry) => {
        compileJS(entry, release);
    });
}

/**
 * @param {{dest: string, input: string}} entry Entry object.
 * @param {boolean} release Enable release specific flags.
 */
async function compileJS(entry, release) {
    await build({
        bundle: true,
        target: 'es2019',
        charset: 'utf8',
        format: 'iife',
        write: true,
        outfile: entry.dest,
        entryPoints: [entry.input],
        banner: '"use strict";',
        logLevel: 'info',
        color: true,
        sourcemap: release ? false : 'inline',
        minify: release,
    });
}

module.exports = {bundleJS};
