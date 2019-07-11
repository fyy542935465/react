import React, { Component } from 'react'
import "./App.less"
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import routes from './router'
import './style/reset.css'
import './style/main.less'
import Loading from './components/Loading'
import Login from './pages/Login'
import { connect } from 'react-redux'
import util from './util'
import { axiosRequest, axiosResponse } from './util/http'
import io from 'socket.io-client'
import store from './store'
import {setSocket} from "./store/action"
import { Button, notification } from 'antd'
axiosRequest();
axiosResponse();
const _router = new Router()

class App extends Component {
    constructor(props) {
        super(props);
    }

    goArticle(key,article_id){
        notification.close(key)
        _router.history.push('/detail/' + article_id)
    }

    componentDidMount(){
        console.log(this.props)
       let socket = io('http://127.0.0.1:3826')
       store.dispatch(setSocket(socket))
       socket.on('msg',(data)=>{
        //监听浏览器通过msg事件发送的信息
            data = JSON.parse(data)
            console.log(data)
            let key = `open${Date.now()}`
            if(data.reply_id &&  (data.reply_id == this.props.store.user_id)){
                notification.open({
                    message: '你有新的评论',
                    description:data.name + '回复了你的评论~',
                    btn:(
                        <Button type="primary" size="small" onClick={ this.goArticle.bind(this,key,data.article_id)}>
                          去看看
                        </Button>
                      ),
                      key:key
                })
            }

            if(data.reply_id){
                if(this.props.store.user_id == data.user_id){
                    notification.open({
                        message: '你的文章有新回复啦',
                        description:data.name + '回复了' + data.reply_name + '的评论~',
                        btn:(
                            <Button type="primary" size="small" onClick={ this.goArticle.bind(this,key,data.article_id)}>
                              去看看
                            </Button>
                          ),
                          key:key
                    })
                }
            }else{
                if(this.props.store.user_id == data.user_id){
                    notification.open({
                        message: '你的文章有新评论啦',
                        description:data.name + '评论了你的文章',
                        btn:(
                            <Button type="primary" size="small" onClick={ this.goArticle.bind(this,key,data.article_id)}>
                              去看看
                            </Button>
                          ),
                          key:key
                    })
                }
            }
        })
    }

    renderRouter(){
        return (
            <Switch>
                    <Redirect exact from='/' to='/home'/>
                    {
                        this.eachRoutes(this.props.store.token)
                    }
                    
            </Switch>
        )
    }

    eachRoutes(isLogin){
        return routes.map((item, key) => {
            if (item.exact) {
                return <Route key={key} exact path={item.path} render={props => (
                    isLogin? <item.component {...props} isLogin={isLogin} routes={item.route || ''} /> : (item.path == '/login'? <Login /> : <Redirect to='/login'></Redirect>)
                )}/>
            } else {
                return <Route path={item.path} key={key}
                      render={props => (
                          isLogin? <item.component {...props} isLogin={isLogin} routes={item.route || ''} /> : (item.path == '/login'? <Login /> : <Redirect to='/login'></Redirect>)
                      )}
                />
            }
        })
    }

    render() {
        return (
            <div id="App">
                {this.props.children}
                <Router>
                    {
                         this.renderRouter()
                    }
                    
                </Router>
                {
                    this.props.store.loading? <Loading /> : ''
                }
            </div>
        );
    }
}

export default connect(util.mapStateToProps)(App)