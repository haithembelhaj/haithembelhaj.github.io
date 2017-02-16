import React from 'react';
import * as THREE from 'three';
import RGBShiftShader from '../../libs/shaders/rgb-shift';
const EffectComposer = require('three-effectcomposer')(THREE);

import THREEComponent from '../three';
import Template from './template.jsx';

export default class Background extends THREEComponent {

  constructor(props) {

    super(props);

    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 10000);
    this.camera.position.z = 1000;
    this.scene = new THREE.Scene();

    const material = new THREE.MeshPhongMaterial({color: 0xffffff, emissive: 0x000000, shading: THREE.FlatShading, opacity: 0.7, transparent: true});
    const icoGeometry = new THREE.IcosahedronGeometry(70, 1);
    
    this.mesh = new THREE.Mesh(icoGeometry, material);
    
    this.scene.add(this.mesh);

    this.scene.fog = new THREE.Fog(0xffffff, 1, 5000);

    this.scene.add(new THREE.AmbientLight(0x222222));

    this.light = new THREE.DirectionalLight(0xffffff);
    this.light.position.set(-1, 1, 0);

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

    this.onWindowResize();
  }

  draw() {

    super.draw();

    this.mesh.rotation.x += 0.001 + Math.random() * 0.001;
    this.mesh.rotation.y += 0.001 + Math.random() * 0.001;

    if(new Date().getTime() % 4000 < 400) {

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

    super.onWindowResize();

    if(this.width < 667) {

      this.mesh.position.x = 500;
      this.mesh.position.y = 200;
      this.mesh.position.z = -1500;

    } else {

      this.mesh.position.x = 700;
      this.mesh.position.y = -100;
      this.mesh.position.z = -1500;
    }
  }

  render() {

    return <Template {...this.props}/>;
  }
}