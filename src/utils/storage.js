// 获取本地存储token
export const getToken = user => {
  // data可能不是JSON格式的字符串
  const data = window.localStorage.getItem(user)
  // return JSON.parse(window.localStorage.getItem(user))
  try {
    // data是JSON格式的字符串
    return JSON.parse(data)
  } catch {
    // data不是JSON格式的字符串
    return data
  }
}

// 设置本地存储token
export const setToken = (user, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  window.localStorage.setItem(user, data)
}

// 移除本地存储token
export const removeToken = user => {
  return window.localStorage.removeItem(user)
}
