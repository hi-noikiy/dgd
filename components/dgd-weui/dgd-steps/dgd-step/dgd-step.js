// components/dgd-weui/dgd-steps/dgd-step/dgd-step.js
Component({
  relations: {
    '../dgd-steps': {
      type: 'parent'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    last: {
      type: Boolean,
      value: false
    },
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    finish: false,
    toDo: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDo() {
      this.setData({
        toDo: true
      })
    },
    finish() {
      this.setData({
        finish: true
      })
    }
  }
})
