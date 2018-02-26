const withLess = require('@zeit/next-less')

module.exports = withLess({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  // webpack: function (config, { isServer }) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     loader: 'raw-loader'
  //   })

  //   return config
  // }
})