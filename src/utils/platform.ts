const userAgent = typeof navigator === 'undefined' ? 'some useragent' : navigator.userAgent.toLowerCase();
export const isFirefox = userAgent.includes('firefox');
