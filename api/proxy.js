const httpProxy = require('http-proxy');
const corsAnywhereIframe = require('cors-anywhere-iframe');
const proxyHandler = corsAnywhereIframe.getHandler({}, httpProxy.createServer());

module.exports = (req, res) => {
    req.url = req.url.slice(14);
    proxyHandler(req, res);
}