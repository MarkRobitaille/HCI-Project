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
        today: { month: 0, day: 0 },
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
        getToday: function(state) {
            return state.today;
        },
        getUnreadMessageCount: function (state) {
            let unread = 0;
            for (let i = 0; i < state.messenger.length; i++) {
                if (state.messenger[i].notification) {
                    unread++;
                }
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
        },
        setCurrentUser(state, payload) {
            state.currentUser = payload;
        },
        setMessenger(state, payload) {
            state.messenger = payload.conversations;
        },
        setToday(state, payload) {
            state.today = payload;
        },
        setCalendar(state, payload) {
            state.calendar = payload.calendar;
        },
        setLists(state, payload) {
            state.lists = payload.lists;
        },

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
                while (index < state.calendar[payload.month].days[payload.day].events.length && state.calendar[payload.month].days[payload.day].events[index].startTime < newEvent.startTime) {
                    index++;
                }

                state.calendar[payload.month].days[payload.day].events.splice(index, 0, newEvent);
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
        setToday({commit}, payload) {
            commit('setToday', payload);
        },
        setCurrentUser({commit}, payload) {
            commit('setCurrentUser', payload);
        },
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