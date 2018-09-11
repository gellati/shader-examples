import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'

const myshaders = {
  vshader : `varying vec2 vUv;
             void main(){
               vUv = uv;
               vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
               gl_Position = projectionMatrix * mvPosition;
             }`,
  fshader : `
          uniform float iTime;
          uniform vec2 iResolution;
          void main(){
            vec2 uv = gl_FragCoord.xy/iResolution.xy;
            vec2 p = (2. * uv - 1.);
            p.x *= iResolution.x/iResolution.y;
            vec3 col;
            float l = length(p);
            float t = iTime*.5;
            uv += p/l*(sin(l - t));
            col.r = .05/length(mod(uv, 1.0)-.05);
            gl_FragColor=vec4(col/l,0.);
          }`
}

export default class ColorIntensityDistance extends Component {
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
