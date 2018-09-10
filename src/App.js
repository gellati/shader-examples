import React, { Component } from 'react';
//import styled from 'styled-components';

import './App.css';

/*
import ShaderComponent from './components/ShaderComponent'
// ok, work
import First from './components/First'
import Logic from './components/Logic'
import GradientFill from './components/GradientFill'
import Animation from './components/Animation'


import BoxBlur from './components/BoxBlur'
import Vignette from './components/Vignette'
import ColorIntensityDistance from './components/ColorIntensityDistance'
import ColorSeparation from './components/ColorSeparation'
import LiquidMetalRings from './components/LiquidMetalRings'

import ThreeShader from './components/ThreeShader'
*/

import Dashboard from './components/Dashboard'

//const App = <ShaderComponent vshader={myshaders.vshader} fshader={myshaders.fshader} />;

export default class App extends Component {

  render(){
    return(
      <Dashboard />
    )
  }
}


/*
//        <StyledRawImage>
//          </StyledRawImage>



_*/
