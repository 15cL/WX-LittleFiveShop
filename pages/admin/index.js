// pages/admin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  info: {},
  pwd: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo = getApp().globalData.userInfo
    this.setData({
      userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  changePaperName(e) {
    this.info.paperName = e.detail.value
  },
  changePaper(e) {
    this.info.paper = e.detail.value
  },
  changePwd(e) {
    this.pwd = e.detail.value
  },
  keepValue(e) {
    console.log(e);
    getApp().globalData.userInfo.paperName = this.info.paperName || e.currentTarget.dataset.userinfo.paperName
    getApp().globalData.userInfo.paper = this.info.paper || e.currentTarget.dataset.userinfo.paper
    if (this.pwd) {
      let username = getApp().globalData.userInfo.username
      let list = wx.getStorageSync('user');
      let index = list.findIndex(v => v.user == username)
      console.log(index);
      list[index].pwd = this.pwd
      wx.setStorageSync('user', list);
    }

    wx.showToast({
      title: '保存成功',
      icon: 'none',
      duration: 1500,
      mask: false,
    });
    wx.switchTab({
      url: '/pages/user/index',
    });
  },
  loginOut() {
    getApp().globalData.token = ''
    wx.switchTab({
      url: '/pages/user/index',
    });
  }
})