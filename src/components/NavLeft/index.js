import React from 'react'
import './style.less'
import {
    Menu,
    Icon,
    Col
} from 'antd';

import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { switchMenu } from '../../store/action'
import store from "../../store";
import menu from "../../config/menu"

 
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
                      selectedKeys={[this.state.menuName]}
                      defaultOpenKeys={['Home']}
                      style={{ height: '100%', borderRight: 0 }}
                    >
                        {this.eachMenu(menu)}
                    </Menu>
                </div>
            </Col>
        )
    }
}

export default connect()(withRouter(NavLeft));