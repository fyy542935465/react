import React from 'react'
import './style.less'
import {
    Menu,
    Icon,
    Col
} from 'antd';

import { withRouter } from "react-router-dom"
import routes from '../../router'
 
const { SubMenu } = Menu;

class NavLeft extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    eachMenu(list){
        return list.map( (item,key) => {
            if(item.route){
                return (
                    <SubMenu key={item.key} title={<span><Icon type='user' />{item.name}</span>}>
                        {this.eachSubmenu(item.route)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.key} onClick={this.pushRouter.bind(this,item.path)}>
                        <Icon type='user' />
                        <span>{item.name}</span>
                    </Menu.Item>
                )
            }
        })
    }

    eachSubmenu(list){
        return list.map( (item) => {
            return (
                <Menu.Item key={item.name} onClick={this.pushRouter.bind(this,item.path)}>{item.name}</Menu.Item>
            )
        })
    }

    pushRouter(path){
        let pathname = this.props.location.pathname
        if(pathname == path) return;
        this.props.history.push(path)
    }
    render() {
        return (
            <Col span={6}>
                <div id="navLeft">
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['Another']}
                      defaultOpenKeys={['sub1']}
                      style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.eachMenu(routes)}
                    </Menu>
                </div>
            </Col>
        )
    }
}

export default withRouter(NavLeft)