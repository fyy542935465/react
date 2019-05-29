import React from 'react';
import { Tabs } from 'antd'
import util from "../../util"
import { connect } from 'react-redux'
import global from '../../config/global'
import "./style.less"

const { TabPane } = Tabs;

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountData: [],
            articleData: []
        }
    }

    componentWillMount() {
        util.get('/getAdmin',{userId:this.props.store.userId}, res => {
            console.log(res)
            this.setState({
                isAdmin:res.isAdmin,
                superAdmin:res.superAdmin
            })
            this.getArticleList()
            this.getAccountList()
        })
        
    }

    switch(activeKey) {
        if (activeKey > 1) {
            this.getArticleList()
        } else {
            this.getAccountList()
        }
    }

    getArticleList() {
        util.get('/article/getArticleList', {}, res => {
            this.setState({
                articleData: res
            })
        })
    }

    getAccountList() {
        util.get('/getUserList', {}, res => {
            this.setState({
                accountData: res
            })
        })
    }

    toArticle(id){
        this.props.history.push('/detail/' + id)
    }

    delAccount(id){
        let params = {
            userId:this.props.store.userId,
            accountId:id
        }
        let msg = '确认删除选择的账号？'
        if(params.userId == params.accountId){
            msg = "确认删除选择的账号，删除需要重新登陆"
        }
        util.confirm(msg, () => {
            util.post('/delAccount',params,res => {
                if(params.userId == params.accountId){
                    this.props.history.push('/login')
                    return
                }
                this.getAccountList()
            })
        })
    }

    judgeAdmin(item){
        let el = '';
        if(item.isAdmin){
            if(this.state.superAdmin){
                if(item.userId == this.props.store.userId){
                    return ''
                }
                return <a href="javascript:;" className="is-admin">撤销管理员</a>
            }else{
                if(item.superAdmin){
                    if(item.userId == this.props.store.userId){
                        return ''
                    }
                    return <span className="is-admin">超级管理员</span>
                }
                return <span className="is-admin">管理员</span>
            }
        }else{
            if(this.state.superAdmin){
                return <a href="javascript:;" className="is-admin">设置管理员</a>
            }
        }
    }

    accountTmp(data) {
        return data.map((item, index) => {
            return (
                <li key={index} id={item.userId}>
                    <img src={item.img? global.imgUrl + item.img : require('../../common/img/avatar.png')} alt="" className="avatar" />
                    <span className="name">{item.username}</span>{this.judgeAdmin(item)}
                    <div className="oprate">
                        {item.superAdmin? '' : <a href="javascript:;" onClick={this.delAccount.bind(this,item.userId)}>删除</a>}
                    </div>
                    <span className="updateTime">{item.updateTime}</span>
                </li>
            )
        })
    }

    articleTmp(data) {
        return data.map((item, index) => {
            return (
                <li key={index} id={item._id}>
                    <span className="name">作者：{item.author}</span>
                    <span className="title" onClick={this.toArticle.bind(this,item._id)}>标题：<a href="javascript:;">{item.title}</a></span>
                    <div className="oprate">
                        <a href="javascript:;">删除</a>
                    </div>
                    <span className="updateTime">{item.updateTime}</span>
                    
                </li>
            )
        })
    }


    render() {
        return (
            <div id="admin">
                <Tabs onChange={this.switch.bind(this)} type="card">
                    <TabPane tab="账号管理" key="1">
                        <ul className="account-list">
                            {this.accountTmp(this.state.accountData)}
                        </ul>

                    </TabPane>
                    <TabPane tab="文章管理" key="2">
                        <ul className="article-list">
                            {this.articleTmp(this.state.articleData)}
                        </ul>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(Admin)