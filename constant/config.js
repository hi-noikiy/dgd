// 这里的东西不要随意改动, 构建工具有个约定写法
let isDev = true;



exports.appid = '{{appid}}'

exports.urlPrefix = isDev ? '{{devUrlPrefix}}' : '{{proUrlPrefix}}'

exports.mapKey = '{{mapKey}}'