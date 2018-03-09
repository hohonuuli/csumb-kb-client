import React, { Component } from 'react';
import './header.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
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
      console.log(this.state.inputField);
    }
  }
  updateInputValue(e){
    this.setState({inputField: e.target.value});
  }
  onClickButton(){
    console.log(this.state.inputField);
  }
}

export default SearchBar;
