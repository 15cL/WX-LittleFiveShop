
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: true,
    userId: '',
    detailList: [
      { icon: 'icon-shoucang', title: '收藏', id: '0' },
      { icon: 'icon-yidingyue', title: '订阅店铺', id: '1' },
      { icon: 'icon-zuji', title: '足迹', id: '2' },
      { icon: 'icon-lingqianbao', title: '零钱￥0.00', id: '3' },
    ],
    orderingList: [
      { icon: 'icon-daifukuan', title: '待付款', id: '0' },
      { icon: 'icon-daifahuo', title: '待发货', id: '1' },
      { icon: 'icon-daishouhuo', title: '待收货', id: '2' },
      { icon: 'icon-daipingjia', title: '待评价', id: '3' },
      { icon: 'icon-tuikuanshouhou', title: '售后', id: '4' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow() {
    this.getUserProfile()
  },
  async getUserProfile() {
    wx.getSetting({
      success: async (result) => {
        console.log(result);
        if (result.authSetting['scope.userInfo']) {
          // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
          // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
          await wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: async (res) => {
              console.log(res);
              if (res) {
                let codeRes = await wx.login({ timeout: 10000, })
                if (codeRes) {
                  let tokenRes = await request({
                    url: '/user/wxapp/authorize',
                    data: { code: codeRes.code },
                    method: 'POST',
                  })
                  console.log(tokenRes);
                }
              }
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: false,
                userId: res.signature.match(/^\d{5,}/)
              })
            }
          })
        }
      },
    });
  },

})
