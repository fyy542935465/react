import React from 'react';
import { Input, Icon, Button, message, Table, Row, Col} from 'antd'
import util from "../../util"
import { connect } from 'react-redux';
import "./style.less"
import Theader from '../Header'

class ArticleDetails extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info:{}
        }
    }

    componentWillMount(){
        this.getDetail()
    }

    getDetail(){
        let id = this.props.match.params.id
        util.get('/article/' + id,{}, res => {
            console.log(res)
            this.setState({
                info:res
            })
        })
    }
    render() {
        return (
            <div>
                <Theader></Theader>
                <div id="articleDetails">
                    <Row>
                        <Col span={16}>
                            <div class="article-top">
                                <span class="article-title">{this.state.info.title}</span>
                                <span class="update-time">{this.state.info.updateTime}&nbsp;&nbsp;&nbsp;&nbsp;作者:{this.state.info.author}</span>
                            </div>
                            <div class="article-content" dangerouslySetInnerHTML={{__html:this.state.info.editContent}}></div>
                        </Col>
                        <Col span={8}>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(ArticleDetails)