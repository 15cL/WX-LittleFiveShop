// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    coll_title: ['管理', '完成'],
    coll_flag: 0,
    allChecked: false,
    seeDelId: '',
    seeDel: false,
    seeIt: true
  },
  selectList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.selectList = wx.getStorageSync('collect') || [];
    this.setData({
      list: this.selectList
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
  switchbox(e) {
    console.log(e);
    let num = e.currentTarget.dataset.num
    num = num ? 0 : 1
    let seeIt = num ? false : true

    this.setData({
      seeIt,
      seeDel: num
    })

    console.log(1 == 1 && false);
    this.setData({
      coll_flag: num
    })
  },
  handleXz(e) {
    let val = e.detail.value.length
    let id = e.target.dataset.id
    let index = this.selectList.findIndex(val => val.goodId == id)
    if (val) {
      this.selectList[index].checked = true
    } else {
      this.selectList[index].checked = false
    }
    let allchecked = true
    this.selectList.map(val => {
      if (!val.checked) {
        allchecked = false
      }
    })
    this.setData({
      allChecked: allchecked
    })
    console.log(this.selectList);
  },
  handleQx(e) {
    let val = e.detail.value.length
    if (val) {
      this.selectList.map(val => val.checked = true)
    } else {
      this.selectList.map(val => val.checked = false)
    }
    this.setData({
      list: this.selectList
    })
  },
  del_collect() {
    let list = []
    this.selectList.map(val => {
      if (!val.checked) {
        list.push(val)
      }
    })
    this.selectList = list
    this.setData({
      list
    })
    wx.setStorageSync('collect', list);
    if (!list.length) {
      this.setData({
        allChecked: false
      })
    }
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

  delGood(e) {
    let id = e.currentTarget.dataset.id
    let index = this.selectList.findIndex(v => v.goodId == id)
    this.selectList.splice(index, 1)
    this.setData({
      list: this.selectList
    })
    wx.setStorageSync('collect', this.selectList);
  }
})