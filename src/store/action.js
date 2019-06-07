/*
* Action 类型
* */
export const type = {
    SWITCH_MENU:'SWITCH_MENU',
    LOADING:'LOADING',
    TOKEN:'TOKEN',
    ID:'ID',
    DEFAULT_MENU_KEY:'DEFAULT_MENU_KEY'
}

/*
* 菜单高亮选中
* */
export const switchMenu = (menuName) => {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}

/*
* loading
* */
export const Loading = (status) => {
    return {
        type:type.LOADING,
        status
    }
}

/*
* 自己菜单选中父级菜单展开
* */
export const defaultMenuKey = (defaultMenuKey) => {
    return {
        type:type.DEFAULT_MENU_KEY,
        defaultMenuKey
    }
}

/*
* 设置token
* */
export const setToken = (token) => {
    return {
        type:type.TOKEN,
        token
    }
}

/*
* 设置user_id
* */
export const setId = (user_id) => {
    return {
        type:type.ID,
        user_id
    }
}

