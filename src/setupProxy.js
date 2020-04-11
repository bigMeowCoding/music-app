const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api/getDiscList', {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        changeOrigin: true,
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        }
    }));
};
