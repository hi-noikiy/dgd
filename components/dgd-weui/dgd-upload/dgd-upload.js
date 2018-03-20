// components/dgd-upload.js
const formControlBehavior = require('../behaviors/form-control')

Component({
  behaviors: [formControlBehavior],
  externalClasses: ['component-class'],
  relations:{
    '../dgd-form/dgd-form': {
      type: 'ancestor'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    action: String,
    headers: {
      type: Object,
      value:{}
    },
    data: Object,
    name:{
      type: String,
      value: 'file'
    },
    maxNum: {
      type: Number,
      value: 10
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    files: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseImage(e) {
      const currentLen = this.data.files.length;
      if (currentLen >= this.properties.maxNum) {
        wx.showModal({
          content: '所选图片超过上限',
          showCancel: false,
        });
      } else {
        wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            if (currentLen + res.tempFilePaths.length > this.properties.maxNum) {
              wx.showModal({
                content: '所选图片超过上限',
                showCancel: false,
              });
              return;
            }
            let imgs = [...this.data.files];
            res.tempFilePaths.forEach((tempFilePath) => {
              let img = {
                tempFilePath,
                status: true,
                progress: 0,
                uploadFail: false
              };
              imgs.push(img);
              let uploadTask = wx.uploadFile({
                url: this.properties.action,
                filePath: tempFilePath,
                name: this.properties.name,
                header: this.properties.headers,
                formData: this.properties.data,
                fail:(err) => {
                  img.uploadFail = true;
                  img.status = true;
                  console.log(err);
                  this.setData({
                    files: imgs
                  });
                  this.triggerEvent('uploadFail', err);
                },
                success: (res) => {
                  this.setData({
                    files: imgs
                  });
                  this.triggerEvent('upload', res);
                }
              });
              if (uploadTask) {
                uploadTask.onProgressUpdate((res) => {
                  if (res.progress == 100) {
                    img.progress = '';
                    img.status = false;
                  } else {
                    img.progress = res.progress;
                  }
                  this.setData({
                    files: imgs
                  });
                });
              }
            });
            this.setData({
              files: imgs
            });
            this.triggerEvent('change', imgs.map(img => img.tempFilePath));
          },
          fail: (err) => {
            console.log(err);
            this.triggerEvent('chooseFail',err);
          }
        })
      }
    },
    previewImage(e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files.map(file => file.tempFilePath) // 需要预览的图片http链接列表
      });
    },
    delImg(e) {
      var newFiles = [];
      this.setData({
        files: this.data.files.filter((file,index) => {
          if (index !== e.target.dataset.index) {
            newFiles.push(file.tempFilePath);
            return true;
          } else {
            return false;
          }
          // return index !== e.target.dataset.index
        })
      });
      this.triggerEvent('change', newFiles);
    },

    warn(config) {

    }
  }
})
