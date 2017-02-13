import InViewComponent from '../in-view';
import * as THREE from 'three';

export default class THREEComponent extends InViewComponent {

  constructor(props) {

    super(props);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.onWindowResize = this.onWindowResize.bind(this);
    this.draw = this.draw.bind(this);

    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  }

  componentWillMount() {

    window.addEventListener('resize', this.onWindowResize, false);
  }

  componentWillUnmount() {

    window.removeEventListener('resize', this.onWindowResize);
  }

  componentDidMount() {

    super.componentDidMount();

    this.node.appendChild(this.renderer.domElement);
  }

  inViewChange(inView) {

    super.inViewChange(inView);

    if(!inView) {

      return cancelAnimationFrame(this.animationId);
    }

    this.draw();
  }

  draw() {

    this.animationId = requestAnimationFrame(this.draw);
  }

  onWindowResize() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
}