import {createProxyMiddleware} from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://nomadic-bedrock-375716.ue.r.appspot.com",
      changeOrigin: true,
    })
  );
};
