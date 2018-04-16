import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { setCurrentObject } from '../../actions/index';
import { Tabs, Tab } from 'react-bootstrap';


class ControlledTabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.altNames = ""

    this.state = {
      key: 1
    };
  }

  handleSelect(key) {
    //alert(`selected ${key}`);
    this.setState({ key });

    // if(key === 1){
    //   console.log("key is one")
    //   this.altNames = "Altername names: " + this.props.currentObject.currentObject.alternateNames;
    //   if(this.altNames===""){
    //     this.altNames = "No altername names"
    //   }
    // }
    switch(key){
      case 1:
        console.log("key is one")
        break;

      default:
        console.log("ok");

    }




  }//end

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Names">
        <h4>{this.props.currentObject.currentObject.name}</h4>
          <h5>{this.altNames}</h5>
        </Tab>
        <Tab eventKey={2} title="Templates">
          Templates go here
        </Tab>
        <Tab eventKey={3} title="Properties">
          {JSON.stringify(this.props.currentObject.currentObject.descriptors)}
        </Tab>
        <Tab eventKey={4} title="Media">
          {JSON.stringify(this.props.currentObject.currentObject.media)}
        </Tab>
        <Tab eventKey={5} title="History">
          {JSON.stringify(this.props.currentObject.currentObject.history)}
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
