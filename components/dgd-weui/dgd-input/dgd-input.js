// components/dgd-weui/dgd-input/dgd-input.js
const formControlBehavior = require('../behaviors/form-control')
const validator = require('../utils/validator')

Component({
  behaviors: [formControlBehavior],
  externalClasses: ['component-class'],
  // 组件关系
  relations: {
    '../dgd-form/dgd-form': {
      type: 'ancestor'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '请输入'
    },
    type: {
      type: String,
      value: 'text'
    },
    vcode: {
      type: Boolean,
      value: false
    },
    vcodeImg: {
      type: String,
      value: ''
    },
    vcodeDuration: {
      type: Number,
      value: 60
    },
    password: {
      type: Boolean
    },
    placeholderStyle: {
      type: String
    },
    placeholderClass: {
      type: String
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: {
      type: Number,
      value: 140
    },
    cursorSpacing: {
      type: Number
    },
    focus: {
      type: Boolean
    },
    confirmType: {
      type: String
    },
    confirmHold: {
      type: String
    },
    cursor: {
      type: Number
    },
    selectionStart: {
      type: Number
    },
    selectionEnd: {
      type: Number
    },
    adjustPosition: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    warnMessage: '',
    status: '',
    vcodeTime: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 提供修改内部状态的方法
    warn({message}) {
      this.setData({
        status: 'warn',
        warnMessage: message || '表单有误'
      })
    },

    // 重新处理输入框
    handleInput(e) {
      if(this.data.status === 'warn') {
        this.setData({
          status: ''
        })
      }

      this.triggerEvent('input', e.detail)
    },
    handleFocus(e) {
      this.triggerEvent('focus', e.detail)
    },
    handleBlur(e) {
      this.triggerEvent('blur', e.detail)
    },
    handleConfirm(e) {
      this.triggerEvent('confirm', e.detail)
    },

    // 提供获取表单节点的方法
    getFormNode() {
      const form = this.getRelationNodes('../dgd-form/dgd-form')
      return form && form[0]
    },

    // 点击错误图标
    tapErrorIcon() {
      this.showFormErrorTips()
    },

    // 提供直达表单的 errorTips 方法
    showFormErrorTips() {
      const formNode = this.getFormNode()

      if (formNode) {
        formNode.showTopTips({ message: this.data.warnMessage })
      }
    },

    // 点击获取验证码（仅支持中国手机）
    getVcode() {
      const formData = { value: this.properties.value }

      const rules = { 
        value: [{
          type: 'required',
          message: '手机号必填'
        }, {
          type: 'mobile',
          message: '手机号格式不正确'
        }] 
      }

      // 使用通用校验来校验是否可以获取验证码
      validator(formData, rules).then((errorArr) => {
        if(errorArr.length > 0) {
          this.setData({
            status: 'warn',
            warnMessage: errorArr[0].message
          })
          this.showFormErrorTips()
        } else {
          // 验证通过后，开始倒计时并把正确的手机号码通过事件推出给业务进行使用
          let vcodeTime = this.properties.vcodeDuration
          if (!this.vcodeTimer) {
            this.setData({ vcodeTime })
            this.triggerEvent('sendVcode', {value: formData.value})
            this.vcodeTimer = setInterval(() => {
              if (vcodeTime) {
                vcodeTime--
              } else {
                clearInterval(this.vcodeTimer)
                this.vcodeTimer = null
              }

              this.setData({ vcodeTime })
            }, 1000)
          }
        }
      })
    }
  }
})
