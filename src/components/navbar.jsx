import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center mx-auto px-4 py-2 bg-gray-900">
      <a href="/" className="w-full text-3xl text-yellow-200 font-bold">
        UniGo
      </a>
      <ul className="flex">
        <li className="p-2 text-white font-medium flex whitespace-nowrap">
          <Link to="/login">Sign In</Link>
        </li>
        <li className="p-2 text-white font-medium flex whitespace-nowrap">
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
