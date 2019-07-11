import React,{Fragment} from 'react';
import { Button,Input,Modal,Pagination } from 'antd'
import util from "../../util"
import { connect } from 'react-redux';
import icon from '../../common/img/down.png' 
import defaultImg from '../../common/img/avatar.png'
import "./style.less"
import "../../common/font/iconfont.css"
const { TextArea } = Input;


class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            commentVisible:false,
            list:[],
            page:'',
            pageSize:5,
            socket:''
        }
    }

    componentDidMount(){
       console.log(this.props)
       this.getComment(this.props.id)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id != this.props.id){
            console.log(nextProps.id,this.props.id)
            this.setState({
                id:nextProps.id
            })
            this.getComment(nextProps.id)
        }
    }

    handleChange(e){
        this.setState({
            comment:e.target.value
        })
    }
    
    commentVisible(comment_id,item){
        let commentVisible = !this.state.commentVisible
        if(comment_id){
            this.setState({
                commentVisible:commentVisible,
                comment:'',
                comment_id:comment_id,
                reply_id:item.user_id,
                reply_name:item.username
            })
            return
        }
        this.setState({
            commentVisible:commentVisible,
            comment:'',
            comment_id:null
        })
    }
    send(){
        util.loading(true)
        // 回复评论
        if(this.state.comment_id){
            util.loading(true)
            util.post('/api/article/comment/reply',{
                user_id:this.props.store.user_id,
                comment:this.state.comment,
                comment_id:this.state.comment_id,
                reply_id:this.state.reply_id,
                reply_name:this.state.reply_name
            }, res => {
                util.loading(false)
                this.commentVisible()
                this.getComment(this.state.id || this.props.id,this.state.page)
                let msg = {
                    user_id:this.props.store.user_id,
                    article_id:this.state.id || this.props.id,
                    reply_name:this.state.reply_name,
                    reply_id:this.state.reply_id
                }
                this.props.store.socket.emit('msg',JSON.stringify(msg));
            })
            return
        }

        // 评论文章
        util.post('/api/article/comment/save',{
            article_id:this.state.id || this.props.id,
            user_id:this.props.store.user_id,
            comment:this.state.comment
        }, res => {
            util.loading(false)
            this.commentVisible()
            this.getComment(this.state.id || this.props.id,this.state.page)
            //向指定的服务器建立连接，地址可以省略
            let msg = {
                user_id:this.props.store.user_id,
                article_id:this.state.id || this.props.id
            }
            this.props.store.socket.emit('msg',JSON.stringify(msg));
        })
    }

    getComment(id,page){
        util.get('/api/article/comment',{
            id:id || this.state.id,
            page:page || 1,
            pageSize:this.state.pageSize
        }, res => {
            this.setState({
                list:res.list,
                page:res.page,
                total:res.total,
                pageSize:res.pageSize
            })
        })
    }

    praise(id){
        util.post('/api/article/comment/praise',{
            id:id,
            user_id:this.props.store.user_id
        }, res => {
            console.log(res)
            this.getComment(this.props.id,this.state.page)
        })
    }

    commentList(commentList){
        if(commentList && commentList.length){
            let list = commentList.map( (item,index) => {
                return (
                    <li key={index}>
                        <div className="author">
                            <a href=""><img src={item.avatar? util.imgUrl + item.avatar : defaultImg} alt=""/></a>
                            <div className="user-info">
                                <div className="title">
                                    {item.username}
                                </div>
                                <div className="meta">
                                    {item.create_time}
                                </div>
                            </div>
                        </div>
                        <div className="user-comment">
                            {item.comment}
                        </div>
                        <div className="right">
                            <a href="javascript:;" onClick={this.praise.bind(this,item.id)}><span className="iconfont iconzan"></span>{item.praise? item.praise + '人觉得' : ''}赞</a>
                            {this.props.store.user_id == item.user_id? '' : (<a href="javascript:;" onClick={this.commentVisible.bind(this,item.id,item)}><span className="iconfont iconpinglun"></span> 回复</a>)}
                        </div>
                        {item.reply_comment.length? (
                            <div className="reply-list">
                            {
                                item.reply_comment.map((it,i) => {
                                    return (
                                        <div className="item" key={i}>
                                            <div className="reply-content">
                                                <a href="javascript:;">{it.username}：</a><a href="javascript:;">@ {it.reply_name} </a>
                                                {it.comment}
                                            </div>
                                            
                                            <span className="create-time">
                                                {it.create_time}
                                            </span>
                                            {this.props.store.user_id == it.user_id? '' : (
                                                <a href="javascript:;" onClick={this.commentVisible.bind(this,item.id,it)}><span className="iconfont iconpinglun"></span> 回复</a>
                                            )}
                                        </div>
                                    )
                                })
                            }   
                        </div>
                        ) : ''}
                        
                    </li>
                )
            })

            list = (
                <ul>
                    {list}
                </ul>
            )

            return list
            
        }else{
            return (
                <div id="noData">
                    暂无评论
                </div>
            )
        }
    }

    handleOk = () => {
        this.send();
    }

    onCancel = () => {
        this.setState({
            commentVisible:false
        })
    }

    changePage(page){
        this.getComment(this.props.id,page)
    }

    render() {
        return (
            <Fragment>
                <div id="comment">
                    <div className="comment-title">共{this.state.total || 0} 条评论 <a href="javascript:;" className="write-comment" onClick={this.commentVisible.bind(this,'')}>写评论</a></div>
                    {/* 评论列表 */}
                    <div id="comment_list">
                        {this.commentList(this.state.list)}
                    </div>
                    <Pagination style={{display:(this.state.list.length) ? 'block' : 'none'}} current={parseInt(this.state.page)} total={this.state.total} 
                        pageSize={this.state.pageSize} 
                        onChange={this.changePage.bind(this)}></Pagination>
                </div>
                
                <Modal
                title="评论"
                visible={this.state.commentVisible}
                onOk={this.handleOk}
                onCancel={this.onCancel}
                >
                    <TextArea rows={4} value={this.state.comment} onChange={this.handleChange.bind(this)}/>
                </Modal>
            </Fragment>
        )
    }
}

export default connect(util.mapStateToProps)(Comment)