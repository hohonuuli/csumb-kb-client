import React, { Component } from 'react';
import { Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';


class TemplatesTab extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px", borderRadius: "10px"}} >

      <Form horizontal>
          <FormGroup controlId="formHorizontalUrl">
              <Col componentClass={ControlLabel} sm={2}>
              From:
              </Col>
              <Col sm={10}>
                  <FormControl type="text" placeholder="" value="" readOnly/>
              </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalCaption">
              <Col componentClass={ControlLabel} sm={2}>
              Link:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value="" readOnly/>
              </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalCredit">
              <Col componentClass={ControlLabel} sm={2}>
              To:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value="" readOnly/>
              </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalCredit">
              <Col componentClass={ControlLabel} sm={2}>
              Value:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value="" readOnly/>
              </Col>
          </FormGroup>

      </Form>

      </div>
    );
   }
}

export default TemplatesTab;
