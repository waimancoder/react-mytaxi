import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    native_name: "",
    password: "",
    phone_no: "",
    role: "student",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    fetch("https://51f7-210-48-222-13.ap.ngrok.io/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // registration successful
          return response.json();
        } else {
          // registration failed
          throw new Error("Registration failed.");
        }
      })
      .then((data) => {
        console.log("Registration successful!", data);
        // do something with the response data
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="font-Inter flex flex-col items-center px-6 py-20 bg-[#000300] mx-auto md:h-screen	 lg:py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="py-4 mt-6 text-center text-3xl font-extrabold text-white">
          Create an account
        </h2>
      </div>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="native_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="native_name"
                  name="native_name"
                  type="text"
                  value={formData.native_name}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone_no"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone_no"
                  name="phone_no"
                  type="tel"
                  value={formData.phone_no}
                  onChange={handleInputChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-200 bg-0 bg-black hover:bg-grey-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-700 hover:text-yellow-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
