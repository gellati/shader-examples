import React, { Component } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RawImage from './RawImage'
import Sepia from './Sepia'
import Greyscale from './Greyscale'
import WaterAnimation from './WaterAnimation'
import MainImageComponent from './MainImageComponent'

import image from '../static/media/images/stones.jpg'

class Dashboard extends Component{
  constructor(props){
    super()
    this.state = {
      selectedImageData: {
        image: '',
        vshader: '',
        fshader: ''
      }
    }
    this.mainImage = React.createRef();
    this.selectedImage = this.selectedImage.bind(this)
  }

  selectedImage(params){
    console.log("selectedImage: ", params)

    this.setState({
      selectedImageData: params
    })
  }

  render(){
    var props = {}
    props.selectedImage = this.selectedImage
    props.selectImageData =  this.state.selectedImageData

    const myshaders = {

      vshader : `varying vec2 vUv;
                 vec2 fff;
                 void main(){
                   vUv = uv;
                   vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                   gl_Position = projectionMatrix * mvPosition;
                 }`,
      fshader : `uniform vec2 iResolution;
                 uniform sampler2D texture1;
                 void main(){
                   vec2 uv = gl_FragCoord.xy/iResolution.xy;
                   vec4 col = texture2D(texture1, uv);
                   gl_FragColor = col;
                 }`
    }


    return(
      <div id="container">
      <div id="main-image">
      <MainImageComponent
                           vshader={this.state.selectedImageData.vshader}
                            fshader={this.state.selectedImageData.fshader}
                            image={this.state.selectedImageData.image}
                            height={400}
                            width={400}
                            ref={this.mainImage}
                            >
      </MainImageComponent>
      </div>
      <div className="components">
      <RawImage {...props} // handleClick={this.handleClick}
                />
      <Sepia {...props} />
      <Greyscale {...props} />
      <WaterAnimation {...props} />
      </div>
      </div>

    )

  }
}

export default Dashboard;
