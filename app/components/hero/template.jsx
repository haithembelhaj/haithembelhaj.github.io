import React from 'react';

import Background from '../background/template.jsx';

export default () => {

  return (
    <section className="hero">
     <Background />

      <h1 className="hero--headline">Hi! <br/>I'm a frontend engineer with some serious backend skills.</h1>
      <div className="hero--contacts">
        <a className="hero--contact is-email" href="mailto:haythem.belhaj@gmail.com" alt="email"></a>
        <a className="hero--contact is-github" href="https://github.com/haithembelhaj" alt="github"></a>
        <a className="hero--contact is-twitter" href="https://twitter.com/haythembelhaj" alt="twitter"></a>
        <a className="hero--contact is-xing" href="https://www.xing.com/profile/Haithem_belHaj" alt="xing"></a>
      </div>
    </section>
  );
}