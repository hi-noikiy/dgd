const CGI = require('../constant/cgi')
const request = require('request')
module.exports = {
	// 查询应收信息
	queryfee(options){
		request({
			url: CGI.nontax.queryfee,
			data: options.data,
			success: res => {
				console.log(' success', res);
			}
		})
	},
	// 支付下单
	unifiedorder(options){
		request({
			url: CGI.nontax.unifiedorder,
			data: options.data,
			success: res => {
				console.log(' success', res);
			}
		})
	},

	// 查询订单
	getorder(options){
		request({
			url: CGI.nontax.getorder,
			data: options.data,
			success: res => {
				console.log(' success', res);
			}
		})
	}

};