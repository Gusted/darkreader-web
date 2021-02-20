import { NowRequest, NowResponse } from '@vercel/node'
import httpProxy from 'http-proxy';
import corsAnywhereIframe from 'cors-anywhere-iframe';

const proxyHandler = corsAnywhereIframe.getHandler({} as corsAnywhereIframe.CorsAnywhereOptions, httpProxy.createServer());

export default function (req: NowRequest, res: NowResponse) {
    req.url = decodeURIComponent(req.url).substring(11);
    console.log(req.url);
    proxyHandler(req, res);
}
