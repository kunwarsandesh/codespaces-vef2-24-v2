import React from 'react';
import styled from 'styled-components'; // Import styled-components

const StyledHeader = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  font-size: 1.5em;
`;

const Header = () => {
    return (
        <StyledHeader>
            <p>POLICE DATA UK</p>
        </StyledHeader>
    );
};

export default Header; 
