import React, { Component } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types'

class ShaderComponent extends Component{

  constructor(){
    super();

  }
  componentDidMount(){
    var camera, scene, renderer;
    var uniforms, material;
//    var startTime = Date.now();
    var clock = new THREE.Clock();
    const width = 400;
    const height = 400;

    let init = () => {  // ecma6, same as init.bind(this)
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000000); //, window.innerWidth / window.innerHeight, 1, 1000000);
      camera.position.z = 1;
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(width, height); //window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      uniforms = {
        iTime: { type: "f", value: 10000.0},
        iResolution: { type: "v2", value: new THREE.Vector2()}
      };
      uniforms.iResolution.value.x = width; //window.innerWidth;
      uniforms.iResolution.value.y = height; //window.innerHeight;

      material = new THREE.ShaderMaterial({ uniforms: uniforms,
        vertexShader: this.props.vshader, // document.getElementById('vertexShader').textContent,
        fragmentShader: this.props.fshader }); // document.getElementById('fragmentShader').textContent });

        var geometry = new THREE.PlaneGeometry(1, 1);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.x = width; //window.innerWidth;
        mesh.scale.y = height; //window.innerHeight;
        scene.add(mesh);
        animate();
      }
      function animate(){
        requestAnimationFrame(animate);
        renderShader();
      }
      function renderShader(){
        uniforms.iTime.value += clock.getDelta();
        renderer.render(scene, camera);
      }
      init();
    }

    render() {
      return (
        <div ref={(mount) => { this.mount = mount }}>
        </div>
      );
    }
  }

  ShaderComponent.propTypes = {
    vshader: PropTypes.string,
    fshader: PropTypes.string
  }

export default ShaderComponent;




  //const ShaderComponent = (WrappedComponent) => (<ShaderComponent props={WrappedComponent}/>);
  //}
