import React from 'react';
import Button from 'components/base-components/button';
import { Route } from 'react-router-dom';

export default function Delete(props) {
  return (
    <div className="delete-wrapper">
      <h2>Delete</h2>
      <Button
        type={'secondary'}
        label={'Delete me'}
        onClick={() => {
          props.history.replace('/designer/datagrid/info');
        }}
      />
      <Route path={props.match.url} component={testy}/>
    </div>
  );
}
