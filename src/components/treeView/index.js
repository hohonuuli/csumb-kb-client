import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './treeView.css';

class TreeView extends Component {
  componentWillMount(){
    fetch("http://localhost:8083/kb/v1/phylogeny/down/object")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  render() {
    return (
      <div className="col-sm-3 col-md-2 sidebar">
        <ul className="nav nav-sidebar">
          <ul className="nav nav-list">
              <li>
                  <label className="nav-header"><i className='tree-toggler glyphicon glyphicon-chevron-right'></i><div id="view-toggler">Root</div></label>
                  <ul className="nav nav-list tree" id="objectTree"></ul>
              </li>
          </ul>
        </ul>
      </div>
    );
  }
}

export default TreeView;
