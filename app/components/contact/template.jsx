import React from 'react';
import Links from '../links/template.jsx';
import Image from '../image/template.jsx';
import Clouds from '../clouds/template.jsx';

export default (props) => {

  return (
    <section className="contact">
      <Clouds />
      <div className="contact--container">
        <Image className="contact--image" src="/assets/images/profile.jpg" alt="profile image"/>
        <div className="about--content" dangerouslySetInnerHTML={{__html: props.page.content.contact}}></div>
        <Links className="contact--links"></Links>
      </div>
    </section>
  );
}