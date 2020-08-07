import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import '../src/css/custom.css'

function App() {
  return (
    <BrowserRouter>
    <AppRouter></AppRouter>
    </BrowserRouter>
  );
}

export default App;
