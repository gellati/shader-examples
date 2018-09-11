import React, { Component } from 'react';


// ok, work
import First from './First'
import Logic from './Logic'
import GradientFill from './GradientFill'
import Animation from './Animation'

//import BoxBlur from './BoxBlur'
//import Vignette from './Vignette'
import ColorIntensityDistance from './ColorIntensityDistance'
import ColorSeparation from './ColorSeparation'
//import LiquidMetalRings from './LiquidMetalRings'

import ThreeShader from './ThreeShader'

import RawImage from './RawImage'
import Sepia from './Sepia'
import Greyscale from './Greyscale'
import WaterAnimation from './WaterAnimation'
import MainImageComponent from './MainImageComponent'

import Basic3Dscene from './Basic3Dscene'

class Dashboard extends Component{
  constructor(){
    super()
    this.state = {
      selectedImageData: {
        image: '',
        vshader: '',
        fshader: ''
      }
    }
    this.mainImage = React.createRef();
    this.selectedImage = this.selectedImage.bind(this)
  }

  selectedImage(params){
    this.setState({
      selectedImageData: params
    })
  }

  render(){
    var props = {}
    props.selectedImage = this.selectedImage
    props.selectImageData =  this.state.selectedImageData

    return(
      <div id="container">
      <div id="main-image">
      <MainImageComponent
                           vshader={this.state.selectedImageData.vshader}
                            fshader={this.state.selectedImageData.fshader}
                            image={this.state.selectedImageData.image}
                            height={400}
                            width={400}
                            ref={this.mainImage}
                            {...props}
                            >
      </MainImageComponent>
      </div>
      <div className="components">

{/* 304 */}
      <First {...props} />
      <Logic {...props} />
      <GradientFill {...props} />
      <Animation {...props} />

{/* 305 */}
      <RawImage {...props} />
      {/* handleClick={this.handleClick} */}
      <Sepia {...props} />
      <Greyscale {...props} />
      <WaterAnimation {...props} />

{/* 306 */}
{/*
  <BoxBlur {...props} />
  <Vignette {...props} />
*/}

{/*      <TunnelAnimation {...props} /> */}


{/* 309 */}
      <ThreeShader {...props} />


{/*  */}
      <ColorIntensityDistance {...props} />
      <ColorSeparation {...props} />
      {/*
        <LiquidMetalRings {...props} />
      */}

      <Basic3Dscene {...props} />



      </div>
      </div>

    )

  }
}

export default Dashboard;
