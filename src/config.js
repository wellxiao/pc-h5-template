/**
 *  项目配置
 */
const ENV = process.env.NODE_ENV

// 基础路径 、基础路由
let baseURL
switch (ENV) {
  case 'production':
    baseURL = 'https://api.mobilemart.cn'
    break
  case 'test':
    baseURL = 'https://test-api.mobilemart.cn'
    break
  case 'development':
    baseURL = 'https://test-api.mobilemart.cn'
    break
  default:
    baseURL = 'https://dev-api.mobilemart.cn'
}

module.exports = {
  name: 'wellxiao',
  baseURL,
}
