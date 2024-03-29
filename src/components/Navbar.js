import React from 'react'
import { Link } from 'react-router-dom'

function Navbar () {
  return (
    <nav className="bg-slate-900">
      <div className="mx-auto py-1.5 px-2 sm:px-6 lg:px-6">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex space-x-4">
            <Link to="/">
              <div className="text-gray-50 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Timeline
              </div>
            </Link>
            <Link to="/dashboard">
              <div className="text-gray-50 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
