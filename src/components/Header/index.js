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
import { GETUSERINFO, UPLOAD } from '../../config/api'
import util from '../../util'
import config from '../../config'
import store from '../../store'
import { setToken,setId } from '../../store/action'
import { connect } from 'react-redux'
const avatar = require('../../common/img/avatar.png')

const { Header } = Layout;

class Theader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userAvatar: "",
            username: '',
            form: {
                username: '',
                files: ''
            },
            formAvatar: "",
            user_id:this.props.store.user_id,
            menu: <Menu>
                    <Menu.Item key="1" onClick={this.handleVisibleShow}>
                      个人资料
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="2" onClick={this.handleVisibleShow}>
                      修改密码
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="3" onClick={this.logout}>退出登录</Menu.Item>
                  </Menu>
        }
    }

    componentWillMount() {
        this.getUserInfo()
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
        formData.append('user_id', localStorage.getItem('user_id'))
        util.post(UPLOAD, formData, res => {
            _this.getUserInfo()
        })
        this.setState({
            visible: false
        });
    }

    getUserInfo = () => {
        let _this = this
        util.loading(true)
        util.get(GETUSERINFO, {
            user_id:localStorage.getItem('user_id') || _this.state.user_id
        }, res => {
            util.loading(false)
            let from = {
                username: res.username
            }

            _this.setState({
                username: res.username,
                userAvatar: res.avatar ? util.imgUrl + res.avatar : avatar,
                formAvatar: res.avatar ? util.imgUrl + res.avatar : avatar,
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
                        {this.state.formAvatar? <img src={this.state.userAvatar} className="avatar" /> : ''}
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
                        {this.state.formAvatar? <img src={this.state.formAvatar} className="avatar" /> : ''}
                        <Button type="primary" className="upload-avatar-btn" onClick={this.uploadAvatar}>上传头像</Button>
                        <input type="file" id="uploadInput" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="user-info-item">
                        <label>昵称：</label>
                        <Input className="user-input" value={this.state.form.username} onChange={ event =>{
                                    util.handleChange('username',event,this)
                                } }/>
                    </div>
                      
                    </Modal>
                </div>
            </Header>

        )
    }
}


export default connect(util.mapStateToProps)(Theader)