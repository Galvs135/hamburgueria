import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { CartProvider } from "./Provider/cart";
import { Route, Routes } from "react-router-dom";
import { Vitrine } from "./Components/vitrine";
import { Cart } from "./Components/cart";
import { Header } from "./Components/header";
import { Login } from "./Components/Login";
import { AuthProvider } from "./Provider/auth";
import { SignUp } from "./Components/signUp";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
            </Route>
            <Route path="/signUp">
              <Route index element={<SignUp />} />
            </Route>
            <Route path="/vitrine">
              <Route index element={<Vitrine />} />
            </Route>
            <Route path="/cart">
              <Route index element={<Cart />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
