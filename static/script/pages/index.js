/**
 * Created by shentr<https://github.com/shentr/crawler.git> on 2017/4/28.
 */

$.get('/ajax/index', (d) => {
    let screenWidth = $(window).width(),
        doubleScreenWidth,
        indexHeaderTabWidth
    ;
    screenWidth = (screenWidth < 320 ? 320 : screenWidth);
    doubleScreenWidth = screenWidth *2 + 'px';
    screenWidth = screenWidth + 'px';
    indexHeaderTabWidth = $($('.swipe-tab').find('a')[0]).offset().width + 'px';
    let app = new Vue({
        el: '#app',
        data: {
            top: d.items[0].data.data,
            hot: d.items[1].data.data,
            recommend: d.items[2].data.data,
            female: d.items[3].data.data,
            male: d.items[4].data.data,
            free: d.items[5].data.data,
            topic: d.items[6].data.data,
            screenWidth: {
                width: screenWidth
            },
            doubleScreenWidth:{
                width: doubleScreenWidth
            },
            tabStyle: {
                transform: 'translate3d(0,0,0)',
                transition: 'transform 0.5s ease'
            },
            containerTranslateStyle: {
                width: doubleScreenWidth,
                transform: 'translate3d(0,0,0)',
                transition: 'transform 0.5s ease'
            },
            isTab1: true,
            isTab2: false
        },
        methods: {
            tabSwitch: function (tabId) {
                if(tabId === 0){
                    this.tabStyle.transform = 'translate3d(0,0,0)';
                    this.containerTranslateStyle.transform = 'translate3d(0,0,0)';
                    this.isTab1 = true;
                    this.isTab2 = false;
                }else if(tabId === 1){
                    this.tabStyle.transform = 'translate3d('+ indexHeaderTabWidth +',0,0)';
                    this.containerTranslateStyle.transform = 'translate3d(-'+ screenWidth +',0,0)';
                    this.isTab1 = false;
                    this.isTab2 = true;
                }
            }
        }
    })
}, 'json');