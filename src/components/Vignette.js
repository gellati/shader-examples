import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'

const myshaders = {
  vshader : `varying vec2 vUv;
             void main(){
               vUv = uv;
               vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
               gl_Position = projectionMatrix * mvPosition;
             }`,
fshader: `uniform vec2 iResolution;
          uniform sampler2D iChannel0;
          float falloff = 0.5;
          float strength = 0.5;
          void main(){
             vec2 uv = gl_FragCoord.xy / iResolution.xy;
             vec4 col = texture2D(iChannel0, uv);
             float d = distance(uv, vec2(0.5));
             col *= smoothstep(0.8, falloff * 0.8, d * (strength + falloff));
             gl_FragColor = col;
           }`
}

export default class Vignette extends Component {
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
