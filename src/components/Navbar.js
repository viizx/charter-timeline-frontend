import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-indigo-600">
      <div className="mx-auto py-1.5 px-2 sm:px-6 lg:px-6">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex space-x-4">
            <div className="text-gray-50 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/">Timeline</Link>
            </div>
            <div className="text-gray-50 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
