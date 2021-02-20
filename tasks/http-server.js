const http = require('http');
const httpProxy = require('http-proxy');
const corsAnywhereIframe = require('cors-anywhere-iframe');


const serveHandler = require('serve-handler');
const proxyHandler = corsAnywhereIframe.getHandler({}, httpProxy.createServer());

// TO-DO Customize ports/hostname.
http.createServer((req, res) => {
    if (req.url.startsWith('/api/proxy')) {
        req.url = req.url.slice(11);
        proxyHandler(req, res);
    } else {
        serveHandler(req, res, {public: 'public'});
    }
}).listen(5000, '0.0.0.0', () => {
    console.log(`Dark Reader's web app & Proxy is live at 0.0.0.0:5000`);
});
