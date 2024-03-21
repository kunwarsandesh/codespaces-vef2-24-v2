import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Input = ({ type = 'text', ...props }) => {
  return (
    <StyledInput type={type} {...props} />
  );
};

export default Input;
