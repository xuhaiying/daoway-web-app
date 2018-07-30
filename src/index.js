import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import reducers from './reducer';
import './config'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
registerServiceWorker();
