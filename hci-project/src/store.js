const storeModule = {
    state: {
        counter: 1,
        users: [],
        messenger: [],
        calendar: [],
        lists: []
    },

    getters: {
        getCounter: function (state) {
            return state.counter;
        },
        getUsers: function (state) {
            return state.users;
        },
        getMessenger: function (state) {
            return state.messenger;
        },
        getCalendar: function (state) {
            return state.calendar;
        },
        getList: function (state) {
            return state.lists;
        }
    },

    mutations: {
        incrementCounter(state) {
            state.counter++;
        },
        // setUsers(state, payload) {

        // }
    },

    actions: {
        incrementCounter({ commit }) {
            commit('incrementCounter')
        },
        // initializeJSONData({commit}) {
        //     // commit()
        // }
    }

}

export default storeModule;