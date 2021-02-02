import Vue from 'vue';
import Vuex from 'vuex';
import State from './basic/state.js';
import Getters from './basic/getters.js';
import Mutaions from './basic/mutations.js';
import Actions from './basic/actions.js';
// 模块

Vue.use(Vuex);
export default new Vuex.Store({
    state: State,
    getters: Getters,
    mutations: Mutaions,
    actions: Actions,
    modules: {}
});
