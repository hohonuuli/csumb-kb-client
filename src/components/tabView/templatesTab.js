import React, { Component } from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';
import AddTemplateModal from '../common/modals/addTemplateModal';
import TemplatePanel from './templatePanel';

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
            this.props.templates.map(template => {
              count++
              return (
              <option key={count} value={count}>
                {'Link: ' + template.linkName + " | To: " + template.toConcept + ' | Value: ' + template.linkValue}
              </option>
              );
            })
          }
        </FormControl>
      </FormGroup>
      </Form>
      )
    templatePanel = <TemplatePanel refreshConcept={this.props.refreshConcept} isAuthenticated={this.props.isAuthenticated} conceptName={this.props.conceptName} templateItem={this.props.templates[this.state.selectedTemplate]}/>

    }
    return (
      <div>
        <div>{selectList}</div>
        {this.props.isAuthenticated && 
          <div className={"row"} style={{width: "100%", paddingRight: "46%", display: "inline-block", margin: "5px"}}>
              <AddTemplateModal conceptName={this.props.conceptName} refreshConcept={this.props.refreshConcept}/>
          </div>
        }
        <div>{templatePanel}</div>
      </div>
  
    );
   }
}
export default TemplatesTab;