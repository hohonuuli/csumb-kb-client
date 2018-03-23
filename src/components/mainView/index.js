import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

import AlertComp from '../../components/common/alertComp';
import { setCurrentObject } from '../../actions/index';
import './mainView.css';

import ControlledTabs from '../tabView/tab';
import formInstance from '../tabView/createConcept';
import FieldGroup from '../tabView/createConcept';
import ModalC from '../tabView/modal';

class MainView extends Component {
  componentWillMount(){
    fetch("http://localhost:8083/kb/v1/concept/object")
    .then(res => res.json())
    .then(
      (result) => {
        this.props.setCurrentObject(result);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  buttonClicked() {
      console.log('Button was clicked!')
  }

  render() {
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        <AlertComp />
        <h1 className="page-header">Dashboard</h1>
        <Button className="pull-right" bsStyle="primary" onClick={this.buttonClicked}>Update</Button>
        <Button className="pull-right" bsStyle="primary">Add</Button>
        <Button className="pull-right" bsStyle="primary">Delete</Button>

    
        <h2 className="sub-header">Object (root)</h2>
        <div id="objectConcept"></div>
        <ControlledTabs />
        <ModalC />


      </div>

    );
  }
}
// Get apps state and pass it as props to currentObject
//      > whenever state changes, the currentObject will automatically re-render
function mapStateToProps(state) {
    return {
        currentObject: state.currentObject
    };
}

// Get actions and pass them as props to to currentObject
//      > now currentObject has this.props.currentObject
function matchDispatchToProps(dispatch){
    return bindActionCreators({setCurrentObject: setCurrentObject}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainView);
