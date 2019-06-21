import React from 'react';
import { Input, Icon, Button, message, Table, Row, Col} from 'antd'
import util from "../../util"
import { connect } from 'react-redux';
import "./style.less"
import Theader from '../Header'
import NewsetArticle from '../NewestArticle'
import HotArticle from '../HotArticle'
import Comment from '../Comment'

class ArticleDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info:{},
            commentList:[]
        }
    }

    componentDidMount(){
        this.getDetail()
    }

    getDetail(id){
        id = id || this.props.match.params.id
        util.loading(true)
        util.get('/article/detail/' + id,{}, res => {
            util.loading(false)
            this.setState({
                info:res.acticleInfo,
                commentList:res.commentList,
                article_id: this.props.match.params.id
            })
        })
    }
    back(){
        this.props.history.goBack()
    }
    
    componentWillReceiveProps(nextProps){
        let current_id = nextProps.match.params.id
        if(current_id && (current_id != this.state.id)){
            this.setState({
                id: current_id
            })
            this.getDetail(current_id)
        }
    }
    render() {
        return (
            <div>
                <Theader></Theader>
                <div id="articleDetails" style={{display:(this.state.info.title)? 'block' : 'none'}}>
                    <Button size="small" onClick={this.back.bind(this)} id="back_btn">返回</Button>
                    <Row gutter={16}>
                        <Col span={16}>
                            {/* 文章内容 */}
                            <div id="artcicleIfo">
                                <div className="article-top">
                                    <span className="article-title">{this.state.info.title}</span>
                                    <span className="update-time">{this.state.info.create_time}&nbsp;&nbsp;&nbsp;&nbsp;作者：{this.state.info.username}</span>
                                </div>
                                <div className="article-content" dangerouslySetInnerHTML={{__html:this.state.info.edit_content}}></div>
                            </div>

                            <Comment id={this.state.id} commentList={this.state.commentList}/>
                        </Col>
                        <Col span={8}>
                            <div className="side-right">
                                <div className="panel">
                                    <div className="panel-title">最新发表</div>
                                    <div className="article-list">
                                        <NewsetArticle />
                                    </div>
                                </div>

                                <div className="panel">
                                    <div className="panel-title">热门文章</div>
                                    <div className="article-list">
                                        <HotArticle />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(ArticleDetails)