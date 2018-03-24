// components/dgd-weui/dgd-cell/dgd-cell.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['component-class'],
  properties: {
    label: String,
    icon: String,
    to: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cellTap(e) {
      if (this.properties.to) {
        wx.navigateTo({
          url: this.properties.to,
        });
        return;
      }
      this.triggerEvent('tap');
    }
  }
})
