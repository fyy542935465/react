import React, {Component} from 'react'
import "./App.less"
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import routes from './router'
class App extends Component {
    render() {
        return (
            <div id="App">
                {this.props.children}
                <Router>
                    <Switch>
                    {
                        routes.map((item, key) => {
                            if (item.exact) {
                                return <Route key={key} exact path={item.path} render={props => (
                                    <item.component {...props} routes={item.route} />
                                )}/>
                            } else {
                                return <Route path={item.path} key={key}
                                              render={props => (
                                                  <item.component {...props} routes={item.route}/>
                                              )}
                                />
                            }
                        })
                    }
                </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
