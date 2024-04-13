import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LocalStorage from "../../managers/LocalStorage";
import { useAuth } from "../../hooks/useAuth";
const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-xl tracking-tight">
          Codistan-Venture
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow"></div>
        {!isLoggedIn ? (
          <div>
            <Link
              to="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-4"
            >
              Login
            </Link>
          </div>
        ) : (
          <div>
            <Link className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-4">
              {user.username}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
