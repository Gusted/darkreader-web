function hijackClick() {
    // X-Frame-Bypass navigation event handlers
    document.addEventListener('click', (e) => {
        if (frameElement && (e.currentTarget as any).href) {
            e.preventDefault();
            frameElement.dispatchEvent(new CustomEvent('__darkreader_web__loadUrl', {detail: {url: (e.currentTarget as any).href}}));
        }
    });
    document.addEventListener('submit', (e) => {
        if (frameElement && (e.currentTarget as any).form && (e.currentTarget as any).form.action) {
            e.preventDefault();
            if ((e.currentTarget as any).method === 'post') {
                frameElement.dispatchEvent(new CustomEvent('__darkreader_web__loadUrl', {detail: {url: (e.currentTarget as any).form.action, options: {method: 'post', body: new FormData((e.currentTarget as any).form)}}}));
            } else {
                frameElement.dispatchEvent(new CustomEvent('__darkreader_web__loadUrl', {detail: {url: (e.currentTarget as any).form.action + '?' + new URLSearchParams(new FormData((e.currentTarget as any).form) as any)}}));
            }
        }
    });
}

export function defineIFrame() {
    customElements.define('x-frame-bypass', class extends HTMLIFrameElement {
        constructor() {
            super();
            function handleLoadURL(e: CustomEvent<{url: string}>) {
                this.load(e.detail.url);
            }
            this.addEventListener('__darkreader_web__loadUrl', handleLoadURL);

        }
        connectedCallback() {
            this.load(this.getAttribute('src'));
            this.src = '';
            this.setAttribute('sandbox', '' + this.sandbox.remove('allow-top-navigation') || 'allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation'); // all except allow-top-navigation
        }
        load(url: string, options?: any) {
            if (!url || !url.startsWith('http')) {
                throw new Error(`${url} does not start with http(s)://`);
            }
            this.srcdoc = `<html>
    <head>
        <style>
        .loader {
            position: absolute;
            top: calc(50% - 25px);
            left: calc(50% - 25px);
            width: 50px;
            height: 50px;
            background-color: #333;
            border-radius: 50%;  
            animation: loader 1s infinite ease-in-out;
        }
        @keyframes loader {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }
        </style>
    </head>
    <body>
        <div class="loader"></div>
    </body>
    </html>`;
            this.fetchProxy(url, options).then(async (res) => res.text()).then((data) => {
                if (data) {
                    this.srcdoc = data.replace(/<head([^>]*)>/i, `<head$1>
                    <base href="${url}">
                    <script>(${hijackClick})()</script>`);
                }
            }).catch((e) => console.error('Cannot load X-Frame-Bypass:', e));
        }
        async fetchProxy(url: string, options?: any) {
            return fetch(`http://127.0.0.1:8080/${url}`, options).then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status} ${res.statusText}`);
                }
                return res;
            }).catch((error) => {
                throw new Error(error);
            });
        }
    }, {extends: 'iframe'});
}
