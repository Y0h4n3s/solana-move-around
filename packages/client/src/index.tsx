import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App.jsx';
import {store, history} from 'store'
import {ConnectedRouter} from "connected-react-router";
import {Switch} from "react-router-dom";
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path={"/"} render={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>        , document.getElementById('root'));

