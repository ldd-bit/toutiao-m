import axios from 'axios'
import store from '@/store/index'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user) {
    config.headers = {
      Authorization: `Bearer ${user.token}`
    }
  }
  return config
})

export default request
