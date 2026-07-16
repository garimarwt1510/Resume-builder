// filename: frontend/src/components/common/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <span>© {new Date().getFullYear()} Ceresum. Built for people between jobs and better ones.</span>
    </div>
  </footer>
);

export default Footer;
