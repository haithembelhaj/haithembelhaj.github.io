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

    const material = new THREE.MeshPhongMaterial({color: 0xffffff, emissive: 0x000000, shading: THREE.FlatShading, opacity: 0.7});
    const cudeGeometry = new THREE.BoxBufferGeometry(70, 70, 70);
    const pyramidGeometry = new THREE.ConeGeometry(70, 70, 3);

    this.meshes = [];

    const NUMBEROFITEMS = 4;

    for (let i = 0; i < NUMBEROFITEMS; i++) {

      const mesh = new THREE.Mesh(i % 2 === 0 ? cudeGeometry : pyramidGeometry, material);
      const angle = i * 2 * Math.PI / NUMBEROFITEMS + Math.PI / 12 * Math.random() + Math.PI / 6;

      mesh.position.x = Math.sin(angle) * 400;
      mesh.position.y = Math.cos(angle) * 400;
      mesh.position.z = Math.random() * -100;

      this.scene.add(mesh);
      this.meshes.push(mesh);
    }

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

  draw() {

    this.animationId = requestAnimationFrame(this.draw);

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

  render() {

    return <Template></Template>;
  }
}