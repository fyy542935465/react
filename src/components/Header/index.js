import React from 'react';
import {
    Menu,
    Layout,
    Modal,
    Input,
    Button,
    Dropdown,
    Icon
} from 'antd';
import './style.less'
import { connect } from 'react-redux'
import { get, post } from '../../util/http'
import { GETUSERINFO, UPLOAD } from '../../config/api'
import { loading, handleChange } from '../../util'
import config from '../../config'
import store from '../../store'
import { setToken,setId } from '../../store/action'
const avatar = require('../../common/img/avatar.png')

const { Header } = Layout;

class Theader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userAvatar: avatar,
            username: '',
            form: {
                username: '',
                files: ''
            },
            formAvatar: avatar,
            userId:store.getState().userId,
            menu: <Menu>
                    <Menu.Item key="1" onClick={this.handleVisibleShow}>
                      个人中心
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="2" onClick={this.logout}>退出登录</Menu.Item>
                  </Menu>
        }
    }

    componentWillMount() {
        let _this = this
        store.subscribe(() => {
            _this.setState({
                userId: store.getState().userId
            })
        })

        setTimeout( () => {
            _this.getUserInfo()
        },50)
        console.log(this.state)
    }

    handleCancel = (e) => {
        let form = {
            username: this.state.initName,
            files: ''
        }
        this.setState({
            visible: false,
            form: form
        });
    }

    handleVisibleShow = () => {
        let initName = this.state.form.username
        this.setState({
            visible: true,
            initName: initName
        });
    }

    handleOk = (e) => {
        let _this = this
        let formData = new FormData()
        formData.append('imgFile', this.state.files)
        formData.append('username', this.state.form.username)
        formData.append('userId', localStorage.getItem('userId'))
        post(UPLOAD, formData, res => {
            _this.getUserInfo()
        })
        this.setState({
            visible: false
        });
    }

    getUserInfo = () => {
        console.log(this.state.userId)
        let _this = this
        loading(true)
        get(GETUSERINFO, {
            params: {
                userId:localStorage.getItem('userId') || _this.state.userId
            }
        }, res => {
            loading(false)
            let from = {
                username: res.username
            }

            _this.setState({
                username: res.username,
                userAvatar: res.img ? config.imgUrl + res.img : avatar,
                formAvatar: res.img ? config.imgUrl + res.img : avatar,
                form: from
            })
        })
    }

    uploadAvatar = () => {
        console.log(1)
        let Btn = document.getElementById('uploadInput');
        Btn.click();
    }

    handleChange = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        let _this = this
        this.setState({
            files: file
        })

        reader.onload = function(e) {
            _this.setState({
                formAvatar: e.target.result
            })
        }
        reader.readAsDataURL(file)

    }

    logout = () => {
        localStorage.clear();
        store.dispatch(setToken(''))
        store.dispatch(setId(''))
    }

    render() {
        return (
            <Header id="head">
                <div className="logo">LOGO</div>
                <Dropdown overlay={this.state.menu} trigger={['click']}>
                    <div id="userCenter">
                        <img src={this.state.userAvatar} className="avatar" />
                        <span className="username">{this.state.username}</span>

                    </div>
                </Dropdown>

                <div className="user-info">
                    <Modal
                      title="个人资料"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                    <div className="user-info-item">
                        <label>头像：</label>
                        <img src={this.state.formAvatar} className="avatar" />
                        <Button type="primary" className="upload-avatar-btn" onClick={this.uploadAvatar}>上传头像</Button>
                        <input type="file" id="uploadInput" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="user-info-item">
                        <label>昵称：</label>
                        <Input className="user-input" value={this.state.form.username} onChange={ event =>{
                                    handleChange('username',event,this)
                                } }/>
                    </div>
                      
                    </Modal>
                </div>
            </Header>

        )
    }
}


export default connect()(Theader);