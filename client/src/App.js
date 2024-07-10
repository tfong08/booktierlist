// /src/App.js

import React from 'react';
import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
