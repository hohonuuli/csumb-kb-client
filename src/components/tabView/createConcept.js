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
            placeholder="Enter text"
            onChange={this.props.onFormChange}
          />
          <ControlLabel>Author</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter text"
          />
          <ControlLabel>Type </ControlLabel>
          <Radio name="radioGroup" inline>Primary</Radio>
          <Radio name="radioGroup" inline>Common</Radio>
          <Radio name="radioGroup" inline>Synonym</Radio>
          <Radio name="radioGroup" inline>Former</Radio>
        </FormGroup>
      </form>
    );
  }
}


export default FormExample;
