import React,{Fragment} from 'react';
import NavLeft from '../../components/NavLeft'
import Theader from '../../components/Header'
import Content from '../../components/Content'
import {HashRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import util from '../../util'
import {
    Row
} from 'antd'

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    eachSubRoutes(){
        let isLogin = this.props.store.token
        let token = localStorage.getItem('token')
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

    render() {
        return (
            <Fragment>
                    <Theader></Theader>
                    <div id="wapper">
                        <NavLeft />
                        
                        <Content>
                            {/* <Route exact path="/home" render={() =>
                                <Redirect to='/home/homeIndex'></Redirect>}>
                            </Route> */}
                            <Router>
                                <Switch>
                                    {
                                        this.eachSubRoutes()
                                    }
                                </Switch>
                            </Router>
                        </Content>
                    </div>
            </Fragment>
        )
    }
}

export default connect(util.mapStateToProps)(Home)