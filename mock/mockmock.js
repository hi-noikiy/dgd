
let Mock = require("WxMock.js");

Mock.mock('http://qq.com/aaa', {
  "code": 200,
  "data|1-20": [
    {
      "email": function () {
        return Mock.Random.dataImage()
      },
      "lastLogin": function () {
        return Mock.Random.datetime('yyyy-MM-dd A HH:mm:ss')
      }
    }
  ]
})