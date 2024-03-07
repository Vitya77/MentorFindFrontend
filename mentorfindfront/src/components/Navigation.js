import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoBlack from "../img/logo_black.svg";
import LogoWhite from "../img/logo_white.svg";


const Navigation = ({signUpMode, navClasses, Logo, AuthClick, NotAuthClick}) => {
  
    return (
      <nav className={`${navClasses} ${signUpMode}`} id="site-nav">
        <Link to="/" className="logo-link" onClick={NotAuthClick}>
          <img src={signUpMode !== "" ? LogoBlack : Logo} alt="Logo" />
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
            <Link to="/" className="nav-link" onClick={NotAuthClick}>
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
          <li className="nav-list-item">
            <Link to="/" className="nav-link" onClick={NotAuthClick}>
              <i
                className="fa fa-user-circle-o"
                style={{ fontSize: "1.5em" }}
                aria-hidden="true"
              />
            </Link>
          </li>
          )}
        </ul>
      </nav>
    );
}

export default Navigation;