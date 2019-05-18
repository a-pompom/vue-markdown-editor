module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/global.scss";`
      }
    }
  },
  outputDir: 'docs',
  assetsDir: './',
  publicPath: './'
};