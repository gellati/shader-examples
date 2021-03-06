import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'

const myshaders = {
  vshader : `varying vec2 vUv;
             void main(){
               vUv = uv;
               vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
               gl_Position = projectionMatrix * mvPosition;
             }`,
  fshader : `uniform float iTime;
             uniform vec2 iResolution;
             void main(){
               vec2 uv = gl_FragCoord.xy/iResolution.xy;
               gl_FragColor = vec4(uv*0.5, 0.5+0.5*cos(iTime), 1.0);
             }`
}

export default class Animation extends Component {
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
