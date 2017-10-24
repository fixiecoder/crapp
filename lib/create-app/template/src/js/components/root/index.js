import React from 'react';
import Designer from 'containers/designer';
import Overview from 'containers/overview';
import HeaderBar from 'components/header-bar';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

export default function Root() {
  return (
    <Router>
      <div className="app-root">
        <HeaderBar />
        <Route path="/overview" component={Overview} />
        <Route path="/designer" component={Designer} />
      </div>
    </Router>
  );
}
