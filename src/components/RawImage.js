import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'
import styled from 'styled-components';

import image from '../static/media/images/stones.jpg'

const myshaders = {

  vshader : `varying vec2 vUv;
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

export default class RawImage extends Component {
  constructor(props){
    super(props)
  }
  render(){
    var props = this.props
    return(
         <ImageShaderComponent
                               vshader={myshaders.vshader}
                               fshader={myshaders.fshader}
                               image={image}
                               {...props} // handleClick={this.props.handleClick}
                                />
    )
  }
}
