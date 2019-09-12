/*
 * @Author: chengfei & xiehuaqiang
 * @Date: 2018-07-20
 */
/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import app from './app'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const plugins = []

if (process.env.NODE_ENV !== 'production') {
  // const createLogger = require('vuex/dist/logger')
  // plugins.push(createLogger())
}
export default new Vuex.Store({
  modules: {
    common,
    app
  },
  strict: debug,
  plugins,
})
