import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Auth from './components/Authentification';
import AuthSuccMessage from './components/AuthSuccessMessage';
import LogoBlack from "./img/logo_black.svg";
import LogoWhite from "./img/logo_white.svg";

function App() {
  //localStorage.clear(); // Це очищує токен з браузера користувача, залишив для тестування

  const [navSignUpMode, setNavSignUpMode] = useState("");
  function changeSignUpMode(class_name) {
    setNavSignUpMode(class_name);
  }

  const [navClasses, setNavClasses] = useState(window.location.pathname === "/auth" ? "site-nav auth-site-nav" : "site-nav");
  const [Logo, setLogo] = useState(window.location.pathname === "/auth" ? LogoWhite : LogoBlack);

  const AuthClick = (e) => {
    setNavClasses("site-nav auth-site-nav");
    setLogo(LogoWhite);
  }

  const NotAuthClick = (e) => {
    setNavClasses("site-nav");
    setNavSignUpMode("");
    setLogo(LogoBlack);
  }

  const [SuccessAuth, setSuccessAuth] = useState(false);
  const changeSuccessAuth = () => {
    setSuccessAuth(true);
    setTimeout(function() {
      setSuccessAuth(false);
    }, 5000);
  }

  return (
    <Router>
      <Navigation signUpMode={navSignUpMode} navClasses={navClasses} Logo={Logo} AuthClick={AuthClick} NotAuthClick={NotAuthClick}/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth signUpModeFunc={changeSignUpMode} NotAuthClick={NotAuthClick} changeSuccessAuth={changeSuccessAuth}/>} />
      </Routes>
      {SuccessAuth && <AuthSuccMessage/>}
      <Footer />
    </Router>
  );
}

export default App;
