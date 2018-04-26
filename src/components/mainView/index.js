import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { refreshConcept } from '../../actions/index';
import './mainView.css';

import TabView from '../tabView';

class MainView extends Component {
  componentWillMount(){
    this.props.refreshConcept();
  }

  render() {
    return (
      <div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main">
        <h1 className="page-header" style={{textAlign: "center"}}>Knowledgebase Dashboard</h1>
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
    return bindActionCreators({refreshConcept: refreshConcept}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MainView);
