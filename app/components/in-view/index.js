import {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import notify from '../../libs/in-view';

export default class THREEComponent extends PureComponent {

  constructor(props) {

    super(props);

    this.inViewChange = this.inViewChange.bind(this);
  }

  componentDidMount() {

    this.node = findDOMNode(this);

    notify(this.node, this.inViewChange);
  }

  inViewChange(inView) {

    this.inView = inView;

    if(inView) {

      this.node.classList.add('is-in-view');
    }
  }


}