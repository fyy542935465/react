import React from 'react'
import './style.less'
import {
    Menu,
    Icon,
    Col
} from 'antd';

import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import menu from "../../config/menu"
import util  from '../../util'
 
const { SubMenu } = Menu;
class NavLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentWillMount() {
        console.log(this.props.store)
    }

    eachMenu(list){
        return list.map( (item,key) => {
            if(item.route){
                return (
                    <SubMenu key={item.name} title={<span><Icon type= {item.icon} />{item.name}</span>}>
                        {this.eachSubmenu(item.route)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.name} onClick={this.pushRouter.bind(this,item.path)}>
                        <Icon type={item.icon} />
                        <span>{item.name}</span>
                    </Menu.Item>
                )
            }
        })
    }

    eachSubmenu(list){
        console.log(list)
        return list.map( (item) => {
            return (
                <Menu.Item key={item.name} onClick={this.pushRouter.bind(this,item.path)}>{item.name}</Menu.Item>
            )
        })
    }

    pushRouter(path){
        console.log(path)
        this.props.history.push(path)
    }
    render() {
        return (
            <Col span={6}>
                <div id="navLeft">
                    <Menu
                      mode="inline"
                      selectedKeys={[this.props.store.menuName]}
                      defaultOpenKeys={[this.props.store.defaultMenuKey]}
                      style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.eachMenu(menu)}
                    </Menu>
                </div>
            </Col>
        )
    }
}

export default withRouter(connect(util.mapStateToProps)(NavLeft))