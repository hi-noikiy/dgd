module.exports = {
  // 小程序相关
  mp: {
    login: '/api/mp/login',                          // 登录
    get_real_name: '/api/mp/get_real_name',          // 实名认证
  },

  // 非税缴费
  nontax: {
    // 查询应收信息
    queryfee: '/api/nontax/queryfee',

    // 支付下单
    unifiedorder: '/api/nontax/unifiedorder',

    // 查询订单
    getorder: '/api/nontax/getorder'
  },

  // 模板消息
  message: {
  	saveFormId: '',									// 收集formId
  	send: ''										// 发送模板消息
  }
}