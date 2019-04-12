import React, { Component } from 'react'
import "./App.less"
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './router'
import './style/reset.css'
import './style/main.less'
import Loading from './components/Loading'
import Login from './pages/Login'
import store from './store'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: store.getState().loading,
            token:store.getState().token
        }
    }

    componentWillMount() {
        let _this = this
        store.subscribe(() => {
            _this.setState({
                loading: store.getState().loading,
                token: store.getState().token
            })
        })
    }

    renderRouter(){
        let isLogin = localStorage.getItem('token') || this.state.token
        console.log(isLogin);
        return (
            <Switch>
                    <Redirect exact from='/' to='/home'/>
                    {
                        this.eachRoutes(isLogin)
                    }
                    
            </Switch>
        )
    }

    eachRoutes(isLogin){
        return routes.map((item, key) => {
            if (item.exact) {
                return <Route key={key} exact path={item.path} render={props => (
                    isLogin? (<item.component {...props} routes={item.route} />) : (<Login />)
                )}/>
            } else {
                return <Route path={item.path} key={key}
                      render={props => (
                          isLogin? (<item.component {...props} routes={item.route} />) : (<Login />)
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
                    this.state.loading? <Loading /> : ''
                }
            </div>
        );
    }
}

export default App;