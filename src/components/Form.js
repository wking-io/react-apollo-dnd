import styled from 'styled-components';
import { PRIMARY_DARK, WHITE } from '../utils/colors';
import SANS_FONT from '../utils/typography';

export const CreateForm = styled.form`
  padding: 1em 0;
  margin-bottom: 2em;
  display: flex;
  align-items: flex-end;
`;

export const InputGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 1.5em;
`;

export const StyledLabel = styled.label`
  font-size: 0.875em;
  color: ${PRIMARY_DARK};
  margin-bottom: 0.5em;
`;

export const StyledInput = styled.input`
  font-family: ${SANS_FONT};
  font-size: 0.875em;
  border: 1px solid white;
  border-color: ${props => (props.type === 'submit' ? PRIMARY_DARK : 'white')};
  background-color: ${props => (props.type === 'submit' ? 'transparent' : 'white')};
  color: ${PRIMARY_DARK};
  padding: 0.3em 0.5em 0.25em;

  :active,
  :focus {
    outline: none;
    border-color: ${PRIMARY_DARK};
  }

  :hover {
    background-color: ${props => (props.type === 'submit' ? PRIMARY_DARK : '')};
    color: ${props => (props.type === 'submit' ? WHITE : '')};
  }
`;
