// components/Tab/Tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indexDar: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapClick(e) {
      let indexDar = e.currentTarget.dataset.index
      this.triggerEvent("giveIndex",{type:indexDar})
      this.setData({
        indexDar: e.currentTarget.dataset.index
      })
    }
  }
})
