import {getAbsoluteURL} from 'utils/url';

document.addEventListener('click', (e) => {
    if (frameElement && document.activeElement && (document.activeElement as HTMLAnchorElement).href) {
        e.preventDefault();
        // Firefox puts an incorrect href into element.href which doesn't correspondent to the attribute href and isn't relative to main url.
        const absoluteURL = getAbsoluteURL(window.top.location.href.substring(window.top.location.href.indexOf('url=') + 4), document.activeElement.getAttribute('href'));
        window.top.location.href = `${window.top.location.href.substring(0, window.top.location.href.indexOf('?') + 1)}url=${absoluteURL}`;
    }
});
document.addEventListener('submit', (e) => {
    if (frameElement && document.activeElement && (document.activeElement as HTMLInputElement).form && (document.activeElement as HTMLInputElement).form.action) {
        e.preventDefault();
        if ((document.activeElement as HTMLInputElement).form.method === 'post') {
            // TO-DO
            // const method = {method: 'post', body: new FormData(document.activeElement.form)};
        } else {
            const absoluteURL = getAbsoluteURL(window.top.location.href.substring(window.top.location.href.indexOf('url=') + 4), (document.activeElement as any).form.action);
            window.top.location.href = `${window.top.location.href.substring(0, window.top.location.href.indexOf('?') + 1)}url=${absoluteURL}?${new URLSearchParams(new FormData((document.activeElement as any).form) as any)}`;
        }
    }
});
