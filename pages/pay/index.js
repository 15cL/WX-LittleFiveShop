import { request } from "../../request/index.js";
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: [],
    total_price: 0,
    checked: true,
    address: {},
    addressFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.allchecked()
    this.getAddress()
  },

  // 计算数量和总价
  allchecked() {
    let www = []
    let abc = wx.getStorageSync("cart") || [];
    // 所有商品选中 全选
    // let allchecked = www.length ? www.every(v => v.checked == true) : false
    abc.map((v, i) => {
      if (v.checked == true) {
        www.push(abc[i])
      }
    })
    // 计算价格
    let allchecked = true
    let total_price = 0

    www.map(v => {
      if (v.checked) {
        total_price += v.basicInfo.basicInfo.minPrice * v.num
      } else {
        allchecked = false
      }
    })

    allchecked = www.length != 0 ? allchecked : false

    this.setData({
      userinfo: www,
      total_price,
    })
    console.log("www", www)
  },
  handleSelect(e) {
    console.log(e.detail.value);
    let checked = e.detail.value == 1 ? true : false
    this.setData({
      checked
    })
  },
  handleToAdress() {
    wx.navigateTo({
      url: '../auth/index',
    });

  },
  getAddress() {
    let address = wx.getStorageSync('address');
    if (address) {
      this.setData({
        address,
        addressFlag: true
      })
    }

    console.log("address", address);
    console.log(this.data.addressFlag);
  },
  formateTime(v) {
    return v < 10 ? `0${v}` : v
  },
  handleTotal() {
    let _this = this
    wx.showToast({
      title: '此功能尚未开发,订单无法支付',
      icon: 'none',
      duration: 1500,
      mask: true,
      success: (result) => {
        let list = []
        // 删除订单
        this.data.userinfo.map(v => {
          let id = v.good_id
          let cart = wx.getStorageSync('cart')
          let index = cart.findIndex(v => v.good_id == id)

          list.push(...cart.splice(index, 1))
          wx.setStorageSync('cart', cart);
        })

        //订单时间设置
        var year = new Date().getFullYear()
        var month = _this.formateTime(new Date().getMonth())
        var day = _this.formateTime(new Date().getDate())
        var hour = _this.formateTime(new Date().getHours())
        var minute = _this.formateTime(new Date().getMinutes())
        var second = _this.formateTime(new Date().getSeconds())
        let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
        console.log("时间", time);

        //总价
        let total_price = this.data.total_price

        // 加入待付列表
        let daifuList = wx.getStorageSync('daifu') || [];

        daifuList.push({ list, daifuNum: parseInt(Math.random() * 1000000000000000), time, total_price })

        // 本地存储待付订单
        wx.setStorageSync('daifu', daifuList);
        setTimeout(() => {
          wx.switchTab({
            url: '../cart/index',
          })
        }, 1000);
      },
    });


    // wx.requestPayment({ //调起支付
    //   'timeStamp': "",
    //   'nonceStr': "",
    //   'package': "",
    //   'signType': "",
    //   'paySign': "true",
    //   'success': function (res) { // 接口调用成功的回调函数
    //     console.log(res);
    //     //TODO  跳转订单
    //     wx.navigateTo({
    //       url: '/pages/myOrder/myOrder?type=1&list=2',
    //     })
    //   },
    //   'fail': function (res) { // 接口调用失败的回调函数
    //     console.log('fail:' + JSON.stringify(res));
    //   }
    // })

  }
})
