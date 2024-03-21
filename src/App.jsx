import './App.css';
import React from 'react';
import Forces from './Forces';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      //Route to Forces
      <Router>
        <Routes>
          <Route path="/" element={<Forces />} />
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
