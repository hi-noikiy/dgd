// components/dgd-weui/dgd-face-validation/dgd-face-validation.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      name: '',
      id: ''
    },
    rules: {
      name: [{
        type: 'required',
        message: '请输入真实姓名'
      }, {
        type: 'cnName',
        message: '请输入正确的姓名'
      }],
      id: [{
        type: 'required',
        message: '请输入身份证号'
      }, {
        type: 'id',
        message: '请输入正确的身份证号'
      }]
    }
  },

  onLoad(options) {
    console.log(options)
    if(!options.componentId) {
      throw new Error('人脸识别必须提供 dgd-realname-button 的组件ID')
    }
    this.componentId = options.componentId
  },

  handleNameInput(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        name: e.detail.value
      }
    })
  },

  handleIdInput(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        id: e.detail.value
      }
    })
  },

  handleSubmit(e) {
    const {validStatus, value: {name, id}} = e.detail

    if (validStatus) {
      wx.startFacialRecognitionVerify({
        name,
        idCardNumber: id,
        success: (res) => {
          if (resp.errCode === 0) {
            // 获取页面元素
            const pages = getCurrentPages()
            if (pages.length > 1) {
              // 通过页面堆栈和组件ID，找到上一页的实名认证接口，并触发 authInfo 事件
              const page = pages[pages.length - 2]
              const component = page.selectComponent('#' + this.componentId)

              if (!component) {
                throw new Error('通过组件 id 未找到 dgd-realname-button 组件')
              } else {
                component.triggerAuthInfoEvent({ name, id })
                wx.navigateBack()
              }
            }
          }
        },
        fail: (res) => {
          wx.showToast({
            title: '系统错误',
            icon: 'none'
          })
          console.log('人脸识别失效 fail', res)
        }
      })
    }
  }
})