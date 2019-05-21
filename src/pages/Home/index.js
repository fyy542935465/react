import React,{Fragment} from 'react';
import NavLeft from '../../components/NavLeft'
import Theader from '../../components/Header'
import Content from '../../components/Content'
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps } from '../../util'
import {
    Row
} from 'antd'

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    eachSubRoutes(){
        let token = localStorage.getItem('token')
        return this.props.routes.map((item,key) => {
            return token? <Route key={key} path={item.path} component={item.component} /> : <Route path={item.path} key={key}
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
                    <Row>
                        <NavLeft />
                        
                        <Content>
                            <div>{this.props.store.menuName}</div>
                            <Route exact path="/home" render={() =>
                                <Redirect to='/home/homeIndex'></Redirect>}>
                            </Route>
                            {
                                this.eachSubRoutes()
                            }
                        </Content>
                    </Row>
            </Fragment>
        )
    }
}

export default connect(mapStateToProps)(Home)