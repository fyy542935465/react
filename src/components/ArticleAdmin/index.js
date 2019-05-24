import React from 'react';
import RcWangEditor from 'rc-wang-editor';
import { Button, Input, Col, Row, message} from 'antd'
import style from './style.less'
import util from '../../util'
import { connect } from 'react-redux';

class ArticleAdmin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                editContent: '',
                title: ''
            }
        }
    }

    handleEditChange(event, me) {
        let form = me.state.form
        form['editContent'] = event
        me.setState({ form: form })
        console.log(me.state.form)
    }

    save() {
        let params = this.state.form
        if(!params.title){
            message.warning('文章标题不能为空')
            return
        }

        if(!params.editContent){
            message.warning('文章内容不能为空')
            return
        }

        params.userId = this.props.store.userId
        util.loading(true)
        util.post('/article/save', params, (res) => {
            util.loading(false)
            message.success('保存成功')
            this.setState({
                form: {
                    editContent: '',
                    title: ''
                }
            })
            console.log(res)
        })
    }

    render() {
        return (
            <div id="articleAdmin">
                <Row className="article-title">
                    <Col span={3}><label>文章标题</label></Col>
                    <Col span={12}>
                        <Input type="text" value={this.state.form.title} onChange={event => {
                            util.handleChange('title', event, this)
                        }} />
                    </Col>
                </Row>

                <RcWangEditor value={this.state.form.editContent} onChange={event => {
                    this.handleEditChange(event, this)
                }} />

                <div id="save">
                    <Button type="primary" size="large" onClick={this.save.bind(this)}>保存</Button>
                </div>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(ArticleAdmin)