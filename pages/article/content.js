//logs.js
// var util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    content: '正文内容'
  },
  percentAdd:function(e){
    var that=this;
    setInterval(function(){
      var cur=that.data.percent;
    //  var cur;
      var total;
      wx.getBackgroundAudioPlayerState({
      success: function(res){
        
        total=res.duration;
   
        cur= res.currentPosition;
     
        cur=100*cur/total;
       
        if(cur>=total){
        cur=total;
        }
        var pimg="../../res/img/tab/pay.png";
        if(res.status==1)
        pimg="../../res/img/tab/stop.png";
        
        var position=res.currentPosition;
        if(!position)
          position=0;
        that.setData({
          percent:cur,
          position:position,
          payimg:pimg
        });
      },
    
      });    
    },1000);    
  },
   play:function(e){
    var that=this;
   
   var mp3url = that.data.news.ext1;
    var pimg= that.data.payimg;
    if(pimg=="../../res/img/tab/stop.png"){
    wx.pauseBackgroundAudio({
      //暂停
    });
    }else{
    var position=that.data.position;
    if(!position)
     position=0;
    
     //播放时先获取之前位置
    wx.playBackgroundAudio({
      dataUrl: mp3url,
      title:that.data.news.title,
      
    })
    wx.seekBackgroundAudio({
      position: position
    })
    };
    this.percentAdd();  
  },
 progressplay:function(e){
  var that=this;
  var mode = e.currentTarget.dataset.testid;
  var position=that.data.position+5;
  if(mode==1)
     position=position-15;
  if(mode==2)
     position=position+15;
  if(!position)
     position=0;
  wx.seekBackgroundAudio({
      position: position
    })
 },
  onLoad: function (options) { // 设置title
    var app = getApp(),
      article = app.globalData.curArticle;
    wx.setNavigationBarTitle({
      title: article.title
    });
     var cid=1;
      cid=article.id;
    
      var that = this; 
      var article ;
     
      app.func.req('/portal.php?mod=articlestks&json=2&id=' + cid,{},function(res)
      {
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
     var cid=1;
      cid= e.currentTarget.dataset.testid;
     // console.log(cid+'ff');
      
      var that = this; 
      var article ;
      
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
      title: '绘本故事',
      desc: '小树妈妈聊育儿!',
      path: '/pages/list/list'
    }
  }
})
