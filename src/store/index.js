import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/storage'

Vue.use(Vuex)
const user = 'toutiao-user'
export default new Vuex.Store({
  state: {
    user: getToken(user)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setToken(user, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
