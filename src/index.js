import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer);

const router = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('root')
);

registerServiceWorker();
