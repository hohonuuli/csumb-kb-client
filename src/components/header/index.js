import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import NavItems from './navItems';
import './header.css';

class Header extends Component {
  render() {
    return (
      <Navbar collapseOnSelect className="navbar-custom">
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a href="/"><img src="img/mbari-logo.png" alt="MBARI"/></a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <NavItems />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
