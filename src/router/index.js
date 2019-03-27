import Home from "../pages/Home"
import Another from "../pages/Another"
import About from "../pages/About"
import Login from "../pages/Login"


export default [
    {
        path: '/home',
        component: Home,
        name: 'Home',
        key:'sub1',
        route:[
            {
                path: '/home/another',
                component: Another,
                name: 'Another',
            },
            {
                path: '/home/about',
                component: About,
                name: 'About'
            }
        ]
    },
    {
        path:'/login',
        component: Login,
        name:'Login',
        key:'sub2'
    },
]