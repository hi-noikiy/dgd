// test/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      card: '',
      phone: '13763031092',
      vcode: '',
      checkbox: [],
      radio: [],
      selector: '',
      multiSelector: ['a', 'c', 'f'],
      time: '',
      date: '',
      region: [],
      files:[]
    },
    rules: {
      card: [{
        type: 'required',
        message: '请输入卡号'
      }],
      vcode: [{
        type: 'required',
        message: '请输入卡号'
      }],
      phone: [{
        type: 'mobile',
        message: '请输入正确的手机号'
      }],
      checkbox: [{
        type: 'required',
        message: '请选择城市'
      }],
      radio: [{
        type: 'required',
        message: '请选择 Radio 城市'
      }],
      selector: [{
        type: 'required',
        message: '请选择 Selector'
      }],
      files: [{
        type: 'required',
        message: '请选择上传图片'
      }]
    },

    // checkbox
    checkboxItems: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国' },
      { value: 'BRA', name: '巴西' }
    ],

    // radio
    radioItems: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国' },
      { value: 'BRA', name: '巴西' }
    ],

    // picker
    selectorRange: [
      { value: 'USA', name: '美国' },
      { value: 'CHN', name: '中国' },
      { value: 'BRA', name: '巴西' }
    ],
    multiSelectorRange: [
      [{ value: 'a', name: 'A1' }, { value: 'b', name: 'A2' }],
      [{ value: 'c', name: 'B1' }, { value: 'd', name: 'B2' }],
      [{ value: 'e', name: 'C1' }, { value: 'f', name: 'C2'}],
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        checkboxItems: [
          { value: 'USA', name: '美国', disabled: true },
          { value: 'CHN', name: '中国' },
          { value: 'BRA', name: '巴西' }
        ]
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  handleCardInput(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        card: e.detail.value
      }
    })
  },

  handlePhoneInput(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        phone: e.detail.value
      }
    })
  },

  handleVcodeInput(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        vcode: e.detail.value
      }
    })
  },

  handleSendVcode(e) {
    console.log(e)
  },

  handleCheckboxChange(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        checkbox: e.detail.value
      }
    })
  },

  handleRadioChange(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        radio: e.detail.value
      }
    })
  },

  handleUpload(e) {
    console.log(e);
    this.setData({
      formData: {
        ...this.data.formData,
        files: e.detail
      }
    })
  },
  
  handleChange(e) {
    console.log(e);
  },

  handleTextarea(e) {
    console.log(e);
  },

  handleSelectorChange(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        selector: e.detail.value
      }
    })
  },

  handleMultiSelectorChange(e) {
    console.log(e.detail.value)
    this.setData({
      formData: {
        ...this.data.formData,
        multiSelector: e.detail.value
      }
    })
  },

  handleColumnChange(e) {
    this.setData({
      multiSelectorRange: e.detail.value == 1 ? [
        [{ value: 'a', name: 'A1' }, { value: 'b', name: 'A2' }],
        [{ value: 'c', name: 'BB1' }, { value: 'd', name: 'BB2' }],
        [{ value: 'e', name: 'CC1' }],
      ] : [
        [{ value: 'a', name: 'A1' }, { value: 'b', name: 'A2' }],
        [{ value: 'c', name: 'B1' }, { value: 'd', name: 'B2' }],
        [{ value: 'e', name: 'C1' }, { value: 'f', name: 'C2' }],
      ]
    })
  },

  // getAuthInfo 实名认证
  getAuthInfo(e) {
    console.log(e)
  },

  handleFormSubmit(e) {
    console.log('表单提交', e.detail.value)  
    wx.showLoading({
      title: '提交中',
    })  
    if(e.detail.validStatus) {
      setTimeout(() => {
        wx.hideLoading()
      }, 1000)
    } else {
      wx.hideLoading()
    }
  },
})