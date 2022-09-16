// components/BottomBox/BottomBox.js
Component({

  lifetimes: {
    attached() {
      this.setData({
        propers: this.properties.properties
      })
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    menu: {
      type: Object
    },
    properties: {
      type: Array
    },
    skuList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodNum: 1,
    propers: [],
  },
  propsList: [],
  matrix: [], // 邻接矩阵存储无向图
  vertexList: [], // 顶点数组
  skuList: [],
  selected: [], // 当前已选的 attribute 列表

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭弹窗
    closePage(e) {
      if (e.target.offsetTop == 0 && e.target.offsetLeft == 0 || e.currentTarget.dataset.open) {
        this.triggerEvent('closePage')
      }
    },

    decNum(e) {
      setTimeout(() => {
        let num = e.currentTarget.dataset.goodnum
        num--
        if (num <= 0) {
          num = 0
        }
        this.setData({
          goodNum: num
        })
      }, 300);
    },

    addNum(e) {
      setTimeout(() => {
        let num = e.currentTarget.dataset.goodnum
        num++
        this.setData({
          goodNum: num
        })
      }, 300);
    },

    editNum(e) {
      let value = e.detail.value.replace(/\D/g, '')
      this.setData({
        goodNum: value
      })
    },

    // 点击某个规格
    selectType(e) {
      const { prop_index, attr_index } = e.currentTarget.dataset
      this.propsList = e.currentTarget.dataset.properties
      const selectAttr = this.propsList[prop_index].attributes[attr_index]
      const isActive = !selectAttr.isActive
      this.propsList[prop_index].attributes[attr_index].isActive = isActive

      this.propsList[prop_index].attributes.map((attr, index) => {

        if (index !== attr_index) {
          attr.isActive = 0
        }
      })
      this.setData({
        propers: this.propsList
      })
    },

    addShopCar(e) {

      let addCar = []
      console.log(e.currentTarget.dataset.guige);
      e.currentTarget.dataset.guige.map(v => addCar.push(v.attributes.filter(item => item.isActive == true)[0]))
      console.log("addCar", addCar);
      let flag = false
      addCar.forEach(item => {
        if (!item) {
          console.log(item);
          flag = true
        }
      })
      if (flag) {
        wx.showToast({
          title: '请选择商品规格',
          icon: 'none',
          duration: 1500,
          mask: true,
        })
        return
      }

      console.log("选择成功", this.properties.menu);
      let num = e.currentTarget.dataset.num
      let id = e.currentTarget.dataset.detail.basicInfo.id
      let cart = wx.getStorageSync('cart') || []
      let findSta = cart.findIndex(v => v.good_id == id)
      console.log("findSta", findSta);
      if (findSta == -1) {
        cart.push({ num: num, good_id: id, selectGui: addCar, basicInfo: this.properties.menu, checked: true })
        wx.setStorageSync('cart', cart);
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 1500,
          mask: true
        });
      } else {
        wx.showToast({
          title: '商品已存在',
          icon: 'fail',
          duration: 1500,
          mask: true
        });
      }
      this.triggerEvent('closePage')
    }
  }
})
