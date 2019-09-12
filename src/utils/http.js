/*
 * @Author: wellxiao
 * @Date: 2019-09-12 19:27:46
 */
import cookie from '@/utils/cookie'
import instance from './instance'

const showLoading = commit => {
    commit('showLoading', null, { root: true })
}

const finishLoading = commit => {
    commit('finishLoading', null, { root: true })
}

const fetch = options => {
    // 每次都去检查一遍，一点开销，提升体验
    // 有些公司的请求头里带token了
    // const token = cookie.getCookie('Authtoken')
    // if (token) {
    //     // 时间重置为5小时
    //     cookie.setCookieAndTimeAndPath('Authtoken', token, 5 * 60 * 60)
    //     // 设置请求头统一携带token
    //     instance.defaults.headers.common['X-AuthToken-With'] = token
    // }
    const { method = 'get', url, data, timeout, responseType, headers = {} } = options
    switch (method.toLowerCase()) {
        case 'get':
            return instance.get(url, {
                params: data,
                headers,
                responseType,
                timeout,
            })
        case 'delete':
            return instance.delete(url, {
                params: data,
                headers,
                responseType,
                timeout,
            })
        case 'post':
            return instance.post(url, data, { headers, responseType, timeout })
        case 'put':
            return instance.put(url, data, { headers, responseType, timeout })
        case 'patch':
            return instance.patch(url, data, { headers, timeout })
        default:
            return instance(options)
    }
}
/**
 * http
 * @param {*} method
 * @param {*} url
 * @param {*} obj
 * @returns {*} obj 返回参数  { message: '', statusCode: 0, result }
 */
export const request = async ({ commit, responseType, ...config }) => {
    if (commit) showLoading(commit)
    try {
        /* eslint-disable camelcase */
        const { data, headers } = await fetch({ ...config, responseType })
        if (commit) finishLoading(commit)
        // 兼容下载
        if (responseType && responseType === 'blob') {
            return Promise.resolve({ result: data, headers })
        }
        const { error_code, err_msg } = data
        if (error_code !== null && error_code !== 0) {
            return Promise.reject({ message: err_msg, statusCode: error_code })
        }
        return Promise.resolve({
            message: err_msg || '',
            statusCode: error_code || 0,
            result: data.data,
        })
    } catch (error) {
        if (commit) finishLoading(commit)
        const { response } = error
        let msg
        let statusCode
        if (response && response instanceof Object) {
            const { data, statusText } = response
            statusCode = response.status
            msg = data.message || statusText
        } else {
            statusCode = 600
            msg = error.message || 'Network Error'
        }

        return Promise.reject({ statusCode, message: msg })
    }
}
