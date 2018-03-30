import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './header.css';
import { logoutUser } from '../../actions/userActions';

class NavItems extends Component {
  render() {
    var logButton;
    const { isAuthenticated } = this.props;
    if(!isAuthenticated){
      logButton = <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>;
    }else{
      logButton = <LinkContainer to={dispatchEvent(logoutUser())}>Logout</LinkContainer>
    }
    return (
      <Nav pullRight>
        {logButton}
        <LinkContainer to="/profile">
          <NavItem>Profile</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

function mapStateToProps(state) {
  
  const { auth } = state
  const { isAuthenticated } = auth
  
  return {
    isAuthenticated,
  }
}

export default connect(mapStateToProps)(NavItems);
