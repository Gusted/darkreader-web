import {getAbsoluteURL} from 'utils/url';

document.addEventListener('click', (e) => {
    if (frameElement && document.activeElement && (document.activeElement as HTMLAnchorElement).href) {
        e.preventDefault();
        // Firefox puts an incorrect href into element.href which doesn't correspondent to the attribute href and isn't relative to main url.
        const topHref = window.top.location.href;
        const absoluteURL = getAbsoluteURL(topHref.substring(topHref.indexOf('url=') + 4), document.activeElement.getAttribute('href'));
        window.top.location.href = `${topHref.substring(0, topHref.indexOf('?') + 1)}url=${absoluteURL}`;
    }
});
document.addEventListener('submit', (e) => {
    if (frameElement && document.activeElement && (document.activeElement as HTMLInputElement).form && (document.activeElement as HTMLInputElement).form.action) {
        e.preventDefault();
        if ((document.activeElement as HTMLInputElement).form.method === 'post') {
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
