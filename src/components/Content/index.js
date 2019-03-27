import React from 'react';
import {
    Col
} from 'antd';

export default class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Col span={18}>
                <div id="content">
                    {this.props.children}
                </div>
            </Col>
        )
    }
}