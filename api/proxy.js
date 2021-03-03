const corsAnywhereIframe = require('cors-anywhere-iframe');
const {proxyServer, corsAnywhereIframeOptions} = require('../shared/shared-code');

const proxyHandler = corsAnywhereIframe.getHandler({...corsAnywhereIframeOptions, ...{
    // 20 Request every minute.
    checkRateLimit: process.env.ENABLE_RATE_LIMITER ? corsAnywhereIframe.createRateLimitChecker({
        maxRequestsPerPeriod: 20,
        periodInMinutes: 1
    }) : null,
}}, proxyServer);

module.exports = (req, res) => {
    req.url = req.url.substring(11);
    // Weird bug with vercel now.
    if (req.url.endsWith('=')) {
        req.url = req.url.slice(0, -1);
    }
    proxyHandler(req, res);
};
