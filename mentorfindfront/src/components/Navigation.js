import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from "../img/logo_blue.svg";
import UkraineFlag from "../img/ukraine-flag.svg";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Navigation = ({signUpMode, navClasses, Logo, AuthClick, NotAuthClick}) => {
  
    /* A component of navbar */

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const LogOut = () => {
      localStorage.clear();
      handleCloseModal();
      NotAuthClick();
    } 

    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
      setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    const [showSettings, setShowSettings] = useState(false);
    const [showSettingsAnimation, setShowSettingsAnimation] = useState(false);

    const toggleSettings = () => {
      if (!showSettings) {
        setShowSettings(!showSettings);
         setTimeout(function() {
          setShowSettingsAnimation(!showSettingsAnimation);
        }, 100);
      }
      else {
        setShowSettingsAnimation(!showSettingsAnimation);
        setTimeout(function() {
          setShowSettings(!showSettings);
        }, 100);
      }
    }

    return (
      <nav className={`${navClasses} ${signUpMode}`} id="site-nav">
        <Link to="/MentorFindFront/" className="logo-link" onClick={NotAuthClick}>
          <img src={signUpMode !== "" ? LogoBlue : Logo} alt="Logo" />
          <h2 className="logo">MentorFind</h2>
        </Link>
        <ul className="nav-list">
          <li></li>
          <li className="nav-list-item">
            <Link to="/MentorFindFront/" className="nav-link" onClick={NotAuthClick}>
              <i
                className="fa fa-home fa-fw"
                style={{ fontSize: "1.3em" }}
                aria-hidden="true"
              />
              &nbsp; Головна
            </Link>
          </li>
          {localStorage.getItem('mentorFindToken') !== null && <li className="nav-list-item">
            <Link to="/MentorFindFront/advertform" className="nav-link" onClick={AuthClick}>
              Додати оголошення
            </Link>
          </li>}
          {localStorage.getItem('mentorFindToken') !== null && <li className="nav-list-item">
            <Link to="/MentorFindFront/workingtable" className="nav-link" onClick={NotAuthClick}>
              <i 
                className="fa-solid fa-briefcase"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </Link>
          </li>}
          {localStorage.getItem('mentorFindToken') === null && 
          <li className="nav-list-item">
            <Link to="/MentorFindFront/auth" className="nav-link" onClick={AuthClick}>
              Увійти/Зареєструватись
            </Link>
          </li>}
          {localStorage.getItem('mentorFindToken') !== null && <li className="nav-list-item">
            <Link to="/MentorFindFront/profile" className="nav-link" onClick={NotAuthClick}>
              <i
                className="fa fa-user-circle-o"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </Link>
          </li>}
          <li className="nav-list-item">
            <button className="nav-link" onClick={toggleSettings}>
              <i
                className="fa-solid fa-gear"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </button>
          </li>
          {localStorage.getItem('mentorFindToken') !== null && <li className="nav-list-item">
            <button className="nav-link" onClick={handleShowModal}>
              <i
                className="fa-solid fa-arrow-right-from-bracket"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </button>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title style = {{fontSize: "1.2em"}}>Ви впевнені, що хочете вийти з акаунту?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal} style = {{fontSize: "1em", width: "100px", height: "40px", margin: "10px"}}>
                  Ні
                </Button>
                <Link to="/MentorFindFront/">
                <Button variant="primary" onClick={LogOut} style = {{fontSize: "1em", width: "100px", height: "40px", margin: "10px"}}>
                  Так
                </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </li>}
        </ul>
        {showSettings && <div className={`nav-settings ${showSettingsAnimation && "show"}`}>
          <h6>Загальні налаштування</h6>
          <div className="nav-settings-item">
            <div className={`switch ${theme !== 'light' && "on"}`} onClick={toggleTheme}>
              <div className="switch-circle"></div>
            </div>
            <label>Темна тема</label>
          </div>
          <div className="nav-settings-item">
            <div className="country-icon">
              <img src={UkraineFlag}/>
            </div>
            <label>Вибір мови</label>
          </div>
          <h6>Режими доступності</h6>
          <div className="nav-settings-item">
            <div className={`switch`}>
              <div className="switch-circle"></div>
            </div>
            <label>Для людей із вадами зору</label>
          </div>
          <div className="nav-settings-item">
            <div className={`switch`}>
              <div className="switch-circle"></div>
            </div>
            <label>Безпечний режим при епілепсії</label>
          </div>
          <div className="nav-settings-item">
            <div className={`switch`}>
              <div className="switch-circle"></div>
            </div>
            <label>Режим сліпоти</label>
          </div>
        </div>}
      </nav>
    );
}

export default Navigation;