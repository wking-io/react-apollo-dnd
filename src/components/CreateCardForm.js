import React from 'react';
import PropTypes from 'prop-types';
import { CreateForm, InputGroup, StyledLabel, StyledInput } from './Form';

const CreateCardForm = ({ values: { content, yourName }, onSubmit, updateValue }) => (
  <CreateForm onSubmit={onSubmit}>
    <InputGroup>
      <StyledLabel>Content</StyledLabel>
      <StyledInput name="content" value={content} onChange={updateValue} type="text" />
    </InputGroup>
    <InputGroup>
      <StyledLabel>Your Name</StyledLabel>
      <StyledInput name="yourName" value={yourName} onChange={updateValue} type="text" />
    </InputGroup>
    <StyledInput type="submit" value="Create Foresight" />
  </CreateForm>
);

CreateCardForm.propTypes = {
  values: PropTypes.shape({
    content: PropTypes.string,
    yourName: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default CreateCardForm;
