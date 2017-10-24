import React from 'react';
import Cavnas from 'containers/canvas';
import Datagrid from 'containers/datagrid';
import Inspector from 'containers/inspector';
import {
  Route,
  Link
} from 'react-router-dom';
import { paths } from 'constants/route-paths';

export default function Designer({ match }) {
  return (
    <div className="designer-wrapper">
      <div className="designer-main-panel-wrapper">
        <div className="designer-navbar">
          <Link to={paths.designer.canvas.toPath}>Canvas</Link> <Link to={paths.designer.datagrid.toPath}>Datagrid</Link>
        </div>
        <Route path={paths.designer.canvas.path} component={Cavnas} />
        <Route path={paths.designer.datagrid.path} component={Datagrid} />
      </div>
      <Route path={`${match.url}`} component={Inspector} />
    </div>
  );
}
