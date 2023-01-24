import {createProxyMiddleware} from 'http-proxy-middleware';

const proxyUrl = process.env.REACT_APP_PROXY_URL;

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
    })
  );
};