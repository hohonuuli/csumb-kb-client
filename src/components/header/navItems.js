import React, { Component } from 'react';
import { Nav, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './header.css';

class NavItems extends Component {
  render() {
    return (
      <Nav pullRight>
        <LinkContainer to="/login">
          <NavItem eventKey={1}>Login</NavItem>
        </LinkContainer>
        <LinkContainer to="/profile">
          <NavItem eventKey={2}>Profile</NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default NavItems;
