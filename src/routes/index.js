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

import Checkout from "./Pages/Checkout/Checkout";


// --------404
import Err from "./Pages/404";
import DetailTour from "./Pages/DetailTour/DetailTour";
import Order from "./Pages/Order/Order";
import Orders from "./Pages/Order/Orders.";
import Xanpay from "./Pages/Checkout/Xanpay/Xanpay";
import Rating from "../layout/components/Rating/Rating";
import Register from "./Pages/Login/Register";

export const RoutedContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* dashboard */}
      <Route path="/dashboard" element={<Dashboards.Dashboard />} />
      <Route path="/dashboard/tour" element={<Dashboards.Tour />} />
      <Route path="/dashboard/tour/:slug" element={<Dashboards.Details />} />
      <Route path="/dashboard/orders" element={<Dashboards.Orders />} />
      <Route path="/dashboard/orders/details/:oid" element={<Dashboards.Order />} />

      {/* pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tour" element={<Tour />} />
      <Route path="/home" element={<Home />} />

      {/* <Route path="/Slider" element={<Slider />} /> */}

      <Route path="/detail-tour" element={<DetailTour />} />
      <Route path="/rating" element={<Rating />} />
      {/* cart order */}
      <Route path="/checkout/:oid" element={<Checkout />} />
      <Route path="/order/:oid" element={<Order />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/xanpay" element={<Xanpay />} />


      {/* 404 */}
      <Route path="*" element={<Err />} />
    </Routes>
  );
};

// ok chua
