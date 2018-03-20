// components/dgd-weui/dgd-form/dgd-form.js
const validator = require('../utils/validator')
const formControlBehavior = require('../behaviors/form-control')

Component({
  externalClasses: ['component-class', 'submit-class'],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  // 组件关系
  relations: {
    'dgd-form-fields': {
      type: 'descendant',
      target: formControlBehavior
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    model: {
      type: Object,
      value: {}
    },
    rules: {
      type: Object,
      value: {}
    },
    submitText: {
      type: String,
      value: '确定'
    },
    tipsDuration: {
      type: Number,
      value: 3000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showTopTips: false,
    topTipsMessage: '表单提交失败',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 顶部错误信息
    hideTopTips() {
      this.setData({
        showTopTips: false,
        topTipsMessage: ''
      })
      clearTimeout(this.tipsTimer)
    },
    showTopTips(errorConfig) {
      this.setData({
        showTopTips: true,
        topTipsMessage: errorConfig.message || '表单填写有误'
      })

      if(!this.tipsTimer) {
        this.tipsTimer = setTimeout(() => {
          this.setData({
            showTopTips: false,
            topTipsMessage: ''
          })
          this.tipsTimer = null
        }, this.properties.tipsDuration)
      }
    },

    // 找到组件节点，通知表单修正相应状态，并滚动该组件节点的位置
    noticeFormFiels(errorConfig) {
      const formFields = this.getRelationNodes('dgd-form-fields')
      let firstError = false;
      errorConfig.forEach(config => {
        // 利用 some 来提前结束循环
        formFields.some(node => {
          if(node.id === config.name) {
            node.warn && node.warn(config)
            if (!firstError) {
              firstError = true;
              var query = wx.createSelectorQuery()
              query.select('#' + config.name).boundingClientRect();
              query.selectViewport().scrollOffset().exec((res) => {
                if (res[1].scrollTop) {
                  wx.pageScrollTo({
                    scrollTop: res[1].scrollTop + res[0].top,
                  });
                }
              });
            }
          }
        });
      })
    },

    // 表单提交校验
    handleSubmit(e) {
      this.hideTopTips()
      validator(this.properties.model, this.properties.rules)
        .then((errorArr) => {
          if (errorArr.length === 0) {
            // 校验成功，并把数据推回给业务组件做业务处理

            // 推送事件
            this.triggerEvent('submit', {
              validStatus: true,
              value: this.properties.model
            })
          } else {
            // 校验失败，组件内部提供错误提示和状态，并把错误信息推回给业务组件处理
            this.noticeFormFiels(errorArr)
            this.showTopTips(errorArr[0])

            // 推送事件
            this.triggerEvent('submit', {
              validStatus: false,
              value: errorArr
            })
          }
        })
      
    }
  }
})
