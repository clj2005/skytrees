var rootDocment = 'https://www.chengzhangshu9.cn/';//你的域名  

function req(url,data,cb){  
    wx.request({  
      url: rootDocment + url,  
      data: data,  
      method: 'get',  
      header: {'Content-Type': 'application/json'},  
      success: function(res){  
        return typeof cb == "function" && cb(res.data)  
      },  
      fail: function(){  
        return typeof cb == "function" && cb(false)  
      }  
    })  
}  


module.exports = {  
  req: req,
  rootDocment: rootDocment
}  