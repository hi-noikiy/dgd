const validType = require('./validType.js')

module.exports = function(formData, validConfig) {
  const validPromise = Object.keys(formData)
    .reduce((arr, key) => {
      const value = formData[key]
      const configArr = validConfig[key]

      // 没有相关验证配置，则验证通过
      if (!configArr || !configArr.length) {
        return arr
      }

      // 是否有 required 配置
      const isRequired = configArr.filter(c => c.type === 'required').length > 0

      // * 使用 some 函数来提前终结函数执行，只需检测到一个错误即可退出
      configArr.some(config => {
        if (!config.type) {
          throw new Error('验证规则必须配置 type')
        }

        config.name = key
        // 如果没有值但是也没有 required 配置，则默认通过
        if (isRequired) {
          if(!value) {
            arr.push(Promise.resolve(config))
            return false
          }
        }

        if(config.type !== 'required' && value) {
          // 可代入函数进行校验，支持异步校验函数
          if (typeof config.type === 'function') {
            console.log(config.type, config.type.then)
            if (config.isAsync) {
              // 异步校验
              const asyncFn = config.type(value, formData)
                .then(flag => {
                  if(!flag) {
                    return config
                  }
                })
              arr.push(asyncFn)
              return false
            } else {
              if (!config.type(value, formData, config)) {
                arr.push(Promise.resolve(config))
                return false
              }
            }
          } else if (config.type === 'regexp') {
            if (!config.pattern.test(value)) {
              arr.push(Promise.resolve(config))
              return false
            }
          } else {
            const typeFunc = validType[config.type]
            if (typeFunc && !typeFunc(value, formData)) {
              arr.push(Promise.resolve(config))
              return false
            }
          }
        }
      })

      return arr
    }, [])

  return Promise.all(validPromise).then((arr) => {
    return arr.filter(item => item !== void 0)
  })
}