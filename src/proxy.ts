import {logInfo, logWarn} from 'utils/debug';
import {isFirefox} from 'utils/platform';
import {getAbsoluteURL} from 'utils/url';

document.addEventListener('click', (e) => {
    if (frameElement && document.activeElement && (document.activeElement as HTMLAnchorElement).href) {
        const formattedHref = (document.activeElement as HTMLAnchorElement).href;
        // Check if we should `proxy` the href or let the browser handle it.
        if (!formattedHref.startsWith('http://') && !formattedHref.startsWith('https://')) {
            return;
        }

        // Firefox puts an incorrect href into element.href which doesn't correspondent to the attribute href and isn't relative to main url.
        const href = document.activeElement.getAttribute('href');
        e.preventDefault();
        const topHref = window.top.location.href;
        const absoluteURL = getAbsoluteURL(topHref.substring(topHref.indexOf('url=') + 4), href);
        window.top.location.href = `${topHref.substring(0, topHref.indexOf('?') + 1)}url=${absoluteURL}`;
    }
});
document.addEventListener('submit', (e) => {
    if (frameElement && document.activeElement && (document.activeElement as HTMLInputElement).form && (document.activeElement as HTMLInputElement).form.action) {
        e.preventDefault();
        if ((document.activeElement as HTMLInputElement).form.method === 'post') {
            logWarn('This site is trying to do something important! Post method form');
            // TO-DO
            // const method = {method: 'post', body: new FormData(document.activeElement.form)};
        } else {
            const topHref = window.top.location.href;
            const absoluteURL = getAbsoluteURL(topHref.substring(topHref.indexOf('url=') + 4), (document.activeElement as any).form.action);
            const SearchParams = new URLSearchParams(new FormData((document.activeElement as any).form) as any);
            window.top.location.href = `${topHref.substring(0, topHref.indexOf('?'))}?url=${encodeURIComponent(`${absoluteURL}?${SearchParams}`)}`;
        }
    }
});

// Make sure this operation is inside an block-scope syntax.
// So no external factors will mess with it.
// And defining an function then calling it is such unefficient :P. so why not an IIFE
(() => {
    // Store originial functions
    const registerProtocolHandlerDescriptor = Object.getOwnPropertyDescriptor(Navigator.prototype, 'registerProtocolHandler');
    const unregisterProtocolHandlerDescriptor = Object.getOwnPropertyDescriptor(Navigator.prototype, 'unregisterProtocolHandler');

    // Key: Protocol.
    // Value: {orignial: Orignial URL, replaced: Replaced URL} as object.
    // This is used to correctly allign with unregisterProtocolHandler.
    // We include the Originial URL to make sure, when we want to unregister.
    // The user provided the right originial URL to avoid mistakes.
    const replacedProtocalsMap: Map<string, {orignial: string; replaced: string}> = new Map();

    // Create functions that will be used as proxy.
    function proxyRegisterProtocolHandler(scheme: string, url: string, title: string): void {
        // Save originialURL for later.
        const originialURL = url;
        // Let's validate the URL.
        try {
            const validatedURL = new URL(url);

            // We reach this code? Wooowie! Means it's an absolute url.
            // We now receive the origin from the URL object, so we can hijack it.
            // And wrap it into our ?url= query.
            url.replace(validatedURL.origin, `${window.top.location.origin}?url=${validatedURL.origin}`);
        } catch (ball) {
            // Means not validated URL and highly likely an relative URL.
            const topHref = window.top.location.href;
            // We now receive the originial URL and create an absolute URL with the relative URL.
            // Something we can use to wrap into our ?url= query.
            url = `${window.top.location.origin}?url=${getAbsoluteURL(topHref.substring(topHref.indexOf('url=') + 4), url)}`;
        }
        try {
            registerProtocolHandlerDescriptor.value.call(this, scheme, url, title);
            // Woowie it didn't throw an Syntax or Security Error.
            // Now let's save the originial and replaced URL for the unregister part.
            replacedProtocalsMap.set(scheme, {orignial: originialURL, replaced: url});
        } catch (ball) {
            throw ball;
            // Catch ball, throw ball ;).
        }
    }

    function proxyUnregisterProtocolHandler(scheme: string, url: string): void {
        // Check if we have the protocol registered.
        if (replacedProtocalsMap.has(scheme)) {
            const {orignial, replaced} = replacedProtocalsMap.get(scheme);
            // Check if we the url match with the originial.
            if (orignial === url) {
                // Replace the url with the replaced value.
                // Which should correspondt with the browser's value.
                // And thus correct unregister the protocol.
                url = replaced;
            }
        }
        unregisterProtocolHandlerDescriptor.value.call(this, scheme, url);
    }

    // Define proxy functions into prototype.
    Object.defineProperty(Navigator.prototype, 'registerProtocolHandler', Object.assign({}, registerProtocolHandlerDescriptor, {value: proxyRegisterProtocolHandler}));

    // Firefox doesn't have this functionallity so let's not make one of it.
    !isFirefox && Object.defineProperty(Navigator.prototype, 'unregisterProtocolHandler', Object.assign({}, unregisterProtocolHandlerDescriptor, {value: proxyUnregisterProtocolHandler}));
})();

logInfo('Succesfully proxied!');
