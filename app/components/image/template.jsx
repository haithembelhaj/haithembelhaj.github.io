import React from 'react';

export default (props) => {

  return <img  {...props} className={'image '+ props.className} />;
}