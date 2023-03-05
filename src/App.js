import CSSTransition from "react-transition-group/CSSTransition";
import classnames from "classnames";

import "./App.css";
import React, { useState, useEffect } from "react";
import navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationDetail from "./pages/mapdisplay";
import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/footer";
import Dashboard from "./pages/dashboard";
import { PrivacyPolicyPage } from "./pages/privacypolicy";
import { useLocation } from "react-router-dom";
import "./transition.css";

function Layout({ children }) {
  const [currentRoute, setCurrentRoute] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard")) {
      setCurrentRoute("dashboard");
    } else {
      setCurrentRoute("login");
    }
  }, [location]);

  return (
    <div className="flex-col">
      {currentRoute === "dashboard" ? (
        <navbar.DashboardNavbar />
      ) : (
        <navbar.Navbar />
      )}
      {children}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/Privacy-Policy"
            element={
              <Layout>
                <PrivacyPolicyPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
