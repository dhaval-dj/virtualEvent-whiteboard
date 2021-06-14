const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://twilioserver-dot-virtualeventdemo.el.r.appspot.com',
            changeOrigin: true,
        })
    );

    app.use(
        '/chat',
        createProxyMiddleware({
            target: 'https://twilio-chat-api-dot-virtualeventdemo.el.r.appspot.com',
            changeOrigin: true,
        })
    );
};
