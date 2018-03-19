// options = {
// 	idCard: 430******,  				// 身份证号码
// 	name: '刘德华'						// 姓名
// }
module.exports = (options) => {
	wx.startFacialRecognitionVerify({
      name: options.name,
      idCardNumber: options.idCard
      success: (res) => {
        console.log('suc', res);
      },
      fail: (res) => {
        console.log('fail', res)
      }
    })
}