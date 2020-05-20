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
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}

// 删除所有用户搜索历史
export const deleteSearchHistory = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}

// 获取文章详情
export const getArticleItem = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const collection = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const notcollection = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}

// 对文章点赞
export const likings = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞文章
export const notlikings = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

// 获取文章评论
export const articleComment = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

// 添加文章评论
export const addArticleComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}

// 对评论或评论回复点赞
export const likingComment = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消对评论或评论回复点赞
export const nolikingComment = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
