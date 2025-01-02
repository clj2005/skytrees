//index.js
//获取应用实例
// var app = getApp();
Page({
  data: {
    indexmenu:[],
    imgUrls: []
  },
  onLoad:function(){
    //生命周期函数--监听页面加载
     this.fetchData();
  },
  fetchData:function(){
    this.setData({
      indexmenu:[
        {
          'icon': './../../res/img/tab/story-1.gif',
          'text': '中文绘本',
          'url': '../list/list'
        },
        {
          'icon': './../../res/img/tab/story-2.gif',
          'text': '英文绘本',
          'url': '../list/list5'
        },
        {
          'icon': './../../res/img/tab/story-3.gif',
          'text': '图书音频',
          'url': '../audio/list'
        },
        {
          'icon': './../../res/img/tab/story-4.gif',
          'text': '唐诗解读',
          'url': '../package/list'
        }
      ]
    })
  },
  
})
