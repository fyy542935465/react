import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import routes from "./router";
import {switchMenu,defaultMenuKey} from "./store/action";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd'

function changePopstate(){
    let currentPath = window.location.hash.replace(/#|\?.*$/g,'');
    let name = store.getState().menuName;
    routes.forEach( (item) => {
        if(item.path == currentPath){
            if(item.name == name){
                return;
            }
            return false;
        }
        if (item.route && item.route.length){
            item.route.forEach( it => {
                if(it.path == currentPath){
                    if(it.name == name){
                        return;
                    }
                    store.dispatch(switchMenu(it.name))
                    return false;
                }

                if (it.route && it.route.length){
                    it.route.forEach( that => {
                        if(that.path == currentPath){
                            store.dispatch(defaultMenuKey(it.name))
                            if(that.name == name){
                                return;
                            }
                            store.dispatch(switchMenu(that.name))
                            return false;
                        }
                    })
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
        <LocaleProvider locale={zhCN}>
            <App />
        </LocaleProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
