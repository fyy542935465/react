/*
* Action 类型
* */
export const type = {
    SWITCH_MENU:'SWITCH_MENU',
    LOADING:'LOADING',
    TOKEN:'TOKEN',
    ID:'ID'
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
* 菜单高亮选中
* */
export const Loading = (status) => {
    return {
        type:type.LOADING,
        status
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
* 设置userId
* */
export const setId = (userId) => {
    return {
        type:type.ID,
        userId
    }
}