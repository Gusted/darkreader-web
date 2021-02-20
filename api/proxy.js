const httpProxy = require('http-proxy');
const corsAnywhereIframe = require('cors-anywhere-iframe');
const proxyHandler = corsAnywhereIframe.getHandler({}, httpProxy.createServer());

module.exports = (req, res) => {
    proxyHandler(req, res);
}