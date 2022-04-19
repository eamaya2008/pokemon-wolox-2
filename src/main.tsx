import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './main/App';
import store from './main/store';
import './assets/scss/style.scss';
import './translations/i18n';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
