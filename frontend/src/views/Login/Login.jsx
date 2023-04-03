import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Checkbox, Form, Input, Modal, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  getCustomerByEmailAsync,
  getEmployeeByEmailAsync,
  selectLoginStatus,
} from "../../redux/reducers/userDataReducer";
import { API_STATES } from "../../common/constants";

export const Login = (props) => {
  const [loginUserType, setLoginUserType] = useState();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector(selectLoginStatus);

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const login = () => {
    if (loginUserType === "employee") {
      const employee = dispatch(getEmployeeByEmailAsync(form.email));
    } else if (loginUserType === "customer") {
      const customer = dispatch(getCustomerByEmailAsync(form.email));
    }

    navigate("/home");
  };

  return (
    <div className="Login">
      <Modal
        title="Login"
        open={props.open}
        width={700}
        onCancel={props.handleClose}
        footer={[
          <Button key="back" onClick={props.handleClose}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={login}
          >
            Login
          </Button>,
        ]}
      >
        <div className="login-form-body">
          <div className="login-checkboxes">
            <Checkbox
              onChange={(e) => {
                e.target.checked
                  ? setLoginUserType("employee")
                  : setLoginUserType("");
              }}
            >
              Employee
            </Checkbox>
            <Checkbox
              onChange={(e) => {
                e.target.checked
                  ? setLoginUserType("customer")
                  : setLoginUserType("");
              }}
            >
              Customer
            </Checkbox>
          </div>
          <Form
            name="basic"
            className="login-form"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={updateForm("email")}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              onChange={updateForm("password")}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form>
          <div className="login-account-text">
            Don't have an account?
            <NavLink to="/register" onClick={props.handleClose}>
              {" "}
              Register here!{" "}
            </NavLink>
          </div>
          {loginStatus === API_STATES.REJECTED ? (
            <div className="error-login-mssg">Email or password is not valid!</div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};
