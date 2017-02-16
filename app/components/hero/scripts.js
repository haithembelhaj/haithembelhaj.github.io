import React, {Component} from 'react';
import Template from './template.jsx';

export default class Hero extends Component {

  shouldComponentUpdate(){

    return false;
  }

  render() {

    return <Template {...this.props}/>;
  }
}