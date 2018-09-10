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
                     p.x *= .5;
                     vec3 col;
                     float speed = .1;
                     float t = iTime * .3;
                     t += 5000.;
                     float l = length(p)*t*.0015;
                     uv += p/l*((t * .001)+2.)*(tan(l*2. - t*speed));
                     for(int i = 0; i <= 3; i++){
                       col[i] = .2/length(mod(uv, 1.5)-.5);
                       col[i] = (.9 * float(i) * sin(t));
                     }
                     gl_FragColor = vec4(col/l,0.);
                   }`
}

export default class LiquidMetalRings extends Component {

  render(){
    return(
      <div>
         <ShaderComponent vshader={myshaders.vshader} fshader={myshaders.fshader} />
      </div>
    )
  }
}
