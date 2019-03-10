Page({
  data: {
    orders: [],
    selected: false,
    selectedAll: false,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载-初始化
   */
  onLoad: function () {
    //调用购物车商品的方法
    this.loadOrders();
  },
  //加载购物车商品的方法-加载购物车商品订单信息
  loadOrders: function () {
    //从本地缓存数据里取出
    var orders = wx.getStorageSync('orders');
    //把从本地缓存数据取出来的数据，给orders
    this.setData({ orders: orders });
    //定义变量
    var totalPrice = 0;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      //总价=单价*数量
      totalPrice += order.price * order.count;
    }
    this.setData({ totalPrice: totalPrice });
  },
  //触发行内复选框
  checkboxChange: function (e) {
    console.log(e);
    //获取到所有的id值，选中了哪个复选框
    var ids = e.detail.value;
    //判断：如果行内复选框一个都没有选中，id的长度就为0，给它返回一个全选selectAll:false的数据
    if (ids.length == 0) {
      this.setData({ selectedAll: false });
    } else {
      this.setData({ selectedAll: true });
    }
    //从本地缓存数据里取出
    var orders = wx.getStorageSync('orders');
    //总的金额
    var totalPrice = 0;
    //计算总的金额
    for (var i = 0; i < orders.length; i++) {
      //拿到每一个的订单信息
      var order = orders[i];
      //拿到了orders，还要判断一下有哪几个是被选中的
      for (var j = 0; j < ids.length; j++) {
        //判断：如果订单里的id==被选中的ids中商品
        if (order.id == ids[j]) {
          //累加
          totalPrice += order.price * order.count;
        }
      }

    }
    //总金额
    this.setData({ totalPrice: totalPrice });
  },
  checkAll: function (e) {//全选复选框
    //拿到被选中的
    var selected = this.data.selected;
    //判断：如果selected == true ，就为false
    var result = selected == true ? false : true;
    //要么全选要么全不选
    this.setData({ selected: result });
    //判断：如果result == false全不选
    if (result == false) {
      //则设置总价格为0
      this.setData({ totalPrice: 0 });
      //则设置全选复选框为false
      this.setData({ selectedAll: false });
    } else {
      //否则加载商品,重新计算价格
      this.loadOrders();
      //设置全选复选框为true
      this.setData({ selectedAll: true });
    }

  },
  addGoods: function (e) {//添加商品数量

    var goods = wx.getStorageSync('goods');
    //获取当前的id值
    var id = e.currentTarget.id;
    var good = {};
    for (var i = 0; i < goods.length; i++) {
      var oldGood = goods[i];
      if (id == oldGood.id) {
        good = oldGood;
        break;
      }
    }
    console.log(good);
    //拿到订单里的信息
    var orders = wx.getStorageSync('orders');
    var addOrders = new Array();
    var add = true;
    for (var i = 0; i < orders.length; i++) {
      //添加一个新的商品数量
      var order = orders[i];
      //获取到当前的id值==商品的id值
      if (order.id == good.id) {
        //就让订单里的数量+1
        var count = order.count;
        order.count = count + 1;
        //告知已经添加过了，不需要了再添加了，false
        add = false;
      }
      //渲染了数量，再添加进来
      addOrders[i] = order;
    }
    var len = orders.length;
    if (add) {
      good.count = 1;
      addOrders[len] = good;
    }
    wx.setStorageSync('orders', addOrders);
    this.loadOrders();
  },
  minusGoods: function (e) {//减少商品
    var goods = wx.getStorageSync('goods');
    var id = e.currentTarget.id;
    var good = {};
    for (var i = 0; i < goods.length; i++) {
      var oldGood = goods[i];
      if (id == oldGood.id) {
        good = oldGood;
        break;
      }
    }
    console.log(good);
    var orders = wx.getStorageSync('orders');
    var addOrders = new Array();
    var add = true;
    for (var i = 0; i < orders.length; i++) {
      var order = orders[i];
      if (order.id == good.id) {
        var count = order.count;
        if (count >= 2) {
          order.count = count - 1;
        }
      }
      addOrders[i] = order;
    }

    wx.setStorageSync('orders', addOrders);
    this.loadOrders();
  },
  selectAddress: function () {//选择收货地址
    wx.navigateTo({
      url: '../address/address'
    })
  }
})