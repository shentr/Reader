/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/3/11.
 */

const queryString = require('querystring');

let getSearchData = function(start, end, keywords, cb) {
        const http = require('http');
        let data = {
            s: keywords,
            start: start,
            end:end
        };
        let qs = queryString.encode(data);
        let options ={
            hostname: 'dushu.xiaomi.com',
            port:80,
            path:'/store/v0/lib/query/onebox?' + qs,
            method:'GET'
        };
        let req = http.request(options, (res) => {
            let content='';
            res.setEncoding('utf8');
            res.on('data',(chunk) => {
                content += chunk;
            });
            res.on('end', () => {
                cb(null, content);
            });
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        req.end();
};

exports.getSearchData = getSearchData;