import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux' //nó sẽ lưu trạng thái của com hiện tại ở global, ko quan tâm đến nó là parent com hay child com
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <GoogleOAuthProvider clientId='104971378986-70oqml01g1l9pdfdnghb402mf1t75b95.apps.googleusercontent.com'>
        <Provider store={store}>
            <App />
        </Provider>
    </GoogleOAuthProvider>,
    document.getElementById('root')
)
