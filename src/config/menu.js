export default [
    {
        path: '/home',
        component: 'HomeIndex',
        name: '首页',
        icon:'home'
    },
    {
        path: '/article',
        component: 'Article',
        name: '文章',
        icon:'book',
        route:[
            {
                path: '/article/list',
                component: 'ArticleList',
                name: '文章列表',
                icon:'book',
            },
            {
                path: '/article/admin',
                component: 'ArticleAdmin',
                name: '文章管理',
                icon:'book',
            }
        ]
    },
    {
        path: '/about',
        component: 'About',
        name: '关于我们',
        icon:'coffee'
    }

]