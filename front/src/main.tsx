import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import GlobalStyles from './styles/GlobalStyles.js';
import LoadingManager from './components/LoadingManager';
import Loading from './components/Loading';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <LoadingManager>
      <Loading />
      <App />
    </LoadingManager>
  </React.StrictMode>
);
