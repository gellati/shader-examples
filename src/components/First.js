import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'

const myshaders = {

  // void mainImage(out vec4 fragColor, in vec2 fragCoord){fragColor = vec4(0.8, 0.1, 0.1, 1.0)}
  vshader : `varying vec2 vUv;
             void main(){
               vUv = uv;
               vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
               gl_Position = projectionMatrix * mvPosition;
            }`,
  fshader : `uniform float iTime;
             uniform vec2 iResolution;
             void main(){
               gl_FragColor = vec4(0.8, 0.1, 0.1, 1.0);
            }`
}

export default class First extends Component {
  constructor(){
    super()
  }

  render(){
    var props = this.props
    return(
      <div>
         <ImageShaderComponent vshader={myshaders.vshader}
                               fshader={myshaders.fshader}
                               {...props} />
      </div>
    )
  }
}
