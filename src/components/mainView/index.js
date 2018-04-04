import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

import AlertComp from '../../components/common/alertComp';
import { setCurrentObject } from '../../actions/index';
import './mainView.css';

import ControlledTabs from '../tabView/tab';
import ModalC from '../tabView/modal';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentObject: {}
    };
  }
  componentWillMount(){
    fetch("http://localhost:8083/kb/v1/concept/object")
    .then(res => res.json())
    .then(
      (result) => {
        this.props.setCurrentObject(result);
        this.setState({currentObject: result})
      },
      (error) => {
        console.log(error);
      }
    )
  }

  handleDelete = () => {
  //http://localhost:4567/deleteConcept/hadal?userName=Brian
      console.log('Delete button was clicked!')
      fetch('http://localhost:4567/deleteConcept/' + this.props.currentObject.currentObject.name, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          name: this.props.currentObject,
          //user name for testing
          role: "Admin",
          userName: "Brian",
        }),

      })
      .then(function(response) {
          const res = response.json();
          res.then((json) => console.log(json) )
          console.log(response);


      }).catch(function(error) {
          console.log(error);
      });

  }

  render() {
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">
        <AlertComp />
        <h1 className="page-header">Dashboard</h1>
        <Button className="pull-right" bsStyle="primary">Update</Button>
        <Button className="pull-right" bsStyle="primary">Add</Button>
        <Button className="pull-right" bsStyle="primary" onClick={this.handleDelete}>Delete</Button>

        <h2 className="sub-header">{this.props.currentObject.name || "Object (root)"}</h2>
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
  return state.currentObject
}

// Get actions and pass them as props to to currentObject
//      > now currentObject has this.props.currentObject
function matchDispatchToProps(dispatch){
    return bindActionCreators({setCurrentObject: setCurrentObject}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainView);
