import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <div className="NavItem">
        <Link to="/">Timeline</Link>
      </div>
      <div className="NavItem">
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

export default Navbar;
