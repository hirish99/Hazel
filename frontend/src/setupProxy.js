const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "https://hazel1-dec15cd7c072.herokuapp.com",
      changeOrigin: true,
    })
  );
};

