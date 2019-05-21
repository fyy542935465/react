import store from '../store'
import { Loading } from "../store/action"
/*
*
 */ 
export const loading = (status) => {
    store.dispatch(Loading(status))
}

export const handleChange = (key, event,_this) => {
    console.log(key,event.target.value)
    let form = _this.state.form 
    for (let item in form) {
        if (item === key) {
            form[item] = event.target.value
            _this.setState({form: form})
        }
    }
}

export const mapStateToProps = (state) => {
    return {
        store:state
    }
  }