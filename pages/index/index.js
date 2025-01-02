//index.js
//获取应用实例
 var app = getApp();
Page({
  data: {
    indexmenu:[],
    imgUrls: []
  },
  onLoad:function(){
    //生命周期函数--监听页面加载
    this.fetchData();
     var that = this;
     //调用应用实例的方法获取全局数据
     app.getUserInfo(function (userInfo) {
      
       var loginopid = wx.getStorageSync('opid');
       if (!loginopid)
         loginopid = app.globalData.opid;
       app.func.req('/portal.php?mod=app&c=adduser&opid=' + loginopid, userInfo,function (res) {
        // console.log(res);
       });
     }); 

    wx.request({
      url: 'https://www.chengzhangshu9.cn/portal.php?mod=articlestks&json=4&id=1', //接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
         // console.log(res.data);
          that.setData({
            imgs: res.data,
        })
      }
    });
     wx.request({
      url: 'https://www.chengzhangshu9.cn/portal.php?mod=articlestks&json=4&id=2', //接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res2) {
         
          that.setData({
            imgs2: res2.data,
        })
      }
    })
  },
  fetchData:function(){
    this.setData({
      indexmenu:[
        {
          'icon':'./../../res/img/tab/story-1.gif',
          'text':'中文绘本',
          'url':'../list/list'
        },
         {
           'icon':'./../../res/img/tab/story-2.gif',
          'text':'英文绘本',
          'url':'../list/list5'
        },
        {
          'icon':'./../../res/img/tab/story-3.gif',
          'text':'图书音频',
          'url':'../audio/list'
        },
        {
          'icon':'./../../res/img/tab/story-4.gif',
          'text':'唐诗解读',
          'url':'../package/list'
        }
      ]
    })
  },
  /*
 changeRoute:function(url){
    wx.navigateTo({
      url: `${url}`
    })
  },*/
  onReady:function(){
    //生命周期函数--监听页面初次渲染完成
    // console.log('onReady');
  },
  onShow :function(){
    //生命周期函数--监听页面显示
    // console.log('onShow');
  },
  onHide :function(){
    //生命周期函数--监听页面隐藏
    // console.log('onHide');
  },
  onUnload :function(){
    //生命周期函数--监听页面卸载
    // console.log('onUnload');
  },
  onPullDownRefresh:function(){
    //页面相关事件处理函数--监听用户下拉动作
    // console.log('onPullDownRefresh');
  },
  onReachBottom:function(){
    //页面上拉触底事件的处理函数
    // console.log('onReachBottom');
  },
  onShareAppMessage: function () {
    return {
      title: '天空树',
      desc: '小树妈妈聊育儿!',
      path: '/pages/index/index'
    }
  }
})
