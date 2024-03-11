import React from 'react';

function Footer() {
    /* A component of footer */

    return (
    <footer className="contacts-section">
      <div className="footer-container">
        <h4 className="section-header white-header ">Get in touch with us</h4>
        <p className="footer-text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut fugiat
          laboriosam esse. Ratione, ea totam.
        </p>
        <div className="footer-socials">
          <a href="/" className="footer-link"><i className="fa-brands fa-facebook" /></a>
          <a href="/" className="footer-link"><i className="fa-brands fa-twitter" /></a>
          <a href="/" className="footer-link"><i className="fa-brands fa-telegram" /></a> 
        </div>
        <p className="phone">+xx_xxx_xxx_xx</p>
        <p className="mail">googleapis@gmail.com</p>
      </div>
      <hr color="white" size={1} />
      <p className="copyright">©DaiS</p>
    </footer>
    );
}
    
export default Footer;