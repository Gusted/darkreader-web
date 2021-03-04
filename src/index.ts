import setupDarkReader from 'darkreader';
import {addDOMReadyListener, isDOMReady} from './dom';

const setup = () => {
    setupDarkReader();
    const submitButton = document.querySelector('.submit') as HTMLButtonElement;
    submitButton.addEventListener('click', () => {
        // TO-DO Normalize & Validate URL.
        window.location.href = `${window.location.origin}?url=${(document.querySelector('.search-bar') as HTMLInputElement).value}`;
    });
    const parsedURL = new URL(window.location.href);
    if (!parsedURL.searchParams.get('url')) {
        return;
    }
    const workingURL = parsedURL.searchParams.get('url');
    const IFrameSiteWrapper = document.querySelector('.site-wrapper') as HTMLIFrameElement;
    IFrameSiteWrapper.src = `${window.location.origin}/api/proxy?${encodeURIComponent(workingURL)}`;
    const searchBar = document.querySelector('.search-bar') as HTMLInputElement;
    searchBar.value = workingURL;
};


declare const __DEBUG__: boolean;
if (__DEBUG__) {
    // IFrames are afraid of `localhost`
    // However they are long standing friends with local IP's.
    // Just to make sure they won't be afraid.
    // We set it to `0.0.0.0`.
    if (location.hostname === 'localhost') {
        location.hostname = '0.0.0.0';
    }
}

if (isDOMReady()) {
    setup();
} else {
    addDOMReadyListener(setup);
}
