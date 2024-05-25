import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { GoogleOAuthProvider } from '@react-oauth/google';
import ActionTypes from './utils/store';
import reducers from './store/reducers';
import { authTokenName } from './utils/constants';

import App from './components/app';
import './style.scss';

const clientId = '41177699286-1njb6551tf4dku6id31rdka169pm6ptm.apps.googleusercontent.com';

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

// Check if auth token is present in browser
const getTokenFromLocalStorage = () => new Promise((resolve) => {
  resolve(localStorage.getItem(authTokenName));
});

getTokenFromLocalStorage().then((authToken) => {
  if (authToken) { // User has previous authentication token
    store.dispatch({ type: `${ActionTypes.AUTH_USER}_SUCCESS`, payload: {} });
  } else { // No authorization
    store.dispatch({ type: `${ActionTypes.DEAUTH_USER}_SUCCESS` });
  }
}).catch((error) => {
  console.error(error);
});

// we now wrap App in a Provider
const rootElement = document.getElementById('main');
const root = createRoot(rootElement);
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </GoogleOAuthProvider>
);
