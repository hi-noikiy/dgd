const app = getApp();

module.exports = {
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
    this.geCode(code => {
      if (!code) return;

      this.getUserInfo((encryptedData, iv) => {
        wx.request({
          url: app.globalData.urlPrefix + 'login',
          method: 'POST',
          data: {
            code: code,
            appid: app.globalData.appid,
            encrypted_data: encryptedData,
            iv: iv
          },
          success: res => {
            console.log('fetchSessionId success', res);

            if (res.session_id) {
              // 缓存到内存
              this.sessionId = res.session_id;
              // 存到local
              wx.setStorage({
                key: 'sessionId',
                data: res.session_id
              });

              cb(res.session_id);
            }else{
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
    this.checkSession(isValid => {

      if (!isValid) {
        this.fetchSessionId(cb);
        return;
      }

      if(this.sessionId){
        cb(this.sessionId);
        return;
      }
      wx.getStorage({
        key: 'sessionId',
        success: res => {
          this.sessionId = res.data;
          cb(res.data);
        },
        fail: res => {
          console.error('getStorage sessionId fail', res);
          this.fetchSessionId(cb);
        }
      })
    })
  },

  request(options) {
    this.getSessionId(sid => {
      wx.request({
        url: app.globalData.urlPrefix + options.page + '?sid=' + sid,
        method: 'POST',
        data: options.data,
        success: res => {
          options.success(res);
        },
        fail: options.fail,
        complete: options.complete
      })
    });

  }
}