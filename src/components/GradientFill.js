import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'


const myshaders = {
  vshader : `varying vec2 vUv;
             void main(){
               vUv = uv;
               vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
               gl_Position = projectionMatrix * mvPosition;
             }`,
  fshader : `uniform vec2 iResolution;
             vec3 col1 = vec3(1.0, 0.9, 0.6);
             vec3 col2 = vec3(0.7,0.7,1.0);
             void main(){
               vec2 uv = gl_FragCoord.xy/iResolution.xy;
               vec3 col = mix(col1, col2, uv.y);
               gl_FragColor = vec4(col,1.0);
            }`
}

export default class GradientFill extends Component {
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
