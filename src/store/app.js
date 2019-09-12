/**
 *  全局状态
 */
/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue'
import {
  request
} from 'utils/http'

const {
  $message
} = Vue.prototype
export default {
  state: {
    loading: false,
  },
  getters: {
    loading({
      loading
    }) {
      return loading
    },
  },
  actions: {},
  mutations: {
    showLoading(state) {
      state.loading = true
    },
    finishLoading(state) {
      state.loading = false
    },
  },
}
