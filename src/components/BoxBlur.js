import React, { Component } from 'react';
import ImageShaderComponent from './ImageShaderComponent'

import image from '../static/media/images/stones.jpg'

const myshaders = {

  /*
float blur = 5.0;
void mainImage(out vec4 fragColor, in vec2 fragCoord){
vec3 total = vec3(0.0);
for(float i = -blur; i <= blur; ++i){
for(float j = -blur; j <= blur; ++j){
vec2 xy, fragCoord.xy + vec2(float(i), float(j))
vec2 uv = xy/iResolution.xy
vec4 col = texture(iChannel0, uv)
total += col.rgb
}
}
float area = pow((2.0 * blur + 1.0), 2.0)
vec3 avg = total.rgb / area
fragColor = vec4(avg, 1.0)
}
*/
  vshader : `varying vec2 vUv;
                   void main(){
                     vUv = uv;
                     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                     gl_Position = projectionMatrix * mvPosition;
                   }`,
  fshader : `uniform float iTime;
             uniform vec2 iResolution;
             uniform sampler2D texture1;
             float blur = 5.0;
             int iblur = 5;
             void main(){
               vec3 total = vec3(1.0);
               for(int i = -iblur; i <= iblur; ++i){
                 for(int j = -iblur; j <= iblur; ++j){
                   vec2 xy = gl_FragCoord.xy + vec2(float(i), float(j));
                   vec2 uv = xy/iResolution.xy;
                   vec4 col = texture2D(texture1, uv);
                   total += col.rgb;
                 }
               }
               float area = pow((2.0 * blur + 1.0), 2.0);
               vec3 avg = total.rgb / area;
               gl_FragColor = vec4(avg, 1.0);
             }
`
}

export default class BoxBlur extends Component {

  render(){
    return(
      <div>
         <ImageShaderComponent vshader={myshaders.vshader} fshader={myshaders.fshader} image={image} />
      </div>
    )
  }
}
