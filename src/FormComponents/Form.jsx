import React from 'react';
import styled from 'styled-components';

// Styled component for the button

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Form = ({ children, onSubmit }) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      {children}
    </StyledForm>
  );
};

export default Form;
