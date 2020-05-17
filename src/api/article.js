import request from '@/utils/request'

// 获取文章列表
export const getArticleList = params => {
  return request({
    methods: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取联想建议
export const getSuggestion = params => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/suggestion',
    params
  })
}
