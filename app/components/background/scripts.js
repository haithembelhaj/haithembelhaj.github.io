import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import * as THREE from 'three';
import RGBShiftShader from '../../libs/shaders/rgb-shift';

const EffectComposer = require('three-effectcomposer')(THREE);

import Template from './template.jsx';

export default class Background extends Component {

  constructor(props) {

    super(props);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 1, 1000);
    this.camera.position.z = 400;
    this.scene = new THREE.Scene();

    const material = new THREE.MeshLambertMaterial({color: 0xffffff, transparent: true, opacity: 0.8});
    const cudeGeometry = new THREE.BoxBufferGeometry(70, 70, 70);
    const pyramidGeometry = new THREE.CylinderGeometry(1, 70, 100, 4);

    this.meshes = [];

    const NUMBEROFITEMS = 6;

    for (let i = 0; i < NUMBEROFITEMS; i++) {

      const mesh = new THREE.Mesh(i % 2 === 0 ? cudeGeometry : pyramidGeometry, material);
      const angle = i * 2 * Math.PI / NUMBEROFITEMS + Math.PI / 12 * Math.random() + Math.PI / 12;

      mesh.position.x = Math.sin(angle) * 300;
      mesh.position.y = Math.cos(angle) * 300;
      mesh.position.z = Math.random() * -100;

      this.scene.add(mesh);
      this.meshes.push(mesh);
    }

    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.scene.add(new THREE.AmbientLight(0x222222));

    this.light = new THREE.DirectionalLight(0xffffff);
    this.light.position.set(1, 1, 1);

    this.scene.add(this.light);

    // postprocessing
    const parameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false
    };
    const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, parameters);

    this.composer = new EffectComposer(this.renderer, renderTarget);
    this.composer.addPass(new EffectComposer.RenderPass(this.scene, this.camera));

    this.rgbEffect = new EffectComposer.ShaderPass(RGBShiftShader);
    this.rgbEffect.uniforms.amount.value = 0.0015;
    this.rgbEffect.renderToScreen = true;

    this.composer.addPass(this.rgbEffect);
  }

  componentWillMount() {

    window.addEventListener('resize', this.onWindowResize, false);
  }

  componentWillUnmount() {

    window.removeEventListener('resize', this.onWindowResize);
  }

  componentDidMount() {

    this.node = findDOMNode(this);

    this.node.appendChild(this.renderer.domElement);

    this.animate();
  }

  animate() {

    requestAnimationFrame(this.animate);

    const time = Date.now();

    this.meshes.forEach((mesh) => {

      mesh.rotation.x += 0.001 + Math.random() * 0.001;
      mesh.rotation.y += 0.001 + Math.random() * 0.001;
    });

    if(time % 4000 < 400) {

      this.rgbEffect.uniforms.amount.value = Math.random() / 100;
      this.rgbEffect.uniforms.angle.value = Math.random() * 10;

    } else {

      this.rgbEffect.uniforms.amount.value = 0;
      this.rgbEffect.uniforms.angle.value = 0;
    }

    this.renderer.clear();
    this.composer.render();
  }

  onWindowResize() {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  render() {

    return <Template></Template>;
  }
}