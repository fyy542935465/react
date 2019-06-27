import React,{Fragment}from 'react';
import util from "../../util"
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class HotArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newestArticle:[]
        }
    }

    componentDidMount(){
        this.getHotArticleList()
    }

    // //获取最新发表
    getHotArticleList(){
        util.get('/api/article/getHotArticleList',{},res => {
            this.setState({
                hotArticle:this.HotArticleList(res.list)
            })
        })
    }

    goArticle(id){
        this.props.history.push('/detail/' + id)
    }

    // //最新文章列表
    HotArticleList(list){
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
                    {this.state.hotArticle}
                </ul>
            </Fragment>
        )
    }
}

export default withRouter(connect(util.mapStateToProps)(HotArticle))