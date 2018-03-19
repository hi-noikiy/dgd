const CGI = require('../constant/cgi')
const request = require('../../utils/request')

module.exports = {
	// 收集formId
	saveFormId(options){
		request({
			url: CGI.message.saveFormId,
			data: {},
			success: res => {
				console.log('message saveFormId success', res);
			}
		})
	},
	// 发送模板消息
	send(options){
		request({
			url: CGI.message.send,
			data: {},
			success: res => {
				console.log('message send success', res);
			}
		})
	}
};