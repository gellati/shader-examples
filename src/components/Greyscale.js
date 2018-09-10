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
             void main(){
               vec2 uv = gl_FragCoord.xy / iResolution.xy;
               vec4 col = texture2D(texture1, uv);
               float grey = dot(col.rgb, dCol);
               vec3 greyCol = vec3(grey, grey, grey);
               gl_FragColor = vec4(greyCol, 1.0);
             }
`
}

export default class Greyscale extends Component {
  constructor(props){
    super(props)
  }

  render(){
    var props = this.props
    return(
         <ImageShaderComponent vshader={myshaders.vshader} fshader={myshaders.fshader} image={image}
         {...props} />
    )
  }
}
