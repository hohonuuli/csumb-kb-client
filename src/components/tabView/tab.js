import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { setCurrentObject } from '../../actions/index';
import { Tabs, Tab } from 'react-bootstrap';
import MediaTab from './mediaTab';
import HistoryTab from './historyTab';


class ControlledTabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    //alert(`selected ${key}`);
    this.setState({ key });
  }

  render() {
    const currentObject = this.props.currentObject.currentObject;
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Names">
          {JSON.stringify(currentObject)}
        </Tab>
        <Tab eventKey={2} title="Templates">
          {JSON.stringify(currentObject)}
        </Tab>
        <Tab eventKey={3} title="Properties">
          {JSON.stringify(currentObject)}
        </Tab>
        <Tab eventKey={4} title="Media">
          <MediaTab isAuthenticated={this.props.isAuthenticated} conceptName={currentObject.name} media={currentObject.media}/>
        </Tab>
        <Tab eventKey={5} title="History">
          <HistoryTab  isAuthenticated={this.props.isAuthenticated} history={currentObject.history} conceptName={currentObject.name}/>
        </Tab>
      </Tabs>

    );
  }
}

// Get apps state and pass it as props to currentObject
//      > whenever state changes, the currentObject will automatically re-render
function mapStateToProps(state) {
  const { auth } = state
  const { isAuthenticated } = auth
    return {
        currentObject: state.currentObject,
        isAuthenticated
    };
}

// Get actions and pass them as props to to currentObject
//      > now currentObject has this.props.currentObject
function matchDispatchToProps(dispatch){
    return bindActionCreators({setCurrentObject: setCurrentObject}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ControlledTabs);
