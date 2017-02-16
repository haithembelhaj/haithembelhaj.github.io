import React from 'react';

import Hero from '../../components/hero/template.jsx';
import About from '../../components/about/template.jsx';
import Contact from '../../components/contact/template.jsx';

export default (props) => {

  return (
    <div>
      <Hero {...props}/>
      <About {...props} />
      <Contact {...props} />
    </div>
  );
};
