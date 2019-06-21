import React,{Fragment} from 'react';
import { Button,Input } from 'antd'
import util from "../../util"
import { connect } from 'react-redux';
import icon from '../../common/img/down.png' 
import "./style.less"

const { TextArea } = Input;

class Comment extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            comment:'',
            commentVisible:false
        }
    }

    componentDidMount(){
       
    }
    
    commentVisible(){
        let commentVisible = !this.state.commentVisible
        this.setState({
            commentVisible:commentVisible
        })
    }
    send(){
        console.log(this.props.id)
    }

    commentList(commentList){
        if(commentList && commentList.length){
            return commentList.map( (item,index) => {
                return (
                    <li key={index}>{item.comment}</li>
                )
            })
            
        }else{
            return (
                <div id="noData">
                    暂无评论
                </div>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <div id="comment">
                    <div className="comment-title">评论 <img src={icon} alt="" onClick={this.commentVisible.bind(this)} /></div>
                    <div className="comment_con" style={{display:(this.state.commentVisible)? 'block' : 'none'}}>
                        <TextArea rows={4} id="comment_text" />
                        <Button type="primary" id="send_btn" onClick={this.send.bind(this)}>发送</Button>
                    </div>
                </div>
                {/* 评论列表 */}
                <div id="comment_list">
                    {this.commentList(this.props.commentList)}
                </div>
            </Fragment>
        )
    }
}

export default Comment