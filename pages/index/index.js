import { request } from "../../request/index.js";

//Page Object
Page({
  data: {
    bannerList: [],
    cateList: [],
    goodList: []
  },
  //options(Object)
  onLoad: function (options) {
    // 获取轮播图
    var reqTask = request({
      url: '/banner/list'
    }).then(
      result => {
        this.setData({
          bannerList: result.data.data.filter(item => item.type == "index")
        })
      }
    )
    // 获取导航
    var reqTask01 = request({
      url: '/shop/goods/category/all'
    }).then(
      result => {
        this.setData({
          cateList: result.data.data
        })
      }
    )


    //获取商品楼层
    var reqTask02 = request({
      url: '/shop/goods/list'
    }).then(
      result => {
        let res = result.data.data
        this.setData({
          goodList: res.length % 2 == 0 ? res : res.slice(0, -1)
        })
      }
    )
  },
  handleSwitchTab(e) {
    const app = getApp()
    app.index= e.currentTarget.dataset.index
    wx.switchTab({
      url: '/pages/category/index',
    });
      
  }
})
