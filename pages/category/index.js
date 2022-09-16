import { request } from "../../request/index";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateLeftList: [],
    cateRightList: [],
    selectIndex: 0,
    scrollTop: 0,
    scrollY: ''
  },
  cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  async onShow(options) {
    // 获取本地缓存
    this.setData({
      selectIndex: getApp().index,
    })
    let cate = wx.getStorageSync('cate');
    console.log('分类缓存', cate);
    if (!cate) {
      if (await this.getData()) {
        this.switchNav()
      }
    } else {
      if (Date.now() - cate.time > 10000) {
        if (await this.getData()) {
          this.switchNav()
        }

      } else {
        this.cates = cate.cateSta
        this.setCates()
        this.switchNav()
        console.log('使用旧数据');
      }
    }
  },

  switchNav() {
    if (getApp().index) {
      this.setData({
        cateRightList: this.cates[getApp().index].children,
      })
    }
  },

  async getData() {

    // 获取商品种类
    const res = await request({ url: "/shop/goods/category/all" })

    // 赋值新数组
    let list = res.data.data.map((item) => {
      return {
        id: item.id,
        icon: item.icon,
        name: item.name
      }
    })

    // 获取商品
    const res01 = await request({
      url: "/shop/goods/list"
    })

    const { data } = res01.data
    let goods = data.map((item => {
      return {
        pid: item.categoryId,
        pic: item.pic,
        pname: item.name,
        id: item.id
      }
    }))
    list.forEach((item, index) => {
      list[index].children = goods.filter((it) => it.pid == item.id)
    })
    this.cates = list.map(v => { return { name: v.name, icon: v.icon, id: v.id } })
    this.cates.forEach((item, index) => {
      let [hhh] = list.filter((it) => it.name == item.name)
      this.cates[index].children = hhh
    })

    // console.log(this.cates);

    // 本地存储数据和时间戳
    wx.setStorageSync('cate', { time: Date.now(), cateSta: this.cates });

    // 数据赋值
    this.setCates()
  },


  // 数据赋值
  setCates() {
    this.setData({
      cateLeftList: this.cates.map(v => { return { name: v.name, icon: v.icon } }),
      cateRightList: this.cates[0].children,
      scrollY: this.cates[0].children.children.length - 12 ? 1 : 0
    })
  },

  // 左侧菜单点击事件
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      selectIndex: index,
      cateRightList: this.cates[index].children,
      scrollTop: 0,
      scrollY: this.cates[index].children.children.length - 12 > 0 ? 1 : 0
    })
  }
})