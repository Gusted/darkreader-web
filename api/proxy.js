// @ts-check
const corsAnywhereIframe = require('cors-anywhere-iframe');
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
    /**
    * @param {string} body
    * @param {string} origin
    */
    onReceiveResponseBody: (body, origin) => body.replace(/<head([^>]*)>/i, `<head$1><base href="${origin}">`),
    maxRedirects: 10,
};

const proxyHandler = corsAnywhereIframe.getHandler({...corsAnywhereIframeOptions, ...{
    // 20 Request every minute.
    checkRateLimit: process.env.ENABLE_RATE_LIMITER ? corsAnywhereIframe.createRateLimitChecker({
        maxRequestsPerPeriod: 20,
        periodInMinutes: 1
    }) : null,
}}, proxyServer);

/**
 * @param {import("http").IncomingMessage} req
 * @param {import("http").ServerResponse} res
 */
module.exports = (req, res) => {
    req.url = req.url.substring(11);
    // Weird bug with vercel now.
    if (req.url.endsWith('=')) {
        req.url = req.url.slice(0, -1);
    }
    proxyHandler(req, res);
};
