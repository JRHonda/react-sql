import React from 'react';
import ReactDOM from 'react-dom';
import App from './client/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import AdminPage from "./client/AdminPage";

ReactDOM.render(
    <Provider store={ createStore(reducers) }>
        <AdminPage />
    </Provider>,
    document.getElementById('admin')
)