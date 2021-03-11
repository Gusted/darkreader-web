// @ts-check
const {typeCheck} = require('./type-check');
const {bundleJS} = require('./bundle-js');
const fs = require('fs');

async function main() {
    fs.rmdirSync('public', {recursive: true});

    const args = process.argv.slice(2);
    process.env.VERCEL_ENV === 'development' && await typeCheck();
    await bundleJS(args.includes('--release'));

    fs.readdir('src/ui/', (err, files) => {
        if (err) {
            console.warn('Unable to scan directory: ' + err);
            return;
        }
        files.forEach((file) => {
            fs.copyFileSync(`src/ui/${file}`, `public/${file}`);
        });
    });
    fs.readdir('assets', (err, files) => {
        if (err) {
            console.warn('Unable to scan directory: ' + err);
            return;
        }
        files.forEach((file) => {
            fs.copyFileSync(`assets/${file}`, `public/${file}`);
        });
    });
}

main();
