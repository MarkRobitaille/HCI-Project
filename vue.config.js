module.exports = {
    publicPath: '',
    chainWebpack: config => {
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            options['transformAssetUrls'] = {
              img: 'src',
              image: 'xlink:href'
            }
    
            return options
          })
      }
}