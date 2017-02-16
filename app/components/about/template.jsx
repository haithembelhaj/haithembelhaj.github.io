import React from 'react';

export default (props) => {

  return (
    <section className="about">
      <div className="about--container" dangerouslySetInnerHTML={{__html: props.page.content.about}}></div>
    </section>
  );
}