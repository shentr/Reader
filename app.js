/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/3/10.
 */

const Koa = require('koa');
const Router  = require('koa-router');
const ejs = require('ejs');
const koaStatic = require('koa-static-server');
const queryString = require('querystring');
const service = require('./service/webAppService');

const app =new Koa();                                                            ///开启koa服务
const port = 3000;
const router = new Router();

let staticMaxAge = 0;
/*app.use(koaStatic({                                                             ///加载静态资源
    rootDir: './static/script',                                                         ///工程目录
    rootPath: '/test',                                                                  ///站点目录
    maxage: staticMaxAge
}));*/
app.use(koaStatic({
    rootDir:'./mock/',
    rootPath: '/mock/',
    maxage: staticMaxAge
}));
app.use(koaStatic({
    rootDir:'./static/',
    rootPath: '/static/',
    maxage: staticMaxAge
}));


router                                                          ///路由设置
    .get(/^\/?(index(.html)?)?$/, (ctx, next) => {
        ejs.renderFile('./view/index.html',{}, (err, str) => {
            if(err)
                console.log(err);
            else
                ctx.body = str;
        });
    })
    .get(/^\/reader(.html)?$/, (ctx, next) => {
        ejs.renderFile('./view/reader.html', (err, str) => {
            if(err)
                console.log(err);
            else
                ctx.body = str;
        })
    })
    .get(/^\/book(.html)?$/, (ctx, next) => {
        let params = queryString.parse(ctx.req._parsedUrl.query);
        let bookId = params.id;
        ejs.renderFile('./view/book.html',{nav:'书籍详情',bookId:bookId},(err, str) => {
            if(err) { console.log(err); }
            else {
                ctx.body = str;
            }
        });
    })
    .get('/ajax/index', (ctx, next)=>{
        ctx.body = service.getIndexData();
    })
    .get('/ajax/rank', (ctx, next)=>{
        ctx.body = service.getRankData();
    })
    .get('/ajax/male', (ctx, next)=>{
        ctx.body = service.getMaleData();
    })
    .get('/ajax/female', (ctx, next)=>{
        ctx.body = service.getFemaleData();
    })
    .get('/ajax/category', (ctx, next)=>{
        ctx.body = service.getCategoryData();
    })
    .get('/ajax/book', (ctx, next)=>{
        let params = queryString.parse(ctx.req._parsedUrl.query);
        let id = params.id;
        if(!id){
            id = "";
        }
        ctx.body = service.getBookData(id);
    })
    .get('/ajax/chapter', (ctx, next)=>{
        ctx.body = service.getChapterData();
    })
    .get('/ajax/chapterData', (ctx, next)=>{
        let params = queryString.parse(this.req._parsedUrl.query);
        let id = params.id;
        if(!id){
            id = "";
        }
        ctx.body = service.getChapterContentData(id);
    })
    .get('/ajax/index', (ctx, next)=>{
        ctx.body = service.getIndexData();
    })
    .get('/ajax/index', (ctx, next)=>{
        ctx.body = service.getIndexData();
    })
    .get('/ajax/search', (ctx, next) => {
    return new Promise((resolve, reject) =>{
        let params = queryString.decode(ctx.req._parsedUrl.query),
            start = params.start,
            end = params.end,
            keywords = params.keywords;

        service.getSearchData(start, end, keywords ,(content) => {
            ctx.body = content;
            resolve(next());
        });
    });
});

app
    .use(router.routes());                                      ///加载路由中间件
app.listen(port);

console.log('listening on port ' + port);


