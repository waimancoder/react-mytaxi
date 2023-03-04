import CSSTransition from "react-transition-group/CSSTransition";
import classnames from "classnames";

import "./App.css";
import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationDetail from "./pages/mapdisplay";
import Login from "./pages/login";
import Register from "./pages/register";
import "./transition.css";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Router>
        <div className={classnames("slide")}>
          <CSSTransition
            classNames={{
              enter: "slide-enter",
              enterActive: "slide-enter-active",
              exit: "slide-exit",
              exitActive: "slide-exit-active",
            }}
            timeout={{ enter: 500, exit: 300 }}
          >
            <Routes>
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
            </Routes>
          </CSSTransition>
        </div>
      </Router>
    </>
  );
}
