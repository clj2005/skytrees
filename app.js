var httpFun = require('http.js')
//app.js
App({
  onLaunch: function () {
  },
 
  getPics: function() {
      return this.globalData.picList;
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
      
    }
    //get openid
    var loginopid = wx.getStorageSync('opid');
    if (!loginopid)
      loginopid = that.globalData.opid;
    if (loginopid) {
      that.globalData.opid = loginopid;
      wx.setStorageSync('opid', loginopid);
    } else {
      wx.login({
        success: function (res1) {

          if (res1.code) {
            //发起网络请求
            wx.request({
              url: 'https://www.chengzhangshu9.cn/apppay/index.php?code=' + res1.code + '',
              data: {
                code: res1.code
              },
              success: function (response) {
                // console.log(response);
                wx.setStorageSync('opid', response.data);
                that.globalData.opid = response.data;
              }
            })
          }

        }
      })
    }
    // get openid end
  },
  func: {
    req: httpFun.req,//http 请求
  },
  globalData:{
      opid:null,
      userInfo:null,
      rootDocment: httpFun.rootDocment
  }
});