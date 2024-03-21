// Button.jsx
import React from 'react';
import styled from 'styled-components';

// Styled component for the button
const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor || '#4CAF50'}; // Default background color
  color: ${(props) => props.color || 'white'}; // Default text color
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em;
  margin: 10px;
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor || '#45a049'}; // Default hover background color
  }
`;

const Button = ({ text, onClick, backgroundColor, color, hoverBackgroundColor, ...props }) => {
  return (
    <StyledButton
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      hoverBackgroundColor={hoverBackgroundColor}
      {...props}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
