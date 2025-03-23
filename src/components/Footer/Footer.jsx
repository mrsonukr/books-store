// Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-black text-white">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Books</h3>
          <p className="text-[14px]">Books Delivered. Imagination Unlimited.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="text-[14px]">
            <li>
              <a className="text-white" href="/home">
                Home
              </a>
            </li>
            <li>
              <a className="text-white" href="/about">
                About Us
              </a>
            </li>
            <li>
              <a className="text-white" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section text-[14px]">
          <h4>Contact</h4>
          <p>Email: mssonukr@gmail.com</p>
          <p>Phone: +91 7061543815</p>
          <p>MMEC, Mullana - 133207</p>
        </div>

        <div className="footer-section payment-methods">
          <h4>We Accept</h4>
          <div className="payment-icons">
            <img src="/assets/ic/visa.png" alt="Visa" />
            <img src="/assets/ic/master.png" alt="Mastercard" />
            <img src="/assets/ic/apex.png" alt="American Express" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Books. All rights reserved. | Made By Sonu ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
