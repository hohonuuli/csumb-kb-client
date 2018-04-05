import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { setCurrentObject } from '../../actions/index';
import { Tabs, Tab } from 'react-bootstrap';


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
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Names">
          {JSON.stringify(this.props.currentObject)}
        </Tab>
        <Tab eventKey={2} title="Templates">
          {JSON.stringify(this.props.currentObject)}
        </Tab>
        <Tab eventKey={3} title="Properties">
          {JSON.stringify(this.props.currentObject)}
        </Tab>
        <Tab eventKey={4} title="Media">
          {JSON.stringify(this.props.currentObject)}
        </Tab>
        <Tab eventKey={5} title="History">
          {JSON.stringify(this.props.currentObject)}
        </Tab>
      </Tabs>

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

export default connect(mapStateToProps, matchDispatchToProps)(ControlledTabs);
