let anchor: HTMLAnchorElement;
export const parsedURLCache = new Map<string, URL>();
function fixBaseURL($url: string) {
    if (!anchor) {
        anchor = document.createElement('a');
    }
    anchor.href = $url;
    return anchor.href;
}

export function parseURL($url: string, $base: string = null) {
    const key = `${$url}${$base ? ';' + $base : ''}`;
    if (parsedURLCache.has(key)) {
        return parsedURLCache.get(key);
    }
    if ($base) {
        const parsedURL = new URL($url, fixBaseURL($base));
        parsedURLCache.set(key, parsedURL);
        return parsedURL;
    }
    const parsedURL = new URL(fixBaseURL($url));
    parsedURLCache.set($url, parsedURL);
    return parsedURL;
}

export function getAbsoluteURL($base: string, $relative: string) {
    if ($relative.match(/^data\:/)) {
        return $relative;
    }

    const b = parseURL($base);
    const a = parseURL($relative, b.href);
    return a.href;
}
