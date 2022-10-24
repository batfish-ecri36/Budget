import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app.jsx';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

import styles from './styles/popup.scss';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
