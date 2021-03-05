// Simple optimization for the compiler.
// And shouldn't affect production code.
declare const __DEBUG__: boolean;

// Because we cannot export an declare variable.
// We need another variable to take the honour.
export const isDebug = __DEBUG__;

export function logInfo(...args: any) {
    __DEBUG__ && console.info(args);
}

export function logWarn(...args: any) {
    __DEBUG__ && console.warn(args);
}
