import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import store from './store';
import Root from 'components/root';

import '../styles/index.scss';
import '../html/robots.txt';

function App() {
  return (
    <Provider store={store} >
      <Root />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
