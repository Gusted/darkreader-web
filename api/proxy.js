const corsAnywhereIframe = require('cors-anywhere-iframe');
const {proxyServer, corsAnywhereIframeOptions} = require('../shared/shared-code');

const proxyHandler = corsAnywhereIframe.getHandler({...corsAnywhereIframeOptions, ...{
    // 20 Request every minute.
    checkRateLimit: corsAnywhereIframe.createRateLimitChecker({
        maxRequestsPerPeriod: 20,
        periodInMinutes: 1
    }),
}}, proxyServer);

module.exports = (req, res) => {
    req.url = req.url.substring(11);
    console.log(req.url);
    proxyHandler(req, res);
};
