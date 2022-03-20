module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/front-end_questionnaire/'
    : '/',
  transpileDependencies: [
    'vue-meta'
  ]
}
