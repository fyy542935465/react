import axios from 'axios';
import { message} from 'antd'
import { loading } from './index'

const checkStatus = (res,sCallBack) => {
    if(!res.data.status){
        loading(false)
        message.error(res.data.data.msg)
        return;
    }

    sCallBack && sCallBack(res.data.data)
}

export const get = (url,params,callback) => {
    return axios.get(url,params)
        .then( res => {
            checkStatus(res,callback)
        }).catch( err => {
            console.log(err)
        })
}

export const post = (url,params,callback) => {
    console.log(url)
    return axios.post( url,params)
        .then( res => {
            checkStatus(res,callback)
        }).catch( err => {
            console.log(err)
        })
}

