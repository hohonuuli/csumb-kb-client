import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { refreshConcept } from '../../actions/index';
import { Tabs, Tab, Button } from 'react-bootstrap';
import MediaTab from './mediaTab';
import HistoryTab from './historyTab';
import PropTab from './propertiesTab';
import NameTab from './nameTab';
import TemplatesTab from './templatesTab';
import AddName from '../common/modals/addNameModal';

class TabView extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);
    this.altNames = ""

    this.state = {
      key: 1,
      objectData: null,
    };
  }

  handleSelect(key) {

    this.setState({ key });

  }

  render() {
    var currentObject = this.props.currentObject.currentObject;
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
      >
        <Tab eventKey={1} title="Names">
            {this.props.isAuthenticated &&
              <div>

                  <Button className="pull-right" bsStyle="primary" bsSize="sm">Update</Button>
                  <AddName conceptName={currentObject.name}/>

              </div>
            }
          <h3 style={{textTransform: "capitalize"}}>{currentObject.name}</h3>
          <NameTab conceptName={currentObject.name} alternates={currentObject.alternateNames} isAuthenticated={this.props.isAuthenticated} />
        </Tab>
        <Tab eventKey={2} title="Templates">
          <TemplatesTab templates={currentObject.alternateNames} />
        </Tab>
        <Tab eventKey={3} title="Properties">
          <PropTab isAuthenticated={this.props.isAuthenticated} conceptName={currentObject.name} properties={currentObject.descriptors} refreshConcept={this.props.refreshConcept} />
        </Tab>
        <Tab eventKey={4} title="Media">
          <MediaTab isAuthenticated={this.props.isAuthenticated} conceptName={currentObject.name} media={currentObject.media} refreshConcept={this.props.refreshConcept}/>
        </Tab>
        <Tab eventKey={5} title="History">
          <HistoryTab isAuthenticated={this.props.isAuthenticated} history={currentObject.history} conceptName={currentObject.name}/>
        </Tab>
      </Tabs>
    );
  }
}

// Get apps state and pass it as props to currentObject
//      > whenever state changes, the currentObject will automatically re-render
function mapStateToProps(state) {
  var { auth, currentObject } = state
  const { isAuthenticated } = auth
    return {
        currentObject: currentObject,
        isAuthenticated
    };
}

// Get actions and pass them as props to to currentObject
//      > now currentObject has this.props.currentObject
function matchDispatchToProps(dispatch){
    return bindActionCreators({refreshConcept: refreshConcept}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TabView);
