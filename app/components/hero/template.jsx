import React from 'react';

import Background from '../3d-background/template.jsx';

export default (props) => {

  return (
    <section className="hero">
      <Background />
      <h1 className="hero--headline">{props.page.content.hero.first}</h1>
      <h1 className="hero--headline">{props.page.content.hero.second}</h1>
    </section>
  );
}
