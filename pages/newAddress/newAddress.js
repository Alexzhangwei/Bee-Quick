// pages/newAddress/newAddress.js
Page({
  data: {
    //定义的城市数组
    cities: [
      '北京市',
      '上海市',
      '天津市',
      '成都市',
      '重庆市'
    ],
    //索引值 默认为01--北京市
    index: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  //绑定事件--城市选择器
  bindPickerChange: function (e) {
    //选择哪个，修改值就是被选择哪个的索引值
    this.setData({ index: e.detail.value });
  },
  //表单里的值都通过e传递过来
  formSubmit: function (e) {
    //获取地址值
    var address = e.detail.value;
    //获取地址值
    var cityNum = address.city;
    //获取地址值
    var cities = this.data.cities;
    address.city = cities[cityNum];
    //从本地缓存数据中获取地址信息
    var addresses = wx.getStorageSync('addresses');
    //如果地址不存在，就创建数组
    if (!addresses) {
      addresses = new Array();
    }
    //把新增地址值添加进数组
    addresses.push(address);
    //重新设置值
    wx.setStorageSync('addresses', addresses);
    //跳转到地址列表这一列
    wx.redirectTo({
      url: '../address/address'
    })
  }
})