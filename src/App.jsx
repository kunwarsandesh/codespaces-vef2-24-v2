import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forces from './Forces';
import InfoOnForce from './InfoOnForce';
import styled from 'styled-components';
import Header from './Layout/Header';
import Footer from './Layout/Footer';


const AppContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 800px; // Adjust the width as needed
  padding: 20px;
`;



const MainContent = styled.main`
  margin-top: 20px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>
        </Header>
        <MainContent>
          <Routes>
            <Route path="/" element={<Forces />} />
            <Route path="/forces/:id" element={<InfoOnForce />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </MainContent>
        <Footer>
        </Footer>
      </AppContainer>
    </Router>
  );
}

export default App;
