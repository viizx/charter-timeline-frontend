import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default Navbar;
