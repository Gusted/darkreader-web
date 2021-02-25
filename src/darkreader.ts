// TO-DO replace with darkreader in package.json
// When https://github.com/darkreader/darkreader/pull/5085 is merged.
declare global {
    interface Window {
        DarkReader: {
            setFetchMethod: (fetch: (url: string) => Promise<Response>) => void;
            enable: (...args: any) => void;
            setupIFrameListener: (listener: (IFrameDocument: Document) => void) => void;
        };
    }
}

export default function setupDarkReader() {
    const origin = window.location.origin;
    window.DarkReader.setFetchMethod(async (url: string) => window.fetch(`${origin}/api/proxy?${url}`));
    window.DarkReader.enable();
    window.DarkReader.setupIFrameListener((IFrameDocument: Document) => {
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
}
