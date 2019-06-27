import React,{ Fragment } from 'react';
import util from "../../util"
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './style.less'

class NewestArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newestArticle:[]
        }
    }

    componentDidMount(){
        this.getNewArticleList()
    }

    goArticle(id){
        this.props.history.push('/detail/' + id)
    }

    // //获取最新发表
    getNewArticleList(){
        util.get('/api/article/getArticleList',{
            page:1,
            pageSize:10
        },res => {
            this.setState({
                newestArticle:this.NewestArticleList(res.list)
            })
        })
    }

    // //最新文章列表
    NewestArticleList(list){
        if(list && list.length){
            return list.map( (item,index) => {
                return <li key={index}><a href="javascript:;" onClick={this.goArticle.bind(this,item.id)}>{item.title}</a> <span className="create-time">{item.create_time}</span></li>
            })
        }
    }

    render(){
        return (
            <Fragment>
                <ul>
                    {this.state.newestArticle}
                </ul>
            </Fragment>
            
        )
    }
}

export default withRouter(connect(util.mapStateToProps)(NewestArticle))