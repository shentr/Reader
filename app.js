/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/3/10.
 */

const Koa = require('koa');
const Router  = require('koa-router');
const ejs = require('ejs');
const koaStatic = require('koa-static-server');

const app =new Koa();                                                            ///开启koa服务
const port = 3000;
const router = new Router();

app.use(koaStatic({                                                             ///加载静态资源
    rootDir: './static/script',
    rootPath: '/test',                                                         ///路由
    maxage: 10000000000
}));
app.use(koaStatic({
    rootDir:'./data',
    rootPath: '/data',
    maxage: 10000000000
}));
app.use(koaStatic({
    rootDir:'./lib',
    rootPath: '/lib',
    maxage: 10000000000
}));
app.use(koaStatic({
    rootDir:'./js',
    rootPath: '/js',
    maxage: 10000000000
}));
app.use(koaStatic({
    rootDir:'./css',
    rootPath: '/css',
    maxage: 10000000000
}));



router.get('/route_test', function (ctx, next) {                            ///路由设置
    ctx.body = "router is ok";
});
router.get('/ejs_test', function (ctx, next) {
    ejs.renderFile('./view/index.html',{title: 'ejs is ok!'},function (err, str) {
        if(err)
            console.log(err);
        else
            ctx.body = str;
    });
});
router.get('/index.html', function (ctx, next) {
    ejs.renderFile('index.html',function (err, str) {
        if(err)
            console.log(err);
        else
            ctx.body = str;
    })
});




app
    .use(router.routes());                                      ///加载路由中间件
app.listen(port);

console.log('listening on port ' + port);


