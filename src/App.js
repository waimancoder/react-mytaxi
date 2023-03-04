import CSSTransition from "react-transition-group/CSSTransition";
import classnames from "classnames";

import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationDetail from "./pages/mapdisplay";
import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/footer";
import { PrivacyPolicyPage } from "./pages/privacypolicy";
import "./transition.css";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
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
            path="/location-detail"
            element={
              <Layout>
                <LocationDetail />
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
