// postcss的配置文件
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 转换情况下的基准值
      // Vant 组件库是基于逻辑像素375写的
      rootValue: 37.5,
      // 需要转换的css属性,*就是所有属性都要转换
      propList: ['*']
    }
  }
}
