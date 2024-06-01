import React from 'react';

function Footer() {
    /* A component of footer */

    return (
    <footer className="contacts-section">
      <div className="footer-container">
        <h4 className="section-header white-header ">Зв'яжіться з нами</h4>
        <p className="footer-text">
          Наша команда постарається відповісти на ваші запитання як можна швидше :)
        </p>
        <div className="footer-socials">
          <a href="/MentorFindFrontend/" className="footer-link"><i className="fa-brands fa-facebook" /></a>
          <a href="/MentorFindFrontend/" className="footer-link"><i className="fa-brands fa-twitter" /></a>
          <a href="https://t.me/MentorFindHelpBot" target="_blank" rel="noopener noreferrer" className="footer-link"><i className="fa-brands fa-telegram" /></a> 
        </div>
      </div>
      <hr color="white" size={1} />
      <p className="copyright">©MentorFind</p>
    </footer>
    );
}
    
export default Footer;