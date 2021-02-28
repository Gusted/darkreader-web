const http = require('http');
const httpProxy = require('http-proxy');
const corsAnywhereIframe = require('cors-anywhere-iframe');
const serveHandler = require('serve-handler');

const proxyServer = httpProxy.createServer();
proxyServer.on('error', (err, _, res) => {
    if (res.headersSent) {
        if (!res.writableEnded) {
            res.end();
        }
        return;
    }
    const headerNames = res.getHeaderNames ? res.getHeaderNames() : Object.keys(res.getHeaders() || {});
    headerNames.forEach((name) => res.removeHeader(name));
    res.writeHead(404, {'Access-Control-Allow-Origin': '*'});
    res.end('Not found because of proxy error: ' + err);
});

const onReceiveResponseBody = (body, origin) => body.replace(/<head([^>]*)>/i, `<head$1><base href="${origin}">`);

const proxyHandler = corsAnywhereIframe.getHandler({
    onReceiveResponseBody
}, proxyServer);

// TO-DO Customize ports/hostname.
http.createServer((req, res) => {
    if (req.url.startsWith('/api/proxy')) {
        req.url = req.url.slice(11);
        proxyHandler(req, res);
    } else {
        serveHandler(req, res, {public: 'public'});
    }
}).listen(5000, '0.0.0.0', () => {
    console.log(`Dark Reader's web app & Proxy is live at http://0.0.0.0:5000/`);
});
