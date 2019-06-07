import React from 'react';
import { Input, Icon, Button, message, Table } from 'antd'
import util from "../../util"
import { connect } from 'react-redux';
import "./style.less"

class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultData: [
                {
                    title: '文章标题',
                    dataIndex: 'title',
                    key: 'title',
                    render: (text, record) => (
                        <span>
                            <a href="javascript:;" className="article-title" onClick={this.getDetail.bind(this, record.id)}>{record.title}</a>
                        </span>
                    )
                },
                {
                    title: '作者',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: '更新时间',
                    dataIndex: 'create_time',
                    key: 'create_time',
                }
            ],
            tabs: ['所有', '我的'],
            activeVal: '所有'
        }
    }

    componentWillMount() {
        this.getArticleList(this.state.activeVal)
    }

    getDetail(id) {
        this.props.history.push(`/detail/${id}`)
    }

    edit(id){
        this.props.history.push('/article/manage?id=' + id)
    }

    delete(id){
        util.post('/article/delete',{
            id:id
        }, res => {
            console.log(res)
            this.getArticleList(this.state.activeVal)
        })
    }

    getArticleList(item) {
        let params = {}
        let columns = [].concat(this.state.defaultData)
        if (item != '所有') {
            params.user_id = this.props.store.user_id
            columns.push({
                title: '操作',
                dataIndex: 'oprate',
                key: 'oprate',
                render: (text, record) => (
                    <div className="oprate">
                        <a href="javascript:;" onClick={this.edit.bind(this, record.id)}>编辑</a>
                        <a href="javascript:;" onClick={this.delete.bind(this, record.id)}>删除</a>
                    </div>
                )
            })
        }

        util.loading(true)
        util.get('/article/getArticleList', params, res => {
            util.loading(false)
            res.map( (item,index) => {
                item.key = index
            })
            this.setState({
                dataSource: res,
                columns:columns
            })
        })
    }

    swtch(item) {
        this.setState({
            activeVal: item
        })

        this.getArticleList(item)
    }

    renderTabs() {
        return this.state.tabs.map((item, index) => {
            return (
                <span key={index} className={this.state.activeVal == item ? 'active' : ''} onClick={this.swtch.bind(this, item)}>{item}</span>
            )
        })
    }
    render() {
        return (
            <div id="articleList">
                <div className="tabs">
                    {this.renderTabs()}
                </div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} on />
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(ArticleList)