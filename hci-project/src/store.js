import Users from "./assets/data/Users.json"
import Messenger from "./assets/data/Messenger.json"
import Calendar from "./assets/data/Calendar.json"
import Lists from "./assets/data/Lists.json"

const storeModule = {
    state: {
        counter: 1,
        currentUser: { id: 0 },
        users: [],
        messenger: [],
        calendar: [],
        lists: [],
        selectedDate: {},
        selectedMonth: 0,
        selectedDay: -1,
        selectedEvent: -1,
        addEvent: false
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
        },
        getCurrentUser: function (state) {
            return state.currentUser;
        },
        // getSelectedDate: function (state) {
        //     return state.selectedDate;
        // },
        getIsUnreadMessage: function (state) {
            let unread = false;
            for (let i = 0; i < state.messenger.length && !unread; i++) {
                unread = state.messenger[i].notification
            }
            return unread;
        },
        getCalendarState: function (state) {
            return {
                selectedMonth: state.selectedMonth,
                selectedDay: state.selectedDay,
                selectedEvent: state.selectedEvent,
                addEvent: state.addEvent
            };
        },
    },

    mutations: {
        incrementCounter(state) {
            state.counter++;
        },
        setUsers(state, payload) {
            state.users = payload.users;
            state.currentUser = state.users[2];
        },
        setMessenger(state, payload) {
            state.messenger = payload.conversations;
            // for (let i=0; i<state.messenger.length; i++) {
            // state.messenger[i].image = require(state.messenger[i].image);
            // }
        },
        setCalendar(state, payload) {
            state.calendar = payload.calendar;
        },
        setLists(state, payload) {
            state.lists = payload.lists;
        },
        // setSelectedDate(state, payload) {
        //     state.selectedDate = payload;
        // },
        // clearSelectedDate(state) {
        //     state.selectedDate = {};
        // },
        setSelectedMonth(state, payload) {
            state.selectedMonth = payload;
        },
        setSelectedDay(state, payload) {
            state.selectedDay = payload;
        },
        setSelectedEvent(state, payload) {
            state.selectedEvent = payload;
        },
        setAddEvent(state, payload) {
            state.addEvent = payload;
        },
        addEvent(state, payload) {
            let newEvent = {
                "name": payload.name,
                "allDay": payload.allDay,
                "startTime": "",
                "endTime": "",
                "description": payload.description,
                "createdBy": state.currentUser.id
            };

            if (newEvent.allDay) {
                state.calendar[payload.month].days[payload.day].events.unshift(newEvent);
            } else {
                newEvent.startTime = payload.startTime;
                newEvent.endTime = payload.endTime;

                let index = 0;
                while (state.calendar[payload.month].days[payload.day].events[index].startTime < newEvent.startTime) {
                    index++;
                }

                state.calendar[payload.month].days[payload.day].events.slice(index, 0, newEvent);
            }
        },
        removeEvent(state, payload) {
            state.calendar[payload.month].days[payload.day].events.splice(payload.event, 1);
        },
        setPrevMonth(state) {
            if (state.selectedMonth - 1 < 0) {
                state.selectedMonth = 11;
            } else {
                state.selectedMonth--;
            }
        },
        setNextMonth(state) {
            state.selectedMonth = (state.selectedMonth + 1) % 12;
        },
        setPrevDay(state) {
            if (state.selectedDay - 1 < 0) {
                if (state.selectedMonth - 1 < 0) {
                    state.selectedMonth = 11;
                } else {
                    state.selectedMonth--;
                }
                state.selectedDay = state.calendar[state.selectedMonth].days.length - 1;
            } else {
                state.selectedDay--;
            }
        },
        setNextDay(state) {
            if (state.selectedDay + 1 >= state.calendar[state.selectedMonth].days.length) {
                state.selectedMonth = (state.selectedMonth + 1) % 12;
                state.selectedDay = 0;
            }
            else {
                state.selectedDay++;
            }
        }
    },

    actions: {
        incrementCounter({ commit }) {
            commit('incrementCounter')
        },
        initializeJSONData({ commit }) {
            commit('setUsers', Users);
            commit('setMessenger', Messenger);
            commit('setCalendar', Calendar);
            commit('setLists', Lists);
        },
        // setSelectedDate({commit}, payload) {
        //     commit('setSelectedDate', payload);
        // },
        // clearSelectedDate({commit}) {
        //     commit('clearSelectedDate');
        // },
        setSelectedMonth({ commit }, payload) {
            commit('setSelectedMonth', payload);
        },
        setSelectedDay({ commit }, payload) {
            commit('setSelectedDay', payload);
        },
        setSelectedEvent({ commit }, payload) {
            commit('setSelectedEvent', payload);
        },
        setAddEvent({ commit }, payload) {
            commit('setAddEvent', payload);
        },
        addEvent({ commit }, payload) {
            commit('addEvent', payload);
        },
        removeEvent({ commit }, payload) {
            commit('removeEvent', payload)
        },
        setPrevMonth({ commit }) {
            commit('setPrevMonth');
        },
        setNextMonth({ commit }) {
            commit('setNextMonth');
        },
        setPrevDay({ commit }) {
            commit('setPrevDay');
        },
        setNextDay({ commit }) {
            commit('setNextDay');
        },
    }

}

export default storeModule;