import React,{Fragment} from 'react';
import { Button,Input,Modal,Pagination } from 'antd'
import util from "../../util"
import { connect } from 'react-redux';
import icon from '../../common/img/down.png' 
import defaultImg from '../../common/img/avatar.png'
import "./style.less"

const { TextArea } = Input;

class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            commentVisible:false,
            list:[],
            page:'',
            pageSize:3
        }
    }

    componentDidMount(){
        console.log(this.props.id)
    //    console.log(this.props)
    //    this.setState({
    //        id:this.props.id
    //    })
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
    
    commentVisible(){
        let commentVisible = !this.state.commentVisible
        this.setState({
            commentVisible:commentVisible,
            comment:''
        })
    }
    send(){
        util.loading(true)
        util.post('/api/article/comment/save',{
            article_id:this.state.id,
            user_id:this.props.store.user_id,
            comment:this.state.comment
        }, res => {
            util.loading(false)
            this.commentVisible()
            this.props.getDetail(this.state.id)
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
                    <div className="comment-title">{this.state.total || 0} 条评论 <a href="javascript:;" className="write-comment" onClick={this.commentVisible.bind(this)}>写评论</a></div>
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