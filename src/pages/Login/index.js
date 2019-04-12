import React from 'react';
import './style.less'
import { Input,Icon,Button,message } from 'antd'
import { post }  from '../../util/http'
import { LOGIN ,REGISTER} from '../../config/api'
import { loading,handleChange} from '../../util'
import { withRouter } from "react-router-dom"
import { setToken,setId} from '../../store/action'
import store from '../../store'
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            register:false,
            title:'登录',
            form:{
                username:'',
                password:''
            },
            token:store.getState().token,
            userId:store.getState().userId,
        }
        this.userOperation = this.userOperation.bind(this)
    }


    componentWillMount() {
        let _this = this
        store.subscribe( () => {
            _this.setState({
                token:store.getState().token,
                userId:store.getState().userId
            })
        })
    }

    resetForm(){
        let form = {
            username:'',
            password:''
        }
        this.setState({
            form:form
        })
    }

    toRegister(){
        this.setState({
            title:'注册',
            register:true
        })

        this.resetForm()
    }

    toLogin(){
        this.setState({
            title:'登录',
            register:false
        })
        this.resetForm()
    }

    renderRegister(){
        if(!this.state.register){
            return (
                <div className="go">
                    <span onClick={this.toRegister.bind(this)}>还没有账号？ 去注册</span>
                </div>
            )
        }else{
            return (
                <div className="go">
                    <span onClick={this.toLogin.bind(this)}>去登录</span>
                </div>
            )
        }
    }

    userOperation(){
        let _this = this
        let currentPath = this.props.pathname
        if(!this.state.form.username){
            message.warning('账号不能为空')
            return
        }
        if(!this.state.form.password){
            message.warning('密码不能为空')
            return
        }

        let url = this.state.register? REGISTER : LOGIN
        loading(true)
        post(url,{
            username:this.state.form.username,
            password:this.state.form.password
        },res => {
            loading(false)
            _this.props.history.push(currentPath);
             store.dispatch(setToken(res.token))
             store.dispatch(setId(res.userId))
            localStorage.setItem('token',res.token)
            localStorage.setItem('userId',res.userId)
        })
    }
    render() {
        return (
            <div id="user">
                <div id="container">
                    <div className="title">
                        {this.state.title}
                    </div>
                    <div id="form-container">
                        <div className="form-item">
                            <Input placeholder="请输入账号"
                                   onChange={ event =>{
                                       handleChange('username',event,this)
                                   } }
                                   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                   value={this.state.form.username}
                            />
                        </div>
                        <div className="form-item">
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                                onChange={ event =>{
                                    handleChange('password',event,this)
                                } }
                                value={this.state.form.password}
                            />
                        </div>

                        <div className="form-item">
                            <Button type="primary" onClick={this.userOperation} block>{this.state.title}</Button>
                        </div>
                        {this.renderRegister()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)