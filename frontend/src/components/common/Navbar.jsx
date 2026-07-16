// filename: frontend/src/components/common/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-seal" aria-hidden="true">◆</span>
          Ceresum
        </Link>

        <button
          className="navbar-burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              {user?.role === "admin" && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <span className="navbar-user">Hi, {user?.name?.split(" ")[0]}</span>
              <ThemeToggle />
              <button className="navbar-logout" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="navbar-cta" onClick={() => setMenuOpen(false)}>
                Get started
              </Link>
              <ThemeToggle />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
