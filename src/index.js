import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import routes from "./router";
import {switchMenu} from "./store/action";


function changePopstate(){
    let currentPath = window.location.hash.replace(/#|\?.*$/g,'');
    let name = store.getState().menuName;
    routes.forEach( (item) => {
        if(item.path == currentPath){
            if(item.name == name){
                return;
            }
            store.dispatch(switchMenu(item.name))
            return false;
        }
        if (item.route && item.route.length){
            item.route.forEach( it => {
                if(it.path == currentPath){
                    if(item.name == name){
                        return;
                    }
                    store.dispatch(switchMenu(it.name))
                    return false;
                }
            })
        }
    })
}
changePopstate();
window.addEventListener('popstate',(state) => {
    // 监听到返回事件，注意，只有触发了返回才会执行这个方法
    changePopstate();
    console.log(state);
})


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
