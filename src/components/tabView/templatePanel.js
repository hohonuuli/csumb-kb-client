import React, { Component } from 'react';
import { Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import DeleteLinkModal from '../common/modals/deleteLinkModal';
import UpdateLinkModal from '../common/modals/updateLinkModal';

class TemplatePanel extends Component{
  render(){
    return(
      <div>
      {
      this.props.templateItem &&
        <div style={{backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px", borderRadius: "10px"}} >
        {this.props.isAuthenticated &&
          <div className={"row"} style={{width: "98%", display: "inline-block", margin: "5px"}}>
            <DeleteLinkModal conceptName={this.props.conceptName} templateItem={this.props.templateItem} refreshConcept={this.props.refreshConcept}/>
            <UpdateLinkModal conceptName={this.props.conceptName} templateItem={this.props.templateItem} refreshConcept={this.props.refreshConcept}/>
          </div>
        }
        <Form horizontal>
            <FormGroup controlId="conceptName">
                <Col componentClass={ControlLabel} sm={2}>
                From:
                </Col>
                <Col sm={10}>
                    <FormControl type="text" placeholder="" value={this.props.conceptName} readOnly/>
                </Col>
            </FormGroup>
            <FormGroup controlId="linkName">
                <Col componentClass={ControlLabel} sm={2}>
                Link:
                </Col>
                <Col sm={10}>
                <FormControl type="text" placeholder="" value={this.props.templateItem.linkName} readOnly/>
                </Col>
            </FormGroup>
            <FormGroup controlId="linkTo">
                <Col componentClass={ControlLabel} sm={2}>
                To:
                </Col>
                <Col sm={10}>
                <FormControl type="text" placeholder="" value={this.props.templateItem.toConcept} readOnly/>
                </Col>
            </FormGroup>
            <FormGroup controlId="linkValue">
                <Col componentClass={ControlLabel} sm={2}>
                Value:
                </Col>
                <Col sm={10}>
                <FormControl type="text" placeholder="" value={this.props.templateItem.linkValue} readOnly/>
                </Col>
            </FormGroup>

        </Form>
        </div>
      }
      </div>
    );
  }
}
export default TemplatePanel;