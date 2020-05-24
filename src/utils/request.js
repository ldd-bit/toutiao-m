import axios from 'axios'
import store from '@/store/index'
import jsonBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return jsonBig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return {
        data
      }
    }
  }]
})

const refreshToken = axios.create({
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
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // console.dir(error)
  const state = error.response.status
  if (state === 400) {
    Toast.fail('请求参数错误')
  } else if (state === 401) {
    // 如果没有user并且没有user.token则直接登录
    if (!store.state.user || !store.state.user.token) {
      return router.replace('/login')
    }
    try {
      // 重新发请求
      const { data } = await refreshToken({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${store.state.user.refresh_token}`
        }
      })
      console.log(data)
      store.state.user.token = data.data.token
      store.commit('setUser', store.state.user)
      return request(error.config)
    } catch {
      console.log(111)
      router.replace('/login')
    }
    // 如果有refresh-token,则获取新的token
    // 如果获取token失败,则重新登陆
  } else if (state === 403) {
    Toast.fail('没有操作权限')
  } else if (state === 500) {
    Toast.fail('服务端错误')
  }
  return Promise.reject(error)
})

export default request
