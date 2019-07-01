import axios from 'axios';
import { message} from 'antd'
import util from './index'
import store from '../store';
import { HashRouter } from 'react-router-dom';
const Router = new HashRouter()
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

export const axiosRequest  = ()  => {
    axios.interceptors.request.use( config => {
        let token = store.getState().token || window.localStorage.token;
        if (token) {
          config.headers.Authorization = `${token}`
        }
        return config
    }, error => {
        return Promise.reject(error);
    });
}

export const axiosResponse = () => {
    axios.interceptors.response.use( response => {
    //用响应数据做某事
    let data = response.data
    if(!data.status){
        if(data.data.msg == 'token invalid'){
            Router.history.push('login')
        }
        util.loading(false)
        return;
    }
        return response;
        },error => {
    //做一些响应错误的事情
        return Promise.reject(error);
    });
}