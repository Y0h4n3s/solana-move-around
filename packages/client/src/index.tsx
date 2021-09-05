import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store, history} from './store'
import {ConnectedRouter} from "connected-react-router";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router";

import './styles/index.scss'
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path={"/"}><App /> </Route>
            </Switch>
        </ConnectedRouter>
    </Provider>        , document.getElementById('root'));

