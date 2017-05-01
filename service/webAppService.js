/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/3/11.
 */

const fs = require('fs');
const queryString = require('querystring');

exports.getChapterData = function () {
    return fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
};

exports.getChapterContentData = function(id) {
    if (!id) {
        id = "1";
    }
    return fs.readFileSync('./mock/reader/data/data' + id + '.json', 'utf-8');
};

exports.getIndexData = function() {
    return fs.readFileSync('./mock/home.json', 'utf-8');

};

exports.getBookData = function(id) {
    if (!id) {
        id = "18218";
    }
    if(fs.existsSync('./mock/book/' + id + '.json')){
        return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    }else{
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
};

exports.getRankData = function(channelId) {
    return fs.readFileSync('./mock/rank.json', 'utf-8');

};

exports.getCategoryData = function(channelId) {
    return fs.readFileSync('./mock/category.json', 'utf-8');

};

exports.getMaleData = function(channelId) {
    return fs.readFileSync('./mock/channel/male.json', 'utf-8');

};

exports.getFemaleData = function(channelId) {
    return fs.readFileSync('./mock/channel/male.json', 'utf-8');

};

exports.getSearchData = function(start, end, keywords, cb) {
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
                cb(content);
            });
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        req.end();
};
