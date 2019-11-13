import HelloWorld from './components/HelloWorld.vue'
// import Home from './components/Home.vue'
import Messenger from './components/Messenger.vue'
import Calendar from './components/Calendar.vue'
import Lists from './components/Lists.vue'
import Settings from './components/Settings.vue'

const routes = [
    {
        path: '/',
        component: HelloWorld, // Change to Home once implemented
        name: "Home",
        meta: {
            title: "Home"
        }
    },
    {
        path: '/messenger',
        component: Messenger,
        name: "Messenger",
        meta: {
            title: "Messenger"
        }
    },
    {
        path: '/calendar',
        component: Calendar,
        name: "Calendar",
        meta: {
            title: "Calendar"
        }
    },
    {
        path: '/lists',
        component: Lists,
        name: "Lists",
        meta: {
            title: "Lists"
        }
    },
    {
        path: '/settings',
        component: Settings,
        name: "Settings",
        meta: {
            title: "Settings"
        }
    },
]

export default routes;