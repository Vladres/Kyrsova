import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';


class Visualizator extends Component {
  camera;
  scene = new THREE.Scene();;
  renderer = new THREE.WebGLRenderer({ alpha: true });
  gltfLoader = new GLTFLoader();
  loader;
  exporter;
  gridHelper
  controls;
  size = 10;
  divisions = 10;
  url;
  model3D;


  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.url = props.message;
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer.setSize(window.innerWidth, window.innerHeight - 70);
    this.loader = new GLTFLoader();
    this.exporter = new GLTFExporter();
    this.scene.background = new THREE.Color(0xdbdbdb);
    document.body.appendChild( this.renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body

    this.gridHelper = new THREE.GridHelper(this.size, this.divisions);
    this.scene.add(this.gridHelper);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }



  componentDidUpdate(prevProps, prevState) {

  }

  componentDidMount() {
    this.mount.appendChild(this.renderer.domElement);
    this.loadAndAddToSceneGltf(this.url);
    this.camera.position.z = 5;
    this.animate();
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  }


  render() {
    return (
      <div  ref={ref => (this.mount = ref)} />
    )
  }

  exportToGltf() {
    let result = this.exporter.parse(this.scene, (gltf) => {
      console.log(gltf);

      let blob = new Blob([gltf], { type: "text/plain;charset=utf-8" });
      // saveAs(blob, "filename.obj");
    }, { binary: true })
  }

  loadAndAddToSceneGltf(url) {
    let objectToAdd = new THREE.Object3D();
    this.gltfLoader.load(url, (gltf) => {
      objectToAdd = gltf.scene;
      this.model3D = objectToAdd;
      this.scene.add(objectToAdd);
    }, (xhr) => {
     },
      // called when loading has errors
      (errorEvent) => {
        console.error(errorEvent)
      })
  }
}

export default Visualizator;