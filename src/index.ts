import {addDOMReadyListener, isDOMReady} from './dom';

const setup = () => {
    const parsedURL = new URL(window.location.href);
    if (!parsedURL.searchParams.get('url')) {
        return;
    }
    const IFrameSiteWrapper = document.querySelector('.site-wrapper') as HTMLIFrameElement;
    IFrameSiteWrapper.src = `${window.location.origin}/api/proxy?${parsedURL.searchParams.get('url')}`;
    (window as any).DarkReader.enable();
    (window as any).DarkReader.setupIFrameListener((IFrameDocument: Document) => {
        const newScript = IFrameDocument.createElement('script');
        newScript.src = `${window.location.origin}/darkreader.js`;
        newScript.textContent = '';
        IFrameDocument.head.append(newScript);
    });
}

if (isDOMReady()) {
    setup();
} else {
    addDOMReadyListener(setup);
}
