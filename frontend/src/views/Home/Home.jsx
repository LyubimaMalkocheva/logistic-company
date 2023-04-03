import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <div className="Home">
      <div className="home-left-component">
        <div className="home-header">Welcome to LOGGYY!</div>
        <div className="home-slogan">On-time, every time. ⏰</div>
        <div className="home-register-button">
          <Button variant="contained">
            <NavLink to="/about">About us</NavLink>
          </Button>

          <Button variant="contained">
            <NavLink to="/register">Register</NavLink>
          </Button>
        </div>
      </div>
      <div className="home-right-component">
        <img
          src={require("../../image/home.jpg")}
          alt="home page"
          width="80%"
          height="70%"
        />
      </div>
    </div>
  );
};
