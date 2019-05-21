import React, { Component } from 'react'
import "./App.less"
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './router'
import './style/reset.css'
import './style/main.less'
import Loading from './components/Loading'
import Login from './pages/Login'
import { connect } from 'react-redux'
import { mapStateToProps } from './util'
class App extends Component {
    constructor(props) {
        super(props);
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

export default connect(mapStateToProps)(App);