import React from 'react';
import * as THREE from 'three';
import FogShader from '../../libs/shaders/fog';
import Template from './template.jsx';
import THREEComponent from '../three';
const DEPTH = 20;

export default class Clouds extends THREEComponent {

  constructor(props) {

    super(props);

    this.camera = new THREE.PerspectiveCamera( 30, this.width / this.height, 1, 1000);
    this.camera.position.z = 2 * DEPTH;
    this.scene = new THREE.Scene();

    // preparing geometry
    const geometry = new THREE.Geometry();

    // loading texture
    const texture = new THREE.TextureLoader().load('/assets/images/clouds.png', (texture) => {

      // preparing fog
      const fog = new THREE.Fog(0x7d2c78, -100, 1000);

      // preparing material
      FogShader.uniforms.map.value = texture;
      FogShader.uniforms.fogColor.value = fog.color;
      FogShader.uniforms.fogNear.value = fog.near;
      FogShader.uniforms.fogFar.value = fog.far;
      FogShader.transparent = true;
      FogShader.depthTest = false;

      const meshMaterial = new THREE.ShaderMaterial(FogShader);
      const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(64, 64));

      for (let i = 0; i < DEPTH; i++) {

        planeMesh.position.x = Math.random() * 100 - 50;
        planeMesh.position.y = Math.random() * -50 + -30;
        planeMesh.position.z = i;
        planeMesh.rotation.z = Math.random() * Math.PI;
        planeMesh.scale.x = planeMesh.scale.y = Math.random() * 1.5 + 0.5;

        planeMesh.updateMatrix();
        geometry.merge(planeMesh.geometry, planeMesh.matrix);
      }

      let backMesh = new THREE.Mesh(geometry, meshMaterial);
      this.scene.add(backMesh);

      let frontMesh = new THREE.Mesh(geometry, meshMaterial);
      frontMesh.position.z = 10 * DEPTH;
      this.scene.add(frontMesh);
    });

    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
  }

  componentDidMount() {

    super.componentDidMount();

    this.startTime = new Date().getTime();
  }

  draw() {

    super.draw();

    const position = ((new Date().getTime() - this.startTime) * 0.0004) % 10 * DEPTH;

    this.camera.position.x += 0.01;
    this.camera.position.y += -0.01;
    this.camera.position.z = 20 * DEPTH - position;

    this.renderer.render(this.scene, this.camera);
  }

  render() {

    return <Template />;
  }
}
