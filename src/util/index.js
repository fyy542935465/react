import store from '../store'
import { Loading } from "../store/action"
import { get, post } from './http'
import { Modal,Button} from 'antd'
import env from '../env'
import site from '../config/index'

/*
*
 */
const loading = (status) => {
    store.dispatch(Loading(status))
}

const handleChange = (key, event, _this) => {
    let form = _this.state.form
    for (let item in form) {
        if (item === key) {
            form[item] = event.target.value
            _this.setState({ form: form })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

const confirm = (msg,confirmFn,cancelFn) => {
    Modal.confirm({
        title:'提示',
        content:msg,
        onOk(){
            confirmFn && confirmFn()
        },
        onCancel(){
            cancelFn && cancelFn()
        }
    })
}

export default {
    imgUrl:site[env.CURRENT].imgUrl,
    socket:site[env.CURRENT].socket,
    get,
    post,
    handleChange,
    mapStateToProps,
    loading,
    confirm
}