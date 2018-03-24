const QQMapWX = require('./qqmap-wx-jssdk.min.js');
const { mapKey } = require('../constant/config')
const qmap = new QQMapWX({
  key: mapKey // 必填
});

module.exports = qmap