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

const proxyHandler = corsAnywhereIframe.getHandler({
    // 6 Request every minute. So every 10 seconds 1 request.
    checkRateLimit: corsAnywhereIframe.createRateLimitChecker({
        maxRequestsPerPeriod: 6,
        periodInMinutes: 1
    })
}, proxyServer);

module.exports = (req, res) => {
    req.url = decodeURIComponent(req.url).substring(11);
    console.log(req.url);
    proxyHandler(req, res);
};
