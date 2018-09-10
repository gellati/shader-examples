import React, { Component } from 'react';
import ShaderComponent from './ShaderComponent'


const myshaders = {
  vshader : `varying vec2 vUv;
                   void main(){
                     vUv = uv;
                     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                     gl_Position = projectionMatrix * mvPosition;
                   }`,
  fshader : `
                   uniform vec2 iResolution;
                   void main(){
                     vec2 uv = gl_FragCoord.xy;
                     uv.x = uv.x/iResolution.x;
                     uv.y = uv.y/iResolution.y;
                     vec4 col = vec4(0.8, 0.1, 0.1, 1.0);
                     if(uv.y > 0.5){
                       col = vec4(0.4,0.3,0.9,1.0);
                     }
                     gl_FragColor = col;
                   }`
}

export default class Logic extends Component {

  render(){
    return(
      <div>
         <ShaderComponent vshader={myshaders.vshader} fshader={myshaders.fshader} />
      </div>
    )
  }
}
