import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';
import Auth from './components/Authentification';
import AuthSuccMessage from './components/AuthSuccessMessage';
import NotFound from './components/NotFoundPage';
import AdvertPage from './components/AdvertPage';
import LogoBlack from "./img/logo_black.svg";
import LogoWhite from "./img/logo_white.svg";

function App() {
  /* The main function of the program.
    It contains all components and logic that is used between components globally     
  */

  //localStorage.clear(); // Це очищує токен з браузера користувача, залишив для тестування

  // This state with function is used to change the state of authentification page (Sign in or Sign up)
  const [navSignUpMode, setNavSignUpMode] = useState("");
  function changeSignUpMode(class_name) {
    setNavSignUpMode(class_name);
  }

  //This two states and two functions are used to change navbar style depending on whate page is user on
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

  //This state with function is used to display and hide massage about successful authentification 
  const [SuccessAuth, setSuccessAuth] = useState(false);
  const changeSuccessAuth = () => {
    setSuccessAuth(true);
    setTimeout(function() {
      setSuccessAuth(false);
    }, 5000);
  }

  //A page that will be showed
  return (
    <Router>
      <Navigation signUpMode={navSignUpMode} navClasses={navClasses} Logo={Logo} AuthClick={AuthClick} NotAuthClick={NotAuthClick}/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<Auth signUpModeFunc={changeSignUpMode} NotAuthClick={NotAuthClick} changeSuccessAuth={changeSuccessAuth}/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/advert" element={<AdvertPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {SuccessAuth && <AuthSuccMessage/>}
      <Footer />
    </Router>
  );
}

export default App;
