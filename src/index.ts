import {addDOMReadyListener, isDOMReady} from './dom';

const setup = () => {
    (window as any).DarkReader.enable();
    (window as any).DarkReader.setupIFrameListener((IFrameDocument: Document) => {
        const newScript = IFrameDocument.createElement('script');
        newScript.src = `${window.location.origin}/darkreader.js`;
        newScript.textContent = '';
        IFrameDocument.head.append(newScript);
    });
    const submitButton = document.querySelector('.submit') as HTMLButtonElement;
    submitButton.addEventListener('click', () => {
        //TO-DO Normalize & Validate URL.
        window.location.href = `${window.location.origin}?url=${(document.querySelector('.search-bar') as HTMLInputElement).value}`
    });
    const parsedURL = new URL(window.location.href);
    if (!parsedURL.searchParams.get('url')) {
        return;
    }
    const workingURL = parsedURL.searchParams.get('url');
    const IFrameSiteWrapper = document.querySelector('.site-wrapper') as HTMLIFrameElement;
    IFrameSiteWrapper.src = `${window.location.origin}/api/proxy?${workingURL}`;
    const searchBar = document.querySelector('.search-bar') as HTMLInputElement;
    searchBar.value = workingURL;
};

if (isDOMReady()) {
    setup();
} else {
    addDOMReadyListener(setup);
}
