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
    let renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer = renderer

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

  setHeight(height){
    this.setState({height: height})
  }

  componentDidMount(){
    console.log("MainImageComponent componentDidMount render image: ", this.props.image)
/*
    mainData = {
      fshader: this.props.fshader,
      vshader: this.props.vshader,
      image: this.props.image
    }
  */
    this.prepareAnimate()
    this.doAnimate();
    this.doAppendChild()
  }

  componentDidUpdate(){
    console.log("MainImageComponent componentDidUpdate render image: ", this.props.image)
/*
    mainData = {
      fshader: this.props.selectImageData.fshader,
      vshader: this.props.selectImageData.vshader,
      image: this.props.selectImageData.image
    }
    */
    mainData.fshader = this.props.fshader
      mainData.vshader= this.props.vshader
      mainData.image= this.props.image


    console.log("Main componentDidUpdate3: ",
         this.props.selectImageData)

    console.log("MainImageComponent componentDidUpdate render mainData: ", mainData)

    this.prepareAnimate()
    this.doAnimate()
    this.doAppendChild()
  }

////////////////////////
  prepareAnimate(){
    console.log("MainImageComponent prepareAnimate: ", this.props.image)

    const width = this.state.width; // 400
    const height = this.state.height; // 400

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000000); //, window.innerWidth / window.innerHeight, 1, 1000000);
    camera.position.z = 1;
    this.renderer.setSize(width, height); //window.innerWidth, window.innerHeight);
    let clock = new THREE.Clock();
    const loader = new THREE.TextureLoader();

    const texture = loader.load(mainData.image)
    const uniforms = {
      iTime: { type: "f", value: 10000.0},
      iResolution: { type: "v2", value: new THREE.Vector2()},
      texture1: {type: 't', value: texture }
    };
    uniforms.iResolution.value.x = width; //window.innerWidth;
    uniforms.iResolution.value.y = height; //window.innerHeight;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: mainData.vshader, // document.getElementById('vertexShader').textContent,
      fragmentShader: mainData.fshader
    }); // document.getElementById('fragmentShader').textContent });

    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = width; //window.innerWidth;
    mesh.scale.y = height; //window.innerHeight;
    scene.add(mesh);

    this.scene = scene
    this.camera = camera
//    this.renderer = renderer
    this.uniforms = uniforms
    this.clock = clock
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
    console.log("MainImageComponent render image: ", this.props.image)

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
  vshader: PropTypes.string,
  fshader: PropTypes.string,
  image: PropTypes.string,
}

export default MainImageComponent;
