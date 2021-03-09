// Simple optimization for the compiler.
// And shouldn't affect production code.
declare const __DEBUG__: boolean;

// Because we cannot export an declare variable.
// We need another variable to take the honour.
export const isDebug = __DEBUG__;

const aquaColor = 'color: aqua';
const grayColor = 'color: gray';
const goldColor = 'color: gold';
const redColor = 'color: red';
const whiteColor = 'color: white';

export function logInfo(...args: any) {
    __DEBUG__ && console.info(`%c[%cINFO%c] %c>> %c` + args.join(' '), grayColor, aquaColor, grayColor, goldColor, whiteColor);
}

export function logWarn(...args: any) {
    __DEBUG__ && console.warn(`%c[%cWARN%c] %c>> %c` + args.join(' '), grayColor, redColor, grayColor, aquaColor, whiteColor);
}
