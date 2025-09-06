import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Pizzas from "../pages/Pizzas";
import PizzaDetails from "../pages/PizzaDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";   // 👈 Contact page import kiya

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pizzas" element={<Pizzas />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pizzas/:id" element={<PizzaDetails />} />
      <Route path="/contact" element={<Contact />} />  {/* 👈 Contact page ka route */}
    </Routes>
  );
};

export default Routers;
