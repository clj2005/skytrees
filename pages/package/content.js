//logs.js
 var md5 = require('../../util/md5.js')
var WxParse = require('../../wxParse/wxParse.js');

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
   play:function(e){
    var that=this;
   
   var mp3url = that.data.news.thumb_media_id;
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
  Payapi:function(event){
      var loginopid = wx.getStorageSync('opid');
      var ordernum=parseInt(new Date().getTime() / 1000);
       var jiage = event.currentTarget.dataset.testid;
       var app = getApp(),
       article = app.globalData.curArticle;
       //调用应用实例的方法获取全局数据
      var nickname;
       app.getUserInfo(function(userInfo){
      nickname=userInfo.nickname;
       });

    wx.request({
        url: 'https://www.chengzhangshu9.cn/apppay/example/jsapi.php',
        data: {
         opid:loginopid,
         pid:article.id,
         gd:article.title,
         onum:ordernum,
         pr:jiage,
         nickname:nickname,
        },
        success: function (response) {
          console.log(response);
          // 发起支付
          var appId = response.data.appid;
          var timeStamp = (Date.parse(new Date()) / 1000).toString();
          var pkg = 'prepay_id=' + response.data.prepay_id;
          var nonceStr = response.data.nonce_str;
          var paySign = md5.hex_md5('appId=' + appId + '&nonceStr=' + nonceStr + '&package=' + pkg + '&signType=MD5&timeStamp=' + timeStamp +"&key=beijingturuixunkejiyouxiangongsi").toUpperCase();
        //  console.log(paySign);
         // console.log(appId);
          wx.requestPayment({
            'timeStamp': timeStamp,
            'nonceStr': nonceStr,
            'package': pkg,
            'signType': 'MD5',
            'paySign': paySign,
            'success':function(res){
              console.log('success3');
               wx.request({
                url: 'https://www.chengzhangshu9.cn/apppay/example/jsapi.php',
                data: {
                opid:loginopid,
                onum:ordernum,
                payok:'1',
                }
               })
            },
            fail(res) { console.log(res); }
          });

        },
          header: {
          'content-type': 'application/x-www-form-urlencoded'
         },
      });
  
  },
  onLoad: function (options) { // 设置title
    var app = getApp(),
      article = app.globalData.curArticle;
      //获取openid
       var loginopid = wx.getStorageSync('opid');
       if(!loginopid)
       loginopid=app.globalData.opid;
       
      wx.setNavigationBarTitle({
        title: article.title
      });
     var cid=1;
      cid=article.id;
     // console.log(article);
      var that = this; 
      var article ;
      wx.request({
        url: 'https://www.chengzhangshu9.cn/portal.php?mod=morelist&json=2&pid='+cid, 
        data: {
          opid:loginopid
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
             article = res.data.content;
             WxParse.wxParse('article', 'html', article, that, 5);
           //  console.log(res.data);
             that.setData({
              news: res.data, 
              opid:loginopid,
              payimg:'../../res/img/tab/pay.png',
               stopimg:"../../res/img/tab/stop.png"
          })
        }
      });
       
        
      
    //  WxParse.wxParse('article', 'html', article, that, 5);
  },
  onShareAppMessage: function () {
    return {
      title: '唐诗解读',
      desc: '小树妈妈聊育儿!',
      path: '/pages/package/list'
    }
  }
})
