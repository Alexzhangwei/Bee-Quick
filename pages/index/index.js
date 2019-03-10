//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    //海报图片  路径必须加/，不然报404
    imgUrls: [
      '/images/haibao/haibao-1.jpg',
      '/images/haibao/haibao-2.jpg'
    ],
    //定义变量
    goods: []

  },
  //初始化时，调用函数
  onLoad: function () {
    this.localGoods();
  },
  // 加载商品的方法
  localGoods: function () {
    // 本地缓存中指定的 key
    //用获取本地缓存数据的接口，同步方式getStorageSync("goods"),拿到商品信息
    var goods = wx.getStorageSync("goods");
    //如果筛选出milk下面的一些商品，就存放在result数组中
    var result = [];
    //筛选milk的过程
    for (var i = 0; i < goods.length; i++) {
      //拿到商品
      var good = goods[i];
      //商品的类型
      var type = good.type;
      //判断：如果类型包含milk   
      if (type.indexOf('milk') > -1) {
        // 如果 > -1，就存放在milk牛奶这个分类下
        result.push(good);
      }
    }
    this.setData({
      goods: result
    }); //在data中定义一个变量数组goods，用来被result数组赋值  
    //通过localGoods方法，就可以通过for循环，在页面动态的输出数据
  },

  //添加商品的方法
  addGoods: function (e) {
    //从本地缓存数据中拿到所有的商品
    var goods = wx.getStorageSync("goods");
    //从页面拿到id值，根据商品的id值，从所有商品里找到这个商品，把它添加到订单里，然后放在缓存里
    //id值
    var id = e.currentTarget.id;
    //找到商品  定义对象
    var good = {};
    for (var i = 0; i < goods.length; i++) {
      //拿到商品
      var oldGood = goods[i];
      //判断：如果这个商品的id==id
      if (oldGood.id == goods[i]) {
        //就把这个商品赋值给oldGood，结束循环，找到商品
        good = oldGood;
        break;
      }
    }
    //从本地缓存中拿到订单信息
    var orders = wx.getStorageSync("orders");
    var addOrders = new Array();
    var add = true;
    //判断：此时的订单里有没有我们当前的这个商品，没有就添加进去，没有就改变订单的数量
    for (var i = 0; i < orders.length; i++) {
      //每一项的订单信息
      var order = orders[i];
      //判断：如果我们这个订单的id==商品的id,说明要增加数量，要拿到我们原来订单里的数量
      if (order.id == good.id) {
        var count = order.count;
        //拿到了原来订单里的数量，然后给它加1
        order.count = count + 1;
        //最后告知它不要再添加进来了
        add = false;
      }
      //编辑后数量的订单
      addOrders[i] = order;
    }
    //拿到订单的长度
    var len = orders.length;
    //如果它还是为true,没有改变数量，就要把它添加进去
    if (add) {
      //一起不存在，现在要把它添加进去+1
      good.count = 1;
      //把它添加到商品订单里
      addOrders[len] = good;
    }
    //存放到本地缓存中
    wx.setStorageSync("orders", addOrders);
    //提示
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 1000
    });
  }

})