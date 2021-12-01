import { config } from 'dotenv';
config();

import { createProxyMiddleware } from 'http-proxy-middleware';

const { PORT = 3001 } = process.env;

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${PORT}`,
      changeOrigin: true,
    })
  );
}
