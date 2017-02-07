import React, {Component} from 'react';
import Template from './template.jsx';
import {getDataUri} from '../../libs/image';

const maxErrors = 130;
const imagePrefix = 'data:image/jpeg;base64,';

export default class ImageComponent extends Component {

  constructor(props) {

    super(props);

    this.state = Object.assign({}, props);

    this.animate = this.animate.bind(this);

    getDataUri(this.props.src, 'jpeg', 0.8).then((dataUri) => {

      this.imageData = dataUri.replace(imagePrefix, '');
    });
  }

  componentDidMount() {

    this.animate();
  }

  glitch() {

    let corrupted = this.imageData;

    if (Math.random() > 0.8) {

      let errors = Math.round(Math.random() * maxErrors);

      for (let i = 0; i < errors; i++) {

        const l = 1000 + Math.round(Math.random() * (corrupted.length - 1002));

        corrupted = corrupted.substr(0, l) + corrupted.charAt(l + 1) + corrupted.charAt(l) + corrupted.substr(l + 2);
      }
    }

    return corrupted;
  }

  animate() {

    requestAnimationFrame(this.animate);

    const time = Date.now();
    const src = (time % 5000 < 400) ? imagePrefix + this.glitch() : this.props.src;

    this.setState({src});
  }

  render() {

    return <Template {...this.props} {...this.state} />
  }
}