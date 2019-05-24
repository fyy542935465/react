import React from 'react';
import './style.less'
import { post } from '../../util/http'
import { loading, handleChange } from '../../util'
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import util from '../../util'

class Article extends React.Component {
    constructor(props) {
        super(props);

    }

    eachSubRoutes(){
        let isLogin = this.props.store.token
        let token = localStorage.getItem('token')
        if(this.props.routes && this.props.routes.length){
            return this.props.routes.map((item,key) => {
                return token? <Route key={key} path={item.path} render={props => (
                    <item.component {...props} isLogin={isLogin} routes={item.route || ''} />
                )} /> : <Route path={item.path} key={key}
                    render={props => (
                        <Redirect to='/login'></Redirect>
                    )}
                />
            })
        }
    }

    render() {
        return (
            <div id="article">
                <Router>
                    <Switch>
                        <Route exact path="/article" render={() =>
                            <Redirect to='/article/list'></Redirect>}>
                        </Route>
                        {
                            this.eachSubRoutes()
                        }
                    </Switch>
                </Router>
            </div>
        )

    }
}

export default connect(util.mapStateToProps)(Article)