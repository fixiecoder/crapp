import React from 'react';
import Button from 'components/base-components/button';

export default function Info(props) {
  return (
    <div className="info-wrapper">
      <h2>Info</h2>
      <Button
        label={'Delete'}
        onClick={() => {
          props.history.replace('/designer/datagrid/delete');
        }}
      />
    </div>
  );
}
