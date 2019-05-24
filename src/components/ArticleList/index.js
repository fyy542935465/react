import React from 'react';
import { Input, Icon, Button, message, Table } from 'antd'
import util from "../../util"
import { connect } from 'react-redux';
import "./style.less"

class ArticleList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            columns:[
                {
                    title: '文章标题',
                    dataIndex: 'title',
                    key: 'title',
                    render:(text,record) => (
                        <span>
                            <a href="javascript:;" onClick={this.getDetail.bind(this,record._id)}>{record.title}</a>
                        </span>
                    )
                },
                {
                    title: '作者',
                    dataIndex: 'author',
                    key: 'author',
                },
                {
                    title: '更新时间',
                    dataIndex: 'updateTime',
                    key: 'updateTime',
                }
            ]
        }
    }

    componentWillMount(){
        this.getArticleList()
    }

    getDetail(id){
        this.props.history.push(`/detail/${id}`)
    }

    getArticleList(){
        let params = {
            userId:this.props.store.userId
        }
        util.get('/article/getArticleList',params, res => {
            this.setState({
                dataSource:res
            })
        })
    }
    render() {
        return (
            <div id="articleList">
                <Table dataSource={this.state.dataSource} columns={this.state.columns} on />
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(ArticleList)