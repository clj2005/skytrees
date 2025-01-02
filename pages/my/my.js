
var app = getApp()
Page({
    data: {
    },
    onLoad: function () {
        console.log('onLoad');
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
         //   console.log(userInfo);
        //更新数据
          //调用登录接口
         // wx.login({
          //  success: function (res) {
            //  console.log(res.code);
         //   } 
    //  })
        
     //  var opid = app.globalData.opid;
      //  console.log(opid);
       var loginopid = wx.getStorageSync('opid');
       if(!loginopid)
       loginopid=app.globalData.opid;
         console.log(loginopid);
        that.setData({
            userInfo:userInfo,
            opid:loginopid
        })
        });
        wx.setNavigationBarTitle({
            title:"个人中心"
        });
    },
    doLogout: function() {
        // TODO: do some logout action here
        wx.showToast({
            title: '注销成功！',
            icon: 'success',
            duration: 3000,
            success: function(res) {
                if (res.confirm === 1) {
                    console.log('用户点击了确认按钮');
                }
                else {
                    console.log('用户点击了取消按钮');
                }
            }
        });
    },
    logout: function() {
        wx.showActionSheet({
            itemList: ['确定注销'],
            success: (res)=> {
                if (!res.cancel) {
                    if (res.tapIndex == 0) { // 确定注销
                        this.doLogout();
                    }
                }
            }
        });
    },
    showfeedback: function() {
        wx.showModal({
            title: '意见反馈',
            content: '请关注成长树公众号"chengzhangshu9"，并联系客服。'
        });
    },
     showAbout: function() {
        wx.navigateTo({
          url: '../../pages/my/aboutus',
        });
    },
     showaddress: function() {
        wx.navigateTo({
          url: '../../pages/address/list/list',
        });
    }
})
