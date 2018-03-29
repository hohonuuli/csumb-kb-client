import React, { Component } from 'react';

import { FormGroup, FormControl } from 'react-bootstrap';
import { ControlLabel, Radio } from 'react-bootstrap';


class FormExample extends Component {
  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Concept Name</ControlLabel>
          <FormControl
            type="text"
            name="name"
            placeholder="Enter text"
            onChange={this.props.setName}
          />
          <ControlLabel>Author</ControlLabel>
          <FormControl
            type="text"
            name="author"
            placeholder="Enter text"
            onChange={this.props.setAuthor}
          />
          <ControlLabel>Type </ControlLabel>
          <Radio name="radioGroup" value="primary" onChange={this.props.setType} inline>Primary</Radio>
          <Radio name="radioGroup" value="common" onChange={this.props.setType} inline>Common</Radio>
          <Radio name="radioGroup" value="synonym" onChange={this.props.setType} inline>Synonym</Radio>
          <Radio name="radioGroup" value="former" onChange={this.props.setType} inline>Former</Radio>
        </FormGroup>
      </form>
    );
  }
}

export default FormExample;
