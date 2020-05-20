import dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文包
dayjs.locale('zh-cn') // 全局使用

// 创建全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

Vue.filter('timeFormat', value => {
  return dayjs(value).from(dayjs())
})
// // 日期格式化
// dayjs().to(dayjs())
