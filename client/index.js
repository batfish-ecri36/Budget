import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app.jsx';
import { Provider } from 'react-redux';
import store from './store';

// import styles from './styles/styles.scss';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
