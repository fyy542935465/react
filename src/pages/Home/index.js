import React,{Fragment} from 'react';
import NavLeft from '../../components/NavLeft'
import Theader from '../../components/Header'
import Content from '../../components/Content'
import {Route,Redirect} from 'react-router-dom'
import {
    Row
} from 'antd'

export default class Home extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.routes)
    }

    render() {
        return (
            <Fragment>
                    <Theader></Theader>
                    <Row>
                        <NavLeft />
                        
                        <Content>
                            <Route exact path="/home" render={() =>
                                <Redirect to='/home/another'></Redirect>}>
                            </Route>
                            {
                                this.props.routes.map((item,key) => {
                                    return <Route key={key} path={item.path} component={item.component} />
                                })
                            }
                        </Content>
                    </Row>
            </Fragment>
        )
    }
}