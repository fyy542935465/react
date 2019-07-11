import React from 'react';
import './style.less'
import { Input, Icon, Button, message } from 'antd'
import util from '../../util'
import { LOGIN, REGISTER } from '../../config/api'
import { setToken, setId,setsuper_admin,setAdmin} from '../../store/action'
import { connect } from 'react-redux'
import store from '../../store'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            title: '登录',
            form: {
                username: '',
                password: ''
            },
        }
    }

    componentDidMount() {
        util.loading(false)
        document.addEventListener("keydown", e => {
            if(e.keyCode === 13){
                this.userOperation()
            }
        });
    }

    resetForm() {
        let form = {
            username: '',
            password: ''
        }
        this.setState({
            form: form
        })
    }

    toRegister() {
        this.setState({
            title: '注册',
            register: true
        })

        this.resetForm()
    }

    toLogin() {
        this.setState({
            title: '登录',
            register: false
        })
        this.resetForm()
    }

    renderRegister() {
        if (!this.state.register) {
            return (
                <div className="go">
                    <span onClick={this.toRegister.bind(this)}>还没有账号？ 去注册</span>
                </div>
            )
        } else {
            return (
                <div className="go">
                    <span onClick={this.toLogin.bind(this)}>去登录</span>
                </div>
            )
        }
    }

    userOperation() {
        let _this = this
        if (!this.state.form.username) {
            message.warning('账号不能为空')
            return
        }
        if (!this.state.form.password) {
            message.warning('密码不能为空')
            return
        }

        let url = this.state.register ? REGISTER : LOGIN
        util.loading(true)
        util.post(url, {
            username: this.state.form.username,
            password: this.state.form.password
        }, res => {
            util.loading(false)
            store.dispatch(setToken(res.token))
            store.dispatch(setId(res.user_id))
            localStorage.setItem('token', res.token)
            localStorage.setItem('user_id', res.user_id)

            _this.props.history.push('/home');
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
                                onChange={event => {
                                    util.handleChange('username', event, this)
                                }}
                                name="username"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                value={this.state.form.username}
                            />
                        </div>
                        <div className="form-item">
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码"
                                onChange={event => {
                                    util.handleChange('password', event, this)
                                }}
                                name="password"
                                value={this.state.form.password}
                            />
                        </div>

                        <div className="form-item">
                            <Button type="primary" onClick={this.userOperation.bind(this)} block>{this.state.title}</Button>
                        </div>
                        {this.renderRegister()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(Login);