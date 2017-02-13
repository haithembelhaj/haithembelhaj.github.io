import React from 'react';

import Background from '../3d-background/template.jsx';

export default () => {

  return (
    <section className="hero">
      <Background />
      <h1 className="hero--headline">Hi! </h1>
      <h1 className="hero--headline"> I'm a frontend engineer with some serious backend skills.</h1>
    </section>
  );
}