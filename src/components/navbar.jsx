import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as ioIcons from "react-icons/io5";
import Sidebar from "./sidebar";

function Navbar() {
  return (
    <div className="flex justify-between items-center mx-auto px-4 py-2 bg-gray-900">
      <a href="/" className="w-full text-3xl text-yellow-200 font-bold">
        iiumGo
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

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded={isOpen ? "true" : "false"}
        data-dropdown-toggle="dropdown-user"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
      <div
        className={`z-50 ${
          isOpen ? "" : "hidden"
        } absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
        id="dropdown-user"
      >
        <div className="px-4 py-3" role="none">
          <p className="text-sm text-gray-900 dark:text-white" role="none">
            Neil Sims
          </p>
          <p
            className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
            role="none"
          >
            neil.sims@flowbite.com
          </p>
        </div>
        <ul className="py-1" role="none">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="font-Inter fixed top-0 z-50 w-full bg-black border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="text-white text-2xl hover:text-gray-500"
                onClick={handleSidebarToggle}
              >
                {isSidebarOpen ? (
                  <ioIcons.IoClose />
                ) : (
                  <ioIcons.IoMenuOutline />
                )}
              </button>
              <a href="#" className="flex ml-2 md:mr-24">
                <span className="self-center text-[#3FFC9E] text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  iiumGO
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <Dropdown />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isSidebarOpen && <Sidebar />}
    </>
  );
}

export default { Navbar, DashboardNavbar };
