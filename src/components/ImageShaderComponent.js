import React, { Component } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledImageShaderComponent = styled.div`
  width: 10%;
  cursor: pointer;
  transition: .8s;
`


/*
"extends": [
  "eslint:recommended",
  "plugin:react/recommended"
],

*/

class ImageShaderComponent extends Component{
  constructor(props){
    super(props);
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.renderShader = this.renderShader.bind(this)
    this.animate = this.animate.bind(this)
    this.componentClick = this.componentClick.bind(this)
    this.setWidth = this.setWidth.bind(this)
    this.state = {
      clicked: false,
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
  }

  setWidth(){
    if(this.state.clicked){
      this.mount.firstChild.style.border = "thick solid red"
      this.mount.firstChild.style.border = "thick solid red"
    }
    else{
      this.mount.firstChild.style.border = "none"
      this.mount.firstChild.style.border = "none"
    }
  }

  setHeight(height){
    this.setState({height: height})
  }

  componentDidMount(){
    const width = this.state.width; // 400
    const height = this.state.height; // 400

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000000); //, window.innerWidth / window.innerHeight, 1, 1000000);
    camera.position.z = 1;

    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height); //window.innerWidth, window.innerHeight);
    let clock = new THREE.Clock();
    const loader = new THREE.TextureLoader();

    const texture = loader.load(this.props.image)
    const uniforms = {
      iTime: { type: "f", value: 10000.0},
      iResolution: { type: "v2", value: new THREE.Vector2()},
      texture1: {type: 't', value: texture }
    };
    uniforms.iResolution.value.x = width; //window.innerWidth;
    uniforms.iResolution.value.y = height; //window.innerHeight;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: this.props.vshader, // document.getElementById('vertexShader').textContent,
      fragmentShader: this.props.fshader
    }); // document.getElementById('fragmentShader').textContent });

    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = width; //window.innerWidth;
    mesh.scale.y = height; //window.innerHeight;
    scene.add(mesh);

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.uniforms = uniforms
    this.clock = clock
    console.log(this.renderer.domElement)

    this.mount.appendChild(this.renderer.domElement);
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

  componentClick(e) {
//    console.log("ImageShaderComponent")
//    this.props.componentClick(this.props.id, !this.props.selected);
      const currentState = this.state.clicked
      this.setState({ clicked: !currentState }, function(){
        this.setWidth();
      })

/*
      this.props.selectedImageData = {
        vshader :  this.props.vshader,
        fshader : this.props.fshader,
        image : this.props.image
      }
*/
      let imageData = {
        vshader :  this.props.vshader,
        fshader : this.props.fshader,
        image : this.props.image
      }
      this.props.handleClick(imageData)
  }

  render() {
    return (
      <StyledImageShaderComponent
      className="shader-component">
      <div
      ref={(mount) => { this.mount = mount }}
      onClick={(e)=>this.componentClick(e)}
      className={this.state.clicked ? 'main': null}
      >
      </div>
      </StyledImageShaderComponent>
    );
  }
}

ImageShaderComponent.propTypes = {
  vshader: PropTypes.string,
  fshader: PropTypes.string,
  image: PropTypes.string
}

export default ImageShaderComponent;
