import React from 'react';
import Delete from 'containers/inspector/delete';
import Info from 'containers/inspector/info';
import { Route, Link } from 'react-router-dom';
import { paths } from 'constants/route-paths';

export default function Inspector({ match }) {
  return (
    <div className="inspector-wrapper">
      <Link to={paths.designer.canvas.delete.toPath}>delete</Link> <Link to={paths.designer.canvas.info.toPath}>info</Link>
      <Route path={`${match.url}/:main/info`} component={Info} />
      <Route path={paths.designer.canvas.delete.paramPath} component={Delete} />
    </div>
  );
}
