/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/5/1.
 */
let id = location.href.split('id=').pop();
$.get('/ajax/book?id='+id, (res)=>{
    let screenWidth = $(window).width()
    ;
    screenWidth = (screenWidth < 320 ? 320 : screenWidth);
    res.screenWidth = screenWidth + 'px';
    let app = new Vue({
        el: '#app',
        data: res,
        methods:{
            readBook: function () {
                location.href = '/reader.html';
            }
        }
    });
} ,'json');