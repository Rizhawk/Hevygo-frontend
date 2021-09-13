import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    totalCost: null,
  },
  mutations: {
    updateCost(state, cost) {
      state.totalCost = cost;
    },
  },
  getters: {
    totalCost: (state) => state.totalCost,
  },
});
