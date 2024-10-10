import { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css"; // Import your CSS file

const NavBar = ({ userRole }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const handleNavItemClick = () => {
    if (active) {
      setActive(false); // Close the menu
    }
  };

  return (
    <header className="navbar-container">
      <nav>
        <div className="logoo">
          <img src="./logod.png" alt="logo" id="logo" />
          <h1>مسجد الشفاء</h1>
        </div>
        <div className="mobile-menu-icon" onClick={handleClick}>
          <i className={`fas ${active ? "fa-times" : "fa-bars"}`}></i>
        </div>
        <ul className={`nav-items ${active ? "active" : ""}`}>
          <li className="nav-links">
            <Link to="/app" onClick={handleNavItemClick}>الرئيسية</Link>
          </li>
          <li className="nav-links">
            <a href="#prayer" onClick={handleNavItemClick}>الصلاة</a>
          </li>
          <li className="nav-links">
            <Link to="/video" onClick={handleNavItemClick}>فيديوهات</Link>
          </li>
         
          <li className="nav-links">
            <Link to="/register-child" onClick={handleNavItemClick}>مدرسة القرآن</Link>
          </li>

          {/* Conditionally render the admin link based on the userRole */}
          {userRole === 'admin' && (
            <li className="nav-links">
              <Link to="/admin" onClick={handleNavItemClick}>لوحة التحكم</Link>
            </li>
          )}
           {userRole === 'teacher' && (
            <li className="nav-links">
              <Link to="/teacher" onClick={handleNavItemClick}>الطلبة</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

