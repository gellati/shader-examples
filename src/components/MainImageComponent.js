import React, { Component } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledMainImageComponent = styled.div`
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

class MainImageComponent extends Component{
  constructor(props){
    super(props);
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.renderShader = this.renderShader.bind(this)
    this.animate = this.animate.bind(this)
    this.componentClick = this.componentClick.bind(this)
    this.setWidth = this.setWidth.bind(this)
    this.prepareAnimate = this.prepareAnimate.bind(this)
    this.doAnimate = this.doAnimate.bind(this)
    this.doAppendChild = this.doAppendChild.bind(this)
    this.state = {
      clicked: false,
      main: false,
      fshader: '',
      vshader: '',
      image: ''
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

  componentDidUpdate(){
//static getDerivedStateFromProps(props, state){
//    if(this.state.fshader !== this.props.fshader){

/*
      this.setState({
        fshader: this.props.fshader,
        vshader: this.props.vshader,
        image: this.props.image
      });
*/
      console.log("componentDidUpdate render fshader: ", this.props.fshader)
      console.log("componentDidUpdate render vshader: ", this.props.vshader)
      console.log("componentDidUpdate render image: ", this.props.image)

//      document.getElementById("main-image").innerHTML = "" //.removeChild()
//      document.remove(mainShader)

this.prepareAnimate()
this.doAnimate()
//    }

  }

  componentDidMount(){
    this.prepareAnimate()
    this.doAnimate();
    this.doAppendChild()
  }

  prepareAnimate(){
    console.log("componentDidMount render fshader: ", this.props.fshader)
    console.log("componentDidMount render vshader: ", this.props.vshader)
    console.log("componentDidMount render image: ", this.props.image)

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
//    renderer.render(camera, scene)

console.log(this.state.main)


this.mount.appendChild(this.renderer.domElement);
this.animate();

//    this.mount.replaceChild(this.renderer.domElement, this.mainImage.current);
  }

  doAppendChild(){
  }

  doAnimate(){
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
      this.setState({main: true})

  }

  render() {

    console.log("MainImageComponent render fshader: ", this.props.fshader)
    console.log("MainImageComponent render vshader: ", this.props.vshader)
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
  clicked: PropTypes.boolean,
  vshader: PropTypes.string,
  fshader: PropTypes.string,
  image: PropTypes.string
}

export default MainImageComponent;
