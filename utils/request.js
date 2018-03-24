const app = getApp()
const {appid, urlPrefix} = require('../constant/config')
const CGI = require('../constant/cgi')

const requestUtils = {
  getCode(cb) {
    wx.login({
      success: (res) => {
        // console.log('getCode', res);
        cb(res.code)
      },
      fail: (res) => {
        // console.log('login getCode fail', res);
        cb();
      }
    })
  },

  checkSession(cb) {
    wx.checkSession({
      success: res => {
        cb(true)
      },
      fail: res => {
        console.error('get code fail', res);
        cb(false);
      }
    })
  },

  getUserInfo(cb) {
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        // 存储一份用户信息到本地
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo,
        })
        cb(res.encryptedData, res.iv);

      },
      fail: res => {
        console.error('getUserInfo fail', res);
      }
    })
  },

  fetchSessionId(cb) {
    this.getCode(code => {
      if (!code) return;

      this.getUserInfo((encryptedData, iv) => {
        wx.request({
          url: urlPrefix + CGI.mp.login,
          method: 'POST',
          data: {
            code,
            appid,
            encrypted_data: encryptedData,
            iv: iv
          },
          success: res => {
            console.log('fetchSessionId success', res);

            if (res.data.errcode === 0 && res.data.session_id) {
              const session_id = res.data.session_id
              // 缓存到内存
              this.sessionId = session_id;
              // 存到local
              wx.setStorage({
                key: 'sessionId',
                data: session_id
              });

              cb(session_id);
            } else {
              console.error('fetchSessionId no session_id', res)
            }
          },
          fail: res => {
            console.error('fetchSessionId fail', res)
          }
        })
      })
    })
  },

  getSessionId(cb) {
    console.log(this)
    this.checkSession(isValid => {

      if (!isValid) {
        this.fetchSessionId(cb);
        return;
      }

      if (this.sessionId) {
        cb(this.sessionId);
        return;
      }
      wx.getStorage({
        key: 'sessionId',
        success: res => {
          console.log(res)
          this.sessionId = res.data;
          cb(res.data);
        },
        fail: res => {
          console.log("storage doesn't have sessionId");
          this.fetchSessionId(cb);
        }
      })
    })
  }
}

// 对请求 promise 化封装
module.exports = (options) => {
  return new Promise((resolve, reject) => {
    requestUtils.getSessionId(sid => {
      wx.request({
        url: urlPrefix + options.url + '?sid=' + sid,
        method: 'POST',
        data: options.data,
        success: res => {
          resolve(res)
          options.success && options.success(res)
        },
        fail: err => {
          reject(err)
          options.fail && options.fail(err)
        },
        complete: options.complete
      })
    })
  })
}
