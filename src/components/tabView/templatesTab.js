import React, { Component } from 'react';
import { Col, Form, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';


class TemplatesTab extends Component {
  constructor(props, context){
    super(props,context);
    this.state = {
      selectedTemplate: 0,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    var selectList, templatePanel;
    if(this.props.templates){
      var count = -1;
      selectList = (
      <Form>
      <FormGroup controlId="selectedTemplate">
        <FormControl style={{height: "125px"}} componentClass="select" name="selectedTemplate" placeholder="select" multiple onChange={this.handleChange}>
          {
            this.props.templates.map(template =>{
              count++
              return <option key={count} value={count}>{JSON.stringify(template)}</option>
            })
          }
        </FormControl>
      </FormGroup>
      </Form>
      )
      templatePanel = (<TemplatePanel conceptName={this.props.conceptName} templateItem={this.props.templates[this.state.selectedTemplate]}/> )

    }
    return (
      <div>
        <div>{selectList}</div>
        <div>{templatePanel}</div>
      </div>
  
    );
   }
}
class TemplatePanel extends Component{
  render(){
    return(
      <div style={{backgroundColor: "#f5f5f5", padding: "10px", marginBottom: "10px", borderRadius: "10px"}} >

      <Form horizontal>
          <FormGroup controlId="formHorizontalUrl">
              <Col componentClass={ControlLabel} sm={2}>
              From:
              </Col>
              <Col sm={10}>
                  <FormControl type="text" placeholder="" value={this.props.conceptName} readOnly/>
              </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalCaption">
              <Col componentClass={ControlLabel} sm={2}>
              Link:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value={this.props.templateItem.linkName} readOnly/>
              </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalCredit">
              <Col componentClass={ControlLabel} sm={2}>
              To:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value={this.props.templateItem.toConcept} readOnly/>
              </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalCredit">
              <Col componentClass={ControlLabel} sm={2}>
              Value:
              </Col>
              <Col sm={10}>
              <FormControl type="text" placeholder="" value={this.props.templateItem.linkValue} readOnly/>
              </Col>
          </FormGroup>

      </Form>

      </div>
    );
  }
}
export default TemplatesTab;