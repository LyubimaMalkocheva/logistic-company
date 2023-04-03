import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Header } from "./components/Header/Header";
import { AllPackages } from "./views/AllPackages/AllPackages";
import { Register } from "./views/Register/Register";
import { NewPackage } from "./views/NewPackage/NewPackage";
import { Footer } from "./components/Footer/Footer";
import { Contacts } from "./views/Contacts/Contacts";
import { About } from "./views/About/About";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="body">
          <Routes>
            <Route index element={<Navigate replace to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/packages" element={<AllPackages />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-package" element={<NewPackage />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
