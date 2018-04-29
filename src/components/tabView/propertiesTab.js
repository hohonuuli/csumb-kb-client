import React, { Component } from 'react';
import { Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import AddProperty from '../common/modals/addProperty';
import DeleteProperty from '../common/modals/deleteProperty';


class PropTab extends Component {

  render() {
    const { properties } = this.props;
    var data = "";
    if(!properties){
        data = <h3>No properties</h3>
    }else{
        if(properties.length === 0){
            data = <h3>No properties</h3>
        }else{
          var count = 0;
            data = properties.map(propertyItem => {
                count++;
                return (
                    <div style={{backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px", borderRadius: "10px"}} key={count}>
                    <Form horizontal>
                    <FormGroup controlId="formHorizontalUrl">
                       <Col componentClass={ControlLabel} sm={2}>
                       Link:
                       </Col>
                       <Col sm={10}>
                           <FormControl type="text" placeholder="" value={propertyItem.linkName} readOnly/>
                       </Col>
                   </FormGroup>
                   <FormGroup controlId="formHorizontalCaption">
                       <Col componentClass={ControlLabel} sm={2}>
                       To:
                       </Col>
                       <Col sm={10}>
                       <   FormControl type="text" placeholder="" value={propertyItem.toConcept} readOnly/>
                       </Col>
                   </FormGroup>
                   <FormGroup controlId="formHorizontalCredit">
                       <Col componentClass={ControlLabel} sm={2}>
                       Value:
                       </Col>
                       <Col sm={10}>
                       <FormControl type="text" placeholder="" value={propertyItem.linkValue} readOnly/>
                       </Col>
                   </FormGroup>
                   {this.props.isAuthenticated &&
                    <DeleteProperty conceptName={this.props.conceptName} linkName={propertyItem.linkName} refreshConcept={this.props.refreshConcept}/>
                  }
               </Form>
                    </div>
                );
            });
        }
    }
    return (
        <div>
          {this.props.isAuthenticated &&
          <ButtonToolbar>
            <Button bsStyle="primary" className="pull-right" bsSize="sm" onClick={this.handleShow}>
              Update
            </Button>
               <AddProperty conceptName={this.props.conceptName} properties={this.props.properties} refreshConcept={this.props.refreshConcept}/>
            </ButtonToolbar>
          }
            {data}
        </div>
    );
  }
}

export default PropTab;
