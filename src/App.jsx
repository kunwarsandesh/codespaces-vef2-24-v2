import './App.css';
import React from 'react';
import Forces from './Forces';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import InfoOnForce from './InfoOnForce';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Forces />} />
          <Route path="/forces/:id" element={<InfoOnForce />} />
        </Routes>
      </Router>
  );
}

export default App;
