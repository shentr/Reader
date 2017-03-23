/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/3/10.
 */

const Koa = require('koa');
const Router  = require('koa-router');
const ejs = require('ejs');
const koaStatic = require('koa-static-server');
const queryString = require('querystring');

const app =new Koa();                                                            ///开启koa服务
const port = 3000;
const router = new Router();

let staticMaxAge = 2592000000;
app.use(koaStatic({                                                             ///加载静态资源
    rootDir: './static/script',                                                         ///工程目录
    rootPath: '/test',                                                                  ///站点目录
    maxage: staticMaxAge
}));
app.use(koaStatic({
    rootDir:'./mock/book',
    rootPath: '/mock/book',
    maxage: staticMaxAge
}));
app.use(koaStatic({
    rootDir:'./static/script/lib',
    rootPath: '/static/script/lib',
    maxage: staticMaxAge
}));
app.use(koaStatic({
    rootDir:'./static/img',
    rootPath: '/static/img',
    maxage: staticMaxAge
}));
app.use(koaStatic({
    rootDir:'./static/css',
    rootPath: '/static/css',
    maxage: staticMaxAge
}));


router                                                          ///路由设置
    .get('/route_test', (ctx, next) => {
        ctx.body = "router is ok";
})
    .get(/^\/?(index(.html)?)?$/, (ctx, next) => {
        ejs.renderFile('./view/index.html',{},function (err, str) {
            if(err)
                console.log(err);
            else
                ctx.body = str;
        });
    })
    .get(/^\/reader(.html)?$/, (ctx, next) => {
    ejs.renderFile('reader.html',function (err, str) {
        if(err)
            console.log(err);
        else
            ctx.body = str;
    })
})
    .get('/ajax/search', (ctx, next) => {
    return new Promise(function(resolve, reject) {
        let params = queryString.decode(ctx.req._parsedUrl.query),
            start = params.start,
            end = params.end,
            keywords = params.keywords;
        const service = require('./service/webAppService');
        service.getSearchData(start, end, keywords ,(err, content) => {
            ctx.body = content;
            resolve(next());
        });
    });
});

app
    .use(router.routes());                                      ///加载路由中间件
app.listen(port);

console.log('listening on port ' + port);


