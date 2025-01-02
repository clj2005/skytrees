//logs.js
 var md5 = require('../../util/md5.js')


Page({
  data: {
    content: '正文内容',
    percent:0
  },
  onReady:function(){
    //this.percentAdd();
  },
  percentAdd:function(e){
    var that=this;
    setInterval(function(){
      var cur=that.data.percent;
    //  var cur;
      var total;
      wx.getBackgroundAudioPlayerState({
      success: function(res){
        // success
        //duration	选定音频的长度（单位：s），只有在当前有音乐播放时返回
        total=res.duration;
       // console.log('duration:' + total)
        cur= res.currentPosition;
      //  console.log('currentPosition:' + cur)
        cur=100*cur/total;
        //status	播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
        console.log('status:' + res.status)  
       // console.log('downloadPercent:' + res.downloadPercent) 
        //dataUrl	歌曲数据链接，只有在当前有音乐播放时返回 
        //console.log('dataUrl:' + res.dataUrl)
        if(cur>=total){
        cur=total;
        }
        var pimg="../../res/img/tab/pay.png";
        if(res.status==1)
        pimg="../../res/img/tab/stop.png";
        
        var position=res.currentPosition;
        if (!position)
          position = 0;
        that.setData({
          percent:cur,
          position:position,
          payimg:pimg
        });
      },
    
      });    
    },1000);    
  },
  pause:function(e){
    var that=this;
    
    var pimg= that.data.payimg;
    if(pimg=="../../res/img/tab/stop.png"){
    wx.pauseBackgroundAudio({
      //暂停
    });
    }else{
     wx.playBackgroundAudio({
      
    });
    }
  },
   play:function(e){
    var that=this;
     var mp3url= e.currentTarget.dataset.testid;
  // var mp3url = that.data.news.thumb_media_id;
    var pimg= that.data.payimg;
    if(pimg=="../../res/img/tab/stop.png"&&1==2){
    
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
  

  //
  clickMe: function(event) {
      var app = getApp(),
      article = app.globalData.curArticle;
      
     var cid=1;
      cid=article.id;
        var pg = event.currentTarget.dataset.testid;
       var that = this; 
    
    app.func.req('/portal.php?mod=bookaudio&json=1&pid=' + cid + '&page=' + pg, {}, function (res) {
     
      that.setData({
        news: res,
        page: pg,
        nextpage: Number(pg) + 1,
        prepage: pg - 1,
        payimg: '../../res/img/tab/pay.png',
        stopimg: "../../res/img/tab/stop.png"
      })
    });
    },
  clickchildrens: function (event) {
    var app = getApp(),
      article = app.globalData.curArticle;

    var cid = 1;
    cid = event.currentTarget.dataset.testid;
    var pg = 1;
    var that = this;
    console.log(cid);
    app.func.req('/portal.php?mod=bookaudio&json=1&pid=' + cid + '&page=' + pg, {}, function (res) {
      console.log(res);
      that.setData({
        news: res,
        page: pg,
        nextpage: Number(pg) + 1,
        prepage: pg - 1,
        payimg: '../../res/img/tab/pay.png',
        stopimg: "../../res/img/tab/stop.png"
      })
    });
  },
  onLoad: function (options) {
    // var that = this;
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   });
    // })
    var app = getApp(),
      article = app.globalData.curArticle;
      
     var cid=1;
      cid=article.id;
  
   // page=options.page;
    var page=1;
    if(page<1)
    page=1;

    var that = this; 
   
    app.func.req('/portal.php?mod=bookaudio&json=1&pid=' + cid + '&page=' + page, {}, function (res) {
     // console.log('/portal.php?mod=bookaudio&json=1&pid=' + cid + '&page=' + page);
    //  res.gzurl = encodeURI(res.gzurl);
  
      that.setData({
        news: res,
        page: page,
        nextpage: Number(page) + 1,
        prepage: page - 1,
        payimg: '../../res/img/tab/pay.png',
        stopimg: "../../res/img/tab/stop.png"
      })
    });
  },
  onShareAppMessage: function () {
    return {
      title: '图书音频',
      desc: '小树妈妈聊育儿!',
      path: '/pages/audio/list'
    }
  }
})
