import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import {Home, Questions, EditQuestions, EditQuestion} from './Pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/questions/:subject" element={<Questions />}></Route>
        <Route path="/edit-questions/:subject" element={<EditQuestions />}></Route>
        <Route path="/edit-questions/:subject/:id" element={<EditQuestion />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
