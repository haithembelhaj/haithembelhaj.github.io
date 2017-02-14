import React from 'react';
import Links from '../links/template.jsx';
import Image from '../image/template.jsx';
import Clouds from '../clouds/template.jsx';

export default () => {

  return (
    <section className="contact">
      <Clouds />
      <Image className="contact--image is-animated" src="/assets/images/profile.jpg" />
      <p className="contact--text is-animated">That's me! </p>
      <p className="contact--text is-animated">I'm currently living in the amazing city of Berlin but also interested in remote work.</p>
      <p className="contact--text is-animated">So check me out!</p>
      <Links className="contact--links is-animated"></Links>
    </section>
  );
}