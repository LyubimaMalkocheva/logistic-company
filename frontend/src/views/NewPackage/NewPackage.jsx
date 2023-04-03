import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GoPackage } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import "./NewPackage.css";
import {
  getAllEmployeesAsync,
  selectAllEmployees,
  selectAllEmployeesStatus,
} from "../../redux/reducers/employeeReducer";
import {
  getAllOfficesAsync,
  selectAllOffices,
  selectAllOfficesStatus,
} from "../../redux/reducers/officeReducer";
import {
  getAllCustomersAsync,
  selectAllCustomers,
  selectAllCustomersStatus,
} from "../../redux/reducers/customerReducer";
import { createPackageAsync, getAllPackagesAsync } from "../../redux/reducers/packageReducer";
import {
  customerPropsToDelete,
  employeePropsToDelete,
} from "../../common/constants";
import Stack from "@mui/material/Stack";

export const NewPackage = () => {
  const dispatch = useDispatch();

  const employeesData = useSelector(selectAllEmployees);
  const employeesDataStatus = useSelector(selectAllEmployeesStatus);

  const officesData = useSelector(selectAllOffices);
  const officesDataStatus = useSelector(selectAllOfficesStatus);

  const customersData = useSelector(selectAllCustomers);
  const customersDataStatus = useSelector(selectAllCustomersStatus);

  const [employeesInOffice, setEmployeesInOffice] = useState([]);
  const [driversData, setDriversData] = useState([]);
  const [senderPhone, setSenderPhone] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [packagePrice, setPackagePrice] = useState(0);
  const [form, setForm] = useState({
    nameofPackage: "",
    employeeInOffice: {},
    driver: {},
    category: "",
    kg: 0,
    price: packagePrice,
    status: "IN_PROCESS",
    date: "",
    measures: "",
    startPoint: "",
    endPoint: "",
    sender: {},
    receiver: {},
  });
  useEffect(() => {
    if (employeesDataStatus === "idle") {
      dispatch(getAllEmployeesAsync());
    }
    if (employeesDataStatus === "fulfilled") {
      const filteredDrivers = [];
      const filteredEmployee = [];
      employeesData.forEach((employee) => {
        const newObject = deleteProps(employee, employeePropsToDelete);
        if (employee.position === "IN_OFFICE") {
          filteredEmployee.push(newObject);
        } else {
          filteredDrivers.push(newObject);
        }
      });

      setDriversData(filteredDrivers);
      setEmployeesInOffice(filteredEmployee);
    }
  }, [dispatch, employeesDataStatus, employeesData]);

  useEffect(() => {
    if (officesDataStatus === "idle") {
      dispatch(getAllOfficesAsync());
    }
  }, [dispatch, officesDataStatus, officesData]);

  useEffect(() => {
    if (customersDataStatus === "idle") {
      dispatch(getAllCustomersAsync());
    }
  }, [dispatch, customersDataStatus, customersData]);

  useEffect(() => {
    if (form.category === "") return;
    if (form.category === "TO_OFFICE") {
      setPackagePrice(form.kg * 10);
    } else {
      setPackagePrice(form.kg * 15);
    }
  }, [form.kg, form.category]);

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const setSenderByPhone = (e) => {
    setSenderPhone(e.target.value);
    const findCustomer = customersData.find(
      (customer) => customer.phone === e.target.value
    );
    if (!findCustomer) return;
    setForm({
      ...form,
      sender: deleteProps(findCustomer, customerPropsToDelete),
    });
  };

  const setReceiverByPhone = (e) => {
    setReceiverPhone(e.target.value);
    const findCustomer = customersData.find(
      (customer) => customer.phone === e.target.value
    );
    if (!findCustomer) return;
    setForm({
      ...form,
      receiver: deleteProps(findCustomer, customerPropsToDelete),
    });
  };

  const deleteProps = (object, propsToDelete) => {
    const filteredObject = {};
    for (const [key, value] of Object.entries(object)) {
      if (!propsToDelete.includes(key)) filteredObject[key] = value;
    }

    return filteredObject;
  };

  const registerNewPackage = () => {
    if (senderPhone === "" || receiverPhone === "") {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    dispatch(createPackageAsync(form));
    setTimeout(() => dispatch(getAllPackagesAsync()), 500);
  };
  console.log('form', form);
  return (
    <div className="NewPackage">
      <div className="new-package-title">
        <div className="title-package-icon">
          <GoPackage />
        </div>
        <h1>Register new package:</h1>
      </div>
      <div className="new-package-section">
        <form className="new-package-form">
          <div className="left-column">
            <div className="create-section">
              <TextField
                type="text"
                label="Package name"
                value={form.nameofPackage}
                required
                onChange={updateForm("nameofPackage")}
              />
            </div>
            <div className="create-section">
              <TextField
                disabled
                id="status-disabled"
                label="Status"
                defaultValue={form.status}
              />
            </div>
            <div className="create-section">
              <TextField
                type="text"
                label="Sender phone"
                value={senderPhone}
                required
                onChange={setSenderByPhone}
              />
            </div>
            <FormControl className="create-section">
              <TextField
                type="text"
                label="Measures"
                value={form.measures}
                onChange={updateForm("measures")}
              />
            </FormControl>
            <FormControl className="create-section" required>
              <InputLabel id="startPoint">From office</InputLabel>
              <Select
                style={{ width: "100%" }}
                value={form.startPoint}
                labelId="startPoint"
                onChange={updateForm("startPoint")}
              >
                {officesData !== null
                  ? officesData.map((office) => (
                      <MenuItem key={office.id} value={office.address}>
                        {office.address}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <FormControl className="create-section" required>
              <InputLabel id="driver">Driver</InputLabel>
              <Select
                style={{ width: "100%" }}
                value={form.driver}
                labelId="driver"
                onChange={updateForm("driver")}
              >
                {driversData.map((driver, index) => (
                  <MenuItem key={index} value={driver}>
                    {driver.first_name} {driver.last_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="create-section">
              <TextField
                type="number"
                label="Price"
                value={packagePrice}
                disabled
              />
            </div>
          </div>

          <div className="right-column">
            <FormControl className="create-section" required>
              <InputLabel id="employeeInOffice">Employee</InputLabel>
              <Select
                style={{ width: "100%" }}
                value={form.employeeInOffice}
                labelId="employeeInOffice"
                onChange={updateForm("employeeInOffice")}
              >
                {employeesInOffice !== null
                  ? employeesInOffice.map((employee) => (
                      <MenuItem key={employee.email} value={employee}>
                        {employee.first_name} {employee.last_name}
                        {", "}
                        {employee.email}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <div className="create-section">
              <TextField
                type="number"
                label="Kg"
                value={form.kg}
                required
                onChange={updateForm("kg")}
              />
            </div>
            <div className="create-section">
              <TextField
                type="text"
                label="Receiver phone"
                value={receiverPhone}
                required
                onChange={setReceiverByPhone}
              />
            </div>
            <FormControl className="create-section" required>
              <InputLabel id="Category">Type of delivery</InputLabel>
              <Select
                style={{ width: "100%" }}
                value={form.category}
                labelId="Category"
                onChange={updateForm("category")}
              >
                <MenuItem value="TO_ADDRESS">To address</MenuItem>
                <MenuItem value="TO_OFFICE">To office</MenuItem>
              </Select>
            </FormControl>
            {form.category === "TO_OFFICE" ? (
              <FormControl className="create-section" required>
                <InputLabel id="endPoint">To office</InputLabel>
                <Select
                  style={{ width: "100%" }}
                  value={form.endPoint}
                  labelId="endPoint"
                  onChange={updateForm("endPoint")}
                >
                  {officesData !== null
                    ? officesData.map((office) => (
                        <MenuItem key={office.id} value={office.address}>
                          {office.address}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            ) : (
              <div className="create-section">
                <TextField
                  type="text"
                  label="To address"
                  value={form.endPoint}
                  required
                  onChange={updateForm("endPoint")}
                />
              </div>
            )}
            <div className="create-section">
              <TextField
                type="text"
                label="Date: dd/mm/yy"
                value={form.date}
                required
                onChange={updateForm("date")}
              />
            </div>
          </div>
        </form>
        <div className="create-button">
          <Button variant="contained" onClick={registerNewPackage}>
            Create
          </Button>
        </div>
      </div>
      <Stack sx={{ width: "20%"}} spacing={2}>
        {isValid ? (
          <Alert severity={"success"}>
            Successfully register a new package!
          </Alert>
        ) : (
          <Alert severity={"error"}>
            Invalid data or sender/receiver is not our client
          </Alert>
        )}
      </Stack>
    </div>
  );
};
