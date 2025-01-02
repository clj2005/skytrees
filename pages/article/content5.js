//logs.js
// var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    content: '正文内容'
  },
  onLoad: function (options) { // 设置title
    var app = getApp(),
      article = app.globalData.curArticle;
    wx.setNavigationBarTitle({
      title: article.title
    });
    var cid = 1;
    cid = article.id;

    var that = this;
    var article;

    app.func.req('/portal.php?mod=articlestks&json=2&id=' + cid, {}, function (res) {
      article = res.content;
      WxParse.wxParse('article', 'html', article, that, 5);
      that.setData({
        news: res,
        payimg: '../../res/img/tab/pay.png',
        stopimg: "../../res/img/tab/stop.png"
      })
    });

  },
  mynext: function (e) { // 设置title
    var app = getApp();
    var cid = 1;
    cid = e.currentTarget.dataset.testid;
    // console.log(cid+'ff');

    var that = this;
    var article;

    app.func.req('/portal.php?mod=articlestks&json=2&id=' + cid, {}, function (res) {
      article = res.content;

      WxParse.wxParse('article', 'html', article, that, 5);

      that.setData({
        news: res,
        payimg: '../../res/img/tab/pay.png',
        stopimg: "../../res/img/tab/stop.png"
      }),
        wx.setNavigationBarTitle({
          title: res.title
        });
    });

    //  WxParse.wxParse('article', 'html', article, that, 5);
  },
  onShareAppMessage: function () {
    return {
      title: '英语绘本',
      desc: '小树妈妈聊育儿!',
      path: '/pages/list/list5'
    }
  }
})
