const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app,server) {
    app.use(createProxyMiddleware('/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
        target: 'https://c.y.qq.com',
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        }
    }));
    app.use(createProxyMiddleware('/cgi-bin/musicu.fcg', {
        target: 'https://u.y.qq.com',
        headers: {
            referer: 'https://y.qq.com', // 请求源自的网站
            origin: 'https://y.qq.com',
            host:'u.y.qq.com', // 要有这个不然会报错 对应要访问网站的域名
            'Content-type': 'application/x-www-form-urlencoded'
        }
    }));
    app.use(createProxyMiddleware('/lyric/fcgi-bin/fcg_query_lyric_new.fcg', {
        target: 'https://c.y.qq.com',
        headers: {
            referer: 'https://c.y.qq.com/', // 请求源自的网站
            host:'c.y.qq.com'
        }
    }));
    app.use(createProxyMiddleware('/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', {
        target: 'https://c.y.qq.com',
        headers: {
            referer: 'https://c.y.qq.com/', // 请求源自的网站
            host:'c.y.qq.com'
        }
    }));
};
