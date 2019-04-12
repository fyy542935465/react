import React from 'react';
import './style.less'

export default class Footer extends React.Component {

    render() {
        return (
            <div id="loading">
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>
        )
    }
}