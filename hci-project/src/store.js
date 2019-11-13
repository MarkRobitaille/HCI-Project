import Users from "./assets/data/Users.json"
import Messenger from "./assets/data/Messenger.json"
import Calendar from "./assets/data/Calendar.json"
import Lists from "./assets/data/Lists.json"

const storeModule = {
    state: {
        counter: 1,
        loggedIn: { id: 0 },
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
        getLists: function (state) {
            return state.lists;
        }
    },

    mutations: {
        incrementCounter(state) {
            state.counter++;
        },
        setUsers(state, payload) {
            state.users = payload.users;
        },
        setMessenger(state, payload) {
            state.messenger = payload.conversations;
        },
        setCalendar(state, payload) {
            state.calendar = payload.calendar;
        },
        setLists(state, payload) {
            state.lists = payload.lists;
        }
    },

    actions: {
        incrementCounter({ commit }) {
            commit('incrementCounter')
        },
        initializeJSONData({commit}) {
            commit('setUsers', Users);
            commit('setMessenger', Messenger);
            commit('setCalendar', Calendar);
            commit('setLists', Lists);
        }
    }

}

export default storeModule;