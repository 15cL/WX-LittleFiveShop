// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { title: '全部', isActive: true },
      { title: '待付款' },
      { title: '待发货' },
      { title: '待收货' },
      { title: '待评价' },
    ],
    type: '',
    daifu: [],
    cancelFlag:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    this.setData({
      type: options.type
    })
  },
  onShow() {
    let daifu = wx.getStorageSync('daifu');
    this.setData({
      daifu
    })
    console.log("待付款", daifu);

  },
  giveIndex(e) {
    console.log(e);
    this.setData({
      type: e.detail.type
    })
  },
  handleFukuan() {
    wx.showToast({
      title: '支付功能暂未实现',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: true,
    });

  },
  handleCancel(e) {
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '确定要取消该订单吗?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          let arr = wx.getStorageSync('daifu');
          arr.splice(index, 1)
          wx.setStorageSync('daifu', arr);
          this.setData({
            cancelFlag:false
          })
          this.onShow()
        }
      },
    });

  }
})