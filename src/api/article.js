import request from '@/utils/request'

// 获取文章列表
export const getArticleList = params => {
  return request({
    methods: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
