import { request } from "../../request/index.js";


// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[],
    top:150 
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
  }
})