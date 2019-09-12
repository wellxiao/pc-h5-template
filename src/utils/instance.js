import axios from 'axios'
import { baseURL } from '@/config'

import * as util from './methods'

const instance = axios.create({
    baseURL,
    timeout: 10000,
})
instance.defaults.headers.post['Content-Type'] = 'application/json'
// 错误处理
instance.interceptors.response.use(response => util.catchfinish(response)
, error => util.catchError(error))

export default instance
