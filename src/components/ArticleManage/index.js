import React from 'react';
import RcWangEditor from 'rc-wang-editor';
import { Button, Input, Col, Row, message} from 'antd'
import style from './style.less'
import util from '../../util'
import { connect } from 'react-redux';

class ArticleManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                edit_content: '',
                title: ''
            }
        }
    }

    handleEditChange(event, me) {
        let form = me.state.form
        form['edit_content'] = event
        me.setState({ form: form })
        console.log(me.state.form)
    }

    save() {
        let params = this.state.form
        if(!params.title){
            message.warning('文章标题不能为空')
            return
        }

        if(!params.edit_content){
            message.warning('文章内容不能为空')
            return
        }

        params.user_id = this.props.store.user_id
        util.loading(true)
        util.post('/api/article/save', params, (res) => {
            util.loading(false)
            message.success('保存成功')
            this.setState({
                form: {
                    edit_content: '',
                    title: ''
                }
            })
            console.log(res)
        })
    }

    componentWillMount(){
        let id = this.props.location.search.split('=')[1]
        if(!id){
            return
        }
        util.get('/api/article/' + id,{}, res => {
            console.log(res)
            let form = {
                edit_content:res.edit_content,
                title:res.title
            }

            this.setState({
                form:form
            })
        })
    }

    render() {
        return (
            <div id="articleManage">
                <Row className="article-title">
                    <Col span={3}><label>文章标题</label></Col>
                    <Col span={12}>
                        <Input type="text" value={this.state.form.title} onChange={event => {
                            util.handleChange('title', event, this)
                        }} />
                    </Col>
                </Row>

                <RcWangEditor value={this.state.form.edit_content} onChange={event => {
                    this.handleEditChange(event, this)
                }} />

                <div id="save">
                    <Button type="primary" size="large" onClick={this.save.bind(this)}>保存</Button>
                </div>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(ArticleManage)