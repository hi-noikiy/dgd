// components/dgd-weui/dgd-msg/dgd-msg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    desc: String,
    primaryText: String,
    secondText: String,
    primaryNav: String,
    secondNav: String,
    footerText: String,
    footerLink: String,
    footerLinkText: String
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
    primaryNav() {
      wx.redirectTo({
        url: this.properties.primaryNav
      });
    },
    secondNav() {
      wx.redirectTo({
        url: this.properties.secondNav
      });
    }
  }
})
