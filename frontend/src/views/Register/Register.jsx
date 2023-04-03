import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import "./Register.css";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCustomerAsync } from "../../redux/reducers/customerReducer";
import { createEmployeeAsync } from "../../redux/reducers/employeeReducer";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    position: "", //DRIVER, IN_OFFICE
    office: null, // {id: }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const register = (e) => {
    if (form.position === "customer") {
      dispatch(createCustomerAsync(form));
    } else {
      dispatch(createEmployeeAsync(form));
    }

    navigate("/home");
    console.log(e);
  };

  return (
    <div className="Register">
      <div className="register-image-section">
        <img
          className="register-image"
          src={require("../../image/register.png")}
          alt="register"
        />
      </div>
      <div className="register-section">
        <div className="register-title">Create your account here</div>
        <form className="register-form">
          <div className="section">
            <TextField
              id="first_name"
              type="text"
              label="First name"
              value={form.first_name}
              required
              onChange={updateForm("first_name")}
            />
          </div>
          <div className="section">
            <TextField
              id="last_name"
              type="text"
              label="Last name"
              value={form.last_name}
              required
              onChange={updateForm("last_name")}
            />
          </div>
          <div className="section">
            <TextField
              id="address"
              type="text"
              label="Address"
              value={form.address}
              onChange={updateForm("address")}
            />
          </div>
          <div className="section">
            <TextField
              id="email"
              type="email"
              label="Email"
              value={form.email}
              required
              onChange={updateForm("email")}
            />
          </div>
          <div className="section">
            <TextField
              id="phone"
              type="text"
              label="Phone number"
              value={form.phone}
              required
              onChange={updateForm("phone")}
            />
          </div>
          {/* <div className="section">
            <TextField
              type="text"
              label="Postal code"
              value={form.postCode}
              onChange={updateForm("postCode")}
            />
          </div> */}
          <FormControl className="section" required>
            <InputLabel id="user">Type of user</InputLabel>
            <Select
              id="position"
              style={{ width: "100%" }}
              value={form.position}
              labelId="user"
              MenuProps={{
                disableScrollLock: true,
              }}
              onChange={updateForm("position")}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="IN_OFFICE">Employee</MenuItem>
              <MenuItem value="DRIVER">Driver</MenuItem>
            </Select>
          </FormControl>
          <div className="section">
            <TextField
              id="password"
              type="password"
              label="Password"
              required
              value={form.password}
              onChange={updateForm("password")}
            />
          </div>

          <div className="register-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={register}
              sx={{ width: 150, fontSize: 18, margin: 3, alignSelf: "center" }}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
