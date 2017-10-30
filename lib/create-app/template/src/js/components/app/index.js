import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

export default function Root() {
  return (
    <Router>
      <div className="app-root">
        <Route path="/" render={() => <h1>React application</h1>} />
      </div>
    </Router>
  );
}

