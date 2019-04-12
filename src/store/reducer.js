/*
* Reducer 数据处理
* */

import { type } from './action'

const initialState = {
    menuName:'首页',
    loading:false,
    token:'',
    userId:''
}

export default (state=initialState,action) => {
    switch(action.type){
        //菜单选中
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            }
        //loading
        case type.LOADING:
            return {
                ...state,
                loading: action.status
            }
        //token
        case type.TOKEN:
            return {
                ...state,
                token: action.token
            }
        //userId
        case type.ID:
            return {
                ...state,
                userId: action.userId
            }
        default:
            return {
                ...state
            }
    }
}