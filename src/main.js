import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载Vant组件库
import Vant from 'vant'

// 加载Vant组件库样式
import 'vant/lib/index.css'

// 自动设置REM基准值(html字体标签大小)
import 'amfe-flexible'

// 加载全局样式,最好放到最后,方便覆盖第三方样式
import './style/index.less'
import './utils/day'
// 全局注册Vant中的组件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
