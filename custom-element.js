/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
//import { PolymerElement, html } from 'https://unpkg.com/@polymer/polymer@3.0.0-pre.13/polymer-element.js';
//import { PolymerElement, html } from '@polymer/polymer';


import { PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js';
//import { html as html } from './node_modules/@polymer/polymer/polymer-element.js';
//import "./style-element.js";
//window.onload = function(){

document.addEventListener('DOMContentLoaded', function(){

function startshader(){


class CustomElement extends PolymerElement {
  static get template() {
    return html`

<template>
    <style>
    html, body{ margin: 0; padding: 0;}
    canvas{ width: 100%; height: 100%; }
    </style>
    <div>
    <content></content>
    </div>
</template>
    <script id="vertexShader" type="x-shader/x-vertex">
    varying vec2 vUv;
    void main(){
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
    </script>
    <script id="fragmentShader" type="x-shader/x-fragment">
    uniform float iTime;
    uniform vec2 iResolution;
    void main(){
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = gl_FragCoord.xy/iResolution.xy;
      vec2 p = (2. * uv - 1.);
      float d = .01;
      vec3 col;
      float l = length(p);
      float t = iTime * .25;

      for(int i = 0; i <= 3; i++){
          uv += p/l*(sin(l - t));
          col[i] = d/length(mod(uv, 1.0)-.5);
      }

      gl_FragColor = vec4(col/l,0.);
    }
    </script>
    <script>
    var camera, scene, renderer;
    var uniforms, material, mesh;
    var startTime = Date.now();
    var clock = new THREE.Clock();
    init();
    function init(){
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000000);
      camera.position.z = 1;
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      uniforms = {
        iTime: { type: "f", value: 10000.0},
        iResolution: { type: "v2", value: new THREE.Vector2()}
      };
      uniforms.iResolution.value.x = window.innerWidth;
      uniforms.iResolution.value.y = window.innerHeight;

      material = new THREE.ShaderMaterial({ uniforms: uniforms,
                                            vertexShader: document.getElementById('vertexShader').textContent,
                                            fragmentShader: document.getElementById('fragmentShader').textContent });

      var geometry = new THREE.PlaneGeometry(1, 1);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.scale.x = window.innerWidth;
      mesh.scale.y = window.innerHeight;
      scene.add(mesh);
      animate();
    }

    function animate(){
      requestAnimationFrame(animate);
      render();
    }
    function render(){
      uniforms.iTime.value += clock.getDelta();
      renderer.render(scene, camera);
    }
    </script>
    `;
  }
}
customElements.define('custom-element', CustomElement);


/*
      <!-- Include the styles defined in style-element.js: -->
      <style include="style-element">
        <!-- Define any additional styles here -->
        p {
          font-family: sans-serif;
        }
      </style>
      <div>
         <p>These styles are defined in <code>style-element.js</code>.</p>
      </div>

*/

/*
<style> .mood { color: green; } </style>
Web Components are <span class="mood">[[mood]]</span>!
*/
}

});
