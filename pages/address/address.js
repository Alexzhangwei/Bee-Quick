// pages/address/address.js
Page({
  data:{
    flag:0,
    addresses:[]
  },
  onLoad:function(options){
    var addresses = wx.getStorageSync('addresses');
    this.setData({addresses:addresses});
  },
  switchNav:function(e){
     var id = e.currentTarget.id;
     this.setData({flag:id});
  },
  newAddress:function(){
    wx.navigateTo({
      url: '../newAddress/newAddress'
    })
  }
})