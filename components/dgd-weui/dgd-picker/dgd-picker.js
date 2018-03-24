// components/dgd-weui/dgd-picker/dgd-picker.js
/**
 * 受控组件本靠 value 来响应 displayName，可考虑从 onChange 里除去 display 的显示
 */
const formControlBehavior = require('../behaviors/form-control')

Component({
  behaviors: [formControlBehavior],
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
    label: {
      type: String,
    },
    range: {
      type: Array,
      value: []
    },
    rangeKey: {
      type: String,
      value: 'name'
    },
    value: {
      type: [String, Array],
      observer(newValue) {
        this.initStatus(newValue)
        this.initValue()
      }
    },
    mode: {
      type: String,
      value: 'selector'
    },
    disabled: {
      type: Boolean
    },
    start: {
      type: String
    },
    end: {
      type: String
    },
    fields: {
      type: String,
      value: 'day'
    },
    customItem: {
      type: String
    },
    splitKey: {
      type: String,
      value: ','
    },
    placeholder: {
      type: String,
      value: '请选择'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayName: '请选择',
    valueIndex: 0,
    status: '',
    isEmpty: false
  },

  ready() {
    // 初始化各属性
    this.setData({
      displayName: this.properties.placeholder
    })

    // 处理 rangeKey 的 bug
    if(this.properties.mode === 'region') {
      this.setData({
        rangeKey: '',
        splitKey: this.properties.splitKey === ',' ? '' : this.properties.splitKey
      })
    }

    if (this.properties.mode === 'multiSelector') {
      this.setData({
        valueIndex: []
      })
    }

    this.initValue()
  },
  /**
   * 组件的方法列表
   */
  methods: {
      // 提供修改内部状态的方法
    warn({ message }) {
      this.setData({
        status: 'warn',
        warnMessage: message || '表单有误'
      })
    },
    // 初始化状态，包括 placeholder, status
    initStatus(value){
      if (Array.isArray(value) && value.length === 0 || value === ''){
        this.setData({
          status: '',
          isEmpty: true,
          displayName: this.properties.placeholder
        })
      } else {
        this.setData({
          isEmpty: false,
          status: ''
        })
      }
    },
    initValue() {
      // 根据 value 初始化选项
      const { value, mode, splitKey, placeholder} = this.properties
      if (value) {
        if(mode === 'selector' || mode === 'multiSelector') {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              this.setValue(this.properties.value)
            }
          } else {
            this.setValue(this.properties.value)
          }
        } else {
          let displayName = value
          if(mode === 'region') {
            displayName = value.join(splitKey)
          }

          if(mode !== 'region' || (mode === 'region' && value.length > 0)) {
            this.setData({
              valueIndex: value,
              displayName
            })
          }
        }
      }
    },
    // 通过 value 来设置 index 和 displayName，单选和复选用
    setValue(value) {
      const range = this.properties.range
      const rangeKey = this.properties.rangeKey
      const splitKey = this.properties.splitKey

      let displayName, valueIndex
      
      if(Array.isArray(value)) {
        // 多选
        displayName = []
        valueIndex = value.map((v, rangeIdx) => {
          let findIdx
          // 获取索引
          range[rangeIdx].some((rangeItem, rangeIdx) => {
            if(rangeItem.value === v) {
              findIdx = rangeIdx
              displayName.push(rangeItem[rangeKey])
              return false
            }
          })
          return findIdx
        })
        displayName = displayName.join(splitKey)     
      } else {
        // 单选
        range.some((rangeItem, rangeIdx) => {
          if (rangeItem.value === value) {
            valueIndex = rangeIdx
            displayName = rangeItem[rangeKey]
            return false
          }
        })
      }

      this.setData({
        valueIndex,
        displayName
      })
    },
    handleChange(e) {
      const mode = this.properties.mode
      if (mode === 'selector' || mode === 'multiSelector') {
        this.triggerRangeChange(e)
      } else if (mode === 'time' || mode === 'date') {
        this.triggerDateTimeChange(e)
      } else if(mode === 'region') {
        this.triggerRegionChange(e)
      }
    },

    // 单选和复选的逻辑
    triggerRangeChange(e) {
      const valueIndex = e.detail.value
      const range = this.properties.range
      const rangeKey = this.properties.rangeKey
      const splitKey = this.properties.splitKey
      // 数组
      let displayName, value, name
      if (Array.isArray(valueIndex)) {
        name = valueIndex.map((vidx, index) => {
          vidx = vidx || 0
          return range[index][vidx] && range[index][vidx][rangeKey]
        })
        value = valueIndex.map((vidx, index) => {
          vidx = vidx || 0
          return range[index][vidx] && range[index][vidx].value
        })
        displayName = name.filter(str => !!str).join(splitKey)
      } else {
        displayName = range[valueIndex][rangeKey]
        value = range[valueIndex].value
      }

      this.setData({
        valueIndex: e.detail.value,
        displayName
      })

      this.triggerEvent('change', {
        value,
        index: valueIndex
      })
    },

    // 时间选择器
    triggerDateTimeChange(e) {
      this.setData({
        valueIndex: e.detail.value,
        displayName: e.detail.value
      })
      this.triggerEvent('change', e.detail)
    },

    // 地区选择器
    triggerRegionChange(e) {
      const valueSet = new Set(e.detail.value)
      // 处理掉重复的，无用的前缀等字符
      const displayName = Array.from(valueSet)
      .filter(name => {
        return !['县', '省直辖县级行政区划'].includes(name)
      })
      .join(this.properties.splitKey)

      this.setData({
        valueIndex: e.detail.value,
        displayName
      })
      this.triggerEvent('change', e.detail)
    },

    // 列变化
    bindcolumnchange(e) {
      // 根据列变化，得到修改后的值
      const {column, value: index} = e.detail
      const value = this.properties.range[column][index].value

      this.triggerEvent('columnchange', {
        column, index, value
      })
    },
    bindcancel(e) {
      this.triggerEvent('cancel', e.detail)
    }
  }
})
