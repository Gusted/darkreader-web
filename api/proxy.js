const httpProxy = require('http-proxy');
const corsAnywhereIframe = require('cors-anywhere-iframe');

const proxyHandler = corsAnywhereIframe.getHandler({}, httpProxy.createServer());

module.exports = (req, res) => {
    req.url = decodeURIComponent(req.url).substring(11);
    console.log(req.url);
    proxyHandler(req, res);
}
