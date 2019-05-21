import React from 'react';
import './style.less'
import { Input, Icon, Button, message, Table } from 'antd'
import { post } from '../../util/http'
import { LOGIN, REGISTER } from '../../config/api'
import { loading, handleChange } from '../../util'
import { withRouter } from "react-router-dom"
import { setToken, setId } from '../../store/action'
import store from '../../store'
const dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
]

const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
]

class Article extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div id="article">
            <Table dataSource={dataSource} columns={columns} />;
        </div>
        )

    }
}

export default withRouter(Article)