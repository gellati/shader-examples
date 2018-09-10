import React, { Component } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RawImage from './RawImage'
import Sepia from './Sepia'
import Greyscale from './Greyscale'
import WaterAnimation from './WaterAnimation'
import MainImageComponent from './MainImageComponent'


class ImageList extends Component{
  constructor(props){
    super()
    this.state = {
      selected_id: '',
      selectedImageData: {
        image: '',
        vshader: '',
        fshader: ''
      },
      image: '',
      vshader: '',
      fshader: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.mainImage = React.createRef();
  }

  selectedImage(params){
    this.setState({
      selectedImageData: params
    })
  }

  onChildSelected(id, selected){
    let selections  = this.state.selections;
    console.log("ImageList:o")

    selected_id = selected;
    this.setState({
      selected: selected_id
    });
  }

  handleClick(e) {
/*
    console.log("handleClick e.target: ", e.target)
    console.log("handleClick this.state.pointer", this.state.pointer)
    console.log("handleClick this: ", this)
    console.log("ImageList:h")
    if( e.target === this.state.pointer ){ return }
    console.log("ImageList:j")
    this.setState({ pointer: e.target })
    */
    console.log("handleClick e: ", e)

/*
*/
    this.setState({ fshader: e.fshader,
                    vshader: e.vshader,
                    image: e.image})
    console.log("handleClick state: ", this.state )
    console.log("handleClick state.fshader: ", this.state.fshader )
    console.log("handleClick state.vshader: ", this.state.vshader )



//    this.setState({ clicked: !currentState }, function(){
//      this.setWidth();
//    })
  }

  componentDidUpdate(){
    this.updateMainImage()
  }

  updateMainImage(){

  }

  render(){
    var props = {}
    props.handleClick = this.handleClick
    props.selectImageData = this.state.selectedImageData

    return(
      <div id="container">
      <p>fshader: {this.state.fshader}</p>
      <p>vshader: {this.state.vshader}</p>
      <p>image: {this.state.image}</p>
      <div id="main-image">
      <MainImageComponent
                           vshader={this.state.vshader}
                            fshader={this.state.fshader}
                            image={this.state.image}
                            height={400}
                            width={400}
                            ref={this.mainImage}>
      </MainImageComponent>
      </div>
      <div className="components">
      <RawImage {...props} // handleClick={this.handleClick}
                />
      <Sepia {...props} />
      <Greyscale {...props} />
      <WaterAnimation {...props} />
      </div>
      </div>

    )

  }
}

export default ImageList;
