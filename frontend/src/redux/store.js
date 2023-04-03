import { configureStore } from "@reduxjs/toolkit";
import allPackagesDataReducer from './reducers/packageReducer';
import allCustomersDataReducer from './reducers/customerReducer'
import allEmployeesDataReducer from './reducers/employeeReducer'
import allOfficesDataReducer from './reducers/officeReducer'
import userDataReducer from './reducers/userDataReducer'

export const createStore = () => configureStore({
  reducer: {
    packagesData: allPackagesDataReducer,
    customersData: allCustomersDataReducer,
    employeesData: allEmployeesDataReducer,
    officesData: allOfficesDataReducer,
    userData: userDataReducer,
  }
});

export const store = createStore();
