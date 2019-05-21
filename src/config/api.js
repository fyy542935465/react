import site from './index'
import env from '../env'

const api = site[env.CURRENT].url

//登录
export const LOGIN = api + '/login'

//注册
export const REGISTER = api + '/register'

//获取用户个人信息
export const GETUSERINFO = api + '/getUserInfo'

//上传头像
export const UPLOAD = api + '/uploadImg'
