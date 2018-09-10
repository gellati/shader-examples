import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'

import image from '../static/media/images/stones.jpg'

const myshaders = {

  vshader : `varying vec2 vUv;
             void main(){
               vUv = uv;
               vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
               gl_Position = projectionMatrix * mvPosition;
             }`,
  fshader : `
             uniform vec2 iResolution;
             uniform sampler2D texture1;
             vec3 dCol = vec3(.3, .6, .1);
             vec3 sepia = vec3(1.2, 1.0, 0.8);

             uniform float iTime;
             void main(){
               vec2 uv = gl_FragCoord.xy / iResolution.xy;
               uv.x += (sin((uv.y - (iTime * 0.1 )) * 10.0) * 0.005);
               uv.y += (cos((uv.y - (iTime * 0.05)) * 40.0 ) * 0.003);
               vec4 texColor = texture2D(texture1, uv);
               gl_FragColor = texColor;
             }
`
}

export default class Sepia extends Component {
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
            {...props}
            />
    )
  }
}
