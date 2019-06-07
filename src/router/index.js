import Home from "../pages/Home"
import Another from "../pages/Another"
import About from "../pages/About"
import Login from "../pages/Login"
import HomeIndex from "../pages/homeIndex"
import Article from "../pages/Article"
import ArticleList from "../components/ArticleList"
import ArticleManage from "../components/ArticleManage"
import ArticleDetails from "../components/ArticleDetails"
import Admin from "../pages/Admin"


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
                        path: '/article/manage',
                        component: ArticleManage,
                        name: '文章发布'
                    }
                ]
            },
            {
                path: '/admin',
                component: Admin,
                name: '后台管理'
            },
            {
                path: '/about',
                component: About,
                name: '关于我们'
            }
        ]
    }
]
