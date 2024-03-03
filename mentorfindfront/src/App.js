import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login';
import RegistrationForm from './components/Registration';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainPage from './components/MainPage';

function App() {
  //localStorage.clear(); // Це очищує токен з браузера користувача, залишив для тестування

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
