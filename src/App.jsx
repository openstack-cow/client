import React from 'react';
import {Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './register';

const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Register />} />
    </Routes>
  );

export default App;
