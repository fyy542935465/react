import Home from "../pages/Home"
import Another from "../pages/Another"
import About from "../pages/About"
import Login from "../pages/Login"
import HomeIndex from "../pages/homeIndex"
import Article from "../pages/Article"


export default [
    {
        path: '/home',
        component: Home,
        name: 'Home',
        key:'sub1',
        route:[
            {
                path: '/home/homeIndex',
                component: HomeIndex,
                name: '首页',
            },
            {
                path: '/home/article',
                component: Article,
                name: '文章'
            },
            {
                path: '/home/about',
                component: About,
                name: '关于我们'
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
