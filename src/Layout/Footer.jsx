import React from 'react';
import styled from 'styled-components';

// Styled component for the footer
const StyledFooter = styled.footer`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
  font-size: 1em;
  bottom: 0;
  width: 100%;
`;

// Styled component for the footer paragraph
const FooterText = styled.p`
  margin: 0;
  padding: 0;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <FooterText>This is the footer of my project using the <a href="https://data.police.uk/docs" target="_blank" rel="noopener noreferrer">UK Police Data API</a>.</FooterText>
            <FooterText>&copy; {new Date().getFullYear()} Verkefni 4,Vefforritun 2-2024. All rights reserved.</FooterText>
        </StyledFooter>
    );
};

export default Footer;
