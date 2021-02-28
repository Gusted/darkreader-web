const httpProxy = require('http-proxy');
const corsAnywhereIframe = require('cors-anywhere-iframe');

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

// TO-DO Inline proxy scripts.
const onReceiveResponseBody = (body, origin) => body.replace(/<head([^>]*)>/i, `<head$1><base href="${origin}">`);

const proxyHandler = corsAnywhereIframe.getHandler({
    // 20 Request every minute.
    checkRateLimit: corsAnywhereIframe.createRateLimitChecker({
        maxRequestsPerPeriod: 20,
        periodInMinutes: 1
    }),
    onReceiveResponseBody,
}, proxyServer);

module.exports = (req, res) => {
    req.url = req.url.substring(11);
    console.log(req.url);
    proxyHandler(req, res);
};
