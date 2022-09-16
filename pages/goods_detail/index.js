
import { request } from "../../request/index";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: [],
    richText: '',
    collectSta: 0,
    open: 0,
    properties: [], // property 列表
    skuList: [], // sku 列表
  },

  collectNum: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodDetail(options.id)
  },

  async getGoodDetail(id) {
    const { data } = await request({
      url: `/shop/goods/detail?id=${id}`
    })
    console.log(data.data);
    const richtext = this.richString(data.data.content)
    if (data.data.properties) {
      const properties = data.data.properties.map(v => {
        return {
          id: v.id,
          name: v.name,
          attributes: v.childsCurGoods.map(m => { return { name: m.name, isActive: false, isDisabled: false } })
        }
      })
      console.log(properties);

      const skuLi = data.data.skuList.map(v => { return { attributes: v.propertyChildNames.replace(/(:|,)/g, ' ').split(' ').slice(0, -1), id: v.id } })
      console.log(skuLi);
      let skuList = []
      for (let i = 0; i < skuLi.length; i++) {
        skuList[i] = { id: skuLi[i].id, attributes: [] }
        for (let j = 0; j < skuLi[i].attributes.length; j++) {
          if (j % 2 == 1) {
            skuList[i].attributes.push(skuLi[i].attributes[j])
          }
        }
      }
      console.log(skuList)
      this.setData({
        properties: properties,
        skuList: skuList
      })
    }
    this.setData({
      goodsDetail: data.data,
      richText: richtext,
    })
  },

  richString(strings) {

    let richtext = strings.replace(/<img/gi, '<img style="max-width:100%;height:auto;float:left;display:block" ')
    // 将想要的样式属性携带在标签上，替换原来的标签即可。
    return richtext
    // 最后将修改后的富文本传到data中，渲染到视图层即可。
  },


  toggleCollect(e) {
    this.collectNum++
    this.setData({
      collectSta: this.collectNum % 2
    })
  },

  // 点击轮播图，放大预览
  handleBigImg(e) {
    console.log(e);
    // 构造图片路径数组
    let pics = e.currentTarget.dataset.pics.map(v => v.pic)
    //获取当前点击索引
    let index = e.currentTarget.dataset.index
    console.log(pics, index);
    // 放大API
    wx.previewImage({
      current: pics[index],
      urls: pics,
    });

  },

// 打开菜单规格选择窗口
  selectOpen(e) {
    setTimeout(() => {
      this.setData({
        open: 1
      })
    }, 100);
  },
  
// 打开菜单规格选择窗口
  closePage() {
    this.setData({
      open: 0
    })
  }
})