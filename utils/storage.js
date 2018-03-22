// 本地存储

module.exports = {
	getUserInfo(cb){
		wx.getStorage({
			key: 'userInfo',
			success: res => {
				cb(res.data);
			},
			fail: res => {
				cb()
			}
		})
	}
}