// pages/auth/index.js
Page({
  data: {
    region: ['广东省', '广州市', '海珠区'], // 初始值
    regSta: [],
    getAddress: {},
    username: '',
    phoneNum: '',
    addressDetail: '',
    flag: false
  },
  onLoad: function () {
  },
  bindRegionChange(e) {  // picker值发生改变都会触发该方法
    console.log("e", e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      regSta: e.detail.value
    })
  },
  getAdress() {
    wx.chooseAddress({
      success: (result) => {
        this.setData({
          getAddress: result,
          username: result.userName,
          phoneNum: result.telNumber,
          addressDetail: result.detailInfo,
          region: [result.provinceName, result.cityName, result.countyName],
          regSta: [1, 2, 3],
          flag: true
        })
      },
      fail: (msg) => { console.log(msg); },
    });
  },
  handleName(e) {
    this.setData({
      userName: e.detail.value,
      flag: false
    })
  },
  handlePhone(e) {
    this.setData({
      phoneNum: e.detail.value,
      flag: false
    })
  },
  handleAddress(e) {
    this.setData({
      addressDetail: e.detail.value,
      flag: false
    })
  },
  okAddress(e) {
    console.log(e);
    if (this.data.flag) {
      console.log(e.currentTarget.dataset.address);
      wx.setStorageSync("address", e.currentTarget.dataset.address);
      wx.navigateBack();
      return
    }
    if (!this.data.regSta.length) {
      wx.showToast({
        title: '请选择地区',
        icon: 'fail',
        duration: 1500,
        mask: true,
      });
      return
    } else if (!this.data.userName) {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
      return
    } else if (!this.data.phoneNum) {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'fail',
        duration: 1500,
        mask: true,
      });
      return
    } else if (!this.data.addressDetail) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'fail',
        duration: 1500,
        mask: true,
      });
      return
    }
    wx.setStorageSync("address", {
      provinceName: this.data.region[0],
      cityName: this.data.region[1],
      countyName: this.data.region[2],
      userName: this.data.userName,
      telNumber: this.data.phoneNum,
      detailInfo: this.data.addressDetail,
    });
    wx.navigateBack({
      delta: 1
    });

  }
})
