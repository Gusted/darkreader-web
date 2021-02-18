// @ts-check
const {typeCheck} = require('./type-check');
const {bundleJS} = require('./bundle-js');

async function main() {
    const args = process.argv.slice(2);
    await typeCheck();
    await bundleJS(args.includes('--release'));
}

main();
