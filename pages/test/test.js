// pages/test/test.js
const request = require('../../utils/request')
const {appid, urlPrefix} = require('../../constant/config')
const CGI = require('../../constant/cgi')
const regeneratorRuntime = require('../../lib/regeneratorRuntime')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {

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

  async authinfo(resp) {
    // 接口正常
    if (resp.detail.errCode === 0) {
      const auth_token = resp.detail.auth_token
      console.log(auth_token)
      const resp = await request({
        url: CGI.mp.get_real_name,
        data: {
          auth_token,
          appid
        }
      })

      console.log(resp)
    }
  }
})