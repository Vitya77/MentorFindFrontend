import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBlue from "../img/logo_blue.svg";
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
    } 

    return (
      <nav className={`${navClasses} ${signUpMode}`} id="site-nav">
        <Link to="/" className="logo-link" onClick={NotAuthClick}>
          <img src={signUpMode !== "" ? LogoBlue : Logo} alt="Logo" />
          <h2 className="logo">MentorFind</h2>
        </Link>
        <ul className="nav-list">
          <li></li>
          <li className="nav-list-item">
            <Link to="/" className="nav-link" onClick={NotAuthClick}>
              <i
                className="fa fa-home fa-fw"
                style={{ fontSize: "1.3em" }}
                aria-hidden="true"
              />
              &nbsp; Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/advertform" className="nav-link" onClick={AuthClick}>
              Become tutor
            </Link>
          </li>
          {localStorage.getItem('mentorFindToken') === null ? (
          <li className="nav-list-item">
            <Link to="/auth" className="nav-link" onClick={AuthClick}>
              Sign in/Sign up
            </Link>
          </li>
          ) : (
            <>
          <li className="nav-list-item">
            <Link to="/profile" className="nav-link" onClick={NotAuthClick}>
              <i
                className="fa fa-user-circle-o"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </Link>
          </li>
          <li className="nav-list-item">
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
                <Button variant="primary" onClick={LogOut} style = {{fontSize: "1em", width: "100px", height: "40px", margin: "10px"}}>
                  Так
                </Button>
              </Modal.Footer>
            </Modal>
          </li></>
          )}
        </ul>
      </nav>
    );
}

export default Navigation;