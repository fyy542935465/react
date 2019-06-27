import React from 'react';
import { Tabs,Pagination } from 'antd'
import util from "../../util"
import { connect } from 'react-redux'
import global from '../../config/global'
import "./style.less"

const { TabPane } = Tabs;

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: {
                list:[],
                pageSize:0
            },
            article: {
                list:[],
                pageSize:0
            }
        }
    }

    componentWillMount() {
        util.get('/api/getAdmin',{user_id:this.props.store.user_id}, res => {
            console.log(res)
            this.setState({
                is_admin:res.is_admin,
                super_admin:res.super_admin
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

    getArticleList(page,pageSize) {
        let params = {
            page:page || 1,
            pageSize:pageSize || 10
        }
        util.loading(true)
        util.get('/api/article/getArticleList', params, res => {
            util.loading(false)
            this.setState({
                article:{
                    list:res.list,
                    page:res.page,
                    total:res.total,
                    pageSize:res.pageSize
                }
            })
        })
    }

    getAccountList(page,pageSize) {
        let params = {
            page:page || 1,
            pageSize:pageSize || 10
        }
        util.loading(true)
        util.get('/api/getUserList', params, res => {
            util.loading(false)
            this.setState({
                account:{
                    list:res.list,
                    page:res.page,
                    total:res.total,
                    pageSize:res.pageSize
                }
            })
        })
    }

    toArticle(id){
        this.props.history.push('/detail/' + id)
    }

    delAccount(id){
        let params = {
            accountId:id
        }
        let msg = '确认删除选择的账号？'
        if(this.props.store.user_id == id){
            msg = "确认删除选择的账号，删除需要重新登陆"
        }
        util.confirm(msg, () => {
            util.post('/api/delAccount',params,res => {
                if(params.user_id == params.accountId){
                    this.props.history.push('/login')
                    return
                }
                this.getAccountList()
            })
        })
    }

    delArticle(id){
        util.confirm('确定删除此篇文章？', () => {
            util.post('/api/article/delete',{
                id:id
            }, res => {
                console.log(res)
                this.getArticleList(this.state.activeVal)
            })
        })
    }

    adminOprate(id){
        util.post('/api/adminOprate',{
            id:id
        },res => {
            this.getAccountList()
        })
    }

    judgeAdmin(item){
        let el = '';
        if(item.is_admin){
            if(this.state.super_admin){
                if(item.user_id == this.props.store.user_id){
                    return <a href="javascript:;" className="is-admin"></a>
                }
                return <a href="javascript:;" className="is-admin" onClick={this.adminOprate.bind(this,item.user_id)}>撤销管理员</a>
            }else{
                if(item.super_admin){
                    if(item.user_id == this.props.store.user_id){
                        return ''
                    }
                    return <span className="is-admin">超级管理员</span>
                }
                return <span className="is-admin">管理员</span>
            }
        }else{
            if(this.state.super_admin){
                return <a href="javascript:;" className="is-admin" onClick={this.adminOprate.bind(this,item.user_id)}>设置管理员</a>
            }
        }
    }

    accountTmp(data) {
        return data.map((item, index) => {
            return (
                <li key={index} id={item.user_id}>
                    <img src={item.avatar? global.imgUrl + item.avatar : require('../../common/img/avatar.png')} alt="" className="avatar" />
                    <span className="name">{item.username}</span>{this.judgeAdmin(item)}
                    <div className="oprate">
                        {item.super_admin? '' : <a href="javascript:;" onClick={this.delAccount.bind(this,item.user_id)}>删除</a>}
                    </div>
                    <span className="updateTime">{item.update_time}</span>
                </li>
            )
        })
    }

    articleTmp(data) {
        return data.map((item, index) => {
            return (
                <li key={index} id={item._id}>
                    <span className="name">作者：{item.username}</span>
                    <span className="title" onClick={this.toArticle.bind(this,item.id)}>标题：<a href="javascript:;">{item.title}</a></span>
                    <div className="oprate">
                        <a href="javascript:;" onClick={this.delArticle.bind(this,item.id)}>删除</a>
                    </div>
                    <span className="updateTime">{item.create_time}</span>
                    
                </li>
            )
        })
    }

    changeArticleSize(current){
        console.log(current)
        this.getArticleList(current)
    }

    changeAccountSize(current){
        console.log(current)
        this.getAccountList(current)
    }


    render() {
        return (
            <div id="admin">
                <Tabs onChange={this.switch.bind(this)} type="card">
                    <TabPane tab="账号管理" key="1">
                        <ul className="account-list">
                            {this.accountTmp(this.state.account.list)}
                        </ul>
                        <Pagination style={{display:(this.state.account.list.length) ? 'block' : 'none'}}className="list-pagination" current={this.state.account.page} total={this.state.account.total} 
                        pageSize={this.state.account.pageSize} 
                        onChange={this.changeAccountSize.bind(this)}></Pagination>
                    </TabPane>
                    <TabPane tab="文章管理" key="2">
                        <ul className="article-list">
                            {this.articleTmp(this.state.article.list)}
                        </ul>
                        <Pagination className="list-pagination" current={this.state.article.page} total={this.state.article.total} 
                        pageSize={this.state.article.pageSize} 
                        onChange={this.changeArticleSize.bind(this)}></Pagination>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(Admin)