import React from 'react';
import style from './style.less'
import { Input,Icon,Button } from 'antd'
import { post }  from '../../util/http'
console.log(post)
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            register:false,
            title:'登录'
        }
    }

    toRegister(){
        this.setState({
            title:'注册',
            register:true
        })
    }

    toLogin(){
        this.setState({
            title:'登录',
            register:false
        })
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
        post('/login',{
            username:'111',
            password:222
        },res => {
            console.log(res)
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
                                   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        </div>
                        <div className="form-item">
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
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