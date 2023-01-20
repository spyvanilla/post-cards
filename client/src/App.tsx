import React from 'react';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Loading from './Components/Loading';
import {Home, Register, Login, Profile, Questions, EditQuestions} from './Pages';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/is_logged')
    .then(response => response.json())
    .then(response => {
      setIsLogged(response.is_logged);
      setLoading(false);
    })
  }, [])

  return (
    <Router>
      {loading === true ? <Loading type={1} /> : (
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />}></Route>
          <Route path="/profile" element={<Profile isLogged={isLogged} setIsLogged={setIsLogged} />}></Route>
          <Route path="/questions/:subject" element={<Questions />}></Route>
          <Route path="/edit-questions/:subject" element={<EditQuestions />}></Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;
