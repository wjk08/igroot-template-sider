/**
 * HTTP 请求高阶函数
 */
const request = method => (url, data, headers = {}, fetchObj = {}) => {
  // 默认的传输格式为 JSON
  const body = !!data ? JSON.stringify(data) : undefined

  return fetch(url, {
    method,
    body,
    credentials: 'include',
    mode: 'cors',
    headers,
    ...fetchObj
  })
}

export const httpRequest = {
  /**
   * GET 请求
   * @param {String}      url
   * @param {Object = {}} data     查询参数
   * @param {Object = {}} headers  请求头对象
   * @param {Object = {}} fetchObj fetch参数对象
   */
  get(url, data = {}, headers = {}, fetchObj = {}) {
    const keys = Object.keys(data)
    const params = keys.length !== 0 ? `?${  keys.map(key => `${key}=${data[key]}`).join('&')}` : ''

    return fetch(`${url}${params}`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers,
      ...fetchObj
    })
  },

  patch: request('PATCH'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE'),
}
