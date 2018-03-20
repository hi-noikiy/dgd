// radio 和 checkbox 可复用的逻辑

module.exports = Behavior({
  properties: {
    items: {
      type: Array,
      value: [],
      observer(value) {
        // items 修改时，重置 formItems 属性
        const formItems = value.map(item => {
          item.checked = false
          if (this.properties.value.includes(item.value)) {
            item.checked = true
          }

          return item
        })

        this.setData({ formItems })
      }
    },
    value: {
      type: [Array, String],
      observer(value) {
        // value 修改时，统一内部改成 formItem 需要的格式
        const formItems = this.data.formItems.map(item => {
          item.checked = false

          if(Array.isArray(value)) {
            if (value.includes(item.value)) {
              item.checked = true
            }
          } else {
            if(value === item.value) {
              item.checked = true
            }
          }

          return item
        })

        this.setData({ formItems })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    formItems: []
  },

  // ready 初始化
  ready() {
    this.setData({
      formItems: this.properties.items
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // change 事件
    handleChange(e) {
      this.triggerEvent('change', {
        value: e.detail.value
      })
    }
  }
})