import request from '@/utils/request'
// 登录/注册接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取短信验证码
export const getCode = data => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${data}`
  })
}

// 获取指定用户信息
export const getMyInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户频道列表
export const getchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// 获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 修改用户频道
export const editUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

// 删除用户频道
export const deleteUserChannel = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}

// 关注用户
export const followUser = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export const cancelUser = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`
  })
}

// 获取个人资料
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

// 修改个人资料
export const editUserInfo = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 编辑用户照片资料
export const editUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
