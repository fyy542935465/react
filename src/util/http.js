import axios from 'axios';
import { message} from 'antd'
import util from './index'

const checkStatus = (res,sCallBack) => {
    if(!res.data.status){
        util.loading(false)
        message.error(res.data.data.msg)
        return;
    }

    sCallBack && sCallBack(res.data.data)
}

export const get = (url,params,callback) => {
    return axios.get(url,{
        params:params
    })
        .then( res => {
            checkStatus(res,callback)
        }).catch( err => {
            console.log(err)
        })
}

export const post = (url,params,callback) => {
    return axios.post( url,params)
        .then( res => {
            checkStatus(res,callback)
        }).catch( err => {
            console.log(err)
        })
}

