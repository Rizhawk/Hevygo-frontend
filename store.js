import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    totalCost: null,
    sl: "",
  },
  mutations: {
    updateCost(state, cost) {
      state.totalCost = cost;
    },
    updateSl(state, startaddr) {
      state.sl = startaddr;
    },
  },
  getters: {
    totalCost: (state) => state.totalCost,
    sl: (state) => state.sl,
  },
});
