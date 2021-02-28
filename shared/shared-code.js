const {createServer} = require('http-proxy');

const proxyServer = createServer();
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

const corsAnywhereIframeOptions = {
    onReceiveResponseBody: (body, origin) => body.replace(/<head([^>]*)>/i, `<head$1><base href="${origin}">`),
    maxRedirects: 10,
};

module.exports = {
    proxyServer,
    corsAnywhereIframeOptions
};
