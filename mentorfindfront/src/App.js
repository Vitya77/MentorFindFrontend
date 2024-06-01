import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';
import AdvertForm from './components/AdvertForm';
import Auth from './components/Authentification';
import AuthSuccMessage from './components/AuthSuccessMessage';
import NotFound from './components/NotFoundPage';
import AdvertPage from './components/AdvertPage';
import ProfilePage from './components/ProfilePage';
import WorkingPage from './components/WorkingPage';
import ConferentionPage from './components/ConferentionPage';
import LogoBlue from "./img/logo_blue.svg";
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
  const [Logo, setLogo] = useState(window.location.pathname === "/auth" ? LogoWhite : LogoBlue);

  const AuthClick = (e) => {
    setNavClasses("site-nav auth-site-nav");
    setLogo(LogoWhite);
  }

  const NotAuthClick = (e) => {
    setNavClasses("site-nav");
    setNavSignUpMode("");
    setLogo(LogoBlue);
  }

  //This state with function is used to display and hide massage about successful authentification 
  const [SuccessAuth, setSuccessAuth] = useState(false);
  const changeSuccessAuth = () => {
    setSuccessAuth(true);
    setTimeout(function() {
      setSuccessAuth(false);
    }, 5000);
  }

  const [showAdvertCreated, setshowAdvertCreated] = useState(false);
  const [createdOrEdited, setСreatedOrEdited] = useState("");

  const handleShowAdvertCreated = (message) => {
    setshowAdvertCreated(true);
    setСreatedOrEdited(message);
    setTimeout(function() {
      setshowAdvertCreated(false);
    }, 3000);
  };

  const handleCloseAdvertCreated = () => {
    setshowAdvertCreated(false);
  };

  //A page that will be showed
  return (
    <Router>
      <Navigation signUpMode={navSignUpMode} navClasses={navClasses} Logo={Logo} AuthClick={AuthClick} NotAuthClick={NotAuthClick}/>
      <Modal show={showAdvertCreated} onHide={handleCloseAdvertCreated}>
        <Modal.Header closeButton>
          <Modal.Title style={{display: 'flex', 'alignItems': 'center'}}>
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
            <span style={{'fontSize': '1.2rem', 'marginLeft': '10px'}}>{createdOrEdited}</span>
          </Modal.Title>
        </Modal.Header>
      </Modal>
      <Routes>
        <Route path="/MentorFindFrontend" element={<MainPage />} />
        <Route path="/MentorFindFrontend/auth" element={<Auth signUpModeFunc={changeSignUpMode} NotAuthClick={NotAuthClick} changeSuccessAuth={changeSuccessAuth}/>} />
        <Route path="/MentorFindFrontend/search" element={<SearchPage />} />
        <Route path="/MentorFindFrontend/advert/*" element={<AdvertPage AuthClick={AuthClick} OnSignUp={handleShowAdvertCreated}/>} />
        <Route path="/MentorFindFrontend/advertform" element={<AdvertForm onCreating={handleShowAdvertCreated} NotAuthClick={NotAuthClick} editingMode={false}/>} />
        <Route path="/MentorFindFrontend/advertform/edit/*" element={<AdvertForm onCreating={handleShowAdvertCreated} NotAuthClick={NotAuthClick} editingMode={true}/>} />
        <Route path="/MentorFindFrontend/profile" element={<ProfilePage onCreating={handleShowAdvertCreated}/>} />
        <Route path="/MentorFindFrontend/workingtable" element={<WorkingPage/>} />
        <Route path="/MentorFindFrontend/conferention/*" element={<ConferentionPage/>} />
        <Route path="/MentorFindFrontend/*" element={<NotFound />} />
      </Routes>
      {SuccessAuth && <AuthSuccMessage/>}
      <Footer />
    </Router>
  );
}

export default App;
