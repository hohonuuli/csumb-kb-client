import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { refreshConcept } from '../../actions/index';
import { receiveLogin } from '../../actions/userActions';

import './mainView.css';

import TabView from '../tabView';

class MainView extends Component {
  componentWillMount(){
    this.props.refreshConcept();
    if(sessionStorage.getItem('access_token')){
      this.props.receiveLogin(sessionStorage.getItem('access_token'));
    }
  }

  render() {
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">
        <h2 className="page-header" style={{textAlign: "center"}}>Knowledgebase Dashboard</h2>
        <TabView />
      </div>

    );
  }
}

// Get apps state and pass it as props
function mapStateToProps(state) {
  return {
    state
  }
}
// Get actions and pass them as props to component
function matchDispatchToProps(dispatch){
    return bindActionCreators({refreshConcept: refreshConcept, receiveLogin: receiveLogin}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainView);
