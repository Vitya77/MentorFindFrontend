import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../img/logo1.svg"

function Navigation() {
    return (
    <nav className="site-nav">
        <Link to="/" className="logo-link">
          <img src={Logo} alt="Logo" />
          <h2 className="logo">MentorFind</h2>
        </Link>
        <ul className="nav-list">
          <li></li>
          <li className="nav-list-item">
            <Link to="/" className="nav-link">
              <i
                className="fa fa-home fa-fw"
                style={{ fontSize: "1.3em" }}
                aria-hidden="true"
              />
              &nbsp; Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/" className="nav-link">
              Become tutor
            </Link>
          </li>
          {localStorage.getItem('mentorFindToken') === null ? (
          <><li className="nav-list-item">
            <Link to="/registration" className="nav-link">
              Sign up
            </Link>
          </li>
          <li className="nav-list-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li></>
          ) : (
          <li className="nav-list-item">
            <Link to="/" className="nav-link">
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