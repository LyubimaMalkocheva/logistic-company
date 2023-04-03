import React from "react";
import "./Header.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Login } from "../../views/Login/Login";
import { logout, selectUserData } from "../../redux/reducers/userDataReducer";
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthenticated } from "../../common/helpers";
export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleClose = () => setLoginOpen((prev) => !prev);

  const logoutUser = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div className="Header">
      <div className="logo-section">
        <img
          className="logo"
          src={require("../../image/logo.png")}
          alt="logo"
        />
      </div>

      <div className="nav-section">
        <div className="navBar">
          <NavLink to="/home">Home</NavLink>
        </div>
        {isUserAuthenticated(userData) ? (
          <div className="navBar">
            <NavLink to="/packages">All Packages</NavLink>
          </div>
        ) : null}
        {isUserAuthenticated(userData) && userData.type === "employee" ? (
          <div className="navBar">
            <NavLink to="/new-package">New Package</NavLink>
          </div>
        ) : null}
        <div className="navBar">
          <NavLink to="/about">About us</NavLink>
        </div>
        <div className="navBar">
          <NavLink to="/contacts">Contacts</NavLink>
        </div>
      </div>
      <div className="login-section">
        {isUserAuthenticated(userData) ? (
          <>
            <div className="email-section">{userData.email}</div>
            <Button variant="contained" onClick={logoutUser}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={handleClose}>
              Login
            </Button>
            <Login open={loginOpen} handleClose={handleClose} />
          </>
        )}
      </div>
    </div>
  );
};
