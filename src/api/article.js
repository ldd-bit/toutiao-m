import request from '@/utils/request'

// 获取文章列表
export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 获取联想建议
export const getSuggestion = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params
  })
}

// 获取搜索结果
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

// 获取用户搜索历史
export const getSearchHistory = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/search/histories'
  })
}

// 删除所有用户搜索历史
export const deleteSearchHistory = () => {
  return request({
    methods: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}

// 获取文章详情
export const getArticleItem = articleId => {
  return request({
    methods: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
