import { request } from "../../request/index.js";
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: [],
    allchecked: false,
    total_price: 0,
    total_num: '',
    clientX: '',
    seeDel: false,
    seeDelId: "",
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.allchecked()
  },

  handleXz(e) {
    let id = e.currentTarget.dataset.id
    console.log(id);
    let { userinfo } = this.data
    let index = userinfo.findIndex(v => v.good_id == id)
    userinfo[index].checked = !userinfo[index].checked
    this.setData({
      userinfo
    })
    wx.setStorageSync('cart', userinfo);
    this.allchecked()
  },

  // 计算数量和总价
  allchecked() {
    let www = wx.getStorageSync("cart") || [];

    // 所有商品选中 全选
    // let allchecked = www.length ? www.every(v => v.checked == true) : false

    // 计算价格
    let allchecked = true
    let total_price = 0
    let total_num = 0

    www.map(v => {
      if (v.checked) {
        total_price += v.basicInfo.basicInfo.minPrice * v.num
        total_num += 1
      } else {
        allchecked = false
      }
    })

    allchecked = www.length != 0 ? allchecked : false

    this.setData({
      userinfo: www,
      allchecked,
      total_price,
      total_num
    })
    console.log(www)
  },

  // 数量编辑
  addNum(e) {
    let id = e.currentTarget.dataset.id
    console.log(id);
    let { userinfo } = this.data
    let index = userinfo.findIndex(v => v.good_id == id)
    userinfo[index].num += 1
    setTimeout(() => {
      this.setData({
        userinfo
      })
      wx.setStorageSync('cart', userinfo);
      this.allchecked()
    }, 300);
  },
  decNum(e) {
    let id = e.currentTarget.dataset.id
    console.log(id);
    let { userinfo } = this.data
    let index = userinfo.findIndex(v => v.good_id == id)
    userinfo[index].num -= 1
    if (userinfo[index].num <= 1) {
      userinfo[index].num = 1
    }
    setTimeout(() => {
      this.setData({
        userinfo
      })
      wx.setStorageSync('cart', userinfo);
      this.allchecked()
    }, 300);
  },
  editNum(e) {
    let id = e.currentTarget.dataset.id
    console.log(id);
    let { userinfo } = this.data
    let index = userinfo.findIndex(v => v.good_id == id)
    let value = e.detail.value.replace(/\D/g, '')
    value = value ? value : 1
    userinfo[index].num = +value
    this.setData({
      userinfo
    })
    wx.setStorageSync('cart', userinfo);
    this.allchecked()
  },

  // 全选按钮
  handleQx() {
    let { userinfo } = this.data
    userinfo.forEach(v => {
      v.checked = !v.checked
    });
    this.setData({
      userinfo
    })
    wx.setStorageSync('cart', userinfo);
    this.allchecked()
  },

  // 滑动显示删除按钮
  touchStart(e) {
    let { clientX } = e.touches[0]
    // console.log("start", e.touches[0].clientX);
    this.setData({
      clientX
    })
  },
  touchEnd(e) {
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id
    let currentClientX = e.changedTouches[0].clientX
    // console.log("end", e.changedTouches[0].clientX);
    let leftSlide = currentClientX - this.data.clientX
    // console.log(leftSlide);
    if (leftSlide < -60) {
      this.setData({
        seeDel: true,
        seeDelId: id
      })
      console.log("向左滑动");
    } else if (leftSlide > 60) {
      this.setData({
        seeDel: false,
        seeDelId: id
      })
      console.log("向右滑动");
    }
  },

  // 删除商品
  delGood(e) {
    let id = e.currentTarget.dataset.id
    let { userinfo } = this.data
    let index = userinfo.findIndex(v => v.good_id == id)
    userinfo.splice(index, 1)
    this.setData({
      userinfo
    })
    wx.setStorageSync('cart', userinfo);
    this.allchecked()
  },

  // 结算
  handleTotal() {
    if (this.data.total_num) {
      wx.navigateTo({
        url: '../pay/index',
      });

    } else {
      wx.showToast({
        title: '请选择所需商品',
        icon: 'fail',
        duration: 1500,
        mask: true,
      });
      return
    }
  },
})