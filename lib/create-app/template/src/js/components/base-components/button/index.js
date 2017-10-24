import React from 'react';

export default function Button(props) {
  let buttonTypeClass = 'primary-button';

  switch(props.type) {
    case 'secondary':
      buttonTypeClass = 'secondary-button';
  }


  return (
    <div className="button-wrapper">
      <button
        className={`base-button ${buttonTypeClass} ${props.className || ''}`}
        onClick={props.onClick}
      >
        {props.label || 'click me'}
      </button>
    </div>
  );
}
