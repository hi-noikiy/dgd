module.exports = {
  // 小程序相关
  mp: {
    login: '/api/mp/login',                          // 登录
    get_real_name: '/api/mp/get_real_name',          // 实名认证
  },

  // 非税缴费
  nontax: {
    queryfee: '/api/nontax/queryfee'
  },

  // 模板消息
  message: {
  	saveFormId: '',									// 收集formId
  	send: ''										// 发送模板消息
  }
}