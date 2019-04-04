import axios from 'axios';
import env from '../env'
import site from '../config/api'
const api = site[env.CURRENT]

console.log(api)

export const get = (url,params,callback) => {
    console.log(url)
    return axios.get(api + url,params)
        .then( res => {
            callback(res)
        }).catch( err => {
            console.log(err)
        })
}

export const post = (url,params,callback) => {
    console.log(url)
    return axios.post(api + url,params)
        .then( res => {
            callback(res)
        }).catch( err => {
            console.log(err)
        })
}

