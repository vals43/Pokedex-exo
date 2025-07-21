// src/App.js
import React from 'react';
import { ThemeProvider } from './components/ThemeContext.jsx';
import Navbar from './components/navbar.jsx';
import Body from './components/Body.jsx';

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Body />
    </ThemeProvider>
  );
}

export default App;