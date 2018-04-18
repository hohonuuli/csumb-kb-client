import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';

import AlertComp from '../../components/common/alertComp';
import { setCurrentObject } from '../../actions/index';
import './mainView.css';

import ControlledTabs from '../tabView/tab';

class MainView extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: '',
    };
  }
  componentWillMount(){
    fetch("http://localhost:4567/getMetadata/object")
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

  handleDelete = () => {
    let config = {
      method: 'DELETE',
      headers: { 'Content-Type':'application/json' },
    }
  
    var fetchString = 'http://localhost:4567/deleteConcept/' + this.props.currentObject.currentObject.name + 
    '?userName=' + sessionStorage.getItem("access_username") + "&jwt=" + sessionStorage.getItem("access_token");

    fetch(fetchString, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
              this.setState({error: user.message});
      }).catch(err => this.setState({error: err}))

  }

  render() {
    var {isAuthenticated, currentObject} = this.props;
    const { error } = this.state;
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">
        {error &&
          <AlertComp show={true} message={error}/>
        }
        <h1 className="page-header">Knowledgebase Dashboard</h1>
        <h2 className="sub-header" style={{textTransform: "capitalize"}}>{currentObject.currentObject.name}</h2>
        {isAuthenticated && 
          <div style={{display: "inline-block"}}>
            <Button className="pull-right" bsStyle="primary">Update</Button>
            <Button className="pull-right" bsStyle="primary">Add</Button>
            <Button className="pull-right" bsStyle="primary" onClick={this.handleDelete}>Delete</Button>
          </div>
        } 
        <ControlledTabs />

      </div>

    );
  }
}
// Get apps state and pass it as props to currentObject
//      > whenever state changes, the currentObject will automatically re-render
function mapStateToProps(state) {
  
  const { currentObject, auth } = state
  const { isAuthenticated } = auth
  return {
    currentObject,
    isAuthenticated
  }
}
// Get actions and pass them as props to to currentObject
//      > now currentObject has this.props.currentObject
function matchDispatchToProps(dispatch){
    return bindActionCreators({setCurrentObject: setCurrentObject}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainView);
