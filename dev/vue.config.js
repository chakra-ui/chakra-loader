const { ChakraLoaderPlugin } = require('../lib')

module.exports = {
  configureWebpack: {
    plugins: [
      new ChakraLoaderPlugin()
    ]
  }
}
