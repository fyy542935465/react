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
            <div id="content">
                {this.props.children}
            </div>
        )
    }
}