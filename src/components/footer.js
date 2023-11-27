// Footer.js

import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <h4>Contact Us</h4>
        <p>Email: info@example.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>
      <div className="footer-content">
        <h4>Follow Us</h4>
        <p>Facebook | Twitter | Instagram</p>
      </div>
      <div className="footer-content">
        <h4>Address</h4>
        <p>123 Main Street, Cityville, Country</p>
      </div>
    </div>
  );
};

export default Footer;
