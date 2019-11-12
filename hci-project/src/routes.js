import HelloWorld from './components/HelloWorld.vue'

const routes = [
    {
        path: '/',
        component: HelloWorld,
        name: "Hello World",
        meta: {
            title: "TEST"
        }
    }
]

export default routes;