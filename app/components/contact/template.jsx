import React from 'react';
import Links from '../links/template.jsx';
import Image from '../image/template.jsx';
import Clouds from '../clouds/template.jsx';

export default () => {

  return (
    <section className="contact">
      <Clouds />
      <Image src="/assets/images/profile.jpg" />
      <p className="contact--text">
        That's me! <br/>
        I'm currently living in the amazing city of Berlin but also interested in remote work.<br/>
        So check me out!
      </p>
      <Links></Links>
    </section>
  );
}