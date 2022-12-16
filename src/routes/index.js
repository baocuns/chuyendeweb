import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

// ---------Dashboard
import Dashboards from "./Dashboard";

// ---------Pages
import Login from "./Pages/Login";
import Tour from "./Pages/Tour";
import Home from "./Pages/Home";
import Slider from "./Pages/Slider";
// --------404
import Err from "./Pages/404";

export const RoutedContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* dashboard */}
      <Route path="/dashboard" element={<Dashboards.Dashboard />} />
      <Route path="/dashboard/tour" element={<Dashboards.Tour />} />
      <Route path="/dashboard/tour/:slug" element={<Dashboards.Details />} />

      {/* pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/tour" element={<Tour />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/Slider" element={<Slider />} /> */}

      {/* 404 */}
      <Route path="*" element={<Err />} />
    </Routes>
  );
};

// ok chua
