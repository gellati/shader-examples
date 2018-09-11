import React, { Component } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMainImageComponent = styled.div`
  width: 10%;
  cursor: pointer;
  transition: .8s;
`

var mainData = {
  fshader: '',
  vshader: '',
  image: ''
}

class MainImageComponent extends Component{
  constructor(props){
    super(props);
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.renderShader = this.renderShader.bind(this)
    this.animate = this.animate.bind(this)

    this.setWidth = this.setWidth.bind(this)
    this.prepareAnimate = this.prepareAnimate.bind(this)
    this.doAnimate = this.doAnimate.bind(this)
    this.doAppendChild = this.doAppendChild.bind(this)
    this.state = {
      vshader: props.vshader,
      fshader: props.fshader,
      image: props.image
    }

    if(this.props.width){
      this.state.width = this.props.width
    }
    else{
      this.state.width = 200
    }

    if(this.props.height){
      this.state.height = this.props.height
    }
    else{
      this.state.height = 200
    }

    let renderer = new THREE.WebGLRenderer({antialias: true});
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, this.state.width / this.state.height, 1, 1000000); //, window.innerWidth / window.innerHeight, 1, 1000000);
    let clock = new THREE.Clock();
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(1, 1);

    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    this.clock = clock
    this.loader = loader
    this.geometry = geometry
  }

  setWidth(){
    if(this.state.clicked){
      this.mount.firstChild.style.width="300px"
      this.mount.firstChild.style.height="300px"
    }
    else{
      this.mount.firstChild.style.width = this.state.width + "px"
      this.mount.firstChild.style.height = this.state.height + "px"
    }
  }

  componentDidMount(){
    this.prepareAnimate()
    this.doAnimate();
    this.doAppendChild()
  }

  componentDidUpdate(){
    console.log("MainImageComponent componentDidUpdate render image: ", this.props.image)

    mainData.fshader = this.props.fshader
      mainData.vshader= this.props.vshader
      if(this.props.image){
      mainData.image= this.props.image
    }

    this.prepareAnimate()
    this.doAnimate()
  }

////////////////////////
  prepareAnimate(){
    const width = this.state.width; // 400
    const height = this.state.height; // 400

    this.camera.position.z = 1;
    this.renderer.setSize(width, height); //window.innerWidth, window.innerHeight);

let uniforms = {}

if(this.props.image){
  const texture = this.loader.load(mainData.image)
  uniforms = {
    iTime: { type: "f", value: 10000.0},
    iResolution: { type: "v2", value: new THREE.Vector2()},
    texture1: {type: 't', value: texture }
  };

}
else{
  uniforms = {
    iTime: { type: "f", value: 10000.0},
    iResolution: { type: "v2", value: new THREE.Vector2()},
  };
}
    uniforms.iResolution.value.x = width; //window.innerWidth;
    uniforms.iResolution.value.y = height; //window.innerHeight;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: mainData.vshader, // document.getElementById('vertexShader').textContent,
      fragmentShader: mainData.fshader
    }); // document.getElementById('fragmentShader').textContent });

    const mesh = new THREE.Mesh(this.geometry, material);
    mesh.scale.x = width; //window.innerWidth;
    mesh.scale.y = height; //window.innerHeight;
    this.scene.add(mesh);

    this.uniforms = uniforms
  }

  doAppendChild(){
    this.mount.appendChild(this.renderer.domElement);
  }

  doAnimate(){
    this.animate();
  }

  renderShader(){
    this.uniforms.iTime.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  start(){
    if (!this.frameId){
      this.frameId = requestAnimationFrame(this.animate)
    }
    this.animate()
  }

  animate(){
    requestAnimationFrame(this.animate);
    this.renderShader();
  }
////////////////////////
  render() {
    return (
      <StyledMainImageComponent
      className="shader-component">
      <div
      ref={(mount) => { this.mount = mount }}
      className={this.state.clicked ? 'main': null}
      >
      </div>
      </StyledMainImageComponent>
    );
  }
}

MainImageComponent.propTypes = {
  vshader: PropTypes.string.isRequired,
  fshader: PropTypes.string.isRequired,
  image: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  selectedImage: PropTypes.func,
  selectedImageData: PropTypes.object
}

export default MainImageComponent;
