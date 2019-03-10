//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    var goods = wx.getStorageSync('goods');
    if(!goods){
       goods = this.loadGoods();
       wx.setStorageSync('goods', goods);
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  loadGoods:function(){
     var goods = new Array();
     var good = new Object();
     good.id = "0";
     good.pic = "/images/supermarket/1-cz.jpg";
     good.name="蒙牛纯甄酸牛奶原味220g";
     good.price ="5.5";
     good.type = "milk.supermarket";
     goods[0] = good;

     var good1 = new Object();
     good1.id = "1";
     good1.pic = "/images/index/4-whh.jpg";
     good1.name="娃哈哈AD钙奶220g*4";
     good1.price ="8";
     good1.type = "milk";
     goods[1] = good1;

     var good2 = new Object();
     good2.id = "2";
     good2.pic = "/images/index/4-amx.jpg";
     good2.name="伊利安慕希希腊酸奶原味205g";
     good2.price ="6";
     good2.type = "milk";
     goods[2] = good2;

     var good3 = new Object();
     good3.id = "3";
     good3.pic = "/images/supermarket/1-hj.jpg";
     good3.name="爱鲜蜂打火机1个";
     good3.price ="2";
     good3.type = "supermarket";
     goods[3] = good3;

     var good4 = new Object();
     good4.id = "4";
     good4.pic = "/images/supermarket/1-hx.jpg";
     good4.name="维多利亚青葡萄";
     good4.price ="27";
     good4.type = "supermarket";
     goods[4] = good4;

     var good5 = new Object();
     good5.id = "5";
     good5.pic = "/images/supermarket/1-qs.jpg";
     good5.name="美立方老北京橙味汽水420ml";
     good5.price ="4";
     good5.type = "supermarket";
     goods[5] = good5;
     return goods;
  },
  globalData:{
    userInfo:null
  }
})