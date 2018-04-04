import React, { Component } from 'react';
import { Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {withRouter} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { logoutUser } from '../../actions/userActions';
import './header.css';

class NavItems extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this)
  }
  onClick(){
    this.props.logoutUser();
    setTimeout(() => {this.props.history.push("/")}, 1000);
  }
  render() {
    var logButton;
    if(!sessionStorage.getItem('access_token')){
      logButton = <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>;
    }else{
      logButton = <LinkContainer to="/"><NavItem><div onClick={this.onClick}>Logout</div></NavItem></LinkContainer>;
    }
    return (
      <Nav pullRight>
        <LinkContainer to="/profile">
          <NavItem>Profile</NavItem>
        </LinkContainer>
        {logButton}
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({logoutUser: logoutUser}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(NavItems));
