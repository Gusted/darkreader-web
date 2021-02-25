import {addDOMReadyListener, isDOMReady} from './dom';

const setup = () => {
    const origin = window.location.origin;
    (window as any).DarkReader.setFetchMethod(async (url: string) => await window.fetch(`${origin}/api/proxy?${url}`));
    (window as any).DarkReader.enable();
    (window as any).DarkReader.setupIFrameListener((IFrameDocument: Document) => {
        [...IFrameDocument.getElementsByTagName('iframe')].forEach((IFrame) => {
            if (!IFrame.src.startsWith(origin)) {
                const newIframe = IFrameDocument.createElement('iframe');
                newIframe.src = `${origin}/api/proxy?${encodeURIComponent(IFrame.src)}`;
                // Hard reload an IFrame to refresh. Firefox seems to occur certain problems when just changing `src`.
                IFrame.parentNode.replaceChild(newIframe, IFrame);
            }
        });
        const newScript = IFrameDocument.createElement('script');
        newScript.src = `${origin}/darkreader.js`;
        newScript.textContent = '';
        IFrameDocument.head.append(newScript);

        // TO-DO add this into cors-anywhere-iframe
        const proxyScript = IFrameDocument.createElement('script');
        proxyScript.src = `${origin}/proxy.js`;
        proxyScript.textContent = '';
        IFrameDocument.head.append(proxyScript);
    });
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

if (isDOMReady()) {
    setup();
} else {
    addDOMReadyListener(setup);
}
