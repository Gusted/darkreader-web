// @ts-check
const {typeCheck} = require('./type-check');
const {bundleJS} = require('./bundle-js');
const fs = require('fs');
const glob = require('globs');

async function main() {
    const args = process.argv.slice(2);
    await typeCheck();
    await bundleJS(args.includes('--release'));
    if (args.includes('--release')) {
        glob.sync('src/ui/**/*').forEach((path) => {
            fs.copyFileSync(path, `public/${path.substring(path.lastIndexOf('/'))}`);
        });
    }
}

main();
