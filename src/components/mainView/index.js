import React, { Component } from 'react';
import TreeView from '../../components/treeView';
import './mainView.css';

class MainView extends Component {
  render() {
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <div className="alert alert-danger alert-dismissible" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong id="alertError">Warning!</strong> <span id="alertText"></span>
        </div>
        <h1 className="page-header">Dashboard</h1>

        <h2 className="sub-header">Object (root)</h2>
        <div id="objectConcept"></div>
      </div>
    );
  }
}

export default MainView;
