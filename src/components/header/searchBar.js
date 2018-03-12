import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { setCurrentObject } from '../../actions/index';
import Suggest from './suggest';
import './header.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.state = {
      inputField : null,
    }
  }
  render() {
    return (
      <div className="navbar-form navbar-left">
        <input type="text" className="form-control" placeholder="Search..." onKeyPress={this.handleKeyPress} onChange={this.updateInputValue}/>
        <button className="btn btn-primary mb-2" style={{color: "#FFFFFF"}} onClick={this.onClickButton}><span className="glyphicon glyphicon-search"></span></button>
      </div>
    );
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      if(this.state.inputField != null){
        var urlString = "http://localhost:8083/kb/v1/concept/" + this.state.inputField;
        fetch(urlString)
        .then(res => res.json())
        .then(
          (result) => {
            this.props.setCurrentObject(result);
          },
          (error) => {
            console.log(error);
          }
        )
      }else{
        console.log("empty");
      }
    }
  }
  updateInputValue(e){
    this.setState({inputField: e.target.value});
  }
  onClickButton(){
    if(this.state.inputField != null){
      var urlString = "http://localhost:8083/kb/v1/concept/" + this.state.inputField;
      fetch(urlString)
      .then(res => res.json())
      .then(
        (result) => {
          this.props.setCurrentObject(result);
        },
        (error) => {
          console.log(error);
        }
      )
    }else{
      console.log("empty");
    }
  }
}

// Get apps state and pass it as props to currentObject
// whenever state changes, the currentObject will automatically re-render
function mapStateToProps(state) {
    return {
        currentObject: state.currentObject
    };
}

// Get actions and pass them as props to to currentObject
function matchDispatchToProps(dispatch){
    return bindActionCreators({setCurrentObject: setCurrentObject}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SearchBar);
