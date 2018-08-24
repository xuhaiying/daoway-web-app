import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './app.css'
import { Provider } from 'mobx-react';
import './config'
import store from './store'


ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
   ),
    document.getElementById('root')
);

// ReactDOM.render(
//     (
//         <BrowserRouter>
//             <App/>
//         </BrowserRouter>
//    ),
//     document.getElementById('root')
// );
registerServiceWorker();
