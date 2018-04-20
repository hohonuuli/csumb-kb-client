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
    const {isAuthenticated} = this.props;
    if(!isAuthenticated){
      logButton = <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>;
    }else{
      logButton = <LinkContainer to="/"><NavItem><div onClick={this.onClick}>Logout</div></NavItem></LinkContainer>;
    }
    return (
      <Nav pullRight>
        {isAuthenticated && 
        <LinkContainer to="/settings">
          <NavItem>Settings</NavItem>
        </LinkContainer>
        } 
        {logButton}
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
  return {
    isAuthenticated
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({logoutUser: logoutUser}, dispatch);
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(NavItems));
