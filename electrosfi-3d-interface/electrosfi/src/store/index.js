import Vue from 'vue'
import Vuex from 'vuex'

import simulator from './module-simulator'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    simulator
  }
})
