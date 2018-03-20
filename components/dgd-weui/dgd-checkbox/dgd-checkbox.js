// components/dgd-weui/dgd-checkbox/dgd-checkbox.js
const formControlBehavior = require('../behaviors/form-control')
const formCheckBehavior = require('../behaviors/form-check')

Component({
  behaviors: [formControlBehavior, formCheckBehavior],
  // 组件关系
  relations: {
    '../dgd-form/dgd-form': {
      type: 'ancestor'
    }
  },
  externalClasses: ['component-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    
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
    
  }
})
