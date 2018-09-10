import React, { Component } from 'react';
import ShaderComponent from './ShaderComponent'

const myshaders = {

  vshader : `varying vec2 vUv;
                   void main(){
                     vUv = uv;
                     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                     gl_Position = projectionMatrix * mvPosition;
                   }`,

fshader: `
                 uniform vec2 iResolution;
                 uniform sampler2D iChannel0;
                 float falloff = 0.5;
                 float strength = 0.5;
                 void main(){
                   vec2 uv = gl_FragCoord.xy / iResolution.xy;
                   vec4 col = texture2D(iChannel0, uv);
                   float d = distance(uv, vec2(0.5));
                   col *= smoothstep(0.8, falloff * 0.8, d * (strength + falloff));
                   gl_FragColor = col;
                 }
`
                 /*

                 */


/*
  fshader : `uniform float iTime;
                   uniform vec2 iResolution;
                   void main(){
                     vec2 uv = gl_FragCoord.xy/iResolution.xy;
                     vec2 p = (2. * uv - 1.);
                     float d = .01;
                     vec3 col; float l = length(p);
                     float t = iTime * .25;
                     for(int i = 0; i <= 3; i++){
                       uv += p/l*(sin(l - t));
                       col[i] = d/length(mod(uv, 1.0)-.5);
                     }
                     gl_FragColor = vec4(col/l,0.);
                   }`
*/

}

export default class Vignette extends Component {

  render(){
    return(
      <div>
         <ShaderComponent vshader={myshaders.vshader} fshader={myshaders.fshader} />
      </div>
    )
  }
}
