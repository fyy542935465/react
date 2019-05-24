import Home from "../pages/Home"
import Another from "../pages/Another"
import About from "../pages/About"
import Login from "../pages/Login"
import HomeIndex from "../pages/homeIndex"
import Article from "../pages/Article"
import ArticleList from "../components/ArticleList"
import ArticleAdmin from "../components/ArticleAdmin"
import ArticleDetails from "../components/ArticleDetails"


export default [
    {
        path:'/login',
        component: Login,
        name:'Login',
        key:'sub2',
        exact:true
    },
    {
        path: '/detail/:id',
        component: ArticleDetails,
        name: '文章详情'
    },
    {
        path: '/',
        component: Home,
        name: 'Home',
        key:'sub1',
        route:[
            {
                path: '/home',
                component: HomeIndex,
                name: '首页',
            },
            {
                path: '/article',
                component: Article,
                name: '文章',
                route:[
                    {
                        path: '/article/list',
                        component: ArticleList,
                        name: '文章列表'
                    },
                    {
                        path: '/article/admin',
                        component: ArticleAdmin,
                        name: '文章管理'
                    }
                ]
            },
            {
                path: '/about',
                component: About,
                name: '关于我们'
            }
        ]
    }
]
