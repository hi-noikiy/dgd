const formControlBehavior = require('../behaviors/form-control')
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
    value: String,
    placeholder: String,
    disabled: {
      type: Boolean,
      value: false
    },
    maxlength: Number,
    autoFocus: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    },
    height:String,
    autoHeight: {
      type: Boolean,
      value: false
    },
    cursorSpacing: Number,
    cursor: Number,
    showConfirmBar: Boolean,
    selectionStart: Number,
    selectionEnd: Number,
    adjustPosition: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    length: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(e) {
      this.setData({
        length: e.detail.value.length
      });
      this.triggerEvent('input',e.detail);
    },
    handleFocus(e) {
      this.triggerEvent('focus', e.detail)
    },
    handleBlur(e) {
      this.triggerEvent('blur', e.detail)
    },
    handleConfirm(e) {
      this.triggerEvent('confirm', e.detail)
    }
  }
})
