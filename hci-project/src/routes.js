import HelloWorld from './components/HelloWorld.vue'

const routes = [
    {
        path: '/',
        component: HelloWorld,
        name: "Home",
        meta: {
            title: "Home"
        }
    },
    {
        path: '/messenger',
        component: HelloWorld,
        name: "Messenger",
        meta: {
            title: "Messenger"
        }
    },
    {
        path: '/calendar',
        component: HelloWorld,
        name: "Calendar",
        meta: {
            title: "Calendar"
        }
    },
    {
        path: '/lists',
        component: HelloWorld,
        name: "Lists",
        meta: {
            title: "Lists"
        }
    },
    {
        path: '/settings',
        component: HelloWorld,
        name: "Settings",
        meta: {
            title: "Settings"
        }
    },
]

export default routes;