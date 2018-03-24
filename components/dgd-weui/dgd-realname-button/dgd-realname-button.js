// components/dgd-weui/dgd-realname-button/dgd-realname-button.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['component-class'],
  properties: {
    id: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    appid: {
      type: String,
      value: ''
    },
    categoryId: {
      type: Array,
      value: [52, 772]
    },
    size: {
      type: String,
      value: 'default'
    },
    type: {
      type: String,
      value: 'default'
    },
    plain: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    hoverClass: {
      type: String,
      value: 'button-hover'
    }
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
    handleAuthInfo(e) {
      // 接口正常
      if (e.detail.errCode === 0) {
        const auth_token = e.detail.auth_token
        const {url, appid} = this.properties

        wx.showLoading({
          title: '认证中',
        })
        request({
          url,
          data: {
            auth_token,
            appid
          }
        }).then((resp) => {
          wx.hideLoading()
          this.triggerEvent('authInfo', resp.data)
        })
      } else {
        wx.navigateTo({
          url: '/components/dgd-weui/dgd-face-validation/dgd-face-validation?componentId=' + this.id,
        })
      }
    },
    bindtap(e) {
      this.triggerEvent('tap', e.detail)
    },
    // 提供给外部 trigger
    triggerAuthInfoEvent(data) {
      // 要等原页面初始化成功后才可触发
      this.triggerEvent('authInfo', data)
    }
  }
})
