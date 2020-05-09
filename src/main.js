import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './style/index.less'
// 加载Vant组件库
import Vant from 'vant'
// 加载Vant组件库样式
import 'vant/lib/index.css'
import 'amfe-flexible'
// 全局注册Vant中的组件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
