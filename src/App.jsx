import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forces from './Forces';
import InfoOnForce from './InfoOnForce';
import styled from 'styled-components';


const AppContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 800px; // Adjust the width as needed
  padding: 20px;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  font-size: 1.5em;
`;

const MainContent = styled.main`
  margin-top: 20px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>UK POLICE INFO</Header>
        <MainContent>
          <Routes>
            <Route path="/" element={<Forces />} />
            <Route path="/forces/:id" element={<InfoOnForce />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
