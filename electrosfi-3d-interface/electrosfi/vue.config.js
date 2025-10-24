module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
    chainWebpack: config => {
      config.module
        .rule('js')
        .use('babel-loader')
        .loader('babel-loader')
        .tap(options => {
          return {
            ...options,
            presets: ['@babel/preset-env']
          }
        })
    }
}