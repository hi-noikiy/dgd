// components/dgd-weui/dgd-location/dgd-location.js
const qmap = require('../../../utils/qmap.js')
const { urlPrefix } = require('../../../constant/config')
const CGI = {
  getListByBizType: 'https://mp.digitalgd.com.cn/api/mp/login'
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultValue: {
      type: Array,
      value: ['广东省', '广州市']
    },
    bizType: {
      type: Number
    },
    value: {
      type: Array,
      value: [],
      observer(newValue) {
        this.setValueIndex(newValue)
      }
    }
  },

  data: {
    range: [],
    valueIndex: [0, 0]
  },

  ready() {
    if(!this.properties.bizType) {
      throw new Error('请传入业务 biz-type')
    }

    this.getProvinceByBizId()
      .then(() => this.initLocation())
      .then(() => this.getListByBizType())
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // location promise 化
    getLocation() {
      return new Promise((resolve, reject) => {
        wx.getLocation({
          success: (resp) => {
            resolve(resp)
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    },
    // 转化定位 promise 化
    convertCodeToLocation({ latitude, longitude }) {
      return new Promise((resolve, reject) => {
        qmap.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: (resp) => {
            if (resp.status === 0) {
              resolve(resp.result)
            } else {
              reject(resp)
            }
          },
          fail: (err) => {
            reject(err)
          }
        })
      })
    },
    // 自动定位初始化位置，根据腾讯地图换取位置
    initLocation() {
      const { defaultValue } = this.properties
      const { range } = this.data 

      return this.getLocation()
        .then(this.convertCodeToLocation)
        .then(resp => {
          const addressInfo = resp.address_component
          const value = [addressInfo.province, addressInfo.city]

          if (!range[0].includes(addressInfo.province)) {
            // 不支持的省份
            this.setToDefault()
          } else {
            // 返回自动定位
            this.setValueIndex(value)
            this.triggerEvent('change', { value })
          }
          return resp.address_component
        })
        .catch(err => {
          console.error(err)
          this.setToDefault()
        })
    },
    // 根据 value 设置 valueIndex
    setValueIndex(valueArr = this.data.value) {
      const { range } = this.data
      console.log(range)
      const valueIndex = range.map((arr, index) => {
        let vi = arr.indexOf(valueArr[index])
        return vi === -1 ? 0 : vi
      })
      this.setData({
        valueIndex
      })
    },
    // 根据业务 ID 获取可用省份
    getProvinceByBizId() {
      const { bizType } = this.properties

      // TODO 任务ID
      return Promise.resolve(['广东省'])
        .then((provinceArr) => {
          const range = [provinceArr, []]
          this.setData({
            range
          })
        })
    },
    // 根据业务 id 获取可转化的省市
    getListByBizType() {
      const { range, valueIndex } = this.data
      const { bizType } = this.properties
      
      const data = {
        biz_type: bizType,
        province: range[0][valueIndex[0]]
      }

      wx.request({
        url: CGI.getListByBizType,
        method: 'POST',
        data,
        success: (resp) => {
          if(resp.errcode === 0) {
            console.log(resp)
          } else {
            this.setData({
              range: [range[0], ['东莞市', '广州市', '清远市']]
            })
            this.setValueIndex()
          }
        }
      })
    },
    
    // 列改变，切换省份
    handleColumnChange(e) {
      const {column, value} = e.detail
      if (column === 0) {
        console.log('换省了，需要重新调用 getListByBizType 获取城市列表')
      }
    },

    // 回到默认省份
    setToDefault() {
      const { defaultValue } = this.properties

      this.setValueIndex(defaultValue)
      this.triggerEvent('change', {
        value: defaultValue
      })
    },

    // 切换城市对外接口
    handleChange(e) {
      const { range } = this.data
      const indexArr = e.detail.value

      const value = indexArr.map((valueIndex, index) => {
        return range[index][valueIndex]
      })
      this.triggerEvent('change', { value })
    }
  }
})
