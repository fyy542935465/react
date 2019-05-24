import store from '../store'
import { Loading } from "../store/action"
import { get, post } from './http'

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

export default {
    get,
    post,
    handleChange,
    mapStateToProps,
    loading
}