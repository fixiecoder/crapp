import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'containers/app';
import store from './store';

import '../styles/index.scss';
import '../html/robots.txt';

function Index() {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
