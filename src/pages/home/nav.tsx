import React, { useState } from "react";
import './nav.css';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false); 
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/auth"); 
  };

  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/weblist">Weblist</a>
      </li>
    </ul>
  </div>
  <div className="navbar-right">
      {isAuthenticated ? (
          <div
            className="user-icon-container"
            onMouseEnter={() => setShowLogout(true)} 
            onMouseLeave={() => setShowLogout(false)} 
          >
            <i className="fas fa-user user-icon"></i>
            {showLogout && (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        ) : (
          <a href="/auth" className="user-icon">
            <i className="fas fa-user"></i>
          </a>
        )}
  </div>
</nav>
);
};

export default Navbar;