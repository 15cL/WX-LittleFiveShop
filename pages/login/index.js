// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "13979927696",
    password: '123456',
    index: 0,
    btnList: ['登录', '注册'],
    loginList: ['立即注册', '已有账户登录']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  inputEdit0(e) {
    this.setData({
      username: e.detail.value
    })
  },
  inputEdit1(e) {
    this.setData({
      password: e.detail.value
    })
  },
  validateUser(str) {
    if (!str) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return
    }
    let reg = /^1[3|4|5|7|8][0-9]{9}$/
    let res = str.match(reg)
    if (!res) {
      console.log('res', res);
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
    }
    return res
  },
  loginIn(e) {
    console.log(e);
    let username = e.currentTarget.dataset.username
    let password = e.currentTarget.dataset.password
    let userFlag = this.validateUser(username)
    if (!userFlag) {
      return
    }
    let flag = e.currentTarget.dataset.index
    let userList = wx.getStorageSync("user") || [];
    let index = userList.findIndex(v => v.user == username)
    if (!flag) {
      if (index != -1) {
        if (password == userList[index].pwd) {
          let token = Math.floor(Math.random() * 100000000000000000)
          getApp().globalData.token = token
          getApp().globalData.userInfo.username = username
          console.log(getApp().globalData.token);
          // wx.switchTab({
          //   url: '/pages/user/index',
          // })
          //返回上一页
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '登录成功',
            icon: 'none',
            duration: 1500,
            mask: false,
          });
        } else {
          wx.showToast({
            title: '账号或密码错误',
            icon: 'none',
            duration: 1500,
            mask: false,
          });
        }
      } else {
        wx.showToast({
          title: '用户名未注册',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      }
    } else {
      if (index != -1) {
        wx.showToast({
          title: '用户名已注册',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
        setTimeout(() => {
          this.setData({
            index: flag ? 0 : 1
          })
        }, 1000);
        return
      }
      let list = userList
      list.push({ user: username, pwd: password })
      wx.setStorageSync('user', list);
      wx.showToast({
        title: '注册成功',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      setTimeout(() => {
        this.setData({
          index: flag ? 0 : 1
        })
      }, 1000);
    }
  },

  switchLog(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      index: index ? 0 : 1
    })
  }
})