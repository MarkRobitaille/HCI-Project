const storeModule = {
    state: {
        counter: 1
    },

    getters: {
        getCounter: function (state) {
            return state.counter;
        }
    },

    mutations: {
        incrementCounter(state) {
            state.counter++
        }
        
    },

    actions: {
        incrementCounter({ commit }) {
            commit('incrementCounter')
        }
    },

}

export default storeModule;