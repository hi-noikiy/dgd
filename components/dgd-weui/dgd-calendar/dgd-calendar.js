// components/dgd-weui/dgd-calendar/dgd-calendar.js
const moment = require('../utils/moment.js')
const debounce = require('../utils/debounce.js')

Component({
  externalClasses: ['component-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String
    },
    mode: {
      type: String,
      value: 'single'
    },
    options: {
      type: Array,
      value: [{}]
    },
    start: {
      type: String
    },
    end: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateOptions: [],
    hideLeftShadow: true,
    hideRightShadow: false
  },

  ready() {
    this.initDateOptions()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取格子数量
    getDateLength() {
      const {start, end} = this.properties
      switch(this.properties.mode) {
        case 'single': {
          if(start && end) {
            return moment(end).diff(moment(start), 'days')
          } else {
            return 15
          }
        }
        case 'multiple': {
          if (start && end) {
            return moment(end).diff(moment(start), 'days')
          } else {
            return 30
          }
        }
      }
    },

    // 周末到中午
    weekToCN(en) {
      switch(en) {
        case 'Mon':
          return '周一'
        case 'Tue':
          return '周二'
        case 'Wed':
          return '周三'
        case 'Thu':
          return '周四'
        case 'Fri':
          return '周五'
        case 'Sat':
          return '周六'
        case 'Sun':
          return '周日'
      }
    },

    // 初始化日期选项
    initDateOptions() {
      const dateLength = this.getDateLength()
      const {start, options, mode} = this.properties
      // 初始化显示的格子
      let dateOptions = Array.from({length: dateLength})
        .map((_, index) => {
          const date = moment(start).add(index, 'days')
          const dateDisplay = date.format('DD')
          const weekDisplay = this.weekToCN(date.format('ddd')) 

          return {
            date: date.format('YYYY-MM-DD'),
            dateDisplay,
            weekDisplay,
            style: ''
          }
        })

      // 合并数据格子
      options.forEach(option => {
        dateOptions.some((dateOption, index) => {
          if (option.date === dateOption.date) {
            dateOptions[index] = {...dateOption, ...option}
            return false
          }
        })
      })

      if (mode === 'multiple') {
        dateOptions = this.padDateOption(dateOptions)
        dateOptions = this.setToMonthFormat(dateOptions)
      }

      this.setData({
        dateOptions
      })
    },

    // 根据日期，前面补充块，后面补充块
    padDateOption(options) {
      const startDate = moment(options[0].date)
      const startSunday = startDate.clone().day('Sunday')

      const endDate = moment(options[options.length - 1].date)
      const endSaturday = endDate.clone().day('Saturday')

      const startPadLen = startDate.diff(startSunday, 'days')
      const endPadLen = endSaturday.diff(endDate, 'days')

      // 如果 startDate 不是周日，则需要补充白块
      options = Array.from({ length: startPadLen }).concat(options)
      options = options.concat(Array.from({ length: endPadLen }))

      return options
    },

    // 变成每列 7 个的格式
    setToMonthFormat(options) {
      const newOptions = []

      options.forEach((option, index) => {
        const rowIndex = parseInt(index / 7)
        const colIndex = index % 7
        
        if(!newOptions[rowIndex]) {
          newOptions[rowIndex] = []
        }

        newOptions[rowIndex][colIndex] = option
      })

      return newOptions
    },

    // 单行选择左右透明
    handleSingleScrollLeft(e) {
      this.setData({
        hideLeftShadow: true,
        hideRightShadow: false 
      })
    },
    handleSingleScrollRight(e) {
      this.setData({
        hideLeftShadow: false,
        hideRightShadow: true
      })
    },
    // 处理滚动，用 debounce 节省性能
    handleSingleScroll: debounce(function(e) {
      const { scrollLeft, scrollWidth } = e.detail
      const {hideLeftShadow, hideRightShadow} = this.data
      if (scrollLeft > 50 && scrollWidth - scrollLeft - 375 > 50) {
        this.setData({
          hideLeftShadow: false,
          hideRightShadow: false
        })
      }
    }, 100),

    // 选择日期后的事件
    handleChange(e) {
      const { item } = e.currentTarget.dataset
      const { value } = this.properties
      if(item.date !== value) {
        this.setData({ value: item.date })
        this.triggerEvent('change', { value: item.date})
      }
    }
  }
})
