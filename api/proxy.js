const httpProxy = require('http-proxy');
const corsAnywhereIframe = require('cors-anywhere-iframe');
const proxyHandler = corsAnywhereIframe.getHandler({}, httpProxy.createServer());

module.exports = (req, res) => {
    console.log(req.url);
    req.url = req.url.slice(11);
    proxyHandler(req, res);
}