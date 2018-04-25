import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';

import AlertComp from '../../components/common/alertComp';
import { refreshConcept } from '../../actions/index';
import './mainView.css';

import TabView from '../tabView';
import ConceptModal from '../common/modals/conceptModal';
import AddName from '../common/modals/addNameModal';

class MainView extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: '',
    };
  }
  componentWillMount(){
    this.props.refreshConcept();
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


  handleAdd = () => {



  }

  render() {
    var {isAuthenticated} = this.props;
    const { error } = this.state;
    var currentObject = this.props.currentObject.currentObject;
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">
        {error &&
          <AlertComp show={true} message={error}/>
        }
        <h1 className="page-header">Knowledgebase Dashboard</h1>
        <h2 className="sub-header" style={{textTransform: "capitalize"}}>{currentObject.name}</h2>
        {isAuthenticated &&
          <div style={{display: "inline-block"}}>
          <ButtonToolbar>
            <Button className="pull-right" bsStyle="primary" onClick={this.handleDelete}>Delete</Button>
            <ConceptModal parent={currentObject.name}/>
          </ButtonToolbar>
          </div>
        }
        <TabView />

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
    return bindActionCreators({refreshConcept: refreshConcept}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainView);
