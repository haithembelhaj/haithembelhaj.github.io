import React from 'react';
import InViewComponent from '../in-view';
import Template from './template.jsx';
import {getDataUri} from '../../libs/image';

const maxErrors = 130;
const maxGlitches = 60;
const imagePrefix = 'data:image/jpeg;base64,';

export default class ImageComponent extends InViewComponent {

  constructor(props) {

    super(props);

    this.state = Object.assign({}, props);

    this.draw = this.draw.bind(this);

    this.glitches = [];

    getDataUri(this.props.src, 'jpeg', 0.8).then((dataUri) => {

      this.imageData = dataUri.replace(imagePrefix, '');
    });
  }

  shouldComponentUpdate(nextProps, nextState){

    return this.props.src !== nextProps.src || this.state.src !== nextState.src;
  }

  inViewChange(inView) {

    super.inViewChange(inView);

    if(!inView) {

      return cancelAnimationFrame(this.animationId);
    }

    this.startTime = Date.now();
    this.draw();
  }


  glitch() {

    if(this.glitches.length === maxGlitches) {

      return this.glitches[Math.round(Math.random() * (maxGlitches - 1))];
    }

    let corrupted = this.imageData;

    if (Math.random() > 0.8) {

      let errors = Math.round(Math.random() * maxErrors);

      for (let i = 0; i < errors; i++) {

        const l = 1000 + Math.round(Math.random() * (corrupted.length - 1002));

        corrupted = corrupted.substr(0, l) + corrupted.charAt(l + 1) + corrupted.charAt(l) + corrupted.substr(l + 2);
      }
    }

    this.glitches.push(corrupted);

    return corrupted;
  }

  draw() {

    this.animationId = requestAnimationFrame(this.draw);

    if(!this.imageData) {

      return;
    }

    const time = Date.now() - this.startTime;
    const src = (time % 10000 < 1000) ? imagePrefix + this.glitch() : this.props.src;

    this.setState({src});
  }

  render() {

    return <Template {...this.props} {...this.state} />
  }
}