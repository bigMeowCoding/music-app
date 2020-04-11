const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app,server) {
    console.log(server)
    app.use(createProxyMiddleware('/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
        target: 'https://c.y.qq.com',
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        }
    }));
};
