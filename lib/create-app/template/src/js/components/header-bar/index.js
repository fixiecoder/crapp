import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderBar(props) {
  return (
    <div className="header-bar-wrapper">
      <h1>Header</h1>
      <Link to="/overview">Overview</Link> <Link to="/designer">Designer</Link>
    </div>
  );
}
