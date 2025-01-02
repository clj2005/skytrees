//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    news: [],
    previewIndex: 0,
    
  },
  //事件处理函数
  bindItemTap: function(event) {
    var id = event.currentTarget.dataset.id, // 当前id
      article = null;
    // 找出当时点击的那一项的详细信息
    for(var d of this.data.news) {
      if(d.id == id) {
        article = d;
        break;
      }
    }
    console.log(article);
    if(!article) {
      console.log('系统出错');
      return;
    }
    // 设置到全局变量中去，让下个页面可以访问
    app.globalData.curArticle = article; 
    // 切换页面
    wx.navigateTo({
      url: '../package/content?'
    });
  },
  //
  clickMe: function(event) {
        var pg = event.currentTarget.dataset.testid;
       var that = this; 
    wx.request({
      url: 'https://www.chengzhangshu9.cn/portal.php?mod=morelist&json=1&page='+pg, //接口地址
      data: {
     
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
       // console.log(res.data);
          that.setData({
            news: res.data,
            page:pg,
            nextpage:Number(pg)+1,
            prepage:pg-1,
        })
      }
    })
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
    var page=1;
   // page=options.page;
    
    if(page<1)
    page=1;

    var that = this; 
    wx.request({
      url: 'https://www.chengzhangshu9.cn/portal.php?mod=morelist&json=1&page='+page, //接口地址
      data: {
     
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
          that.setData({
            news: res.data,
             page:page,
             nextpage:Number(page)+1,
             prepage:page-1,
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '唐诗解读',
      desc: '小树妈妈聊育儿!',
      path: '/pages/package/list'
    }
  }
})
