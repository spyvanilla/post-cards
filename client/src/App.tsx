import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Home, Questions} from './Pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions/:subject" element={<Questions />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
