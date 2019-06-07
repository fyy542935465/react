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
                path: '/article/manage',
                component: 'ArticleManage',
                name: '文章发布',
                icon:'book',
            }
        ]
    },
    {
        path: '/admin',
        component: 'Admin',
        name: '后台管理',
        icon: 'user'
    },
    // {
    //     path: '/about',
    //     component: 'About',
    //     name: '关于我们',
    //     icon:'coffee'
    // }

]