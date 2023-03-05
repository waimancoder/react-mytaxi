import React from "react";
import { Route, Routes } from "react-router-dom";
import LocationDetail from "./mapdisplay";
import { useRef } from "react";

function Dashboard({ children }) {
  return (
    <div>
      <Routes>
        <Route path="/location-detail" element={<LocationDetail />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
