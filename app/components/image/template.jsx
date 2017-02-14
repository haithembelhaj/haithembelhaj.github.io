import React from 'react';

export default (props) => {

  return <img  className={'image '+ props.className}  {...props} />;
}