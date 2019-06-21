import React from 'react';
import style from './style.less'
import util from '../../util'
import { connect } from 'react-redux'

class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            records:null
        }
    }

    componentDidMount(){
        this.count()
    }

    count(){
        util.post('/count',{
            user_id:this.props.store.user_id
        },res => {
            this.setState({
                count:res.count
            })
        })
    }

    render() {
        return (
            <div id="footer">
                <div id="browser_records">
                    <div id="visiteCount">网站访问统计 ：{this.state.count}</div>
                </div>
            </div>
        )
    }
}

export default connect(util.mapStateToProps)(Footer)