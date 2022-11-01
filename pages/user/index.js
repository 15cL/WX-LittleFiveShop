
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    hasUserInfo: true,
    userId: '',
    sectionList: [
      { title: '我的收藏', id: '0' },
      { title: '我的订单', id: '1' },
      { title: '账号管理', id: '2' },
      { title: '地址管理', id: '3' },
      { title: '关于我们', id: '4' },
    ],
    orderingList: [
      { icon: 'icon-daifukuan', title: '待付款', id: '0' },
      { icon: 'icon-daifahuo', title: '待发货', id: '1' },
      { icon: 'icon-daishouhuo', title: '待收货', id: '2' },
      { icon: 'icon-daipingjia', title: '待评价', id: '3' },
      { icon: 'icon-tuikuanshouhou', title: '售后', id: '4' },
    ],
    urlloc: '',
    userInfo: {}
  },
  url: [
    '/pages/collect/index',
    '/pages/order/index',
    '/pages/admin/index',
    '/pages/auth/index'
  ],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow() {
    let token = getApp().globalData.token
    console.log("hhh", token);
    if (token) {
      this.setData(
        {
          userInfo: getApp().globalData.userInfo
        }
      )
    }
    this.setData({
      token
    })
  },
  denglu() {
    wx.navigateTo({
      url: '/pages/login/index',
    });
  },
  switchNav(e) {
    let index = e.currentTarget.dataset.index
    if (this.data.token) {
      wx.navigateTo({
        url: this.url[index],
      });

    } else {
      wx.showToast({
        title: '用户未登录',
        icon: 'none',
        duration: 1500,
        mask: false,
      })
    }
  }
})
