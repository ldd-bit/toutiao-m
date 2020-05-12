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
