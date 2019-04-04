import React from 'react'
import './style.less'
import {
    Menu,
    Icon,
    Col
} from 'antd';

import { withRouter } from "react-router-dom"
import routes from '../../router'
import { connect } from 'react-redux'
import { switchMenu } from '../../store/action'
import store from "../../store";
 
const { SubMenu } = Menu;
class NavLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuName: store.getState().menuName
        }
    }

    componentWillMount() {
        let _this = this
        store.subscribe( () => {
            _this.setState({
                menuName:store.getState().menuName
            })
        })
    }

    eachMenu(list){
        return list.map( (item,key) => {
            if(item.route){
                return (
                    <SubMenu key={item.name} title={<span><Icon type='user' />{item.name}</span>}>
                        {this.eachSubmenu(item.route)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.name} onClick={this.pushRouter.bind(this,item.path)}>
                        <Icon type='user' />
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
        this.props.history.push(path)
    }
    render() {
        return (
            <Col span={6}>
                <div id="navLeft">
                    <Menu
                      mode="inline"
                      selectedKeys={[this.state.menuName]}
                      defaultOpenKeys={['Home']}
                      style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.eachMenu(routes)}
                    </Menu>
                </div>
            </Col>
        )
    }
}

export default connect()(withRouter(NavLeft));