import React, { Component } from 'react';
import ShaderComponent from './ShaderComponent'


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
                     vec2 p = (2. * uv - 1.);
                     p.x *= iResolution.x / iResolution.y;
                     p *= .5;
                     float d = .01;
                     vec3 col;
                     float l = length(p);
                     float t = iTime * .25;
                     for(int i = 0; i <= 3; i++){
                       uv += p/l*(sin(l - t));
                       col[i] = d/length(mod(uv, 1.0)-.5);
                     }
                     gl_FragColor = vec4(col/l,0.);
                   }`
}

export default class ColorSeparation extends Component {

  render(){
    return(
      <div>
         <ShaderComponent vshader={myshaders.vshader} fshader={myshaders.fshader} />
      </div>
    )
  }
}
