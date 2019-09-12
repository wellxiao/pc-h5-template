/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue'
import cookie from './cookie'

const { $notify, $message } = Vue.prototype
/**
 * sessionStorage
 * @param {*} key
 * @param {*} value
 */
export const session = (key, value) => {
    /* eslint-disable no-void */
    if (value === void 0) {
        const lsVal = sessionStorage.getItem(key)
        if (lsVal && lsVal.indexOf('autostringify-') === 0) {
            return JSON.parse(lsVal.split('autostringify-')[1])
        }
        return lsVal
    }
    if (typeof value === 'object' || Array.isArray(value)) {
        value = `autostringify-${JSON.stringify(value)}`
    }
    return sessionStorage.setItem(key, value)
}
/**
 * 去除对象中的空属性
 *
 */
export const removeEmpty = obj => {
    Object.keys(obj).map(key => {
        if (obj[key] === '' || obj[key] === null) {
            delete obj[key]
        }
    })
    return obj
}
/**
 * 生成随机数
 * @param {*} len
 */
export const getUUID = len => {
    len = len || 6
    len = parseInt(len, 10)
    len = isNaN(len) ? 6 : len
    const seed = '0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ'
    const seedLen = seed.length - 1
    let uuid = ''
    while (len--) {
        uuid += seed[Math.round(Math.random() * seedLen)]
    }
    return uuid
}
/**
 * 深拷贝
 * @param {*} source
 */
export const deepcopy = source => {
    if (!source) {
        return source
    }
    const sourceCopy = source instanceof Array ? [] : {}
    /* eslint-disable */
    for (const item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
    }
    return sourceCopy
}

/**
 * ajax错误处理
 * @param {*} error
 */
export const catchError = error => {
    if (error.response) {
        switch (error.response.status) {
            case 404:
                error.response.statusText = '请求地址404'
                break
            case 403:
                error.response.statusText = '登录失效，请重新登录！'
                // 删除本地登录信息
                cookie.delCookiesAndPath('Authtoken')
                setTimeout(() => {
                    location.reload()
                }, 2000)
                break
            default:
                error.response.statusText = '服务端异常，请联系技术支持'
        }
    }
    return Promise.reject(error)
}

export const catchfinish = finish => {
    if (finish.data.error_code === -4 ) {
        // 删除本地登录信息
        finish.data.err_msg = '登录失效，请重新登录。'
        cookie.delCookiesAndPath('Authtoken')
        setTimeout(() => {
            window.location.href = '/'
        }, 2000)
        $message(finish.data.err_msg)
    }
    return Promise.resolve(finish)
}

/**
 * 从url中截取参数
 * 从浏览器地址栏里截取
 */
export const getQueryString = name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}
/**
 * 从任意url中截取参数
 */
export const getParamString = (name, url) => {
    const reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i')
    if (reg.test(url)) {
        return unescape(RegExp.$2.replace(/\+/g, ' '))
    }
    return ''
}

export const print = (className, isPrint) => {
    // 获取需要打印的内容
    const printContent = getDomByClass(className)[0].innerHTML
    getDomByClass('m-print')[0].innerHTML = printContent
    if (isPrint) window.print()
}

/**
 *  正则表达式校验手机号 1开头11位数
 */
export const checkMobile = mobile => {
    // 获取需要打印的内容
    const reg = /^1[0-9]{10}$/
    return reg.test(mobile)
}

/**
 *  获取n天前0点时间戳
 */
export const getNdaysAgoTimeStamp = n => {
    const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
    const minuend = 86400 * 1000 * n
    return timeStamp - minuend
}
/**
 *  获取n天前指定点时间戳
 */
export const getNdaysAgoFixTimeStamp = n => {
    const timeStamp = new Date(new Date().setHours(17, 0, 0, 0))
    const minuend = 86400 * 1000 * n
    return timeStamp - minuend
}

/**
 *  下载文件
 */
export const createAFordownLoad = (fileName, steam) => {
    if (!steam) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([steam]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
}


const isDev = process.env.NODE_ENV === 'development'
/**
 * 日志打印
 * @param {*} level 日志等级 默认为 log
 * @description 与原生功能一致
 * @example logger('error', 'a的值：', 2, 'b的值：', 3)
 */
export const logger = (level, ...record) => {
    if (!isDev) {
        return
    }
    if (console.hasOwnProperty(level)) {
        console[level](...record)
    } else {
        console.log(level, ...record)
    }
}
/**
 * 载入script
 * @param {*} src
 * @param {*} cb
 */
export const loadScript = (src, cb) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    // 异步载入
    script.async = true
    script.onload = () => {
        typeof cb === 'function' && cb()
    }
    script.src = src
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(script, s)
}
