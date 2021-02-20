import {addDOMReadyListener, isDOMReady} from './dom';

async function setup() {
    const parsedURL = new URL(window.location.href);
    if (!parsedURL.searchParams.get('url')) {
        throw new Error('URL not found');
    }
    const IFrameSiteWrapper = document.querySelector('.site-wrapper') as HTMLIFrameElement;
    IFrameSiteWrapper.addEventListener('load', () => {
        console.log('aaaa');
    });
    IFrameSiteWrapper.src = `${window.location.origin}/proxy/${parsedURL.searchParams.get('url')}`;
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
    addDOMReadyListener(async () => setup());
}
