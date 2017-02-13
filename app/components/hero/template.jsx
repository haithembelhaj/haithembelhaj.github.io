import React from 'react';

import Background from '../3d-background/template.jsx';

export default () => {

  return (
    <section className="hero">
      <Background />
      <h1 className="hero--headline">Hi! <br/>I'm a frontend engineer with some serious backend skills.</h1>
    </section>
  );
}